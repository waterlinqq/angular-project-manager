import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as fromRoot from '../../reducers'
import * as authActions from '../../actions/auth.action'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private readonly avatarName = 'avatar'
  items: string[]
  form: FormGroup
  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {}

  ngOnInit(): void {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed(0)}`
    this.items = Array.from({ length: 16 }).map((_, i) => `avatar:svg-${i + 1}`)
    this.form = this.fb.group({
      name: [],
      email: [],
      password: [],
      confirmPassword: [],
      avatar: [img],
    })
  }
  onSubmit({ value, valid }, event) {
    if (!value) {
      return
    }
    this.store$.dispatch(new authActions.RegisterAction(value))
  }
}
