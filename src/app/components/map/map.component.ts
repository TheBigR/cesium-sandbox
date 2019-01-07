import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MapLayerProviderOptions, MapsManagerService} from 'angular-cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MapComponent implements OnInit, OnDestroy {
  activeProvider = MapLayerProviderOptions.WebMapService;
  IMAGES_PATH = './assets/images/';
  showMap = true;
  areaLimitsTest = {
    latHigh: 35.505973830123416,
    latLow: 32.505973830123416 - 0.5,
    longHigh: 37.050586739112894,
    longLow: 35.050586739112894 - 0.5
  };
  klvDataTest = {
    'universal_key': '6e2b342b11e1311000',
    'payload_length': 186,
    'payload': {
      'unix_time_stamp': {
        'key': 2,
        'length': 8,
        'value': '2018-01-04T10:16:06.622Z'
      },
      'platform_tail_number': {
        'key': 4,
        'length': 3,
        'value': '252'
      },
      'platform_heading_angle': {
        'key': 5,
        'length': 2,
        'value': 14.985580224307624
      },
      'platform_pitch_angle': {
        'key': 6,
        'length': 2,
        'value': 39.063692129276404
      },
      'platform_roll_angle': {
        'key': 7,
        'length': 2,
        'value': 8.964812158574174
      },
      'platform_indicated_airspeed': {
        'key': 9,
        'length': 1,
        'value': 33
      },
      'image_source_sensor': {
        'key': 11,
        'length': 2,
        'value': 'EO'
      },
      'image_coordinate_system': {
        'key': 12,
        'length': 6,
        'value': 'WGS-84'
      },
      'sensor_latitude': {
        'key': 13,
        'length': 4,
        'value': 32.51630783663891
      },
      'sensor_longitude': {
        'key': 14,
        'length': 4,
        'value': 35.04111099757306
      },
      'sensor_true_altitude': {
        'key': 15,
        'length': 2,
        'value': 2796.9939726863504
      },
      'sensor_horizontal_fov': {
        'key': 16,
        'length': 2,
        'value': 3.8754863813229576
      },
      'sensor_vertical_fov': {
        'key': 17,
        'length': 2,
        'value': 2.180819409475853
      },
      'sensor_relative_azimuth_angle': {
        'key': 18,
        'length': 4,
        'value': 117.43749235697032
      },
      'sensor_relative_elevation_angle': {
        'key': 19,
        'length': 4,
        'value': -55.000000016298145
      },
      'sensor_relative_roll_angle': {
        'key': 20,
        'length': 4,
        'value': 0
      },
      'slant_range': {
        'key': 21,
        'length': 4,
        'value': 3046.999919006368
      },
      'target_width': {
        'key': 22,
        'length': 2,
        'value': 206.14938582436866
      },
      'frame_center_latitude': {
        'key': 23,
        'length': 4,
        'value': 32.50630571157965
      },
      'frame_center_longitude': {
        'key': 24,
        'length': 4,
        'value': 35.050510463794
      },
      'frame_center_elevation': {
        'key': 25,
        'length': 2,
        'value': -890.3572137026017
      },
      'offset_corner_latitude_point_1': {
        'key': 26,
        'length': 2,
        'value': 0.0003250221259193701
      },
      'offset_corner_longitude_point_1': {
        'key': 27,
        'length': 2,
        'value': 0.0012245551927243872
      },
      'offset_corner_latitude_point_2': {
        'key': 28,
        'length': 2,
        'value': 0.1488784447767571
      },
      'offset_corner_longitude_point_2': {
        'key': 29,
        'length': 2,
        'value': 0.14981460005493333
      },
      'offset_corner_latitude_point_3': {
        'key': 30,
        'length': 2,
        'value': 0.14968413342692344
      },
      'offset_corner_longitude_point_3': {
        'key': 31,
        'length': 2,
        'value': 0.1487983336893826
      },
      'offset_corner_latitude_point_4': {
        'key': 32,
        'length': 2,
        'value': 0.0010917996765037997
      },
      'offset_corner_longitude_point_4': {
        'key': 33,
        'length': 2,
        'value': 0.00018311105685598315
      },
      'wind_direction': {
        'key': 35,
        'length': 2,
        'value': -1
      },
      'wind_speed': {
        'key': 36,
        'length': 1,
        'value': -1
      },
      'outside_air_temperature': {
        'key': 39,
        'length': 0,
        'value': -1
      },
      'undefined': {
        'key': 0,
        'length': 0,
        'value': -1
      }
    }
  };

  constructor( private mapsManagerService: MapsManagerService) {

  }


  ngOnInit() {
    window.setTimeout(this.goToArea.bind(this), 2000);

  }

  goToArea() {
    const south = this.areaLimitsTest.latLow;
    const east = this.areaLimitsTest.longHigh;
    const west = this.areaLimitsTest.longLow;
    const north = this.areaLimitsTest.latHigh;

    this.mapsManagerService.getMap().getCameraService().cameraFlyTo({
      destination: Cesium.Rectangle.fromDegrees(west, south, east, north)
    });
  }

  goToAreaByKLV(klvData) {

    let elevation = 0;
    const cartographics = [];
    let point ;
    let  payload = {};
    if (klvData  && (klvData !== undefined)) {
      payload = klvData.payload;
      elevation  = Math.abs(payload['frame_center_elevation'].value);
      const center_longitude = payload['frame_center_longitude'].value;
      const center_latitude = payload['frame_center_latitude'].value;
      const rangeFromCenter = 0.0015;

      point = Cesium.Cartographic.fromDegrees(center_longitude - rangeFromCenter ,   center_latitude + rangeFromCenter, elevation);
      cartographics.push(point);

      point = Cesium.Cartographic.fromDegrees(center_longitude +  rangeFromCenter, center_latitude + rangeFromCenter, elevation);
      cartographics.push(point);
      // console.log(point2);

      point = Cesium.Cartographic.fromDegrees(center_longitude +  rangeFromCenter, center_latitude -  rangeFromCenter, elevation);
      cartographics.push(point);
      // console.log(point3);

      point = Cesium.Cartographic.fromDegrees(center_longitude  -   rangeFromCenter, center_latitude -  rangeFromCenter, elevation);
      cartographics.push(point);
    }

    this.mapsManagerService.getMap().getCameraService().cameraFlyTo({
      destination: Cesium.Rectangle.fromCartographicArray(cartographics)
    });
  }


  ngOnDestroy() {
    console.log('MapComponent: ngOnDestroy');
  }

}
