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
      private companyService: CompanyService,
  ) {}
    page: number;
    pageSize: number;
  listJobOfCompany: Job[];
  listCandidateApplyOfCompany: Candidate[];
  account = new Account();
  company = new Company();
  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.page = 1;
      this.pageSize = 5;
      this.company.id = this.account.id;
      this.companyService.getCandidateApplyJobOCompany(this.company.id)
          .pipe(first())
          .subscribe(
              (data: Candidate[]) => {
                  this.listCandidateApplyOfCompany = data;
                  console.log(this.listCandidateApplyOfCompany);
              },
              error => {
                  console.log('Failed');
              }
          );




  }

}
