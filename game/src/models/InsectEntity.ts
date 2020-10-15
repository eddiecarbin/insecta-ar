import { Entity } from "../framework/Entity";
import * as THREE from "THREE"
import { ModelRendererComponent } from "./components/ModelRendererComponent";

export class InsectEntity extends Entity {

    public getModelRoot(): THREE.Object3D {
        let _modelComponent : ModelRendererComponent = this.getComponent(ModelRendererComponent) as ModelRendererComponent;
        return _modelComponent.root;
    }
}