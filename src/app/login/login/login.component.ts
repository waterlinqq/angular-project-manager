import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { QuoteService } from 'src/app/service/quote.service'
import { Quote } from 'src/app/domain/quote.model'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import * as fromRoot from '../../reducers'
import * as actions from '../../actions/quote.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  quote$: Observable<Quote>
  constructor(
    private fb: FormBuilder,
    private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(fromRoot.getQuote)
    this.quoteService$.getQuote().subscribe((q) =>
      // this.store$.dispatch({ type: actions.QUOTE_SUCCESS, payload: q })
      this.store$.dispatch(new actions.LoadSuccessAction(q))
    )
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['123@abc.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validate]],
    })
  }
  onSubmit({ value, valid }, event) {
    // this.form.controls['email'].setValidators()
    console.log(value)
  }
  validate(c: FormControl) {
    const alphaNumeric = /[a-z]+\d+/
    if (alphaNumeric.test(c.value)) {
      return null
    }
    return {
      passwordNotValid: '密碼必須英文開頭包含數字',
    }
  }
}
