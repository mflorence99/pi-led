import * as settingsActions from '../actions/settings';

import { Setting } from '../models/setting';

export interface State {
  working: boolean;
  ready: boolean;
  error?: any;
  settings: Setting[];
};

export const initialState: State = {
  working: false,
  ready: false,
  error: null,
  settings: []
};

export function reducer(state = initialState,
                        action: settingsActions.Actions): State {
  switch (action.type) {

    case settingsActions.ActionTypes.LOAD:
      return Object.assign({}, state, {working: true});

    case settingsActions.ActionTypes.LOAD_SUCCESS:
      return {working: false, ready: true, settings: action.payload};

    case settingsActions.ActionTypes.LOAD_FAILURE:
      return {working: false, ready: true, error: action.payload, settings: []};

    case settingsActions.ActionTypes.SET:
      return Object.assign({}, state, {working: true});

    case settingsActions.ActionTypes.SET_SUCCESS:
      return {working: false, ready: true, settings: action.payload};

    case settingsActions.ActionTypes.SET_FAILURE:
      return {working: false, ready: true, error: action.payload, settings: []};

    default:
      return state;

  }
}
