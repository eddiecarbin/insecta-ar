import { ITicked } from "../framework/TimeManager";
import { InsectaContext } from "../InsectaContext";
import { AppJson, InsectData } from "./AppData";
import { ARWorkerController } from "./ARWorkerController";

export class ARWorkerGroup implements ITicked {


    private _controllers: Map<string, ARWorkerController> = new Map<string, ARWorkerController>();

    private _context: InsectaContext;

    private _data: InsectData[];

    constructor(context: InsectaContext) {
        this._context = context;

    }

    public initialize(data: InsectData[]): Promise<boolean> {
        this._data = data;

        return new Promise<boolean>(async (resolve, reject) => {


            //https://www.taniarascia.com/promise-all-with-async-await/
            Promise.all(
                this._data.map(async (insect) => {

                    let controller: ARWorkerController = new ARWorkerController(this._context.sceneRenderer.camera);

                    await controller.initialize(insect, this._context.cameraView.video, this._context.sceneRenderer.scene);

                    this._controllers.set(insect.id, controller);
                })
            )

            // data.forEach(element => {
            //     let controller: ARWorkerController = new ARWorkerController(this._context.sceneRenderer.camera);

            //     controller.initialize(element, this._context.cameraView.video, this._context.sceneRenderer.scene);

            //     this._controllers.set(element.id, controller);
            // });
            console.log("data: " + this._data);
            resolve(true);

        });

    }

    public update(): void {
        this._controllers.forEach(element => {
            element.update();
        });
    }
}