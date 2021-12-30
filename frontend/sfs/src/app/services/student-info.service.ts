import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  constructor(private http: HttpClient) { }

  public getStudentInfo(url: string): Observable<any> {
    return this.http.get(url).pipe(catchError(err=> throwError(err)));
  }

  public submitStudentInfo(url: string, payload: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.put(url, payload, httpOptions).pipe(catchError(err=> throwError(err)));
  }
}
