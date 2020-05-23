import {
  Directive,
  HostListener,
  Input,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core'
import { DragDropService, DragData } from '../drag-drop.service'
import { take } from 'rxjs/operators'
@Directive({
  selector: '[appDroppable][dropTags][dragEnterClass]',
})
export class DropDirective {
  @Output() dropEmt = new EventEmitter<DragData>()
  @Input() dragEnterClass: string
  @Input() dropTags: string[] = []
  private data$
  constructor(
    private rd: Renderer2,
    private el: ElementRef,
    private service: DragDropService
  ) {
    this.data$ = this.service.getDragData().pipe(take(1))
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe((dragData) => {
        if (this.dropTags.includes(dragData.tag)) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass)
        }
      })
    }
  }
  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe((dragData) => {
        if (this.dropTags.includes(dragData.tag)) {
          this.rd.setProperty(event, 'dataTransfer.effectAllowed', 'all')
          this.rd.setProperty(event, 'dataTransfer.dropEffect', 'move')
        } else {
          this.rd.setProperty(event, 'dataTransfer.effectAllowed', 'none')
          this.rd.setProperty(event, 'dataTransfer.dropEffect', 'none')
        }
      })
    }
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe((dragData) => {
        if (this.dropTags.includes(dragData.tag)) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
        }
      })
    }
  }
  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe((dragData) => {
        if (this.dropTags.includes(dragData.tag)) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass)
          this.dropEmt.emit(dragData)
          this.service.clearDragData()
        }
      })
    }
  }
}
