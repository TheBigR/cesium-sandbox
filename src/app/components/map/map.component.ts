import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MapLayerProviderOptions, MapsManagerService, ViewerConfiguration} from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MapComponent implements OnInit, OnDestroy {
  viewer;
  mapLayerProviderOptions = MapLayerProviderOptions;

  ionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMWY3MDBjYi1hM2NmLTRiY2YtYTM3My1mMTk5MjFiYTg5NDUiLCJpZ' +
    'CI6NjU0Miwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImFzc2V0cyI6WzIsM10sImlhdCI6MTU1MTM0NzUzNH0.iLuDmwFBzHKNiEIoYBakVCiwNS' +
    '1xZyen-2GJAZ9fjJk';

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

  maps = [
    {id: 'transMap',
     containerId: 'topOfVideo'
    },
    {
      id: 'secMap',
      containerId: 'secContainer'
    }
  ];

  constructor( private mapsManagerService: MapsManagerService, viewerConfiguration: ViewerConfiguration) {
    this.mapsManagerService = mapsManagerService;
    viewerConfiguration.viewerOptions = this.viewerConfigurationOptions;
    Cesium.Ion.defaultAccessToken = this.ionToken;
  }


  ngOnInit() { }

  ngOnDestroy() {
    console.log('MapComponent: ngOnDestroy');
  }

  changeMapParams(mapname) {
    this.viewer  = this.mapsManagerService.getMap(mapname).getCesiumViewer();
    this.viewer.timeline.destroy();
  }

}
