import * as settingsReducer from '../reducers/settings';
import * as sigmasReducer from '../reducers/sigmas';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { EnvService } from 'pi-lib';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { config } from '../config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-root',
  templateUrl: 'app.html',
  styleUrls: ['app.less']
})

export class AppComponent {
  settings: Observable<settingsReducer.State>;
  sigmas: Observable<sigmasReducer.State>;

  constructor(env: EnvService,
              store: Store<AppState>) {
    console.log(config);
    console.log(env);
    this.settings = store.select(state => state.settings);
    this.sigmas = store.select(state => state.sigmas);
  }

}
