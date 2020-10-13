import { Group } from "three";
import { EntityComponent } from "../../framework/EntityComponent";

export class ModelRendererComponent extends EntityComponent {

    static NAME : string = "ModelRendererComponent";
    
    public model : Group;

    constructor( model : Group){
        super(ModelRendererComponent.NAME);

        this.model = model;
    }
}