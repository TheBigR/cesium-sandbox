import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapLayerProviderOptions, MapsManagerService, ViewerConfiguration} from 'angular-cesium';

@Component({
  selector: 'app-map-provider',
  templateUrl: './map-provider.component.html',
  styleUrls: ['./map-provider.component.css']
})
export class MapProviderComponent implements OnInit, OnDestroy {
  viewer;
  mapLayerProviderOptions = MapLayerProviderOptions;

  providerOptions = {
    url: 'https://dev.virtualearth.net',
    key: 'AmJ0O28GqMP3Dh1xqajFAFMuKb9f0YCXtGWJ5G4NU_PeE899SYup3ngALmDschnu',
    DEFAULT_VIEW_FACTOR: 0,
    baseLayerPicker: false
  };

  viewerConfigurationOptions = {
    skyBox: false,
    skyAtmosphere: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    }
  };

  rectangleOptions2 = {
    latHigh: 35.505973830123416,
    latLow: 32.505973830123416 - 0.5,
    longHigh: 37.050586739112894,
    longLow: 35.050586739112894 - 0.5
  };

  currentRectangle = this.setrectangle(this.rectangleOptions2);

  constructor(private mapsManagerService: MapsManagerService, viewerConfiguration: ViewerConfiguration) {
    this.mapsManagerService = mapsManagerService;
    viewerConfiguration.viewerOptions = this.viewerConfigurationOptions;
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
