import { Entity } from "app/framework/entity/Entity";
import { InsectData } from "app/models/AppData";
import { ModelRendererComponent } from "app/models/components/ModelRendererComponent";
import { InsectControllerComponent } from "app/models/components/InsectController";
import { InsectEntity } from "app/models/InsectEntity";
import * as  BABYLON from "babylonjs";
import { AbstractMesh } from "babylonjs";

export class InsectFactoryThree {



    static createInsectEntity(data: InsectData, video: HTMLVideoElement, scene: BABYLON.Scene, engine: BABYLON.Engine): Promise<Entity> {

        return new Promise<Entity>((resolve, reject) => {


            // const gltfLoader: GLTFLoader = new GLTFLoader();
            BABYLON.SceneLoader.ImportMesh("", "game/assets/", data.file, scene, (newMeshes, particleSystems, skeleton) => {

                // Attach camera to canvas inputs
                // newScene.activeCamera.attachControl(canvas);
                // const model = gltf.scene;
                // model.name = "Duck";
                // model.scale.set(100, 100, 100);
                // model.rotation.x = Math.PI / 2;
                // model.updateMatrix();
                // model.matrixAutoUpdate = false;
                //scene.add(root);

                // Import animation
                //https://www.babylonjs-playground.com/#UGD0Q0#62
                let mesh: any = newMeshes[0];
                // newMeshes.addAllToScene();
                let insectEntity: InsectEntity = new InsectEntity();
                insectEntity.addComponent(new ModelRendererComponent(mesh));
                insectEntity.addComponent(new InsectControllerComponent(data));

                insectEntity.initialize();
                resolve(insectEntity);


            });

            /*const url = data.modelURL;
            BABYLON.SceneLoader.Load("", url, engine, (newScene) => {
                // Wait for textures and shaders to be ready
                newScene.executeWhenReady(() => {
                    // Attach camera to canvas inputs
                    // newScene.activeCamera.attachControl(canvas);
                    // const model = gltf.scene;
                    // model.name = "Duck";
                    // model.scale.set(100, 100, 100);
                    // model.rotation.x = Math.PI / 2;
                    // model.updateMatrix();
                    // model.matrixAutoUpdate = false;
                    //scene.add(root);
                    let insectEntity: InsectEntity = new InsectEntity();
                    insectEntity.addComponent(new ModelRendererComponent(null));
                    insectEntity.addComponent(new InsectControllerComponent(data));

                    insectEntity.initialize();
                    resolve(insectEntity);
                    // Once the scene is loaded, just register a render loop to render it
                });
            }, (progress) => {
                // To do: give progress feedback to user
            });*/

            // gltfLoader.load(url, (gltf) => {

            // });
        });

    };
}
