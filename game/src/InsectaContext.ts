import { AppJson } from "./models/AppData";
import appdata from "./appdata.json";
import { WebCameraViewRenderer } from "./views/WebCamereViewRenderer";
import { Scene3DRendererThree } from "./views/Scene3DRendererThree";
import { ARGameManager } from "./models/ARGameManager";
import { TimeManager, wait } from "./framework/TimeManager";
import { ARWorkerGroup } from "./models/ARWorkerGroup";


//D:\3lbs\projects\Insecta\playpen\kalwalt-interactivity-AR

export class InsectaContext {

    public appData: AppJson = appdata as AppJson;

    public eventDispatcher: EventTarget = new EventTarget();

    public cameraView: WebCameraViewRenderer;

    public sceneRenderer: Scene3DRendererThree;

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
        this.sceneRenderer = new Scene3DRendererThree();
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
