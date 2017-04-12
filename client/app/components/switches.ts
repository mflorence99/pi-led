import * as settingsActions from '../actions/settings';
import * as settingsReducer from '../reducers/settings';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppState } from '../reducers';
import { Setting } from '../models/setting';
import { Store } from '@ngrx/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-switches',
  templateUrl: './switches.html',
  styleUrls: ['./switches.less']
})

export class SwitchesComponent {
  @Input() settings: settingsReducer.State = settingsReducer.initialState;

  constructor(private store: Store<AppState>) { }

  set(setting: Setting) {
    this.store.dispatch(new settingsActions.SetAction(setting));
  }

}
