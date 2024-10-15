import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeachersComponent } from './components/add-teachers/add-teachers.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './components/pagenotfound/page-not-found/page-not-found.component';
import { RatingComponent } from './components/rating/rating.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FeedbackStatusComponent } from './components/status/feedback-status/feedback-status.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { AuthguardService } from './guards/authguard.service';
import { FormGuardService } from './guards/form-guard.service';
import { StudentRouteGuardService } from './guards/student-route-guard.service';
import { AdminRouteGuardService } from './guards/admin-route-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    canActivate: [AuthguardService],
    children: [
      {
        path: 'students',
        component: FeedbackStatusComponent,
        canActivate: [StudentRouteGuardService]
      },
      {
        path: 'form',
        component: FeedbackFormComponent,
        canActivate: [StudentRouteGuardService],
        canDeactivate: [FormGuardService],
      },
      {
        path: 'rating',
        component: RatingComponent,
        canActivate: [AdminRouteGuardService]
      },
      {
        path: 'addTeachers',
        component: AddTeachersComponent,
        canActivate: [AdminRouteGuardService]
      },
      {
        path: 'student-info',
        component: StudentInfoComponent,
        canActivate: [StudentRouteGuardService]
      },
      {
        path: 'resetpwd',
        component: ResetPasswordComponent,
        canActivate: [StudentRouteGuardService]
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
