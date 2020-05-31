import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { TaskListService } from '../service/task-list.service'
import * as actions from '../actions/task-list.action'
import * as prjActions from '../actions/project.action'
// import * as taskActions from '../actions/task.action'
import * as fromRoot from '../reducers'
import { Task, TaskList } from '../domain'
import { map, switchMap, catchError, tap } from 'rxjs/operators'

@Injectable()
export class TaskListEffects {
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LOADS),
    map((action) => (action as any).payload),
    switchMap((projectId) =>
      this.service$.get(projectId).pipe(
        map((taskLists) => new actions.LoadTaskListsSuccessAction(taskLists)),
        catchError((err) =>
          of(new actions.LoadTaskListsFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  addTaskList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD),
    map((action) => (action as any).payload),
    switchMap((taskList) =>
      this.service$.add(taskList).pipe(
        map((tl) => new actions.AddTaskListSuccessAction(tl)),
        catchError((err) =>
          of(new actions.AddTaskListFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.UPDATE),
    map((action) => (action as any).payload),
    switchMap((taskList) =>
      this.service$.update(taskList).pipe(
        map((tl) => new actions.UpdateTaskListSuccessAction(tl)),
        catchError((err) =>
          of(new actions.UpdateTaskListFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  @Effect()
  removeTaskList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DELETE),
    map((action) => (action as any).payload),
    switchMap((taskList) =>
      this.service$.delete(taskList).pipe(
        map((tl) => new actions.DeleteTaskListSuccessAction(tl)),
        catchError((err) =>
          of(new actions.DeleteTaskListFailAction(JSON.stringify(err)))
        )
      )
    )
  )

  // @Effect()
  // removeTasksInList$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.DELETE_SUCCESS),
  //   map((action) => (action as any).payload)
  //   // switchMap((taskList) =>
  //   //   this.store$.select(fromRoot.getTasks).pipe(
  //   //     switchMap((tasks) => new actions.DeleteTaskListSuccessAction(tl)),
  //   //   )
  //   // )
  // )

  // @Effect()
  // removeTasksInList$: Observable<Action> = this.actions$
  //   .ofType(actions.ActionTypes.DELETE_SUCCESS)
  //   .map(toPayload)
  //   .switchMap((taskList: TaskList) => {
  //     return this.store$
  //       .select(fromRoot.getTasks)
  //       .switchMap((tasks: Task[]) =>
  //         Observable.from(tasks.filter((t) => t.taskListId === taskList.id))
  //       )
  //       .map((task) => new taskActions.DeleteTaskAction(task))
  //   })

  @Effect()
  initializeTaskLists$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.INITIALIZE),
    map((action) => (action as any).payload),
    switchMap((prj) => {
      return this.service$.initializeTaskLists(prj).pipe(
        map((project) => new actions.InitTaskListsSuccessAction(project)),
        catchError((err) =>
          of(new actions.InitTaskListsFailAction(JSON.stringify(err)))
        )
      )
    })
  )

  @Effect()
  updateProjectRef$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.INITIALIZE_SUCCESS),
    map((action) => (action as any).payload),
    map((prj) => new prjActions.UpdateListsAction(prj))
  )

  @Effect()
  swapOrder$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.SWAP_ORDER),
    map((action) => (action as any).payload),
    switchMap(({ src, target }) =>
      this.service$.swapOrder(src, target).pipe(
        map((tls) => new actions.SwapOrderSuccessAction(tls)),
        catchError((err) => of(new actions.SwapOrderFailAction(err)))
      )
    )
  )

  // @Effect()
  // loadTasksInList$: Observable<Action> = this.actions$.pipe(
  //   ofType(actions.ActionTypes.LOADS_SUCCESS),
  //   map((action) => (action as any).payload),
  //   // map((lists) => new taskActions.LoadTaskListsAction(lists))
  // )

  constructor(
    private actions$: Actions,
    private service$: TaskListService,
    private store$: Store<fromRoot.State>
  ) {}
}
