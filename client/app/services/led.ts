import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import { Env } from './env';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';
import { Sigma } from '../models/sigma';

@Injectable()
export class LEDService {

  constructor(private env: Env,
              private http: Http) { }

  getSettings(): Observable<Setting[]> {
    const uri = `${this.env['PI_LED_HOST']}/api/leds`;
    return this.http.get(uri)
      .map(response => response.json());
  }

  getSetting(color: string): Observable<boolean> {
    const uri = `${this.env['PI_LED_HOST']}/api/led/${color}`;
    return this.http.get(uri)
      .map(response => response.json())
      .map((response: {state}) => response.state);
  }

  setSettings(settings: Setting[]): Observable<Setting[]> {
    const uri = `${this.env['PI_LED_HOST']}/api/leds`;
    return this.http.put(uri, settings)
      .map(response => response.json());
  }

  setSetting(color: string,
             state: boolean): Observable<Setting[]> {
    const uri = `${this.env['PI_LED_HOST']}/api/led/${color}/${state}`;
    return this.http.put(uri, null)
      .map(response => response.json());
  }

  getSigmas(): Observable<Sigma[]> {
    const ws = new $WebSocket(`${this.env['PI_LED_WS']}/ws/sigmas`);
    return ws.getDataStream()
      .map(response => JSON.parse(response.data));
  }

}
