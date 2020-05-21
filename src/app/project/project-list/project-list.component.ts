import { Component, OnInit, HostBinding } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { routeAnim } from 'src/app/anims/route.anim'
import { listAnim } from 'src/app/anims/list.anim'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [routeAnim, listAnim],
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@route') state
  projects = [
    {
      id: 1,
      name: '專案一',
      desc: '這是一個專案',
      coverImg: '/assets/img/covers/0.jpg',
    },
    {
      id: 2,
      name: '專案二',
      desc: '這也是一個專案',
      coverImg: '/assets/img/covers/1.jpg',
    },
  ]
  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}
  onOpenDialog() {
    const dialogRef = this.dialogRef.open(NewProjectComponent, {
      data: { title: '創建項目' },
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      const newProject = {
        id: 3,
        name: '專案三',
        desc: '這還是一個專案',
        coverImg: '/assets/img/covers/2.jpg',
      }
      this.projects = [...this.projects, newProject]
    })
  }
  onInvite() {
    this.dialogRef.open(InviteComponent)
  }
  onEdit() {
    this.dialogRef.open(NewProjectComponent, { data: { title: '編輯項目' } })
  }
  onDelete(project) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: { title: '刪除項目', content: '確認刪除該項目嗎？' },
    })
    dialogRef.afterClosed().subscribe((result) => {
      // this.projects = this.projects.filter((prj) => prj.id !== project.id)
      this.projects.pop()
    })
  }
}
