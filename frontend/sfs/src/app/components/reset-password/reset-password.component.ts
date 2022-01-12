import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  public form: FormGroup | undefined;
  private subs: Array<Subscription> = [];
  private readonly url: string = 'http://localhost:8000/students/reset/';

  constructor(private fb: FormBuilder, private rs: RegisterService, private _snackbar: MatSnackBar) {
    const passWordValidator = (fg: FormGroup)=> {
      const newPsw: AbstractControl | null = fg.get('newPassWord');
      const confPsw: AbstractControl | null = fg.get('confPassWord');

      if(newPsw?.valid && confPsw?.valid){
        if(newPsw.value === confPsw.value){
          return null;
        } else return {length : true}
      }
      return null;
    }
    this.form = this.fb.group({
      'newPassWord': ['', [Validators.required,Validators.minLength(4)]],
      'confPassWord': ['', [Validators.required, Validators.minLength(4)]]
    },{
      validator: passWordValidator
    })
  }

  public onSubmit(): void{
    const sessionData = JSON.parse(sessionStorage.getItem('user') || '{}');

    if(sessionData){
      const rollNo = sessionData.rollNo;
      const payload = {
        password: this.form?.value['newPassWord']
      }
      const sub = this.rs.changePassword(`${this.url}${rollNo}`, payload).subscribe(
        res=> {
          this.openSnackBar(res['message'], 'close');
          this.form?.reset();
        }
      )
      this.subs.push(sub);
    }
  }

  public openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }

  ngOnDestroy(){
    this.subs.forEach(sub=> sub.unsubscribe())
  }
}
