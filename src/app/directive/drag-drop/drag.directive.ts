import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core'
import { DragDropService } from '../drag-drop.service'

@Directive({
  selector: '[appDraggable][dragTag][dragData][draggedClass]',
})
export class DragDirective {
  private _isDraggable = false
  @Input('appDraggable')
  set Draggable(val) {
    this._isDraggable = val
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`)
  }
  get Draggable() {
    return this._isDraggable
  }
  @Input() draggedClass: string
  @Input() dragTag: string
  @Input() dragData: any

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event) {
    if (this.el.nativeElement === event.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass)
      this.service.setDragData({ tag: this.dragTag, data: this.dragData })
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEndt(event: Event) {
    if (this.el.nativeElement === event.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass)
    }
  }
}
