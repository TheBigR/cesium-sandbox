import {Action} from '@ngrx/store';
import {PolyShape} from '../models/polyShapeModel';

export enum polyShapeActionTypes {
  ADD_OR_UPDATE = '[PolyShape] Update or Add data',
  REMOVE_ALL = '[PolyShape] Remove all polyshapes',
  REMOVE_BY_ID = '[PolyShape] Remove polyshape by id',
}

class AddOrUpdate implements Action {
  readonly type = polyShapeActionTypes.ADD_OR_UPDATE;
  constructor(public payload: PolyShape) {
    this.payload.dispatched = Date.now();
  }
}

class RemoveAll implements Action {
  readonly type = polyShapeActionTypes.REMOVE_ALL;
  constructor() {}
}

class RemoveById implements Action {
  readonly type = polyShapeActionTypes.REMOVE_BY_ID;
  constructor() {}
}

export const polyShapeActions = {AddOrUpdate, RemoveAll, RemoveById};

export type polyShapeActions = AddOrUpdate | RemoveAll | RemoveById;
