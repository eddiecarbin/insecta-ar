import { AppJson } from "./models/AppData";
import appdata from "./appdata.json";
import { EventDispatcher, Scene } from "three";
import { WebCameraViewRenderer } from "./views/WebCamereViewRenderer";
import { Scene3DRenderer } from "./views/Scene3DRenderer";
import { ARGameManager } from "./models/ARGameManager";
import { TimeManager, wait } from "./framework/TimeManager";
import { ARWorkerGroup } from "./models/ARWorkerGroup";


//D:\3lbs\projects\Insecta\playpen\kalwalt-interactivity-AR

export class InsectaContext {

    public appData: AppJson = appdata as AppJson;

    public eventDispatcher: EventDispatcher = new EventDispatcher();

    public cameraView: WebCameraViewRenderer;

    public sceneRenderer: Scene3DRenderer;

    public gameManager: ARGameManager;

    public timeManager: TimeManager;

    public arWorkerGroup: ARWorkerGroup;

    public async initialize(): Promise<boolean> {
        console.log("init insecta");
        // models
        // this.gameManager = new ARGameManager();

        // views
        this.cameraView = new WebCameraViewRenderer();
        await  this.cameraView.initialize();
        this.sceneRenderer = new Scene3DRenderer();
        await this.sceneRenderer.initialize();

        await wait(2000);
        
        this.arWorkerGroup = new ARWorkerGroup(this);
        await this.arWorkerGroup.initialize(appdata.insects);
        
        this.timeManager = new TimeManager();
        this.timeManager.addTickedComponent(this.sceneRenderer);
        this.timeManager.addTickedComponent(this.arWorkerGroup);

        await wait(100);
        this.startGame();


        return Promise.resolve(true);
    }

    public startGame(): void {
        console.log("start insecta");

        this.timeManager.initialize();
    }

}
