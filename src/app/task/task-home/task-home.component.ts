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
import { pluck, take, filter } from 'rxjs/operators'
import { TaskList } from 'src/app/domain'
import * as actions from '../../actions/task-list.action'
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
    this.lists$ = this.store$.select(fromRoot.getTaskLists)
  }

  ngOnInit(): void {}
  onNewTask() {
    this.dialogRef.open(NewTaskComponent, { data: { title: '創建任務' } })
  }
  onMoveTask() {
    // this.dialogRef.open(CopyTaskComponent, { data: { lists: this.lists } })
  }
  onDeleteTask(list: TaskList) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: { title: '確認刪除', content: '確認刪除該任務嗎？' },
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
    this.dialogRef.open(NewTaskComponent, { data: { title: '修改任務', task } })
  }
  onEditTaskList(list: TaskList) {
    const dialogRef = this.dialogRef.open(NewTaskListComponent, {
      data: { title: '編輯列表', taskList: list },
    })
    dialogRef
      .afterClosed()
      .pipe(
        take(1)
        // filter((n) => n)
      )
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
  onQuickTask(desc: string) {
    console.log(desc)
  }
}
