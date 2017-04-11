import * as settingsActions from '../actions/settings';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LEDService } from '../services/led';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SettingsEffects {

  @Effect() load: Observable<Action> = this.actions
    .ofType(settingsActions.ActionTypes.LOAD)
    .startWith(new settingsActions.LoadAction())
    .switchMap(() =>
      this.ledService.getAll()
        .map((payload: Setting[]) => new settingsActions.LoadSuccessAction(payload))
        .catch(error => of(new settingsActions.LoadFailureAction(error)))
    );

  @Effect() set: Observable<Action> = this.actions
    .ofType(settingsActions.ActionTypes.SET)
    .map((action: settingsActions.SetAction) => action.payload)
    .switchMap((setting: Setting) =>
      this.ledService.setOne(setting[0], setting[1])
        .map((payload: Setting[]) => new settingsActions.SetSuccessAction(payload))
        .catch(error => of(new settingsActions.SetFailureAction(error)))
    );

  constructor(private actions: Actions,
              private ledService: LEDService) { }

}
