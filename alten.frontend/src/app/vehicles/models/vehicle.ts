export class Vehicle {
    _id:string;
    vin: string;
    regNo: string;
   


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}