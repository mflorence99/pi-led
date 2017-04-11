import * as Rx from 'rxjs/Rx';

import { Component } from '@angular/core';
import { LEDService } from '../services/led';
import { Setting } from '../models/setting';

@Component({
  selector: 'led-root',
  templateUrl: './app.html',
  styleUrls: ['./app.less']
})

export class AppComponent {
  settings: Rx.Observable<Setting[]>;

  constructor(private ledService: LEDService) {
    this.settings = this.ledService.getAll();
  }

}
