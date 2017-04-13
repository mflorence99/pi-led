import * as settingsActions from '../actions/settings';

import { Setting } from '../models/setting';

export interface State {
  working: boolean;
  error?: any;
  settings: Setting[];
};

export const initialState: State = {
  working: false,
  error: null,
  settings: []
};

export function reducer(state = initialState,
                        action: settingsActions.Actions): State {
  switch (action.type) {

    case settingsActions.ActionTypes.LOAD:
    case settingsActions.ActionTypes.SET:
      return Object.assign({}, state, {working: true});

    case settingsActions.ActionTypes.LOAD_SUCCESS:
    case settingsActions.ActionTypes.SET_SUCCESS:
      return {working: false, settings: action.payload};

    case settingsActions.ActionTypes.LOAD_FAILURE:
    case settingsActions.ActionTypes.SET_FAILURE:
      return Object.assign({}, state, {working: false, error: action.payload});

    default:
      return state;

  }
}
