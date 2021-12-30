import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { StatusService } from 'src/app/services/status.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface ConfirmationDialogData {
  warningMsg: string,
  confirmed: boolean
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public displayedColumns: string[] = ['teacherId', 'name', 'rating'];
  public dataSource: any;
  public data: any = {};
  public searchText: string = '';
  private subs: Array<Subscription> = [];
  private readonly teachersInfoEndPoint: string = 'http://localhost:8000/students/teachers';
  private readonly deleteTeacherEndPoint: string = 'http://localhost:8000/students/teacher/';
  constructor(private ss: StatusService, public loader: LoaderService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.restoreData();
  }

  private restoreData(): void{
    this.loader.showLoader = true;
    this.ss.getTeachersInfo(this.teachersInfoEndPoint).subscribe((data) => {
      this.loader.showLoader = false;
      this.dataSource = data;
    },
      (err) => {
        this.loader.showLoader = false;
        this.openSnackBar("Error occurred while fetching Teachers rating inforamation!", 'close')
        // console.log(err);
      });
  }

  public openDialog(teacherId: number): void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        warningMsg: "Are you sure you that you want to delete Teacher's record?",
        confirmed: true
      }
    });

    this.subs.push(dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.confirmed){
          this.loader.showLoader = true;
          const sub = this.ss.deleteTeacher(this.deleteTeacherEndPoint + teacherId).subscribe(
            (result)=>{
              this.loader.showLoader = false;
              this.openSnackBar(result.message,'close');
              this.restoreData();
            },
            (err)=>{
              this.loader.showLoader = false;
              this.openSnackBar(result.error, 'close');
            }
          );
          this.subs.push(sub);
        } else {
          this.loader.showLoader = false;
        }
      }
  }));
}

  public openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  public ngOnDestroy(){
    this.subs.forEach(sub=> sub.unsubscribe());
  }
}
