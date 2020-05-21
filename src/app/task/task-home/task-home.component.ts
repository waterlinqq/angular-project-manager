import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NewTaskComponent } from '../new-task/new-task.component'

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: '代辦',
      order: 1,
      tasks: [
        {
          id: 1,
          desc: '任務一：吃飯吃牛排吃沙拉',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '小武',
            avatar: 'avatar:svg-3',
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任務二：睡覺',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-6',
          },
          dueDate: new Date(),
        },
      ],
    },
    {
      id: 2,
      name: '進行中',
      order: 2,
      tasks: [
        {
          id: 1,
          desc: '任務一：玩耍',
          completed: false,
          reminder: true,
          priority: 2,
          owner: {
            id: 1,
            name: '小利',
            avatar: 'avatar:svg-4',
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任務二：讀書',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-8',
          },
          dueDate: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: '已完成',
      order: 3,
      tasks: [
        {
          id: 1,
          desc: '任務一：遛狗',
          completed: false,
          reminder: false,
          priority: 3,
          owner: {
            id: 1,
            name: '小屁',
            avatar: 'avatar:svg-11',
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任務二：運動',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '旺旺',
            avatar: 'avatar:svg-7',
          },
          dueDate: new Date(),
        },
      ],
    },
  ]
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  onNewTask() {
    this.dialog.open(NewTaskComponent)
  }
}
