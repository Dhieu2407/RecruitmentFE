import { Component, OnInit } from '@angular/core';
import {Account} from "../model/account.model";
import {AuthGuardService} from "../service/auth-guard.service";
import {ApplyService} from "../service/apply.service";
import {first} from "rxjs/operators";
import {Candidate} from "../model/candidate.model";
import {CandidateService} from "../service/candidate.service";
import {Company} from "../model/company.model";

@Component({
  selector: 'app-nortifications',
  templateUrl: './nortifications.component.html',
  styleUrls: ['./nortifications.component.css']
})
export class NortificationsComponent implements OnInit {

  constructor(
      private authGuardService: AuthGuardService,
      private applyService: ApplyService,
      private candidateService: CandidateService,
  ) { }
    page: number;
    pageSize: number;
    numberOfNotify: number;
    numberOfNotifyTinder: number;
    account = new Account();
    listCandidate: Candidate[];
    company = new Company();

  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.company.id = this.account.id;
      this.page = 1;
      this.pageSize = 10;
      this.applyService.getNumberNotify(JSON.stringify(this.company))
          .pipe(first())
          .subscribe(
              (data: number) => {
                  this.numberOfNotify = data;
                  console.log(this.numberOfNotify);
              },
              error => {
                  console.log('Faild');
              }
          );
      this.candidateService.getListCandidateTinder(JSON.stringify(this.company))
          .pipe(first())
          .subscribe(
              (data: Candidate[]) => {
                  this.listCandidate = data;
                  this.numberOfNotifyTinder = this.listCandidate.length;
              },
              error => {
                  console.log('Faild');
              }
          );
  }

}
