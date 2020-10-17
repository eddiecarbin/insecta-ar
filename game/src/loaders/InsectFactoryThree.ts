import { Entity } from "../framework/entity/Entity";
import { InsectEntity } from "../models/InsectEntity";
import { InsectData } from "../models/AppData";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { InsectControllerComponent } from "../models/components/InsectController";
import { ModelRendererComponent } from "../models/components/ModelRendererComponent";
import * as THREE from "THREE"

export class InsectFactoryThree {

    static createInsectEntity(data: InsectData, video: HTMLVideoElement, scene: THREE.Scene): Promise<Entity> {

        return new Promise<Entity>((resolve, reject) => {

            const gltfLoader: GLTFLoader = new GLTFLoader();
            const url =  data.modelURL;
            gltfLoader.load(url, (gltf) => {
                const model = gltf.scene;
                model.name = "Duck";
                model.scale.set(100, 100, 100);
                model.rotation.x = Math.PI / 2;
                model.updateMatrix();
                model.matrixAutoUpdate = false;
                //scene.add(root);
                let insectEntity: InsectEntity = new InsectEntity();
                insectEntity.addComponent(new ModelRendererComponent(model));
                insectEntity.addComponent(new InsectControllerComponent(data));

                insectEntity.initialize();
                resolve(insectEntity);
            });
        });

    }
}