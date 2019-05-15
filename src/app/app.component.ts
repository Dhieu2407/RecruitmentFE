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

  //account: Account;
  title = 'RecruitmentFE';
  account = new Account();
  logged = false;
  roleCandidate = false;
  roleEmployer = false;
  roleManager = false;
  urlModifyCompany: string;
  constructor(
      private authService: AuthenticationService,
  ) {
      // this.authService.currentUser.subscribe(x => this.account = x);
  }

  ngOnInit() {
      //this.account = JSON.parse(localStorage.getItem('currentUser'));
      // this.urlModifyCompany = '/modifycompany/' + this.account.id;
      // if (this.account === null) {
      //     this.logged = false;
      // } else {
      //     this.logged = true;
      // }
      //
      // if (this.logged === true) {
      //     if (this.account.authorities[0] === 'ROLE_CANDIDATE') {
      //         this.roleCandidate = true;
      //         this.roleEmployer = false;
      //         this.roleManager = false;
      //     } else if(this.account.authorities[0] === 'ROLE_EMPLOYER') {
      //         this.roleEmployer = true;
      //         this.roleCandidate = false;
      //         this.roleManager = false;
      //     } else if(this.account.authorities[0] === 'ROLE_MANAGER') {
      //         this.roleManager = true;
      //         this.roleEmployer = false;
      //         this.roleCandidate = false;
      //     }
      // }
  }

  onLogout(){
      this.authService.logout();
  }
}
