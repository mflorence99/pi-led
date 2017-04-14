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
import { MaterialModule } from '@angular/material';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgModule } from '@angular/core';
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
    MaterialModule,
    Ng2GoogleChartsModule,
    StoreModule.provideStore(reducers)
  ],
  exports: [
    ...DECLARATIONS,
    Ng2GoogleChartsModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule
  ],
  providers: [
    LEDService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
