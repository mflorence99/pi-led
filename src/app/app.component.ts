import { AfterViewInit, Component } from '@angular/core';

import { AppState } from './app-state';
import { LEDService } from './led.service';

@Component({
  selector: 'led-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements AfterViewInit {
  appState = new AppState();

  constructor(public ledService: LEDService) { }

  ngAfterViewInit() {
    this.ledService.getAll()
      .subscribe((appState: AppState) => {
        this.appState = appState;
      });
  }

}
