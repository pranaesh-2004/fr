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

  set isFeedbackReset(val: boolean){
    this._isFeedbackReset = val;
  }

  get isFeedbackReset(): boolean{
    return this._isFeedbackReset;
  }

  private _isScoreReset: boolean = false;

  set isScoreReset(val: boolean){
    this._isScoreReset = val;
  }

  get isScoreReset(): boolean{
    return this._isScoreReset;
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
            console.log(data);
            this.openSnackBar('Reset Students feedback operation successfull', 'close');
            let sessionInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
            if(sessionInfo){
              sessionInfo = {
                ...sessionInfo,
                isFeedbackReset: true
              }
              this.isFeedbackReset = true;
            }
            sessionStorage.setItem('user', JSON.stringify(sessionInfo));
          } else{
            this.openSnackBar('Reset Students feedback operation is not successfull', 'close');
          }
          let sessionInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
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
            let sessionInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
            if(sessionInfo){
              sessionInfo = {
                ...sessionInfo,
                isScoreReset: true
              }
              sessionStorage.setItem('user', JSON.stringify(sessionInfo));
              this.isScoreReset = true;
            }
          } else {
            this.openSnackBar('Reset Teachers rating operation is not successfull', 'close');
          }
        },
          (err) => {
            this.openSnackBar('Reset Teachers rating operation is not successfull', 'close');
          })
        this.subs.push(sub2);
        break;
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
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.updateButtonStatus();
  }

  ngOnDestroy(){
    this.subs.forEach(sub=> sub.unsubscribe());
  }

}
