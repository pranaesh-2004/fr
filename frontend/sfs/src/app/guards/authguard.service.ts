import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  canActivate(){
    let sessionKey = sessionStorage.getItem('user');
    if(sessionKey){
      return true
    }
    this.router.navigate(['./login']);
    return false;
  }
  constructor(private router: Router) { }
}
