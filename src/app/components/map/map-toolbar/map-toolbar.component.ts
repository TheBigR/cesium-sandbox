import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CameraService,
  CesiumService,
  CirclesEditorService,
  EllipsesEditorService,
  HippodromeEditorService,
  PolygonsEditorService,
  PolylineEditorObservable,
  RangeAndBearingComponent,
  ZoomToRectangleService
} from 'angular-cesium';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css'],
  providers: [ZoomToRectangleService, CirclesEditorService, EllipsesEditorService, PolygonsEditorService, HippodromeEditorService],
})
export class MapToolbarComponent implements OnInit {

  constructor( private cameraService: CameraService,
               private zoomToRectangleService: ZoomToRectangleService,
               private cesiumService: CesiumService,
               private circlesEditor: CirclesEditorService,
               private ellipsesEditor: EllipsesEditorService,
               private polygonsEditor: PolygonsEditorService,
  ) {
    this.zoomToRectangleService.init(cesiumService, cameraService);
  }

  ngOnInit() {
  }

  drawCircle() {
    this.circlesEditor.create();
  }

  drawEllipse() {
    this.ellipsesEditor.create();
  }

  drawPolygon() {
    this.polygonsEditor.create();
  }
}
