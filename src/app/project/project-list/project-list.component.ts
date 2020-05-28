import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import * as _ from 'lodash'

import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { routeAnim } from 'src/app/anims/route.anim'
import { listAnim } from 'src/app/anims/list.anim'
import { Project } from 'src/app/domain'
import { ProjectService } from 'src/app/service/project.service'
import { Subscription } from 'rxjs'
import { filter, switchMap, map, take } from 'rxjs/operators'

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
    const selectedImg = `/assets/img/covers/${Math.floor(
      Math.random() * 40
    )}_tn.jpg`
    const dialogRef = this.dialogRef.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), img: selectedImg },
    })

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n),
        map((val) => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) })),
        switchMap((v) => this.service$.add(v))
      )
      .subscribe((prj) => {
        this.projects = [...this.projects, prj]
      })
  }
  onInvite() {
    this.dialogRef.open(InviteComponent)
  }
  onEdit(project: Project) {
    const dialogRef = this.dialogRef.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), project },
    })
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n),
        map((val) => ({
          ...val,
          id: project.id,
          coverImg: this.buildImgSrc(val.coverImg),
        })),
        switchMap((v) => this.service$.update(v))
      )
      .subscribe((prj) => {
        const idx = this.projects.findIndex((p) => p.id === prj.id)
        this.projects = [
          ...this.projects.slice(0, idx),
          prj,
          ...this.projects.slice(idx + 1),
        ]
      })
  }
  onDelete(project) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      data: { title: '刪除項目', content: '確認刪除該項目嗎？' },
    })
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n),
        switchMap((n) => this.service$.delete(project))
      )
      .subscribe((prj) => {
        this.projects = this.projects.filter((p) => p.id !== prj.id)
      })
  }
  private getThumbnails() {
    return _.range(0, 40).map((i) => `/assets/img/covers/${i}_tn.jpg`)
  }
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img
  }
}
