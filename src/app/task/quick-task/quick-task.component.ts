import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core'

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss'],
})
export class QuickTaskComponent implements OnInit {
  @Output() quickTaskEmt = new EventEmitter()
  desc = ''
  constructor() {}

  ngOnInit(): void {}
  onSubmit(form, ev) {
    console.log(form.valid)
    console.log(form.value)
    console.log(ev)
  }
  @HostListener('keyup.enter')
  onSendButtonClick() {
    if (this.desc.trim() === '') {
      return
    }
    this.quickTaskEmt.emit(this.desc)
    this.desc = ''
  }
}
