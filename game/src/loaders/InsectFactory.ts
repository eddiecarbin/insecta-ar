import { ModelRendererComponent } from "../models/components/ModelRendererComponent";
import { Entity } from "../framework/Entity";
import { InsectEntity } from "../models/InsectEntity";
import { InsectData } from "../models/AppData";
// import { GLTFLoader } from "GLTFLoader";

// import * as testModule from "./testModule.js";
// import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { InsectControllerComponent } from "../models/components/InsectController";

export class InsectFactory {


    static testCreate(): Promise<Entity> {
        return null;
    }

    static createInsectEntity(data: InsectData, video: HTMLVideoElement, scene: THREE.Scene): Promise<Entity> {

        return new Promise<Entity>((resolve, reject) => {

            // const gltfLoader: GLTFLoader = new GLTFLoader();
            // const url = data.modelURL;
            // gltfLoader.load(url, (gltf) => {
            //     const root = gltf.scene;
            //     //scene.add(root);
            // });
            let insectEntity: InsectEntity = new InsectEntity();
            insectEntity.addComponent(new ModelRendererComponent(null));
            insectEntity.addComponent(new InsectControllerComponent(data));

            insectEntity.initialize();
            resolve(insectEntity);
        });

    }
}