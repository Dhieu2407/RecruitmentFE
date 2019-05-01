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
  roleCandidate = false;
  roleEmployer = false;
  id: number;
  urlModifyCompany: string;
  constructor(
      private authService: AuthenticationService
  ) { }

  ngOnInit() {
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.id = JSON.parse(localStorage.getItem('currentUser')).id;
      this.urlModifyCompany = '/modifycompany/' + this.id ;
      if (this.account === null) {
          this.logged = false;
      } else {
          this.logged = true;
      }

      if (this.logged === true) {
          if (this.account.authorities[0] === 'ROLE_CANDIDATE') {
              this.roleCandidate = true;
              this.roleEmployer = false;
          } if(this.account.authorities[0] === 'ROLE_EMPLOYER') {
              this.roleEmployer = true;
              this.roleCandidate = false;
          }
      }
  }

  onLogout(){
      this.authService.logout();
  }
}
