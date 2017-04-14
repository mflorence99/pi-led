import * as settings from './settings';
import * as sigmas from './sigmas';

export const reducers = {
  settings: settings.reducer,
  sigmas: sigmas.reducer
};

export interface AppState {
  settings: settings.State;
  sigmas: sigmas.State;
}
