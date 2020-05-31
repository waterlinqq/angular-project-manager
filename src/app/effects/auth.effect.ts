import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AuthService } from '../service/auth.service'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import * as actions from '../actions/auth.action'

import { User } from '../domain'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service$: AuthService,
    private router: Router
  ) {}
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    tap(console.log),
    ofType(actions.ActionTypes.LOGIN),
    map((action) => (action as actions.LoginAction).payload),
    switchMap(({ email, password }) =>
      this.service$.login(email, password).pipe(
        map((q) => new actions.LoginSuccessAction(q)),
        tap((_) => this.router.navigate(['/project'])),
        catchError((err) =>
          of(new actions.LoginFailAction(JSON.stringify(err)))
        )
      )
    )
  )
  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.REGISTER),
    map((action) => (action as actions.RegisterAction).payload),
    switchMap((user: User) =>
      this.service$.register(user).pipe(
        map((q) => new actions.RegisterSuccessAction(q)),
        tap((_) => this.router.navigate(['/project'])),
        catchError((err) => of(new actions.RegisterFailAction(err)))
      )
    )
  )
  // @Effect()
  // logout$ = this.actions$.pipe(
  //   ofType(actions.ActionTypes.LOGOUT),
  //   map((_) => this.router.navigate(['/']))
  // )
  // @Effect()
  // loginAndNavigate$ = this.actions$.pipe(
  //   ofType(actions.ActionTypes.LOGIN_SUCCESS),
  //   map((_) => this.router.navigate(['/project']))
  // )
  // @Effect()
  // registerAndNavigate$ = this.actions$.pipe(
  //   ofType(actions.ActionTypes.REGISTER_SUCCESS),
  //   map((_) => this.router.navigate(['/project']))
  // )
}
