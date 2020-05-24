import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { QuoteService } from 'src/app/service/quote.service'
import { Quote } from 'src/app/domain/quote.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  quote: Quote = {
    en: 'loremadfasdfadf',
    cn: 'loremasfaga',
    pic: '/assets/img/quotes/0.jpg',
  }
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe((q) => (this.quote = q))
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
