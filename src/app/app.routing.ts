import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from './test/test.component';
import {HomeComponent} from './home/home.component';
import {JobComponent} from './job/job.component';
import {JobdetailComponent} from './jobdetail/jobdetail.component';
import {AddjobComponent} from './addjob/addjob.component';
import {AddresumeComponent} from './addresume/addresume.component';
import {LoginComponent} from './login/login.component';
import {ResumeComponent} from './resume/resume.component';
import {JobalertsComponent} from './jobalerts/jobalerts.component';
import {BookmarkedjobComponent} from './bookmarkedjob/bookmarkedjob.component';
import {NortificationsComponent} from './nortifications/nortifications.component';
import {ManageapplicationsComponent} from './manageapplications/manageapplications.component';
import {ManageresumesComponent} from './manageresumes/manageresumes.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {BrowseresumesComponent} from './browseresumes/browseresumes.component';

//phucnh
import {DetailCandidateComponent} from './detail-candidate/detail-candidate.component';
import {PopupviewcontactComponent} from './popupviewcontact/popupviewcontact.component';
import { ModifyresumeComponent } from './modifyresume/modifyresume.component';
import { ManageapplicationdetailComponent } from './manageapplicationdetail/manageapplicationdetail.component';
//phucnh

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'job', component: JobComponent },
  { path: 'jobdetail/:id/:idMajor', component: JobdetailComponent },
  { path: 'addjob', component: AddjobComponent },
  { path: 'addresume', component: AddresumeComponent },
  { path: 'jobalerts', component: JobalertsComponent },
  { path: 'resume/:id', component: ResumeComponent },
  { path: 'bookmarkedjob', component: BookmarkedjobComponent },
  { path: 'nortifications', component: NortificationsComponent },
  { path: 'manageapplications', component: ManageapplicationsComponent },
  { path: 'manageresumes', component: ManageresumesComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'browseresumes', component: BrowseresumesComponent },
  { path: 'modifyresume/:id', component: ModifyresumeComponent },

  //phucnh { path: 'product-details/:id', component: ProductDetails }
  { path: 'detailcandidate', component: DetailCandidateComponent },
  { path: 'popupcandidate', component: PopupviewcontactComponent },
  {path: 'manageapplicationdetail/:id', component: ManageapplicationdetailComponent },
  //phucnh

  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
export const routing = RouterModule.forRoot(routes);
