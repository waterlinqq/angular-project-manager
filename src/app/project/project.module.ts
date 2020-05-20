import { NgModule } from '@angular/core'

import { NewProjectComponent } from './new-project/new-project.component'
import { ProjectListComponent } from './project-list/project-list.component'
import { ProjectItemComponent } from './project-item/project-item.component'
import { InviteComponent } from './invite/invite.component'
import { SharedModule } from '../shared/shared.module'
import { ProjectRoutingModule } from './project-routing.module'

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent,
  ],
  imports: [SharedModule, ProjectRoutingModule],
  entryComponents: [],
})
export class ProjectModule {}
