import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { AddjobComponent } from './addjob/addjob.component';
import { LoginComponent } from './login/login.component';
import { ResumeComponent } from './resume/resume.component';
import { BookmarkedjobComponent } from './bookmarkedjob/bookmarkedjob.component';
import { NortificationsComponent } from './nortifications/nortifications.component';
import { ManageapplicationsComponent } from './manageapplications/manageapplications.component';
import { ManageresumesComponent } from './manageresumes/manageresumes.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BrowseresumesComponent } from './browseresumes/browseresumes.component';
import { ManageRecruitmentComponent } from './manage-recruitment/manage-recruitment.component';
import { ManagejobComponent } from './managejob/managejob.component';
import { ViewCandidateAccountComponent } from './view-candidate-account/view-candidate-account.component';
import { ViewEmployerAccountComponent } from './view-employer-account/view-employer-account.component';
import {PopupviewcontactComponent} from './popupviewcontact/popupviewcontact.component';
import { ModifyresumeComponent } from './modifyresume/modifyresume.component';
import { ManageapplicationdetailComponent } from './manageapplicationdetail/manageapplicationdetail.component';
import { ModifyCompanyInfoComponent } from './modify-company-info/modify-company-info.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { DetailresumeComponent} from './detailresume/detailresume.component';
import { ManagejobdetailComponent} from './managejobdetail/managejobdetail.component';
import { ManageEditJobdetailComponent} from './manage-edit-jobdetail/manage-edit-jobdetail.component';
import { SavedcompanyComponent } from './savedcompany/savedcompany.component';
import { BrowsercompanyComponent} from './browsercompany/browsercompany.component';
import { DetailcompanyComponent} from './detailcompany/detailcompany.component';
import { SavedcandidateComponent } from './savedcandidate/savedcandidate.component';
import { CandidateNotificationComponent } from './candidate-notification/candidate-notification.component';
import {ApproveresumeapplyComponent} from './approveresumeapply/approveresumeapply.component';
import {AuthGuardService} from "./service/auth-guard.service";
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'job', component: JobComponent },
  { path: 'jobdetail/:id/:idMajor', component: JobdetailComponent},
  { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuardService]},
    { path: 'activate', component: ActivateComponent},

  // Role Candidate
  { path: 'manageresumes', component: ManageresumesComponent, canActivate: [AuthGuardService]},
  { path: 'modifyresume/:id', component: ModifyresumeComponent, canActivate: [AuthGuardService]},
  { path: 'resume/:id', component: ResumeComponent, canActivate: [AuthGuardService]},
  { path: 'bookmarkedjob', component: BookmarkedjobComponent, canActivate: [AuthGuardService]},
  { path: 'browsercompany' , component: BrowsercompanyComponent, canActivate: [AuthGuardService]},
  { path: 'detailcompany/:id', component: DetailcompanyComponent, canActivate: [AuthGuardService]},
    { path: 'candidatenotification', component: CandidateNotificationComponent },

  // Role Employer
  { path: 'addjob', component: AddjobComponent, canActivate: [AuthGuardService]},
  { path: 'manageapplications', component: ManageapplicationsComponent, canActivate: [AuthGuardService]},
  {path: 'manageapplicationdetail/:id', component: ManageapplicationdetailComponent , canActivate: [AuthGuardService]},
  { path: 'nortifications', component: NortificationsComponent, canActivate: [AuthGuardService]},
  { path: 'browseresumes', component: BrowseresumesComponent, canActivate: [AuthGuardService]},
  { path: 'modifycompany/:id', component: ModifyCompanyInfoComponent, canActivate: [AuthGuardService]},
  { path: 'managejobdetail/:id' , component: ManagejobdetailComponent, canActivate: [AuthGuardService]},
  { path: 'manageeditjobdetail/:id' , component: ManageEditJobdetailComponent, canActivate: [AuthGuardService]},
    { path: 'savedcandidate', component: SavedcandidateComponent },
    {path: 'approveresumeapply/:id/:idJob' , component: ApproveresumeapplyComponent},

  // Role Manager
  { path: 'manage-recruitment', component: ManageRecruitmentComponent, canActivate: [AuthGuardService] },
  { path: 'view-candidate-account', component: ViewCandidateAccountComponent, canActivate: [AuthGuardService] },
  { path: 'view-employer-account', component: ViewEmployerAccountComponent, canActivate: [AuthGuardService] },

  // ??
  { path: 'appliedjobs', component: AppliedJobComponent, canActivate: [AuthGuardService] },
  { path: 'companydetail/:id', component: CompanyDetailComponent, canActivate: [AuthGuardService] },
  { path: 'popupcandidate', component: PopupviewcontactComponent, canActivate: [AuthGuardService] },
  { path: 'managejob' , component: ManagejobComponent, canActivate: [AuthGuardService]},
  { path: 'detailresume/:id', component: DetailresumeComponent, canActivate: [AuthGuardService]},
  { path: 'savedcompany' , component: SavedcompanyComponent, canActivate: [AuthGuardService] },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
export const routing = RouterModule.forRoot(routes);
