import { Entity } from "../framework/entity/Entity";
import { ModelRendererComponent } from "./components/ModelRendererComponent";
import * as THREE from "THREE"

export class InsectEntity extends Entity {

    public getModelRoot(): THREE.Object3D {
        let _modelComponent: ModelRendererComponent = this.getComponent(ModelRendererComponent) as ModelRendererComponent;
        return _modelComponent.root;
    }

    public getModel(): THREE.Object3D {
        let _modelComponent: ModelRendererComponent = this.getComponent(ModelRendererComponent) as ModelRendererComponent;
        return _modelComponent.model;
    }
}