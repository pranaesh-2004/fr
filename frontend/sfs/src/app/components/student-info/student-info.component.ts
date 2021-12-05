import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  public studentForm: FormGroup;
  private studentInfo: any;

  constructor() {
    this.studentInfo = this.getSessionInfo(); 
    this.studentForm = new FormGroup({
      name: new FormControl({value: this.studentInfo.name, disabled: true}, [Validators.required, Validators.minLength(2)]),
      rollNo: new FormControl({value: this.studentInfo.rollNo, disabled: true}, [Validators.required, Validators.minLength(1)]),
      cls: new FormControl('', Validators.required),
      div: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required)
    })
  }

  public getSessionInfo(): any {
    const studentInfo:any = (JSON.parse(sessionStorage.getItem('user') || '{}'));
    return studentInfo;
  }

  public resetForm(): void {
    this.studentForm.reset({
      name: this.studentInfo.name,
      rollNo : this.studentInfo.rollNo,
      cls: '',
      div: '',
      branch: ''
    });
  }

  public onSubmit(form: any): void {
    form.preventDefault();
  }

  ngOnInit(): void {
  }

}
