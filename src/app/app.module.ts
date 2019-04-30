import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {routing} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobComponent } from './job/job.component';
import { AddjobComponent } from './addjob/addjob.component';
import { LoginComponent } from './login/login.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { ResumeComponent } from './resume/resume.component';
import { BookmarkedjobComponent } from './bookmarkedjob/bookmarkedjob.component';
import { NortificationsComponent } from './nortifications/nortifications.component';
import { ManageapplicationsComponent } from './manageapplications/manageapplications.component';
import { JobalertsComponent } from './jobalerts/jobalerts.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BrowseresumesComponent } from './browseresumes/browseresumes.component';
import { ManageresumesComponent } from './manageresumes/manageresumes.component';
import { AddresumeComponent } from './addresume/addresume.component';
import { DetailCandidateComponent } from './detail-candidate/detail-candidate.component';
import { PopupviewcontactComponent } from './popupviewcontact/popupviewcontact.component';
import { ModifyresumeComponent } from './modifyresume/modifyresume.component';
import { ManageapplicationdetailComponent } from './manageapplicationdetail/manageapplicationdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    JobComponent,
    AddjobComponent,
    LoginComponent,
    JobdetailComponent,
    ResumeComponent,
    BookmarkedjobComponent,
    NortificationsComponent,
    ManageapplicationsComponent,
    JobalertsComponent,
    ChangepasswordComponent,
    BrowseresumesComponent,
    ManageresumesComponent,
    AddresumeComponent,
    DetailCandidateComponent,
    PopupviewcontactComponent,
    ModifyresumeComponent,
    ManageapplicationdetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
