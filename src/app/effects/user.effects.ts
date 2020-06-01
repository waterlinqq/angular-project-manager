import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { UserService } from '../service/user.service'
import * as actions from '../actions/user.action'
import * as prjActions from '../actions/project.action'
import * as fromRoot from '../reducers'
import { Project } from '../domain'
import { catchError, map, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'

@Injectable()
export class UserEffects {
  /**
   *
   */
  @Effect()
  searchUsers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.SEARCH_USERS),
    map((action) => (action as any).payload),
    switchMap((str) =>
      this.service$.searchUsers(str).pipe(
        map((users) => new actions.SearchUsersSuccessAction(users)),
        catchError((err) =>
          of(new actions.SearchUsersFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  addUserProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD_USER_PROJECT),
    map((action) => (action as any).payload),
    switchMap(({ user, projectId }) => {
      return this.service$.addProjectRef(user, projectId).pipe(
        map((task) => new actions.AddUserProjectSuccessAction(task)),
        catchError((err) =>
          of(new actions.AddUserProjectFailAction(JSON.stringify(err)))
        )
      )
    })
  )

  @Effect()
  removeUserProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.REMOVE_USER_PROJECT),
    map((action) => (action as any).payload),
    switchMap(({ user, projectId }) => {
      return this.service$.removeProjectRef(user, projectId).pipe(
        map((task) => new actions.RemoveUserProjectSuccessAction(task)),
        catchError((err) =>
          of(new actions.RemoveUserProjectFailAction(JSON.stringify(err)))
        )
      )
    })
  )

  @Effect()
  toLoadUser$: Observable<Action> = this.actions$.pipe(
    ofType(prjActions.ActionTypes.LOADS_SUCCESS),
    map((action) => (action as any).payload),
    switchMap((prjs: Project[]) => from(prjs.map((prj) => prj.id))),
    map((projectId: string) => new actions.LoadUsersByPrjAction(projectId))
  )
  @Effect()
  loadProjectUsers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOAD_USERS_BY_PRJ),
    map((action) => (action as any).payload),
    switchMap((projectId) =>
      this.service$.getUsersByProject(projectId).pipe(
        map((users) => new actions.LoadUsersByPrjSuccessAction(users)),
        catchError((err) =>
          of(new actions.LoadUsersByPrjFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  batchUpdateProjectUsers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.BATCH_UPDATE_USER_PROJECT),
    map((action) => (action as any).payload),
    switchMap((project) =>
      this.service$.batchUpdateProjectRef(project).pipe(
        map((users) => new actions.BatchUpdateUserProjectSuccessAction(users)),
        catchError((err) =>
          of(new actions.BatchUpdateUserProjectFailAction(err))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private service$: UserService,
    private store$: Store<fromRoot.State>
  ) {}
}
