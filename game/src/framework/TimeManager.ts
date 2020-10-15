
export class TimeManager {
    // var tick = function () {
    //     draw();
    //     requestAnimationFrame(tick);
    // };
    private _components: ITicked[] = [];
    // load();
    // tick();
    // var now = Date.now();
    // var dt = now - lasttime;
    // time += dt;
    // lasttime = now;
    public initialize(): void {

        // this.updateFrame();

        var tick = () => {
            this.updateFrame();
            requestAnimationFrame(tick);
        };
        //	setTimeout(tick, 50);
        tick();
    }

    private updateFrame(): void {
        this._components.forEach(element => {
            element.update();
        });
    }

    public addTickedComponent(component: ITicked): void {
        this._components.push(component);
    }
}

export function wait(t: number): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, t);
    })
}
export interface ITicked {
    update(): void;
}