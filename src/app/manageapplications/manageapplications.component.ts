import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job.model';
import { JobService } from '../service/job.service';
import {Company} from '../model/company.model';
import {first} from 'rxjs/operators';
import {Account} from "../model/account.model";

@Component({
  selector: 'app-manageapplications',
  templateUrl: './manageapplications.component.html',
  styleUrls: ['./manageapplications.component.css']
})
export class ManageapplicationsComponent implements OnInit {

  constructor(
      private jobService: JobService,
  ) {}
    page: number;
    pageSize: number;
  listJobOfCompany: Job[];
  account = new Account();
  company = new Company();
  ngOnInit() {
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.page = 1;
      this.pageSize = 5;
      this.company.id = this.account.id;
      this.jobService.getListJobOfCompany(JSON.stringify(this.company))
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.listJobOfCompany = data;
                  console.log(this.listJobOfCompany);
              },
              error => {
                  console.log('Failed');
              }
          );




  }

}
