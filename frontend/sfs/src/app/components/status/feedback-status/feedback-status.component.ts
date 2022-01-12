import { SplitInterpolation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { StatusService } from 'src/app/services/status.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-feedback-status',
  templateUrl: './feedback-status.component.html',
  styleUrls: ['./feedback-status.component.scss']
})
export class FeedbackStatusComponent implements OnInit {
  public displayedColumns: string[] = ['rollNo','name','hasGivenFeedback', 'refresh'];
  public dataSource: any;
  public searchText: string = '';
  private subs: Array<Subscription> = [];
  private readonly url: string = 'http://localhost:8000/students/';

  constructor(private status: StatusService, public loader: LoaderService) { }

  ngOnInit(): void {
    this.restoreData();
  }
  
  private restoreData(): void {
    this.loader.showLoader = true;
    this.subs.push(this.status.getStatus(this.url).subscribe(data=>{
      this.loader.showLoader = false;
      this.dataSource = data;
    }));
  }

  public onRefresh(): void {
    this.restoreData();
  }

  ngOnDestroy(){
    this.subs.forEach(sub=> sub.unsubscribe());
  }

}
