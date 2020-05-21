import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  @Input() item
  @Output() inviteEmt = new EventEmitter<void>()
  @Output() editEmt = new EventEmitter<void>()
  @Output() deleteEmt = new EventEmitter<void>()
  constructor() {}

  ngOnInit(): void {}
  onInviteButtonClick() {
    this.inviteEmt.emit()
  }
  onEditButtonClick() {
    this.editEmt.emit()
  }
  onDeleteButtonClick() {
    this.deleteEmt.emit()
  }
}
