import { AppComponent } from './containers/app';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { LEDService } from './services/led';
import { LightsComponent } from './components/lights';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SettingsEffects } from './effects/settings';
import { StoreModule } from '@ngrx/store';
import { SwitchesComponent } from './components/switches';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    LightsComponent,
    SwitchesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    EffectsModule.run(SettingsEffects),
    FlexLayoutModule,
    HttpModule,
    MaterialModule,
    StoreModule.provideStore(reducers)
  ],
  providers: [
    LEDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
