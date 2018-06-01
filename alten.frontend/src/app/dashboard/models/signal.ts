export class Signal {
    _id: string;
    driverId: string;
    status: number;
    vehicleId: string;
    timestamp: Date;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}