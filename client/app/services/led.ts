import * as Rx from 'rxjs/Rx';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Setting } from '../models/setting';
import { environment } from '../../environments/environment';

export type LED = 'red' | 'yellow' | 'blue';

@Injectable()
export class LEDService {

  constructor(private http: Http) { }

  getAll(): Rx.Observable<Setting[]> {
    const uri = `${environment.cors}/api/leds`;
    return this.http.get(uri)
      .map(response => response.json());
  }

  getOne(led: LED): Rx.Observable<boolean> {
    const uri = `${environment.cors}/api/led/${led}`;
    return this.http.get(uri)
      .map(response => response.json())
      .map((response: {state}) => response.state);
  }

  setAll(settings: Setting[]) {
    const uri = `${environment.cors}/api/leds`;
    this.http.put(uri, settings).subscribe();
  }

  setOne(led: LED, state: boolean) {
    console.log(state);
    const uri = `${environment.cors}/api/led/${led}/${state}`;
    this.http.put(uri, null).subscribe();
  }

}
