import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { RegisterService } from 'src/app/services/register.service';
import { StatusService } from 'src/app/services/status.service';
import { DEFAULT_PASSWORD } from 'src/assets/constants/constants';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-feedback-status',
  templateUrl: './feedback-status.component.html',
  styleUrls: ['./feedback-status.component.scss']
})
export class FeedbackStatusComponent implements OnInit {
  public displayedColumns: string[] = ['rollNo','name','hasGivenFeedback', 'refresh'];
  public dataSource: any;
  public searchText: string = '';
  private subs: Array<Subscription> = [];
  private readonly url: string = 'http://localhost:8000/students/';

  constructor(
    private status: StatusService, 
    public loader: LoaderService,
    public rs: RegisterService,
    public dialog: MatDialog,
    public _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.restoreData();
  }
  
  private restoreData(): void {
    this.loader.showLoader = true;
    this.subs.push(this.status.getStatus(this.url).subscribe(data=>{
      this.loader.showLoader = false;
      this.dataSource = data;
    }));
  }

  public onRefresh(): void {
    this.restoreData();
  }

  public clearText(input: any){
    input.value = '';
    this.searchText = '';
  }

  ngOnDestroy(){
    this.subs.forEach(sub=> sub.unsubscribe());
  }

  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  public resetStudentPassword(rollNo: number){
    const payload = {
      password: DEFAULT_PASSWORD
    }
    const sub = this.rs.changePassword(this.url + `/reset/${rollNo}`, payload).subscribe(
      (data)=> {
        this.openSnackBar(data['message'], 'close');
      },
      (err)=> {
        this.openSnackBar(err['message'], 'close');
      }
    )

    this.subs.push(sub);
  }

  public openDialog(rollNo: number): void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        warningMsg: "Are you sure you that you want to delete Student's record?",
        confirmed: true
      }
    });

    this.subs.push(dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.confirmed){
          this.loader.showLoader = true;
          const sub = this.status.deleteStudentRecord(this.url + `/student/${rollNo}`).subscribe(
            (result)=>{
              this.loader.showLoader = false;
              this.openSnackBar(result.message,'close');
              this.restoreData();
            },
            (err)=>{
              this.loader.showLoader = false;
              this.openSnackBar(result.message, 'close');
            }
          );
          this.subs.push(sub);
        } else {
          this.loader.showLoader = false;
        }
      }
  }));
}

  public deleteStudent(rollNo: number): void {
    this.openDialog(rollNo);
  }

}
