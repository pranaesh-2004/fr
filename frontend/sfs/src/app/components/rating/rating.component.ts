import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public displayedColumns: string[] = ['teacherId', 'name', 'rating'];
  public dataSource: any;
  private readonly teachersInfoEndPoint: string = 'http://localhost:8000/students/teachers';
  constructor(private ss: StatusService, public loader: LoaderService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loader.showLoader = true;
    this.ss.getTeachersInfo(this.teachersInfoEndPoint).subscribe((data)=>{
      this.loader.showLoader = false;
      this.dataSource = data;
    },
    (err)=>{
      this.loader.showLoader = false;
      this.openSnackBar("Error occurred while fetching Teachers rating inforamation!",'close')
      // console.log(err);
    });
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: 'my-custom-snackbar'
    });
  }
}
