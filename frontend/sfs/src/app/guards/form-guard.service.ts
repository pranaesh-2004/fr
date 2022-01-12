import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FeedbackFormComponent } from '../components/feedback-form/feedback-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuardService implements CanDeactivate<FeedbackFormComponent> {

  constructor() { }

  public canDeactivate(component: FeedbackFormComponent): boolean {

    if(component.feedback){
      if(component.feedback.dirty){
        return confirm("Confirm exit?")
      }
    }
    return true;
  }
}
