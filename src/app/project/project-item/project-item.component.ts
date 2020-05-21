import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core'
import { cardAnim } from 'src/app/anims/card.anims'

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
