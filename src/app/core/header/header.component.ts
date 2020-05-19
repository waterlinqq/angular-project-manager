import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  @Output() toggleTheme = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  onClickMenuButton() {
    this.toggleMenu.emit();
  }
  onChangeSlideToggle({ checked }) {
    this.toggleTheme.emit(checked);
  }
}
