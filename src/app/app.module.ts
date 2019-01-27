import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularCesiumModule, AngularCesiumWidgetsModule} from 'angular-cesium';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapProviderComponent } from './components/map-provider/map-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapProviderComponent
  ],
  imports: [
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
