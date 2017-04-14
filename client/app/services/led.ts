import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';
import { Sigma } from '../models/sigma';
import { environment } from '../../environments/environment';

@Injectable()
export class LEDService {

  constructor(private http: Http) { }

  getSettings(): Observable<Setting[]> {
    const uri = `${environment.cors}/api/leds`;
    return this.http.get(uri)
      .map(response => response.json());
  }

  getSetting(color: string): Observable<boolean> {
    const uri = `${environment.cors}/api/led/${color}`;
    return this.http.get(uri)
      .map(response => response.json())
      .map((response: {state}) => response.state);
  }

  setSettings(settings: Setting[]): Observable<Setting[]> {
    const uri = `${environment.cors}/api/leds`;
    return this.http.put(uri, settings)
      .map(response => response.json());
  }

  setSetting(color: string,
             state: boolean): Observable<Setting[]> {
    const uri = `${environment.cors}/api/led/${color}/${state}`;
    return this.http.put(uri, null)
      .map(response => response.json());
  }

  getSigmas(): Observable<Sigma[]> {
    const ws = new $WebSocket(`${environment.ws}/ws/sigmas`);
    return ws.getDataStream()
      .map(response => JSON.parse(response.data));
  }

}
