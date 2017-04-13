import * as settingsReducer from '../reducers/settings';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-error',
  templateUrl: './error.html',
  styleUrls: ['./error.less']
})

export class ErrorComponent {
  @Input() settings: settingsReducer.State = settingsReducer.initialState;

}
