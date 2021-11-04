import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, throwError } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { DialogComponent } from 'src/app/widgets/mat-dialog/dialog/dialog.component';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Students } from 'src/app/model/students';
import { Admin } from 'src/app/model/Admin';
import { LoaderService } from 'src/app/services/loader.service';

export interface DialogData {
  rollNo: number;
  name: string;
  password: string;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RegisterService]
})
export class LoginComponent implements OnInit {

  public data: any;
  public studentInfo: Students;
  public adminInfo: Admin;
  public isAdminUser: boolean = false;
  public pwdType: string = 'password';
  @ViewChild('formData') formData: any;


  private readonly baseUrl: string = 'http://localhost:8000/students/';
  private subs: Array<Subscription> = [];
  constructor(
    public dialog: MatDialog,
    public _snackbar: MatSnackBar,
    private rs: RegisterService,
    private router: Router,
    public loader: LoaderService
  ) {
    this.data = null;
    this.studentInfo = new Students();
    this.adminInfo = new Admin();
  }

  public openDialog(): void {
    this.data = {
      name: '',
      rollNo: 0,
      password: ''
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.data.name, rollNo: this.data.rollNo, password: this.data.password }
    });

    this.subs.push(dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      if (this.data && this.data.name !== '' && this.data.password != '' && this.data.rollNo > 0) {
        this.loader.showLoader = true;
        this.subs.push(this.rs.registerStudent(this.baseUrl, this.data).pipe(
          catchError(err => throwError(err))
        ).subscribe(result => {
          this.loader.showLoader = false;
          this.openSnackBar(result['message'], 'close');
        },
          err => {
            this.loader.showLoader = false;
            this.openSnackBar(err.message, 'close');
          }))
      }
    }));
  }

  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  public login(e: Event) {
    const loginUrl = this.baseUrl + 'student/';
    const adminLoginUrl = this.baseUrl + 'admin/';
    e.preventDefault();

    let payload = {};

    if (this.isAdminUser) {
      payload = {
        name: this.adminInfo.name,
        password: this.adminInfo.password
      }
    } else {
      payload = {
        name: this.studentInfo.name,
        rollNo: this.studentInfo.rollNo,
        password: this.studentInfo.password
      }
    }

    if (this.isAdminUser) {
      if (this.validateForm() && this.formData.form.status === 'VALID') {
        this.loader.showLoader = true;
        this.subs.push(this.rs.authenticate(adminLoginUrl, payload).subscribe(res => {
          if (res.registered) {
            if (this.adminInfo.name) {
              this.loader.showLoader = false;
              sessionStorage.setItem('user', JSON.stringify({'name': this.adminInfo.name, 'isAdmin': true}));
              this.openSnackBar("Welcome " + this.adminInfo.name + "!!", "close");
              this.clearForm();
              this.router.navigate(["./home"]);
            }
          } else {
            this.loader.showLoader = false;
            this.openSnackBar("You have entered invalid login credentials", "close");
          }
        },
        (err)=>{
          this.loader.showLoader = false;
          this.openSnackBar("Error occurred while authentication", 'close');
        }))
      } else {
        this.loader.showLoader = false;
        this.openSnackBar("Please fill valid details!!", "close");
      }
    } else {
      if (this.validateForm() && this.formData.form.status === 'VALID') {
        this.loader.showLoader = true;
        this.subs.push(this.rs.authenticate(loginUrl, payload).subscribe(res => {
          if (res.registered) {
            if (this.studentInfo.name) {
              this.loader.showLoader = false;
              sessionStorage.setItem('user', JSON.stringify({'name':this.studentInfo.name, 'rollNo': this.studentInfo.rollNo, 'isAdmin': this.isAdminUser}));
              this.openSnackBar("Welcome " + this.studentInfo.name + "!!", "close");
              this.clearForm();
              this.router.navigate(["./home"]);
            }
          } else {
            this.loader.showLoader = false;
            this.openSnackBar("You have entered invalid login credentials", "close");
          }
        },
        (err)=>{
          this.loader.showLoader = false;
          this.openSnackBar("Error occurred while authentication", 'close');
        }))
      } else {
        this.loader.showLoader = false;
        this.openSnackBar("Please fill valid details!!", "close");
      }
    }
  }

  private validateForm(): boolean {
    if (this.isAdminUser) {
      if (this.adminInfo && this.adminInfo.name !== '' && this.adminInfo.password != '') {
        return true
      }
      return false;
    } else {
      if (this.studentInfo && this.studentInfo.name !== '' && this.studentInfo.password != '' && this.studentInfo.rollNo > 0) {
        return true
      }
      return false;
    }
  }

  private clearForm(): void {
    this.studentInfo = new Students();
    this.adminInfo = new Admin();
  }

  public toggleUser() {
    this.isAdminUser = !this.isAdminUser;
  }

  public togglePwdType() {
    this.pwdType = this.pwdType === 'password'? 'text' : 'password';
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}

