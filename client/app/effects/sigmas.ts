import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

import * as sigmasActions from '../actions/sigmas';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LEDService } from '../services/led';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Sigma } from '../models/sigma';
import { handleHttpError } from '@mflo999/pi-lib/utils';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SigmasEffects {

  @Effect() listen: Observable<Action> = this.actions
    .ofType(sigmasActions.ActionTypes.LISTEN, sigmasActions.ActionTypes.UNLISTEN)
    .startWith(new sigmasActions.ListenAction())
    .switchMap((action: Action) => {
      if (action.type === sigmasActions.ActionTypes.UNLISTEN)
        return of();
      else return this.ledService.getSigmas()
        .map((payload: Sigma[]) => new sigmasActions.ListenSuccessAction(payload))
        .catch((error: Response) => of(new sigmasActions.ListenFailureAction(handleHttpError(error))));
    });

  constructor(private actions: Actions,
              private ledService: LEDService) { }

}
