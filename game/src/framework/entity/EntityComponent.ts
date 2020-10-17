import { Entity } from "./Entity";

export class EntityComponent {

    public id: string;

    public owner: Entity;

    constructor(id: string) {
        this.id = id;
    }

    public onAdd(): void {

    }

    public update(dt: number): void {

    }
}