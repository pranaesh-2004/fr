import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetDialogComponent } from 'src/app/widgets/mat-dialog/reset-dialog/reset-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public isVisible: boolean = false;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResetDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  checkVisibility(): boolean{
    const loginDetails: any = JSON.parse(sessionStorage.getItem('user') || '{}');
    // console.log(loginDetails)
    return loginDetails.isAdmin
  }

  ngOnInit(): void {
    this.isVisible = this.checkVisibility();
  }
}
