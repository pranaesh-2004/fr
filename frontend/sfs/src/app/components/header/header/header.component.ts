import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName: string;

  private setUserName(){
    const obj: any = JSON.parse(sessionStorage.getItem('user') || '{}');
    if(obj !== null){
      this.userName = obj.name.split(' ')[0];
    } else {
      this.userName = 'new user';
    } 
  }

  constructor(private router: Router) {
    this.userName = '';
   }

   public logout():void{
     sessionStorage.clear();
     this.router.navigate(['./login']);
   }

  ngOnInit(): void {
    this.setUserName();
  }

}
