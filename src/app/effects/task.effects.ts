import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { TaskService } from '../service/task.service'
import * as actions from '../actions/task.action'
import * as fromRoot from '../reducers'
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators'

@Injectable()
export class TaskEffects {
  @Effect()
  loadTasksInLists$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOAD_IN_LISTS),
    map((action) => (action as any).payload),
    mergeMap((taskLists) => {
      return this.service$.getByLists(taskLists).pipe(
        map((tasks) => new actions.LoadTasksInListsSuccessAction(tasks)),
        catchError((err) =>
          of(new actions.LoadTasksInListsFailAction(JSON.stringify(err)))
        )
      )
    })
  )
  @Effect()
  addTask$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD),
    map((action) => (action as any).payload),
    switchMap((task) => {
      return this.service$.add(task).pipe(
        map((t) => new actions.AddTaskSuccessAction(t)),
        catchError((err) =>
          of(new actions.AddTaskFailAction(JSON.stringify(err)))
        )
      )
    })
  )
  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.UPDATE),
    map((action) => (action as any).payload),

    switchMap((task) =>
      this.service$.update(task).pipe(
        map((t) => new actions.UpdateTaskSuccessAction(t)),
        catchError((err) =>
          of(new actions.UpdateTaskFailAction(JSON.stringify(err)))
        )
      )
    )
  )
  @Effect()
  removeTask$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DELETE),
    map((action) => (action as any).payload),
    switchMap((task) =>
      this.service$.delete(task).pipe(
        map((t) => new actions.DeleteTaskSuccessAction(t)),
        catchError((err) =>
          of(new actions.DeleteTaskFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  completeTask$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.COMPLETE),
    map((action) => (action as any).payload),
    switchMap((task) =>
      this.service$.complete(task).pipe(
        map((t) => new actions.CompleteTaskSuccessAction(t)),
        catchError((err) =>
          of(new actions.CompleteTaskFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  // @Effect()
  // moveTask$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.MOVE),
  //   map((action) => (action as any).payload),
  //   switchMap(({ taskId, taskListId }) =>
  //     this.service$.move(taskId, taskListId).pipe(
  //       map((task) => new actions.MoveTaskSuccessAction(task[0])),
  //       catchError((err) =>
  //         of(new actions.MoveTaskFailAction(JSON.stringify(err)))
  //       )
  //     )
  //   )
  // )
  @Effect()
  moveAllTask$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.MOVE_ALL),
    map((action) => (action as any).payload),
    switchMap(({ srcListId, targetListId }) =>
      this.service$.moveAll(srcListId, targetListId).pipe(
        map((tasks) => new actions.MoveAllSuccessAction(tasks)),
        catchError((err) => of(new actions.MoveAllFailAction(err)))
      )
    )
  )
  constructor(
    private actions$: Actions,
    private service$: TaskService,
    private store$: Store<fromRoot.State>
  ) {}
}
