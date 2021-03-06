import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CoreModule } from './core/core.module'
// import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { LoginModule } from './login/login.module'
import { ProjectModule } from './project/project.module'
import { TaskModule } from './task/task.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    CoreModule,
    SharedModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    // BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
