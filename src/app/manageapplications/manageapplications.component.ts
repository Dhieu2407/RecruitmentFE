import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job.model';
import { JobService } from '../service/job.service';
import {Company} from '../model/company.model';
import {first} from 'rxjs/operators';
import {Account} from '../model/account.model';
import { AuthGuardService } from '../service/auth-guard.service';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from "../service/company.service";
import {Candidate} from "../model/candidate.model";
import {Apply} from "../model/apply.model";
import {CandidateService} from "../service/candidate.service";

@Component({
  selector: 'app-manageapplications',
  templateUrl: './manageapplications.component.html',
  styleUrls: ['./manageapplications.component.css']
})
export class ManageapplicationsComponent implements OnInit {

  constructor(
      private jobService: JobService,
      private routerSnapshot: ActivatedRoute,
      private authGuardService: AuthGuardService,
      private candidate: CandidateService,
  ) {}
    page: number;
    pageSize: number;
  listJobOfCompany: Job[];
  listCandidateApplyOfCompany: Apply[];
  account = new Account();
  company = new Company();
  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.page = 1;
      this.pageSize = 5;
      this.company.id = this.account.id;
      this.candidate.getCandidateApplyAllJobOfCompany(JSON.stringify(this.company))
          .pipe(first())
          .subscribe(
              (data: Apply[]) => {
                  this.listCandidateApplyOfCompany = data;
                  console.log(this.listCandidateApplyOfCompany);
              },
              error => {
                  console.log('Failed');
              }
          );




  }

}
