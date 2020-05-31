import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { QuoteService } from '../service/quote.service'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'

import * as actions from '../actions/quote.action'
import { map, switchMap, catchError, tap } from 'rxjs/operators'

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions, private service$: QuoteService) {}
  @Effect()
  quote$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOAD),
    // map((action) => (action as any).payload),
    switchMap((_) =>
      this.service$.getQuote().pipe(
        map((q) => new actions.LoadSuccessAction(q)),
        catchError((err) => of(new actions.LoadFailAction(JSON.stringify(err))))
      )
    )
  )
}
