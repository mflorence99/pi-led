import * as settings from './settings';

export const reducers = {
  settings: settings.reducer
};

export interface AppState {
  settings: settings.State;
}
