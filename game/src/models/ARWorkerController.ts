import { InsectFactoryThree } from "../loaders/InsectFactoryThree";
import { ITicked } from "../framework/TimeManager";
import { InsectData, MarkerData } from "./AppData";
import { Entity } from "../framework/entity/Entity";
import { Model } from "../framework/Model";
import * as THREE from "THREE"
import { InsectEntity } from "./InsectEntity";
export class ARWorkerController extends Model implements ITicked {

    static LOADED_EVENT: string = "ARWorker_LOADED_EVENT";

    public worker: Worker;

    private vw: number;
    private vh: number;

    private w: number;
    private h: number;

    private pw: number;
    private ph: number;

    private ox: number;
    private oy: number;

    // private firstPositioning :boolean = false;
    
    private interpolationFactor: number = 1;
    private world: any;

    private camera: THREE.Camera;
    private root: THREE.Object3D;
    private video: HTMLVideoElement;
    private context_process: any;

    private markerData: MarkerData;

    private canvas_process: HTMLCanvasElement;

    private trackedMatrix: any = {
        // for interpolation
        delta: [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ],
        interpolated: [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ]
    }
    public _entities: Entity[] = [];

    private model : THREE.Object3D;

    constructor(camera: THREE.Camera) {
        super();
        this.camera = camera;
    }
    public initialize(data: InsectData, video: HTMLVideoElement, scene: THREE.Scene): Promise<boolean> {

        this.root = new THREE.Object3D();
        this.root.matrixAutoUpdate = false;

        scene.add(this.root);

        this.markerData = data.markerData;

        this.video = video;

        return new Promise<boolean>(async (resolve, reject) => {

            // let factory: InsectFactory = new InsectFactory();
            await InsectFactoryThree.createInsectEntity(data, video, scene).then((enity) => {
                this._entities.push(enity);

                let _modelRoot: THREE.Object3D = (enity as InsectEntity).getModelRoot();
                this.root.add(_modelRoot);

                // this.model = (enity as InsectEntity).getModel();
                // console.log('../' + this.markerData.url);
                // renderer.setSize(sw, sh);
                // this.worker = new Worker('./js/artoolkitNFT.worker.js');
                this.worker = new Worker('./game/resources/jsartoolkit5/artoolkit/artoolkit.wasm_worker.js');
                this.worker.onmessage = (ev) => {
                    this.load();
                    // this.process();
                };
            });

            resolve(true);
        });
    }

    public load() {

        var camera_para = '../../data/camera_para.dat';
        // var camera_para = '../../data/camera_para-iPhone 5 rear 640x480 1.0m.dat';
        this.canvas_process = document.createElement('canvas');
        this.context_process = this.canvas_process.getContext('2d');

        let input_width = this.video.videoWidth;
        let input_height = this.video.videoHeight;

        this.vw = input_width;
        this.vh = input_height;

        var pscale = 320 / Math.max(this.vw, this.vh / 3 * 4);

        this.w = this.vw * pscale;
        this.h = this.vh * pscale;
        this.pw = Math.max(this.w, (this.h / 3) * 4);
        this.ph = Math.max(this.h, (this.w / 4) * 3);
        this.ox = (this.pw - this.w) / 2;
        this.oy = (this.ph - this.h) / 2;

        this.canvas_process.width = this.pw;
        this.canvas_process.height = this.ph;

        // this.canvas_process.style.clientWidth = this.pw + "px";
        // this.canvas_process.style.clientHeight = this.ph + "px";

        // console.log(this.markerData.url);
        this.worker.postMessage({
            type: 'load',
            pw: this.pw,
            ph: this.ph,
            camera_para: camera_para,
            marker: this.markerData.url
        });

        this.worker.onmessage = (ev) => {
            var msg = ev.data;
            switch (msg.type) {
                case 'loaded': {
                    var proj = JSON.parse(msg.proj);
                    var ratioW = this.pw / this.w;
                    var ratioH = this.ph / this.h;
                    proj[0] *= ratioW;
                    proj[4] *= ratioW;
                    proj[8] *= ratioW;
                    proj[12] *= ratioW;
                    proj[1] *= ratioH;
                    proj[5] *= ratioH;
                    proj[9] *= ratioH;
                    proj[13] *= ratioH;
                    // console.log("do we ever set the camera!!!!")
                    // console.log(this.camera.projectionMatrix);
                    this.camera.matrixAutoUpdate = false;
                    this.setMatrix(this.camera.projectionMatrix, proj);
                    // this.camera.updateMatrix();
                    console.log(this.camera.projectionMatrix);

                    break;
                }
                case "endLoading": {
                    if (msg.end == true)
                        this.dispatcher.dispatchEvent(new Event(ARWorkerController.LOADED_EVENT));
                    break;
                }
                case 'found': {
                    this.found(msg);
                    break;
                }
                case 'not found': {
                    this.found(null);
                    break;
                }
            }
            this.process();
        };
    };

    public process() {
        this.context_process.fillStyle = 'black';
        this.context_process.fillRect(0, 0, this.pw, this.ph);
        // we can optimze this by moving to one image for all AR objects
        this.context_process.drawImage(this.video, 0, 0, this.vw, this.vh, this.ox, this.oy, this.w, this.h);

        var imageData = this.context_process.getImageData(0, 0, this.pw, this.ph);
        this.worker.postMessage({ type: 'process', imagedata: imageData }, [imageData.data.buffer]);
    }

    public update(): void {

        if (!this.world) {
            this.root.visible = false;
        } else {
            this.root.visible = true;
            // interpolate matrix
            for (var i = 0; i < 16; i++) {
                this.trackedMatrix.delta[i] = this.world[i] - this.trackedMatrix.interpolated[i];
                this.trackedMatrix.interpolated[i] = this.trackedMatrix.interpolated[i] + (this.trackedMatrix.delta[i] / this.interpolationFactor);
            }
            // console.log(this.root.matrix);
            this.root.matrixAutoUpdate = false;

            this.setMatrix(this.root.matrix, this.trackedMatrix.interpolated)
            // console.log(this.root.matrix);
        }

        this._entities.forEach(element => {
            element.update();
        });
    }

    public found(msg: any): void {
        if (!msg) {
            this.world = null;
        } else {
            this.world = JSON.parse(msg.matrixGL_RH);
            // if (!this.firstPositioning) {
                // this.firstPositioning = true;
                // this.model.position.y = (msg.height / msg.dpi * 2.54 * 10)/2.0;
                // this.model.position.x = (msg.width / msg.dpi * 2.54 * 10)/2.0;
            // }
            // console.log(msg);
            // console.log("NFT width: ", msg.width);
            // console.log("NFT height: ", msg.height);
            // console.log("NFT dpi: ", msg.dpi);
            // var o_view = scene.getObjectByName('Duck');
            // console.log(o_view);
        }
    }

    private setMatrix(matrix: any, value: any): void {
        var array: any = [];
        for (var key in value) {
            array[key] = value[key];
        }
        // matrix.set(array);
        if (typeof matrix.elements.set === 'function') {
            matrix.elements.set(array);
        } else {
            matrix.elements = [].slice.call(array);
        }

    };
}