import { EventDispatcher } from "three";
import { EntityComponent } from "./EntityComponent";

export class Entity {
    public dispatcher: EventDispatcher = new EventDispatcher();

    private _components: Map<EntityComponent, string> = new Map<EntityComponent, string>();

    public addComponent(component: EntityComponent): EntityComponent {
        component.owner = this;
        //https://stackoverflow.com/questions/13631557/typescript-objects-as-dictionary-types-as-in-c-sharp
        this._components.set(component, component.id);
        component.onAdd();

        return component;
    }

    public getComponent(component: any): EntityComponent {


        return null;
    }
}