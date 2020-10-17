// import * as THREE from "THREE"
import { EntityComponent } from "../../framework/Entity/EntityComponent";
import * as  BABYLON from "babylonjs";

export class ModelRendererComponent extends EntityComponent {

    static NAME: string = "ModelRendererComponent";

    public model: BABYLON.AbstractMesh;

    public root: BABYLON.TransformNode;

    // private testCube: THREE.Mesh;

    constructor(model: BABYLON.AbstractMesh) {
        super(ModelRendererComponent.NAME);

        this.root = new BABYLON.TransformNode("insect-root");
        // this.root.matrixAutoUpdate = false;

        this.model = model;
        // this.model.matrixAutoUpdate = false;
        // this.model.position.set(100, 115, 0);
        // this.model.updateMatrix();

        // var geometry = new THREE.BoxGeometry(80, 80, 80);
        // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // this.testCube = new THREE.Mesh(geometry, material);
        // this.testCube.position.set(100, 100, 0);
        // this.model = this.testCube;
        this.model.parent = this.root;
        // this.root.add(this.model);
        // model.add(this.testCube);
    }
}

export interface IModelRendererComponent {

}