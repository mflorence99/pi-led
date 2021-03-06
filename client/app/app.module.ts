import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './containers/app';
import { BrowserModule } from '@angular/platform-browser';
import { ChartComponent } from './components/chart';
import { ChartDataPipe } from './components/chart';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ErrorComponent } from './components/error';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { LEDService } from './services/led';
import { LightsComponent } from './components/lights';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PiModule } from 'pi-lib';
import { SettingsEffects } from './effects/settings';
import { SigmasComponent } from './components/sigmas';
import { SigmasDataPipe } from './components/sigmas';
import { SigmasEffects } from './effects/sigmas';
import { StoreModule } from '@ngrx/store';
import { SwitchesComponent } from './components/switches';
import { reducers } from './reducers';

const DECLARATIONS = [
  AppComponent,
  LightsComponent,
  ChartComponent,
  ChartDataPipe,
  ErrorComponent,
  SigmasComponent,
  SigmasDataPipe,
  SwitchesComponent
];

@NgModule({

  bootstrap: [AppComponent],

  declarations: [
    ...DECLARATIONS
  ],

  imports: [
    BrowserModule,
    CommonModule,
    EffectsModule.run(SettingsEffects),
    EffectsModule.run(SigmasEffects),
    FlexLayoutModule,
    HttpModule,
    Ng2GoogleChartsModule,
    PiModule,
    StoreModule.provideStore(reducers)
  ],

  exports: [
    ...DECLARATIONS,
    Ng2GoogleChartsModule,
    FlexLayoutModule,
    PiModule,
    StoreModule
  ],

  providers: [
    LEDService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
