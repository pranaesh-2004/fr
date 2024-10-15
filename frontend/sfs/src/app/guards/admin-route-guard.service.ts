import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../model/sessionInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuardService implements CanActivate {

  canActivate(){
    let sessionKey: any = sessionStorage.getItem('user');
    sessionKey = JSON.parse(sessionKey);
    if(sessionKey && (sessionKey?.isAdmin) && !sessionKey?.rollNo){
      return true
    }
    this.router.navigate(['./nodatafound']);
    return false;
  }
  constructor(private router: Router) { }
}
