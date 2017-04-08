import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { LED } from './led.type';
import { LEDState } from './ledstate.type';

@Injectable()
export class LEDsService {

  constructor(private http: Http) { }

  setLED(led: LED, state: LEDState) {
    const uri = `/api/led/${led}/${state}`;
    this.http.put(uri, null).subscribe();
  }

}
