import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { StudentInfoService } from 'src/app/services/student-info.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  public studentForm: FormGroup;
  private studentInfo: any;
  private readonly url: string = 'http://localhost:8000/students/student-info/';
  private sub?: Subscription;

  constructor(private stdInfoService: StudentInfoService, private _snackbar: MatSnackBar) {
    this.studentInfo = this.getSessionInfo();
    this.studentForm = new FormGroup({
      name: new FormControl({ value: this.studentInfo.name, disabled: true }, [Validators.required, Validators.minLength(2)]),
      rollNo: new FormControl({ value: this.studentInfo.rollNo, disabled: true }, [Validators.required, Validators.minLength(1)]),
      cls: new FormControl('', Validators.required),
      div: new FormControl('', Validators.required),
      stream: new FormControl('', Validators.required)
    })
  }

  public getSessionInfo(): any {
    const studentInfo: any = (JSON.parse(sessionStorage.getItem('user') || '{}'));
    return studentInfo;
  }


  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  public resetForm(): void {
    this.studentForm?.reset({
      name: this.studentInfo.name,
      rollNo: this.studentInfo.rollNo,
      cls: '',
      div: '',
      stream: ''
    });
  }

  public onSubmit(evt: any): void {
    evt.preventDefault();
    const payload = {
      name: this.studentInfo.name,
      rollNo: this.studentInfo.rollNo,
      ...this.studentForm.value
    }

    this.stdInfoService.submitStudentInfo(this.url, payload).subscribe(() => {
      this.openSnackBar("Student's information updated successfully.", 'close');
      this.resetForm();
    });
  }

  ngOnInit(): void {
    this.sub = this.stdInfoService.getStudentInfo(this.url + this.studentInfo.rollNo).subscribe((result) => {
      if (result.length) {
        this.studentForm.get('name')?.setValue(result[0].name);
        this.studentForm.get('rollNo')?.setValue(result[0].rollNo);
        this.studentForm.get('cls')?.setValue(result[0].cls);
        this.studentForm.get('div')?.setValue(result[0].div);
        this.studentForm.get('stream')?.setValue(result[0].stream);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
