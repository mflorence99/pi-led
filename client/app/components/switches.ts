import { Component, Input } from '@angular/core';

import { LEDService } from '../services/led';
import { Setting } from '../models/setting';

@Component({
  selector: 'led-switches',
  templateUrl: './switches.html',
  styleUrls: ['./switches.less']
})

export class SwitchesComponent {
  @Input() settings: Setting[] = [];

  constructor(public ledService: LEDService) { }

}
