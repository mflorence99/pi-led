import * as settingsReducer from '../reducers/settings';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'led-lights',
  templateUrl: 'lights.html',
  styleUrls: ['lights.less']
})

export class LightsComponent {
  @Input() settings: settingsReducer.State = settingsReducer.initialState;

}
