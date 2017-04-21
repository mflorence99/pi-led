import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

import * as settingsActions from '../actions/settings';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LEDService } from '../services/led';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Setting } from '../models/setting';
import { handleHttpError } from '@mflo999/pi-lib/utils';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SettingsEffects {

  @Effect() load: Observable<Action> = this.actions
    .ofType(settingsActions.ActionTypes.LOAD)
    .startWith(new settingsActions.LoadAction())
    .switchMap(() => {
      return this.ledService.getSettings()
        .map((payload: Setting[]) => new settingsActions.LoadSuccessAction(payload))
        .catch((error: Response) => of(new settingsActions.LoadFailureAction(handleHttpError(error))));
    });

  @Effect() set: Observable<Action> = this.actions
    .ofType(settingsActions.ActionTypes.SET)
    .map((action: settingsActions.SetAction) => action.payload)
    .switchMap((setting: Setting) => {
      return this.ledService.setSetting(setting[0], setting[1])
        .map((payload: Setting[]) => new settingsActions.SetSuccessAction(payload))
        .catch((error: Response) => of(new settingsActions.SetFailureAction(handleHttpError(error))));
    });

  constructor(private actions: Actions,
              private ledService: LEDService) { }

}
