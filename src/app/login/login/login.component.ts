import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(private fb: FormBuilder) {}

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
