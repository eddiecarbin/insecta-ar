// import * as THREE from "THREE"
import { EntityComponent } from "../../framework/Entity/EntityComponent";
import * as THREE from "THREE"

export class ModelRendererComponent extends EntityComponent {

    static NAME: string = "ModelRendererComponent";

    public model: THREE.Object3D;

    public root: THREE.Object3D;

    // private testCube: THREE.Mesh;

    constructor(model: THREE.Group ){
        super(ModelRendererComponent.NAME);

        this.root = new THREE.Object3D();
        this.root.matrixAutoUpdate = false;

        this.model = model;
        this.model.matrixAutoUpdate = false;
        this.model.position.set(100, 115, 0);
        this.model.updateMatrix();

        // var geometry = new THREE.BoxGeometry(80, 80, 80);
        // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // this.testCube = new THREE.Mesh(geometry, material);
        // this.testCube.position.set(100, 100, 0);
        // this.model = this.testCube;


        this.root.add(this.model);
        // model.add(this.testCube);
    }
}

export interface IModelRendererComponent {

}