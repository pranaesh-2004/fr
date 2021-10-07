import { Injectable } from '@angular/core';
import { AdminNavItems, NonAdminNavItem } from '../model/NavItems';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  getNavItemList(): Array<any> | any{
    const sessionInfo = JSON.parse(sessionStorage.getItem('user') || '{}')
    if(sessionInfo){
      if(sessionInfo.isAdmin){
        return AdminNavItems;
      } else {
        return NonAdminNavItem
      }
    }
  }
  constructor() { }
}
