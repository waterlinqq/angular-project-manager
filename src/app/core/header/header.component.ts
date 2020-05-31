import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Auth } from 'src/app/domain'
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/auth.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuEmt = new EventEmitter()
  @Output() toggleThemeEmt = new EventEmitter<boolean>()
  auth$: Observable<Auth>
  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuthState)
  }

  ngOnInit(): void {}
  onClickMenuButton() {
    this.toggleMenuEmt.emit()
  }
  onChangeSlideToggle({ checked }) {
    this.toggleThemeEmt.emit(checked)
  }
  onLogoutButtonClick() {
    this.store$.dispatch(new actions.LogoutAction(null))
  }
}
