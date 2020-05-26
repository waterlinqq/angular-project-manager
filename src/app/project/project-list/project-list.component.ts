import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { routeAnim } from 'src/app/anims/route.anim'
import { listAnim } from 'src/app/anims/list.anim'
import { Project } from 'src/app/domain'
import { ProjectService } from 'src/app/service/project.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [routeAnim, listAnim],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@route') state
  projects: Project[]
  sub: Subscription
  constructor(private dialogRef: MatDialog, private service$: ProjectService) {}

  ngOnInit(): void {
    this.sub = this.service$
      .get('1')
      .subscribe((projects) => (this.projects = projects))
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }
  onOpenDialog() {
    const dialogRef = this.dialogRef.open(NewProjectComponent, {
      data: { title: '創建項目' },
    })
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result)
      // const newProject = {
      //   id: 3,
      //   name: '專案三',
      //   desc: '這還是一個專案',
      //   coverImg: '/assets/img/covers/2.jpg',
      // }
      // this.projects = [...this.projects, newProject ]
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
