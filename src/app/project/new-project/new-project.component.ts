import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  title: string
  coverImages = []
  form: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.coverImages = this.data.thumbnails
    console.log(this.data)
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg],
      })
      this.title = '修改項目'
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img],
      })
      this.title = '創建項目'
    }
  }
  onSaveButtonClick() {
    this.dialogRef.close('123')
  }
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault()
    if (!valid) {
      return
    }
    this.dialogRef.close(value)
  }
}
