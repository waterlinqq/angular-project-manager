import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
})
export class NewTaskListComponent implements OnInit {
  title = ''
  form: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewTaskListComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.title = this.data.title
    this.form = this.fb.group({
      name: [
        this.data.taskList ? this.data.taskList.name : '',
        Validators.required,
      ],
    })
  }
  onSubmit({ value, valid }, ev: Event) {
    if (!valid) {
      return
    }
    this.dialogRef.close(value)
  }
}
