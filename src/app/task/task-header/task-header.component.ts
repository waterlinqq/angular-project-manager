import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
})
export class TaskHeaderComponent implements OnInit {
  @Input() header
  @Output() newTaskEmt = new EventEmitter<void>()
  @Output() moveTaskEmt = new EventEmitter<void>()
  @Output() deleteTaskEmt = new EventEmitter<void>()
  constructor() {}

  ngOnInit(): void {}
  onAddButtonClick() {
    this.newTaskEmt.emit()
  }
  onMoveButtonClick() {
    this.moveTaskEmt.emit()
  }
  onDeleteButtonClick() {
    this.deleteTaskEmt.emit()
  }
}
