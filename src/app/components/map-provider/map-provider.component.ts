import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MapLayerProviderOptions, MapsManagerService} from 'angular-cesium';

@Component({
  selector: 'app-map-provider',
  templateUrl: './map-provider.component.html',
  styleUrls: ['./map-provider.component.css']
})
export class MapProviderComponent implements OnInit, OnDestroy {
  viewer;
  mapLayerProviderOptions = MapLayerProviderOptions;

  providerOptions = {
    // url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
    // DEFAULT_VIEW_FACTOR: 0,
    // baseLayerPicker: false
    url: 'https://dev.virtualearth.net',
    key: 'AmJ0O28GqMP3Dh1xqajFAFMuKb9f0YCXtGWJ5G4NU_PeE899SYup3ngALmDschnu',
    DEFAULT_VIEW_FACTOR: 0,
    baseLayerPicker: false
  };

  rectangleOptions2 = {
    latHigh: 35.505973830123416,
    latLow: 32.505973830123416 - 0.5,
    longHigh: 37.050586739112894,
    longLow: 35.050586739112894 - 0.5
  };

  currentRectangle = this.setrectangle(this.rectangleOptions2);

  constructor(private mapsManagerService: MapsManagerService) {
    this.mapsManagerService = mapsManagerService;
    this.viewer = window.setTimeout(this.goToArea.bind(this), 3);
  }

  ngOnInit() {
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 15000000;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = this.currentRectangle;
    this.goToArea();
  }

  setrectangle(rectangleOption) {
    const south = rectangleOption.latHigh;
    const east = rectangleOption.longHigh;
    const west = rectangleOption.longLow;
    const north = rectangleOption.latHigh;
    return Cesium.Rectangle.fromDegrees(west, south, east, north);
  }

  goToArea() {
    const map = this.mapsManagerService.getMap();
    console.log('initial map' + map);
    if (map) {
      this.mapsManagerService.getMap().getCameraService().cameraFlyTo({destination: Cesium.Camera.DEFAULT_VIEW_RECTANGLE});
    }
  }

  ngOnDestroy() {
    console.log('Map Provider: ngOnDestroy');
  }

}
