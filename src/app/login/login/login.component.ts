import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { Quote } from 'src/app/domain/quote.model'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromRoot from '../../reducers'
import * as quoteActions from '../../actions/quote.action'
import * as authActions from '../../actions/auth.action'
import { QuoteService } from 'src/app/service/quote.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  quote$: Observable<Quote>
  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
    this.quote$ = this.store$.select(fromRoot.getQuote)
    this.store$.dispatch(new quoteActions.LoadAction(null))
    // this.quoteService$.getQuote().subscribe((q) =>
    //   // this.store$.dispatch({ type: actions.QUOTE_SUCCESS, payload: q })
    //   this.store$.dispatch(new actions.LoadSuccessAction(q))
    // )
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['123@abc.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  onSubmit({ value, valid }, event) {
    if (!value) {
      return
    }
    // this.store$.dispatch(new quoteActions.LoadAction(null))

    this.store$.dispatch(new authActions.LoginAction(value))
    // this.form.controls['email'].setValidators()
  }
  // validate(c: FormControl) {
  //   const alphaNumeric = /[a-z]+\d+/
  //   if (alphaNumeric.test(c.value)) {
  //     return null
  //   }
  //   return {
  //     passwordNotValid: '密碼必須英文開頭包含數字',
  //   }
  // }
}
