import {Injectable} from '@angular/core';

declare var ENV: any;

@Injectable()
export class Env {

  constructor() {
    Object.keys(ENV).forEach(k => this[k] = ENV[k]);
  }

}
