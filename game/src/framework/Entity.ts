import { EventDispatcher, KeyframeTrack } from "three";
import { EntityComponent } from "./EntityComponent";
import { ITicked } from "./TimeManager";

export class Entity implements ITicked {
    public dispatcher: EventDispatcher = new EventDispatcher();

    private _components: Map<EntityComponent, string> = new Map<EntityComponent, string>();

    private _enabled: boolean;

    public addComponent(component: EntityComponent): EntityComponent {

        component.owner = this;
        //https://stackoverflow.com/questions/13631557/typescript-objects-as-dictionary-types-as-in-c-sharp
        this._components.set(component, component.id);
        this._enabled = false;
        return component;
    }

    public getComponent(request: any): EntityComponent {
        
        for ( let [component, value] of this._components){

            if (typeof request === 'string') {
                if (request == value) {
                    return component;
                }
            } else if (component instanceof request) {
                return component;
            }   
        }

        return null;
    }

    public initialize(): void {
        this._components.forEach((value: string, key: EntityComponent) => {
            console.log(key, value);
            key.onAdd();
        });


        this._enabled = true;
    }

    public update(): void {

        if (!this._enabled)
            return;

        //const check = (p: any): p is ITicked => p.hasOwnProperty('update');
        this._components.forEach((value: string, key: EntityComponent) => {
            key.update(0.16);
        });
    }

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {

        this._enabled = value;
    }
}