import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  items: string[]
  constructor() {}

  ngOnInit(): void {
    this.items = Array.from({ length: 16 }).map((_, i) => `avatar:svg-${i + 1}`)
  }
}
