
export class TimeManager {
    // var tick = function () {
    //     draw();
    //     requestAnimationFrame(tick);
    // };

    // load();
    // tick();
    // var now = Date.now();
    // var dt = now - lasttime;
    // time += dt;
    // lasttime = now;
    public initialize(): void {

        this.updateFrame();
    }

    private updateFrame(): void {

        console.log("tock");
        //requestAnimationFrame(this.updateFrame);
    }

    public addTickedComponent(component: ITicked): void {

    }
}

export interface ITicked {
    update(): void;
}