import * as settingsReducer from '../reducers/settings';
import * as sigmasReducer from '../reducers/sigmas';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { Env } from '../services/env';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { config } from '../config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-root',
  templateUrl: './app.html',
  styleUrls: ['./app.less']
})

export class AppComponent {
  settings: Observable<settingsReducer.State>;
  sigmas: Observable<sigmasReducer.State>;

  constructor(private env: Env,
              private store: Store<AppState>) {
    console.log(config);
    console.log(this.env);
    this.settings = this.store.select(state => state.settings);
    this.sigmas = this.store.select(state => state.sigmas);
  }

}
