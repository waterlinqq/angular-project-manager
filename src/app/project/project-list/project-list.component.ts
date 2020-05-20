import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      name: '專案一',
      desc: '這是一個專案',
      coverImg: '/assets/img/covers/0.jpg',
    },
    {
      name: '專案二',
      desc: '這也是一個專案',
      coverImg: '/assets/img/covers/1.jpg',
    },
  ]
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  onOpenDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent)
    dialogRef.afterClosed()
  }
  onInvite() {
    const dialogRef = this.dialog.open(InviteComponent)
    dialogRef.afterClosed()
  }
}
