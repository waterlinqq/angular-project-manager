import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, Form, FormGroup } from '@angular/forms'
@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
})
export class CopyTaskComponent implements OnInit {
  lists: any[]
  form: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<CopyTaskComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.lists = this.data.lists
    this.form = this.fb.group({
      targetListId: [],
    })
  }
  onSubmit(ev: Event, { value, valid }) {
    ev.preventDefault()
    if (!valid) {
      return
    }
    this.dialogRef.close(value.targetListId)
  }
}
