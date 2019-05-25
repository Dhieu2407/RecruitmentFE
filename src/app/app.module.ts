import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {routing} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
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
import { PopupviewcontactComponent } from './popupviewcontact/popupviewcontact.component';
import { ModifyresumeComponent } from './modifyresume/modifyresume.component';
import { ManageapplicationdetailComponent } from './manageapplicationdetail/manageapplicationdetail.component';
import { ModifyCompanyInfoComponent } from './modify-company-info/modify-company-info.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { DetailresumeComponent } from './detailresume/detailresume.component';
import { ManageRecruitmentComponent} from './manage-recruitment/manage-recruitment.component';
import { ManagejobComponent} from './managejob/managejob.component';
import { ManagejobdetailComponent } from './managejobdetail/managejobdetail.component';
import { ManageEditJobdetailComponent } from './manage-edit-jobdetail/manage-edit-jobdetail.component';
import { SavedcompanyComponent } from './savedcompany/savedcompany.component';
import { ViewCandidateAccountComponent } from './view-candidate-account/view-candidate-account.component';
import { ViewEmployerAccountComponent } from './view-employer-account/view-employer-account.component';
import { BrowsercompanyComponent } from './browsercompany/browsercompany.component';
import { DetailcompanyComponent } from './detailcompany/detailcompany.component';
import { SavedcandidateComponent } from './savedcandidate/savedcandidate.component';
import { CandidateNotificationComponent } from './candidate-notification/candidate-notification.component';
import { ApproveresumeapplyComponent } from './approveresumeapply/approveresumeapply.component';

@NgModule({
  declarations: [
    AppComponent,
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
    PopupviewcontactComponent,
    ModifyresumeComponent,
    ManageapplicationdetailComponent,
    ModifyCompanyInfoComponent,
    AppliedJobComponent,
    CompanyDetailComponent,
    DetailresumeComponent,
    SavedcompanyComponent,
    ManageRecruitmentComponent,
    ManagejobComponent,
    ManagejobdetailComponent,
    ManageEditJobdetailComponent,
    ViewCandidateAccountComponent,
    ViewEmployerAccountComponent,
    BrowsercompanyComponent,
    DetailcompanyComponent,
    SavedcandidateComponent,
    CandidateNotificationComponent,
    ApproveresumeapplyComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
