import { EntityComponent } from "../../framework/EntityComponent";
import { InsectData } from "../AppData";

export class InsectControllerComponent extends EntityComponent{
    
    static NAME : string = "InsectControllerComponent";

    public data : InsectData;

    constructor( data : InsectData){
        super(InsectControllerComponent.NAME);
        this.data = data;
    }
}