import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MapLayerProviderOptions, MapsManagerService} from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MapComponent implements OnInit, OnDestroy {

  constructor( ) {

  }


  ngOnInit() { }

  ngOnDestroy() {
    console.log('MapComponent: ngOnDestroy');
  }

}
