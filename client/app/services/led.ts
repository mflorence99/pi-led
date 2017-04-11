import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';
import { environment } from '../../environments/environment';

@Injectable()
export class LEDService {

  constructor(private http: Http) { }

  getAll(): Observable<Setting[]> {
    const uri = `${environment.cors}/api/leds`;
    return this.http.get(uri)
      .map(response => response.json());
  }

  getOne(color: string): Observable<boolean> {
    const uri = `${environment.cors}/api/led/${color}`;
    return this.http.get(uri)
      .map(response => response.json())
      .map((response: {state}) => response.state);
  }

  setAll(settings: Setting[]): Observable<Setting[]> {
    const uri = `${environment.cors}/api/leds`;
    return this.http.put(uri, settings)
      .map(response => response.json());
  }

  setOne(color: string,
         state: boolean): Observable<Setting[]> {
    const uri = `${environment.cors}/api/led/${color}/${state}`;
    return this.http.put(uri, null)
      .map(response => response.json());
  }

}
