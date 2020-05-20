import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuEmt = new EventEmitter()
  @Output() toggleThemeEmt = new EventEmitter<boolean>()
  constructor() {}

  ngOnInit(): void {}
  onClickMenuButton() {
    this.toggleMenuEmt.emit()
  }
  onChangeSlideToggle({ checked }) {
    this.toggleThemeEmt.emit(checked)
  }
}
