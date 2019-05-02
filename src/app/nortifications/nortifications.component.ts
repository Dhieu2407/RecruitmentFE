import { Component, OnInit } from '@angular/core';
import {Account} from "../model/account.model";
import {AuthGuardService} from "../service/auth-guard.service";

@Component({
  selector: 'app-nortifications',
  templateUrl: './nortifications.component.html',
  styleUrls: ['./nortifications.component.css']
})
export class NortificationsComponent implements OnInit {

  constructor(
      private authGuardService: AuthGuardService
  ) { }

  account = new Account();

  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
  }

}
