import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { User } from 'src/app/domain'

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  members: User[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<InviteComponent>
  ) {}

  ngOnInit(): void {
    this.members = [...this.data.members]
  }
  onSubmit(event: Event, { valid, value }) {
    event.preventDefault()
    if (!valid) {
      return
    }
    this.dialogRef.close(this.members)
  }
}
