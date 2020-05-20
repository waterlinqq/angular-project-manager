import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  items = [
    { id: 1, name: '小武' },
    { id: 2, name: '小落' },
    { id: 3, name: '小薩' },
  ]
  constructor() {}

  ngOnInit(): void {}
  onInviteButtonClick() {}
  displayUsername(user: { id: string; name: string }) {
    return user ? user.name : ''
  }
}
