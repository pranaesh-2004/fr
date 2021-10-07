import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private showLoaderSub: BehaviorSubject<boolean>;
  public showLoader$: Observable<boolean>;

  set showLoader(isLoading: boolean){
    this.showLoaderSub.next(isLoading);
  }

  get showLoader(): boolean{
    return this.showLoaderSub.value;
  }

  constructor() {
    this.showLoaderSub = new BehaviorSubject<boolean>(false);
    this.showLoader$ = this.showLoaderSub.asObservable().pipe(distinctUntilChanged(),shareReplay(1));
  }
}
