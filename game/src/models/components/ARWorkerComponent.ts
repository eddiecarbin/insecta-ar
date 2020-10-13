import * as THREE from "THREE"
import { EntityComponent } from "../../framework/EntityComponent";
import { MarkerData } from "../AppData";

export class ARWorkerComponet extends EntityComponent {

    static NAME: string = "ARWorkerComponent";
    public worker: Worker;
    
    private vw: number;
    private vh: number;
    
    private w: number;
    private h: number;
    
    private pw: number;
    private ph: number;
    
    private ox: number;
    private oy: number;
    
    private interpolationFactor: number = 24;
    private world: any;
    
    private camera: THREE.Camera;
    private root: THREE.Object3D;
    private video: HTMLVideoElement;
    private context_process: any;
    
    private markerData: MarkerData;

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

    constructor() {
        super(ARWorkerComponet.NAME);

    }

    public initialize(marker: MarkerData, video: HTMLVideoElement): void {

        this.root = new THREE.Object3D();
        // scene.add(root);

        this.markerData = marker;

        this.video = video;

        // canvas_process.style.clientWidth = pw + "px";
        // canvas_process.style.clientHeight = ph + "px";
        // canvas_process.width = pw;
        // canvas_process.height = ph;

        console.log('../' + marker.url);
        // renderer.setSize(sw, sh);
        this.worker = new Worker('../resources/jsartoolkit5/artoolkit/artoolkit.wasm_worker.js');

        // this.worker = new Worker('./js/artoolkitNFT.worker.js');
        // this.worker.postMessage({ type: "load", pw: this.pw, ph: this.ph, camera_para: camera_para, marker: '../' + marker.url });

        this.worker.onmessage = (ev) => {
            var canvas_process = document.createElement('canvas');
            var context_process = canvas_process.getContext('2d');


            var msg = ev.data;


            switch (msg.type) {
                case "loaded": {
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
                    this.setMatrix(this.camera.projectionMatrix, proj);
                    break;
                }
                case "endLoading": {
                    if (msg.end == true) {
                        // removing loader page if present

                        this.owner.dispatcher.dispatchEvent(new Event("LOADCOMPLETE"));
                        // var loader = document.getElementById('loading');
                        // if (loader) {
                        //     loader.querySelector('.loading-text').innerText = 'Start the tracking!';
                        //     setTimeout(function () {
                        //         loader.parentElement.removeChild(loader);
                        //     }, 2000);
                        // }
                    }
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

    }

    public load() {

        var camera_para = '../resources/data/camera_para.dat';

        var canvas_process = document.createElement('canvas');
        this.context_process = canvas_process.getContext('2d');

        let input_width = this.video.videoWidth;
        let input_height = this.video.videoHeight;

        this.vw = input_width;
        this.vh = input_height;

        // canvas_process.style.clientWidth = this.pw + "px";
        // canvas_process.style.clientHeight = this.ph + "px";

        var pscale = 320 / Math.max(this.vw, this.vh / 3 * 4);
        var sscale = this.isMobile() ? window.outerWidth / input_width : 1;

        // sw = this.vw * sscale;
        // sh = this.vh * sscale;

        this.w = this.vw * pscale;
        this.h = this.vh * pscale;
        this.pw = Math.max(this.w, this.h / 3 * 4);
        this.ph = Math.max(this.h, this.w / 4 * 3);
        this.ox = (this.pw - this.w) / 2;
        this.oy = (this.ph - this.h) / 2;

        canvas_process.width = this.pw;
        canvas_process.height = this.ph;

        // renderer.setSize(vw, vh);

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
                    this.setMatrix(this.camera.projectionMatrix, proj);
                    break;
                }
                case "endLoading": {
                    if (msg.end == true)
                        // removing loader page if present
                        this.owner.dispatcher.dispatchEvent(new Event("LOADCOMPLETE"));

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

    private draw(): void {
        // var now = Date.now();
        // var dt = now - lasttime;
        // time += dt;
        // lasttime = now;

        if (!this.world) {
            this.root.visible = false;
        } else {
            this.root.visible = true;
            // interpolate matrix
            for (var i = 0; i < 16; i++) {
                this.trackedMatrix.delta[i] = this.world[i] - this.trackedMatrix.interpolated[i];
                this.trackedMatrix.interpolated[i] = this.trackedMatrix.interpolated[i] + (this.trackedMatrix.delta[i] / this.interpolationFactor);
            }
            this.setMatrix(this.root.matrix, this.trackedMatrix.interpolated)
        }
        // renderer.render(scene, camera);
    };

    public process() {
        this.context_process.fillStyle = 'black';
        this.context_process.fillRect(0, 0, this.pw, this.ph);
        this.context_process.drawImage(this.video, 0, 0, this.vw, this.vh, this.ox, this.oy, this.w, this.h);

        var imageData = this.context_process.getImageData(0, 0, this.pw, this.ph);
        this.worker.postMessage({ type: 'process', imagedata: imageData }, [imageData.data.buffer]);
    }

    public found(msg: any): void {

        if (!msg) {
            this.world = null;
        } else {
            this.world = JSON.parse(msg.matrixGL_RH);
        }
    }

    private setMatrix(matrix: any, value: any): void {
        var array: any = [];
        for (var key in value) {
            array[key] = value[key];
        }
        if (typeof matrix.elements.set === 'function') {
            matrix.elements.set(array);
        } else {
            matrix.elements = [].slice.call(array);
        }
    };

    private isMobile(): boolean {
        return /Android|mobile|iPad|iPhone/i.test(navigator.userAgent);
    }
}