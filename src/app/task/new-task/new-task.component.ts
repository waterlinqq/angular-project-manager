import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  title: ''
  priorities = [
    {
      label: '緊急',
      value: 1,
    },
    {
      label: '重要',
      value: 2,
    },
    {
      label: '一般',
      value: 3,
    },
  ]
  form: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewTaskComponent>
  ) {}

  ngOnInit(): void {
    this.title = this.data.title
    this.form = this.fb.group({
      desc: [this.data.task ? this.data.task.desc : '', Validators.required],
      priority: [
        this.data.task ? this.data.task.priority : 3,
        Validators.required,
      ],
      owner: [
        this.data.task ? [this.data.task.owner] : [this.data.owner],
        Validators.required,
      ],
      followers: [
        this.data.task ? this.data.task.participantIds : [],
        Validators.required,
      ],
      dueDate: [
        this.data.task ? this.data.task.dueDate : '',
        Validators.required,
      ],
      reminder: [
        this.data.task ? this.data.task.reminder : '',
        Validators.required,
      ],
      remark: [this.data.task ? this.data.task.remark : ''],
    })
  }
  onSubmit(ev: Event, { value, valid }) {
    ev.preventDefault()
    if (!valid) {
      return
    }
    this.dialogRef.close({
      ...value,
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      participantIds: value.followers.map((f) => f.id),
    })
  }
}
