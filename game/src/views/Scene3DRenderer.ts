import * as THREE from "THREE"
export class Scene3DRenderer {

    public renderer: THREE.WebGLRenderer;

    public root: THREE.Object3D;

    public scene: THREE.Scene;

    public camera: THREE.Camera;

    public canvas: HTMLCanvasElement;

    public initialize(): void {

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new THREE.Scene();

        this.camera = new THREE.Camera();
        this.camera.matrixAutoUpdate = false;

        this.scene.add(this.camera);

        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 8, 8),
            new THREE.MeshNormalMaterial()
        );

        this.root = new THREE.Object3D();
        this.scene.add(this.root);

        sphere.material.flatShading;
        sphere.position.z = 0;
        sphere.position.x = 100;
        sphere.position.y = 100;
        sphere.scale.set(200, 200, 200);

        this.root.matrixAutoUpdate = false;
        this.root.add(sphere);

        this.renderUpdate();
    }

    public renderUpdate(): void {
        // var now = Date.now();
        // var dt = now - lasttime;
        // time += dt;
        // lasttime = now;

        this.renderer.render(this.scene, this.camera);

    }
}