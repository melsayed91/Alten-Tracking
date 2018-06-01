import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
const API_URL = environment.vehicleAPIUrl;

@Injectable()
export class VehicleService {

    constructor(
        private http: Http
    ) {
    }


    public getVehilces(): Observable<Vehicle[]> {
        return this.http
            .get(API_URL + '/vehicles')
            .map(response => {
                const vehicles = response.json();
                return vehicles.map((vehicle) => new Vehicle(vehicle));
            })
            .catch(this.handleError);
    }

    public getVehilcesCount(): Observable<Number> {
        return this.http
            .get(API_URL + '/vehicles/count')
            .map(response => {
                const count = response.json();
                return count;
            })
            .catch(this.handleError);
    }

    public getConnectedVehilcesCount(): Observable<Number> {
        return this.http
            .get(API_URL + '/vehicles/count/connected')
            .map(response => {
                const count = response.json();
                return count;
            })
            .catch(this.handleError);
    }

    public getDisconnectedVehilcesCount(): Observable<Number> {
        return this.http
            .get(API_URL + '/vehicles/count/disconnected')
            .map(response => {
                const count = response.json();
                return count;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}