import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularCesiumModule, AngularCesiumWidgetsModule, ViewerConfiguration} from 'angular-cesium';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    AngularCesiumModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    ViewerConfiguration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
