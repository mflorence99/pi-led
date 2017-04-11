import { AppComponent } from './containers/app';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LEDService } from './services/led';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SwitchesComponent } from './components/switches';

@NgModule({
  declarations: [
    AppComponent,
    SwitchesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    LEDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
