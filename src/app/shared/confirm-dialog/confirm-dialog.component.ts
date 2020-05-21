import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 mat-dialog-title>{{ title }}：</h3>
    <mat-dialog-content>
      {{ content }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-raised-button
        type="button"
        color="primary"
        (click)="onButtonClick(true)"
      >
        確定
      </button>
      <button
        mat-dialog-close
        mat-raised-button
        type="button"
        (click)="onButtonClick(false)"
      >
        取消
      </button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class ConfirmDialogComponent implements OnInit {
  title = ''
  content = ''
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
    this.title = this.data.title
    this.content = this.data.content
  }
  onButtonClick(result: boolean) {
    this.dialogRef.close(result)
  }
}
