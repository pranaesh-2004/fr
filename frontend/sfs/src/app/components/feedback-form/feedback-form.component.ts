import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, take } from 'rxjs/operators';
import { FormGuardService } from 'src/app/guards/form-guard.service';
import { Students } from 'src/app/model/students';
import { Teacher } from 'src/app/model/Teacher';
import { LoaderService } from 'src/app/services/loader.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})

export class FeedbackFormComponent implements OnInit {

  @ViewChild('feedback') feedback: NgForm | any;

  public questionList: Array<string>;

  public readonly ratings: Array<string>;

  public selections: Array<any>;

  public teachersList$!: Observable<any>;

  private readonly teachersInfoEp: string = 'http://localhost:8000/students/teachers';
  
  private readonly studentInfoEp: string = 'http://localhost:8000/students/student/';

  private subs: Array<Subscription>;

  public selectedTeacherId: number;

  public isFormDisabled: boolean = false;
  
  public feedbackSubmitted: boolean = false;

  private studentInfo: Array<Students>;

  constructor(private ss: StatusService, public loader: LoaderService, private _snackbar: MatSnackBar) {
    this.questionList = [
      'Clarity of concepts and speed of delivery',
      'Relating theory with real life examples',
      'Syllabus coverage',
      'Class control and discipline',
      'Overall impact of the teacher',
    ]
    this.ratings = ['EXCELLENT', 'VERY GOOD', 'GOOD', 'AVERAGE', 'BELOW AVERAGE'];

    this.selections = new Array(this.questionList.length).fill('');
    this.subs = [];
    this.selectedTeacherId = -1;
    this.studentInfo = [];
  }

  private getStudentFeedbackStatus(): void{
    const studentInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
    if(studentInfo){
      const sub = this.ss.getStudentFeedbackStatus(this.studentInfoEp + studentInfo.rollNo).pipe(distinctUntilChanged(),shareReplay(1)).subscribe((student: any)=>{
        this.studentInfo = student;
        this.isFormDisabled = this.studentInfo[0].hasGivenFeedback;
        this.feedbackSubmitted = this.studentInfo[0].hasGivenFeedback;
      },
      (err)=> {
        this.openSnackBar('Error occurred!!'+ err, 'close');
        this.isFormDisabled = false;
      });
      this.subs.push(sub);
    }
  }

  private setStudentFeedbackStatus(): void{
    const studentInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.teachersList$ =
      this.teachersList$.pipe(map((teachers: Teacher[]) => {
        if(teachers.filter(teacher=> teacher.isSurvayDone === true).length === teachers.length){
          this.updateStudentFeedbackStatus(studentInfo.rollNo);
          studentInfo.hasGivenFeedback = true;
          this.isFormDisabled = true;
          this.feedbackSubmitted = true;
        }
        return teachers;
      }),
      distinctUntilChanged(),
      shareReplay(1))
  }

  private updateStudentFeedbackStatus(id: number): void{
    const sub = this.ss.updateStudentFeedbackStatus(this.studentInfoEp +id).subscribe((data)=> {
      if(data){
        this.openSnackBar("Your feedback is submitted Successfully", 'close');
        this.feedbackSubmitted = true;
      }
    },
    (err)=>{
      this.openSnackBar("Error occurred during submitting your feedback", 'close');
      this.feedbackSubmitted = false;
    });
    this.subs.push(sub);
  }


  public storeFeedback(event: Event): void {
    event.preventDefault();
    if (this.isFormValid()) {
      this.completeSurvay();
      this.setStudentFeedbackStatus();
      this.openSnackBar("Form Submitted Successfully!", "close");
    } else {
      this.openSnackBar("Please fill values in all fields", "close");
    }
  }

  public isDoneWithSurvay(): boolean {
    return this.feedbackSubmitted;
  }

  ngOnInit(): void {
    this.loader.showLoader = true;
    this.getStudentFeedbackStatus();
    this.teachersList$ = this.ss.getTeachersInfo(this.teachersInfoEp).pipe(shareReplay(1));
    this.loader.showLoader = false;
  }

  private completeSurvay(): void {
    this.teachersList$ =
      this.teachersList$.pipe(map((teacher: Teacher[]) => {
        const selectedTeacher: any = teacher.find((t) => t.teacherId === this.selectedTeacherId)
        selectedTeacher.isSurvayDone = true;
        this.feedback.resetForm();
        return teacher;
      }),
      shareReplay(1));
  }

  private isFormValid(): boolean {
    return this.feedback.form.status === 'VALID' ? true : false;
  }


  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
