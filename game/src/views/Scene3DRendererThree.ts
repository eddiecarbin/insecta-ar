import { ITicked } from "../framework/TimeManager";
import * as THREE from "THREE"
import { GameParam } from "../models/AppData";
export class Scene3DRendererThree implements ITicked {

    public renderer: THREE.WebGLRenderer;

    // public root: THREE.Object3D;

    public scene: THREE.Scene;

    public camera: THREE.Camera;

    public canvas_draw: HTMLCanvasElement;

    private sphere: THREE.Mesh;

    private cube: THREE.Mesh;

    public initialize(): Promise<boolean> {

        return new Promise<boolean>(async (resolve, reject) => {

            this.canvas_draw = document.getElementById("canvas") as HTMLCanvasElement;
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas_draw,
                // precision: 'mediump',
                alpha: true,
                antialias: true
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.scene = new THREE.Scene();

            this.camera = new THREE.Camera();
            this.camera.matrixAutoUpdate = false;


            var light = new THREE.AmbientLight(0xffffff);
            // this.scene.add(light);

            var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            
            
            hemiLight.position.set( 0, 20, 0 );
            this.scene.add( hemiLight );
            // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            // this.camera = new THREE.PerspectiveCamera( 75, GameParam.screenWidth / GameParam.screenHeight, 0.1, 1000 );
            this.scene.add(this.camera);

            this.sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1.5, 8, 8),
                new THREE.MeshNormalMaterial()
            );
            // this.root = new THREE.Object3D();
            // this.scene.add(this.root);

            // this.sphere.material.flatShading;
            // this.sphere.position.z = 0;
            // this.sphere.position.x = 0;
            // this.sphere.position.y = 0;
            // this.sphere.scale.set(200, 200, 200);

            this.renderer.setSize(GameParam.screenWidth, GameParam.screenHeight);

            // var geometry = new THREE.BoxGeometry();
            // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            // this.cube = new THREE.Mesh(geometry, material);
            // this.scene.add(this.cube);

            // this.camera.position.z = 5;
            // this.camera.lookAt(sphere.position)

            // this.root.matrixAutoUpdate = false;
            // this.root.add(this.sphere);

            resolve(true);
        });
    }

    public update(): void {

        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        // var now = Date.now();
        // var dt = now - lasttime;
        // time += dt;
        // lasttime = now;
        // this.camera.lookAt(this.sphere.position)
        this.renderer.render(this.scene, this.camera);

    }
}