import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './widgets/mat-dialog/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login/login.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout/main-layout.component';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { RegisterService } from './services/register.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header/header.component';
import { FeedbackStatusComponent } from './components/status/feedback-status/feedback-status.component';
import { PageNotFoundComponent } from './components/pagenotfound/page-not-found/page-not-found.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { RatingComponent } from './components/rating/rating.component';
import { FeedbackSubmittedComponent } from './components/feedback-submitted/feedback-submitted.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ResetDialogComponent } from './widgets/mat-dialog/reset-dialog/reset-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { AddTeachersComponent } from './components/add-teachers/add-teachers.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { DetailsComponent } from './components/details/details.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { WarningDialogComponent } from './widgets/mat-dialog/warning-dialog/warning-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LoginComponent,
    NavbarComponent,
    MainLayoutComponent,
    HeaderComponent,
    FeedbackStatusComponent,
    PageNotFoundComponent,
    FeedbackFormComponent,
    RatingComponent,
    FeedbackSubmittedComponent,
    SettingsComponent,
    ResetDialogComponent,
    HomeComponent,
    AddTeachersComponent,
    ConfirmationDialogComponent,
    StudentInfoComponent,
    FilterPipe,
    DetailsComponent,
    ResetPasswordComponent,
    WarningDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent, HomeComponent]
})
export class AppModule { }
