import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/components/login/login/login.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public pwdType: string = 'password';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.data = {
      name: '',
      rollNo: 0,
      password: ''
    }
    this.dialogRef.close();
  }

  public togglePwdType(){
    this.pwdType = this.pwdType === 'password'? 'text' : 'password';
  }

}
