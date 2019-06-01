import { Component, OnInit } from '@angular/core';
import {Account} from "./model/account.model";
import { AuthenticationService } from './service/auth.service';
import {Router} from '@angular/router';
import {CandidateService} from './service/candidate.service';
import {first} from "rxjs/operators";
import { CompanyService } from './service/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [AuthenticationService]
})
export class AppComponent implements OnInit {

  title = 'RecruitmentFE';
  account = new Account();
  logged = false;
  roleCandidate: boolean;
  roleEmployer: boolean;
  roleManager: boolean;
  urlModifyCompany: string;
  constructor(
      private router: Router,
      private candidateService: CandidateService,
      private authService: AuthenticationService,
      private companyService: CompanyService,
  ) {}

  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.account);
      if (this.account !== null) {
          this.urlModifyCompany = '/modifycompany/' + this.account.id;
          this.logged = true;
          this.roleCandidate = false;
          this.roleEmployer = false;
          this.roleManager = false;
          if (this.account.authorities[0] === 'ROLE_CANDIDATE')    this.roleCandidate = true;
          else if(this.account.authorities[0] === 'ROLE_EMPLOYER') this.roleEmployer = true;
          else if(this.account.authorities[0] === 'ROLE_MANAGER')  this.roleManager = true;
      } else this.logged = false;
      if(this.roleCandidate === true){
          this.candidateService.getCandidate(this.account.id)
              .pipe(first())
              .subscribe(
                  (data) => {
                      if(data === null){
                          this.router.navigate(['/modifyresume/' + this.account.id]);
                      }
                  },
                  error => {
                      console.log(error);
                  });
      }
      else if(this.roleEmployer === true){
          this.companyService.getCompany(this.account.id)
              .pipe(first())
              .subscribe(
                  (data) => {
                      if(data === null){
                          this.router.navigate(['/modifycompany/' + this.account.id]);
                      }
                  },
                  error => {
                      console.log(error);
                  });
      }
  }

  onLogout(){
      this.authService.logout();
  }
}
