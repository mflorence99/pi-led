import * as sigmasActions from '../actions/sigmas';

import { Sigma } from '../models/sigma';

export interface State {
  working: boolean;
  error?: any;
  sigmas: Sigma[];
};

export const initialState: State = {
  working: false,
  error: null,
  sigmas: []
};

export function reducer(state = initialState,
                        action: sigmasActions.Actions): State {
  switch (action.type) {

    case sigmasActions.ActionTypes.LISTEN:
      return Object.assign({}, state, {working: true});

    case sigmasActions.ActionTypes.LISTEN_SUCCESS:
      return {working: false, sigmas: action.payload};

    case sigmasActions.ActionTypes.LISTEN_FAILURE:
      return Object.assign({}, state, {working: false, error: action.payload});

    case sigmasActions.ActionTypes.UNLISTEN:
      return state;

    default:
      return state;

  }
}
