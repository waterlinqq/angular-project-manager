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
  @Output() deleteTaskListEmt = new EventEmitter<void>()
  @Output() editTaskListEmt = new EventEmitter<void>()
  constructor() {}

  ngOnInit(): void {}
  onAddButtonClick() {
    this.newTaskEmt.emit()
  }
  onMoveButtonClick() {
    this.moveTaskEmt.emit()
  }
  onDeleteButtonClick() {
    this.deleteTaskListEmt.emit()
  }
  onEditButtonClick() {
    this.editTaskListEmt.emit()
  }
}
