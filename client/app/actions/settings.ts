import { Action } from '@ngrx/store';
import { Setting } from '../models/setting';
import { type } from '@mflo999/pi-lib/utils';

export const ActionTypes = {
  LOAD:           type('[Settings] Load'),
  LOAD_SUCCESS:   type('[Settings] Load Success'),
  LOAD_FAILURE:   type('[Settings] Load Failure'),
  SET:            type('[Settings] Set'),
  SET_SUCCESS:    type('[Settings] Set Success'),
  SET_FAILURE:    type('[Settings] Set Failure'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Setting[]) { }
}

export class LoadFailureAction implements Action {
  type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: string) { }
}

export class SetAction implements Action {
  type = ActionTypes.SET;
  constructor(public payload: Setting) { }
}

export class SetSuccessAction implements Action {
  type = ActionTypes.SET_SUCCESS;
  constructor(public payload: Setting[]) { }
}

export class SetFailureAction implements Action {
  type = ActionTypes.SET_FAILURE;
  constructor(public payload: string) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailureAction
  | SetAction
  | SetSuccessAction
  | SetFailureAction;
