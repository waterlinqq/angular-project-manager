import { Component, OnInit, HostBinding } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { NewTaskComponent } from '../new-task/new-task.component'
import { CopyTaskComponent } from '../copy-task/copy-task.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { NewTaskListComponent } from '../new-task-list/new-task-list.component'
import { routeAnim } from 'src/app/anims/route.anim'
import * as fromRoot from '../../reducers'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { pluck, take, filter, map, switchMap } from 'rxjs/operators'
import { TaskList } from 'src/app/domain'
import * as actions from '../../actions/task-list.action'
import * as taskActions from '../../actions/task.action'
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [routeAnim],
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@route') state
  projectId$: Observable<string>
  lists$: Observable<TaskList[]>
  constructor(
    private dialogRef: MatDialog,
    private store$: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {
    this.projectId$ = this.route.paramMap.pipe(pluck('id'))
    this.lists$ = this.store$.select(fromRoot.getTasksByList)
  }

  ngOnInit(): void {}
  onNewTask(list: TaskList) {
    const user$ = this.store$
      .select(fromRoot.getAuthState)
      .pipe(map((auth) => auth.user))
    user$
      .pipe(
        take(1),
        map((user) =>
          this.dialogRef.open(NewTaskComponent, {
            data: { title: '創建任務', owner: user },
          })
        ),
        switchMap((dialogRef) =>
          dialogRef.afterClosed().pipe(
            take(1),
            filter((n) => n)
          )
        )
      )
      .subscribe((val) =>
        this.store$.dispatch(
          new taskActions.AddTaskAction({
            ...val,
            taskListId: list.id,
            completed: false,
            createDate: new Date(),
          })
        )
      )
  }
  onMoveTask(list: TaskList) {
    this.lists$
      .pipe(
        map((l) => l.filter((n) => n.id !== list.id)),
        map((li) =>
          this.dialogRef.open(CopyTaskComponent, { data: { list: li } })
        ),
        switchMap((dialogRef) => dialogRef.afterClosed().pipe(take(1)))
      )
      .subscribe((val) =>
        this.store$.dispatch(
          new taskActions.MoveAllAction({
            srcListId: list.id,
            targetListId: val,
          })
        )
      )
  }
  onDeleteTaskList(list: TaskList) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: { title: '確認刪除', content: '確認刪除該任務列表嗎？' },
    })
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n)
      )
      .subscribe((_) =>
        this.store$.dispatch(new actions.DeleteTaskListAction(list))
      )
  }
  onTaskClick(task) {
    const dialogRef = this.dialogRef.open(NewTaskComponent, {
      data: { title: '修改任務', task },
    })
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n)
      )
      .subscribe((val) =>
        this.store$.dispatch(new taskActions.UpdateTaskAction({ ...task, val }))
      )
  }
  onEditTaskList(list: TaskList) {
    const dialogRef = this.dialogRef.open(NewTaskListComponent, {
      data: { title: '編輯列表', taskList: list },
    })
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) =>
        this.store$.dispatch(
          new actions.UpdateTaskListAction({ ...result, id: list.id })
        )
      )
  }
  onNewTaskList(ev: Event) {
    const dialogRef = this.dialogRef.open(NewTaskListComponent, {
      data: { title: '創建列表' },
    })
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) =>
        this.store$.dispatch(new actions.AddTaskListAction(result))
      )
  }
  onDrop(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handle item')
        break
      case 'task-list':
        const srcList = srcData.data
        const tmpOrder = srcList.order
        srcList.order = list.order
        list.order = tmpOrder
        break
    }
  }
  onQuickTask(desc: string, list) {
    const user$ = this.store$
      .select(fromRoot.getAuthState)
      .pipe(map((auth) => auth.user))
    user$.pipe(take(1)).subscribe((user) =>
      this.store$.dispatch(
        new taskActions.AddTaskAction({
          desc,
          priority: 3,
          taskListId: list.id,
          ownerId: user.id,
          completed: false,
          createDate: new Date(),
          participantIds: [],
        })
      )
    )
  }
}
