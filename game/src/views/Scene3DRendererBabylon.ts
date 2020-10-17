
import { ITicked } from "../framework/TimeManager";

import * as  BABYLON from "babylonjs";

export class Scene3DRendererBabylon implements ITicked {

    public canvas_draw: HTMLCanvasElement;
    
    public engine : BABYLON.Engine;
    public scene: BABYLON.Scene;
    public camera : BABYLON.Camera;
    public light : BABYLON.HemisphericLight;

    public initialize(): Promise<boolean> {
        
        return new Promise<boolean>(async (resolve, reject) => {

            this.canvas_draw = document.getElementById("canvas") as HTMLCanvasElement;

            this.engine = new BABYLON.Engine(this.canvas_draw, true, {
                preserveDrawingBuffer: true, 
                stencil: true});

            this.scene = new BABYLON.Scene(this.engine);
            this.scene.useRightHandedSystem = true;

            this.camera = new BABYLON.Camera('camera1', new BABYLON.Vector3(0, 0, 0), this.scene);
            this.camera.attachControl(this.canvas_draw, true);

            // create a basic light, aiming 0,1,0 - meaning, to the sky
            
            this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
            resolve(true);

        });
    }
    public update(): void {
        this.scene.render();
    }
}