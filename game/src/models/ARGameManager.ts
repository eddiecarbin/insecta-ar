import { InsectFactory } from "../loaders/InsectFactory";
import { Model } from "../framework/Model";
import { AppData, InsectData } from "./AppData";

export class ARGameManager extends Model {


    public createInsects(insects: InsectData[]): void {

        let factory: InsectFactory = new InsectFactory();

        for (let i = 0; i < insects.length; i++) {
            let data = insects[i];
            factory.createInsectEntity(data, null);
        }
    }
}