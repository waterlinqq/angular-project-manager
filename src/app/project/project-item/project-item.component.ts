import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core'
import { cardAnim } from 'src/app/anims/card.anim'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim],
})
export class ProjectItemComponent implements OnInit {
  @Input() item
  @Output() inviteEmt = new EventEmitter<void>()
  @Output() editEmt = new EventEmitter<void>()
  @Output() deleteEmt = new EventEmitter<void>()
  @Output() selectEmt = new EventEmitter<void>()
  @HostBinding('@card') cardState = 'out'
  constructor() {}

  ngOnInit(): void {}
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover'
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out'
  }
  onInviteButtonClick(ev: Event) {
    ev.stopPropagation()
    this.inviteEmt.emit()
  }
  onEditButtonClick(ev: Event) {
    ev.stopPropagation()
    this.editEmt.emit()
  }
  onDeleteButtonClick(ev: Event) {
    ev.stopPropagation()
    this.deleteEmt.emit()
  }
  onItemClick() {
    this.selectEmt.emit()
  }
}
