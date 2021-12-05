import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/model/Teacher';
import { LoaderService } from '../../services/loader.service';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrls: ['./add-teachers.component.scss']
})
export class AddTeachersComponent implements OnInit {

  public isFormVisible: boolean = false;
  public teachersInfo: Teacher;
  private subs:Array<Subscription> = [];

  private baseUrl: string = 'http://localhost:8000/students/';

  public toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  @ViewChild('formData') formData: any;
  constructor(private rs: RegisterService, public loader: LoaderService, private _snackbar: MatSnackBar) {
    this.teachersInfo = new Teacher();
  }

  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  public getTeacherDetails(e: Event): void {
    e.preventDefault();
    if(this.isValidForm()){
      const payload = {
        'teacherId': this.teachersInfo.teacherId,
        'name': this.teachersInfo.name,
        'rating': this.teachersInfo.rating
      }
      this.loader.showLoader = true;
      const sub = this.rs.registerTeacher(this.baseUrl + 'teacher', payload).subscribe((data)=>{
        this.openSnackBar("Teachers data submitted successfully", 'close');
        this.loader.showLoader = false;
      },
      (err)=>{
        this.loader.showLoader = false;
        this.openSnackBar("Error occurred while saving Teachers data", 'close'); 
      });
      this.subs.push(sub);
      this.teachersInfo = new Teacher();
    } else{
      this.loader.showLoader = false;
      this.openSnackBar("Please enter valid Teachers data", 'close');
    }
  }

  private isValidForm(): boolean{
    if(this.formData.form.status === 'VALID' && this.teachersInfo.teacherId>0){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
  }

}
