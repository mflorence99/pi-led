import * as settingsReducer from '../reducers/settings';
import * as sigmasReducer from '../reducers/sigmas';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppState } from '../reducers';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-root',
  templateUrl: './app.html',
  styleUrls: ['./app.less']
})

export class AppComponent {
  settings: Observable<settingsReducer.State>;
  sigmas: Observable<sigmasReducer.State>;

  constructor(private store: Store<AppState>) {
    this.settings = this.store.select(state => state.settings);
    this.sigmas = this.store.select(state => state.sigmas);
  }

}
