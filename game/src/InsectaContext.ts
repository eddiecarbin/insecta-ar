import { AppData } from "./models/AppData";
import appdata from "./appdata.json";
import { EventDispatcher, Scene } from "three";
import { CameraViewRenderer } from "./views/CamereViewRenderer";
import { Scene3DRenderer } from "./views/Scene3DRenderer";
import { ARGameManager } from "./models/ARGameManager";
import { TimeManager } from "./framework/TimeManager";

export class InsectaContext{

    public appData : AppData = appdata as AppData;

    public eventDispatcher : EventDispatcher = new EventDispatcher();

    public cameraView : CameraViewRenderer;

    public sceneRenderer : Scene3DRenderer;

    public gameManager : ARGameManager;

    public timeManager : TimeManager;

    public initialize ():void{
        console.log("started insecta");
        // models
        this.gameManager = new ARGameManager();

        // views
        this.cameraView = new CameraViewRenderer();
        this.cameraView.initialize();
        this.sceneRenderer = new Scene3DRenderer();
        this.sceneRenderer.initialize();

        this.timeManager  = new TimeManager();
        
        this.timeManager.initialize();
    }

    // var tick = function () {
    //     draw();
    //     requestAnimationFrame(tick);
    // };

    // load();
    // tick();
}
