import * as THREE from "THREE"
import { EntityComponent } from "../../framework/EntityComponent";

export class ModelRendererComponent extends EntityComponent {

    static NAME: string = "ModelRendererComponent";

    public model: THREE.Group;

    public root : THREE.Object3D;

    private testCube : THREE.Mesh;

    constructor(model: THREE.Group) {
        super(ModelRendererComponent.NAME);

        this.root = new THREE.Object3D();
        this.model = model;


        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.testCube = new THREE.Mesh(geometry, material);



        this.root.add(this.testCube);
        // model.add(this.testCube);
    }
}