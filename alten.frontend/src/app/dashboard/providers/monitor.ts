import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Signal } from "../models/signal";
const API_URL = environment.monitoringUrl;
@Injectable()
export class MonitorService {
    private socket;
    constructor(
        private http: Http
    ) {
    }

    public getVehcilesStatus(): Observable<Signal[]> {
        return this.http
            .get(API_URL + '/monitor/status')
            .map(response => {
                const signals = response.json();
                return signals.map((signal) => new Signal(signal));
            })
            .catch(this.handleError);
    }

    getSignals() {
        let observable = new Observable(observer => {
            this.socket = io(API_URL);
            this.socket.on('signal', (data) => {
                observer.next(new Signal(data));
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}