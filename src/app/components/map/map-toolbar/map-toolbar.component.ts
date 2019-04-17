import { Component, OnInit } from '@angular/core';
import {
  CesiumService,
  CirclesEditorService,
  EllipsesEditorService,
  PolygonsEditorService, PolylinesEditorService
} from 'angular-cesium';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css'],
  providers: [CirclesEditorService, EllipsesEditorService, PolygonsEditorService, PolylinesEditorService],
})
export class MapToolbarComponent implements OnInit {

  constructor( private cesiumService: CesiumService,
               private circlesEditor: CirclesEditorService,
               private ellipsesEditor: EllipsesEditorService,
               private polygonsEditor: PolygonsEditorService,
               private polylineEditor: PolylinesEditorService,
  ) {

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
  drawPolyline() {
    this.polylineEditor.create();
  }
}
