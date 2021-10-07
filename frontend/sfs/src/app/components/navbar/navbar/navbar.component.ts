import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navItemsList: Array<any> = [];
  constructor(private router: Router,
              private activeRoute : ActivatedRoute,
              private navService: NavigationService
    ) { }
  public navigateToRoute(route: string) : void{
    this.router.navigate(['feedback'], {
      relativeTo: this.activeRoute
    });
  }

  ngOnInit(): void {
    this.navItemsList = this.navService.getNavItemList();
  }

}
