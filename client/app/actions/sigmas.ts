import { Action } from '@ngrx/store';
import { Sigma } from '../models/sigma';
import { type } from 'pi-lib/utils';

export const ActionTypes = {
  LISTEN:           type('[Sigmas] Listen'),
  LISTEN_SUCCESS:   type('[Sigmas] Listen Success'),
  LISTEN_FAILURE:   type('[Sigmas] Listen Failure'),
  UNLISTEN:         type('[Sigmas] Unlisten'),
};

export class ListenAction implements Action {
  type = ActionTypes.LISTEN;
  constructor(public payload: any = null) { }
}

export class ListenSuccessAction implements Action {
  type = ActionTypes.LISTEN_SUCCESS;
  constructor(public payload: Sigma[]) { }
}

export class ListenFailureAction implements Action {
  type = ActionTypes.LISTEN_FAILURE;
  constructor(public payload: string) { }
}

export class UnlistenAction implements Action {
  type = ActionTypes.UNLISTEN;
  constructor(public payload: any = null) { }
}

export type Actions
  = ListenAction
  | ListenSuccessAction
  | ListenFailureAction
  | UnlistenAction;
