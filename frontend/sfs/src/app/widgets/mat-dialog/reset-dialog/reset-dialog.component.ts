import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent implements OnInit {

  private readonly baseUrl: string = 'http://localhost:8000/students/';
  private subs: Array<Subscription> = [];
  private _isFeedbackReset: boolean = false;
  private _isScoreReset: boolean = false;
  private _isPasswordReset: boolean = false;

  set isFeedbackReset(val: boolean){
    this._isFeedbackReset = val;
  }

  get isFeedbackReset(): boolean{
    return this._isFeedbackReset;
  }


  set isScoreReset(val: boolean){
    this._isScoreReset = val;
  }

  get isScoreReset(): boolean{
    return this._isScoreReset;
  }

  set isPasswordReset(val: boolean){
    this._isPasswordReset = val;
  }

  get isPasswordReset(): boolean {
    return this._isPasswordReset;
  }

  constructor(
    public dialogRef: MatDialogRef<ResetDialogComponent>,
    private ss: StatusService,
    public _snackbar: MatSnackBar,
    public loader: LoaderService
  ) { }

  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  public resetValues(value: any): void {
    this.loader.showLoader = true;
    switch (value) {
      case "resetFeedbacks":
        const sub1 = this.ss.resetStudentsFeedback(this.baseUrl + 'reset/feedback').pipe(
          exhaustMap(() => this.ss.resetStudentsFeedback(this.baseUrl + 'reset/feedback'))
        ).subscribe((data) => {
          if (data) {
            this.isFeedbackReset = true;
            this.openSnackBar('Reset Students feedback operation successfull', 'close');
          } else{
            this.openSnackBar('Reset Students feedback operation is not successfull', 'close');
          }
        },
          (err) => {
            this.openSnackBar('Reset feedback operation is not successfull', 'close');
          })
        this.subs.push();
        break;
      case "resetScore":
        const sub2 = this.ss.resetTeachersRating(this.baseUrl + 'reset/scores').pipe(
          exhaustMap(() => this.ss.resetTeachersRating(this.baseUrl + 'reset/scores'))
        ).subscribe((data) => {
          if (data) {
            this.openSnackBar('Reset Teachers rating operation successfull', 'close');
            this.isScoreReset = true;
          } else {
            this.openSnackBar('Reset Teachers rating operation is not successfull', 'close');
          }
        },
          (err) => {
            this.openSnackBar('Reset Teachers rating operation is not successfull', 'close');
          })
        this.subs.push(sub2);
        break;
        case 'resetPassword':
          const sub3 = this.ss.resetAllPasswords(this.baseUrl + '/reset/password/all').subscribe(
            (data)=> {
              this.openSnackBar(data['message'], 'close');
              this.isPasswordReset = true;
            },
            err => {
              this.openSnackBar(err['message'], 'close');
            }
          )
    }
    this.loader.showLoader = false;
  }

  private updateButtonStatus(){
    const sessionInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
    if(sessionInfo){
      if(sessionInfo.isScoreReset){
        this.isScoreReset = true;
      }
      if(sessionInfo.isFeedbackReset){
        this.isFeedbackReset = true;
      }
      if(sessionInfo.isPasswordReset){
        this.isPasswordReset = true;
      }
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.updateButtonStatus();
  }

  private saveState(): void {
    const sessionInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
    if(sessionInfo){
      sessionInfo.isScoreReset = this.isScoreReset;
      sessionInfo.isFeedbackReset = this.isFeedbackReset;
      sessionInfo.isPasswordReset = this.isPasswordReset;
      sessionStorage.setItem('user', JSON.stringify(sessionInfo));
    }
  }

  ngOnDestroy(){
    this.saveState();
    this.subs.forEach(sub=> sub.unsubscribe());
  }

}
