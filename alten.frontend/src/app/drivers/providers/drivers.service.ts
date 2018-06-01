import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { Driver } from '../models/driver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
const API_URL = environment.driverAPIUrl;

@Injectable()
export class DriverService {

    constructor(
        private http: Http
    ) {
    }


    public getDrivers(): Observable<Driver[]> {
        return this.http
            .get(API_URL + '/drivers')
            .map(response => {
                const drivers = response.json();
                return drivers.map((driver) => new Driver(driver));
            })
            .catch(this.handleError);
    }

    public getDriversCount(): Observable<Number> {
        return this.http
            .get(API_URL + '/drivers/count')
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