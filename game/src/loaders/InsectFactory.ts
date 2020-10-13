import { ARWorkerComponet } from "../models/components/ARWorkerComponent";
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


    public createInsectEntity(data: InsectData, video: HTMLVideoElement): Promise<Entity> {

        let promise: Promise<Entity> = new Promise<Entity>((resolve, reject) => {

            // const gltfLoader: GLTFLoader = new GLTFLoader();
            // const url = data.modelURL;
            // gltfLoader.load(url, (gltf) => {
            //     const root = gltf.scene;
            //     //scene.add(root);
            // });
            let insectEntity: InsectEntity = new InsectEntity();
            let arComponent: ARWorkerComponet = insectEntity.addComponent(new ARWorkerComponet()) as ARWorkerComponet;
            insectEntity.addComponent(new ModelRendererComponent(null));
            insectEntity.addComponent(new InsectControllerComponent(data));

            arComponent.initialize(data.markerData, video);
            resolve(insectEntity);
        });

        return promise;
    }
}