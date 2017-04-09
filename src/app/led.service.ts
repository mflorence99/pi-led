import * as Rx from 'rxjs/Rx';

import { AppState } from './app-state';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export type LED = 'red' | 'yellow' | 'blue';

@Injectable()
export class LEDService {

  constructor(private http: Http) { }

  getAll(): Rx.Observable<AppState> {
    const uri = `${environment.cors}/api/leds`;
    return this.http.get(uri)
      .map(response => response.json())
      .map((settings: any[]) => {
        const appState = new AppState();
        settings.forEach((setting: any[]) => {
          appState.leds.push(setting[0]);
          appState[setting[0]] = setting[1];
        });
        return appState;
      });
  }

  getOne(led: LED): Rx.Observable<boolean> {
    const uri = `${environment.cors}/api/led/${led}`;
    return this.http.get(uri)
      .map(response => response.json())
      .map((response: {state}) => response.state);
  }

  setAll(appState: AppState) {
    const uri = `${environment.cors}/api/leds`;
    const settings = [];
    appState.leds.forEach(led => {
      const setting = [led, appState[led]];
      settings.push(setting);
    });
    this.http.put(uri, settings).subscribe();
  }

  setOne(led: LED, state: boolean) {
    console.log(state);
    const uri = `${environment.cors}/api/led/${led}/${state}`;
    this.http.put(uri, null).subscribe();
  }

}
