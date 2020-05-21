import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  title: ''
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>
  ) {}

  ngOnInit(): void {
    this.title = this.data.title
  }
  onSaveButtonClick() {
    this.dialogRef.close('123')
  }
}
