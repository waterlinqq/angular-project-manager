import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { filter, switchMap, map, take } from 'rxjs/operators'
import * as _ from 'lodash'

import { NewProjectComponent } from '../new-project/new-project.component'
import { InviteComponent } from '../invite/invite.component'
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { routeAnim } from 'src/app/anims/route.anim'
import { listAnim } from 'src/app/anims/list.anim'
import { Project } from 'src/app/domain'
import { Subscription, from } from 'rxjs'
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/project.action'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [routeAnim, listAnim],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@route') state
  projects$: Observable<Project[]>
  listAnim$: Observable<number>
  constructor(
    private dialogRef: MatDialog,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.LoadProjectsAction(null))
    this.projects$ = this.store$.select(fromRoot.getProjects)
    this.listAnim$ = this.projects$.pipe(map((p) => p.length))
  }

  ngOnInit(): void {}
  ngOnDestroy() {}
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
        map((val) => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      )
      .subscribe((prj) => {
        this.store$.dispatch(new actions.AddProjectAction(prj))
      })
  }
  onInvite(project: Project) {
    this.store$
      .select(fromRoot.getProjectUsers(project.id))
      .pipe(
        map((users) =>
          this.dialogRef.open(InviteComponent, { data: { members: [] } })
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
          new actions.InviteMembersAction({
            projectId: project.id,
            members: val,
          })
        )
      )
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
        }))
      )
      .subscribe((prj) => {
        this.store$.dispatch(new actions.UpdateProjectAction(prj))
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
        filter((n) => n)
      )
      .subscribe((_) => {
        this.store$.dispatch(new actions.DeleteProjectAction(project))
      })
  }
  onSelect(project: Project) {
    this.store$.dispatch(new actions.SelectProjectAction(project))
  }
  private getThumbnails() {
    return _.range(0, 40).map((i) => `/assets/img/covers/${i}_tn.jpg`)
  }
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img
  }
}
