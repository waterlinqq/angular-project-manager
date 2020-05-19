import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login/login-routing.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, LoginRoutingModule],
})
export class LoginModule {}
