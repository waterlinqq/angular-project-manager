import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core'
import { itemAnim } from '../../anims/item.anims'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
})
export class TaskItemComponent implements OnInit {
  @Input() item
  @Input() avatar
  @Output() taskItemClickEmt = new EventEmitter<void>()
  widerPriority = 'in'
  constructor() {}
  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'out'
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in'
  }
  ngOnInit(): void {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned'
  }
  onListItemClick() {
    this.taskItemClickEmt.emit()
  }
  onCheckboxClick(event: Event) {
    event.stopPropagation()
  }
}
