import { Component, OnInit } from '@angular/core';
import {Account} from "./model/account.model";
import { AuthenticationService } from './service/auth.service';

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
      private authService: AuthenticationService,
  ) {}

  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.account);
      this.urlModifyCompany = '/modifycompany/' + this.account.id;
      if (this.account !== null) {
          this.logged = true;
          this.roleCandidate = false;
          this.roleEmployer = false;
          this.roleManager = false;
          if (this.account.authorities[0] === 'ROLE_CANDIDATE')    this.roleCandidate = true;
          else if(this.account.authorities[0] === 'ROLE_EMPLOYER') this.roleEmployer = true;
          else if(this.account.authorities[0] === 'ROLE_MANAGER')  this.roleManager = true;
      } else this.logged = false;
  }

  onLogout(){
      this.authService.logout();
  }
}
