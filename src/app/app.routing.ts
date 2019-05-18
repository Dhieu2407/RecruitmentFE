import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { JobComponent } from "./job/job.component";
import { JobdetailComponent } from "./jobdetail/jobdetail.component";
import { AddjobComponent } from "./addjob/addjob.component";
import { LoginComponent } from "./login/login.component";
import { ResumeComponent } from "./resume/resume.component";
import { JobalertsComponent } from "./jobalerts/jobalerts.component";
import { BookmarkedjobComponent } from "./bookmarkedjob/bookmarkedjob.component";
import { NortificationsComponent } from "./nortifications/nortifications.component";
import { ManageapplicationsComponent } from "./manageapplications/manageapplications.component";
import { ManageresumesComponent } from "./manageresumes/manageresumes.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { BrowseresumesComponent } from "./browseresumes/browseresumes.component";
import { ManageRecruitmentComponent } from "./manage-recruitment/manage-recruitment.component";
import { ManagejobComponent } from "./managejob/managejob.component";
import { ViewCandidateAccountComponent } from "./view-candidate-account/view-candidate-account.component";
import { ViewEmployerAccountComponent } from "./view-employer-account/view-employer-account.component";

//phucnh
import { PopupviewcontactComponent } from "./popupviewcontact/popupviewcontact.component";
import { ModifyresumeComponent } from "./modifyresume/modifyresume.component";
import { ManageapplicationdetailComponent } from "./manageapplicationdetail/manageapplicationdetail.component";
import { ModifyCompanyInfoComponent } from "./modify-company-info/modify-company-info.component";
import { AppliedJobComponent } from "./applied-job/applied-job.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { DetailresumeComponent } from "./detailresume/detailresume.component";
import { ManagejobdetailComponent } from "./managejobdetail/managejobdetail.component";
import { ManageEditJobdetailComponent } from "./manage-edit-jobdetail/manage-edit-jobdetail.component";
import { SavedcompanyComponent } from "./savedcompany/savedcompany.component";
import { SavedcandidateComponent } from './savedcandidate/savedcandidate.component';
import { CandidateNotificationComponent } from './candidate-notification/candidate-notification.component';
//phucnh

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "job", component: JobComponent },
    { path: "jobdetail/:id/:idMajor", component: JobdetailComponent },
    { path: "addjob", component: AddjobComponent },
    { path: "jobalerts", component: JobalertsComponent },
    { path: "resume/:id", component: ResumeComponent },
    { path: "bookmarkedjob", component: BookmarkedjobComponent },
    { path: "nortifications", component: NortificationsComponent },
    { path: "manageapplications", component: ManageapplicationsComponent },
    { path: "manageresumes", component: ManageresumesComponent },
    { path: "changepassword", component: ChangepasswordComponent },
    { path: "browseresumes", component: BrowseresumesComponent },
    { path: "modifyresume/:id", component: ModifyresumeComponent },
    { path: "modifycompany/:id", component: ModifyCompanyInfoComponent },
    { path: "appliedjobs", component: AppliedJobComponent },
    { path: "companydetail/:id", component: CompanyDetailComponent },
    { path: "manage-recruitment", component: ManageRecruitmentComponent },
    { path: "view-candidate-account", component: ViewCandidateAccountComponent },
    { path: "view-employer-account", component: ViewEmployerAccountComponent },

    //phucnh { path: 'product-details/:id', component: ProductDetails }
    { path: "popupcandidate", component: PopupviewcontactComponent },
    { path: "manageapplicationdetail/:id", component: ManageapplicationdetailComponent },
    { path: "managejob", component: ManagejobComponent },
    { path: "detailresume/:id", component: DetailresumeComponent },
    { path: "managejobdetail/:id", component: ManagejobdetailComponent },
    { path: "manageeditjobdetail/:id", component: ManageEditJobdetailComponent },
    { path: "savedcompany", component: SavedcompanyComponent },
    { path: "manageapplicationdetail/:id", component: ManageapplicationdetailComponent },
    { path: "managejob", component: ManagejobComponent },
    { path: "detailresume/:id", component: DetailresumeComponent },
    { path: "managejobdetail/:id", component: ManagejobdetailComponent },
    { path: "manageeditjobdetail/:id", component: ManageEditJobdetailComponent },
    { path: "savedcandidate", component: SavedcandidateComponent },
    { path: "candidatenotification", component: CandidateNotificationComponent },
    //phucnh

    { path: "**", redirectTo: "/home", pathMatch: "full" }
];
export const routing = RouterModule.forRoot(routes);
