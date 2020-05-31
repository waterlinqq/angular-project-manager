import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { ProjectService } from '../service/project.service'
import * as actions from '../actions/project.action'
// import * as tasklistActions from '../actions/task-list.action';
// import * as userActions from '../actions/user.action';
import * as fromRoot from '../reducers'
import * as listActions from '../actions/task-list.action'
import { Project, Auth } from '../domain'
import { map, withLatestFrom, switchMap, catchError, tap } from 'rxjs/operators'

@Injectable()
export class ProjectEffects {
  /**
   *
   */
  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOADS),
    map((action) => (action as any).payload),
    withLatestFrom(this.store$.select(fromRoot.getAuthState)),
    switchMap(([_, auth]) =>
      this.service$.get((auth as Auth).user.id).pipe(
        map((projects) => new actions.LoadProjectsSuccessAction(projects)),
        catchError((err) =>
          of(new actions.LoadProjectsFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  addProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD),
    map((action) => (action as any).payload),
    withLatestFrom(this.store$.select(fromRoot.getAuthState)),
    switchMap(([project, auth]) => {
      const added = { ...project, members: [`${(auth as Auth).user.id}`] }
      return this.service$.add(added).pipe(
        map((projects) => new actions.AddProjectSuccessAction(projects)),
        catchError((err) =>
          of(new actions.AddProjectFailAction(JSON.stringify(err)))
        )
      )
    })
  )

  @Effect()
  updateProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.UPDATE),
    map((action) => (action as any).payload),
    switchMap((project) =>
      this.service$.update(project).pipe(
        map((projects) => new actions.UpdateListsSuccessAction(projects)),
        catchError((err) =>
          of(new actions.UpdateProjectFailAction(JSON.stringify(err)))
        )
      )
    )
  )
  @Effect()
  deleteProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DELETE),
    map((action) => (action as any).payload),
    switchMap((project) =>
      this.service$.delete(project).pipe(
        map((projects) => new actions.DeleteProjectSuccessAction(projects)),
        catchError((err) =>
          of(new actions.DeleteProjectFailAction(JSON.stringify(err)))
        )
      )
    )
  )
  @Effect()
  selectProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.SELECT),
    map((action) => (action as any).payload),
    tap((project) =>
      this.router.navigate([`/tasklist/${(project as any).id}`])
    ),
    map(
      (project) => new listActions.LoadTaskListsAction((project as Project).id)
    )
  )

  @Effect()
  invite$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.INVITE),
    map((action) => (action as any).payload),
    switchMap(({ projectId, members }) =>
      this.service$.invite(projectId, members).pipe(
        map((project) => new actions.InviteMembersSuccessAction(project)),
        catchError((err) =>
          of(new actions.InviteMembersFailAction(JSON.stringify(err)))
        )
      )
    )
  )
  constructor(
    private actions$: Actions,
    private service$: ProjectService,
    private store$: Store<fromRoot.State>,
    private router: Router
  ) {}
}
