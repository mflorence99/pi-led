import { Component } from '@angular/core';
import { LEDsService } from './leds.service';

@Component({
  selector: 'led-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {

  constructor(private leds: LEDsService) { }

  red(state: boolean) {
    this.leds.setLED('red', state ? 'on' : 'off');
  }

  yellow(state: boolean) {
    this.leds.setLED('yellow', state ? 'on' : 'off');
  }

  blue(state: boolean) {
    this.leds.setLED('blue', state ? 'on' : 'off');
  }

}
