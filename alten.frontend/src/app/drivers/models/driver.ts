
import { Vehicle } from "../../vehicles/models/vehicle";

export class Driver {
    _id:string;
    name: string;
    address: string;
    city: string;
    vehicles: Array<Vehicle>



    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}