import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../model/company.model";
import {CompanyService} from '../service/company.service';
import {first} from "rxjs/operators";
import {Job} from '../model/job.model';
import {JobService} from '../service/job.service';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'app-detailcompany',
  templateUrl: './detailcompany.component.html',
  styleUrls: ['./detailcompany.component.css']
})
export class DetailcompanyComponent implements OnInit {

  constructor(
      private router: Router,
      private routerSnapshot: ActivatedRoute,
      private companyService: CompanyService,
      private jobService: JobService,
      private candidateService: CandidateService
  ) { }
    company = new Company();
    companySearchJob = new Company();
    idCompany: number;
    listJobs: Job[];
    page: number;
    pageSize: number;
    companySaveCandidateDTO  = new CompanySaveCandidateDTO();
  ngOnInit() {
      this.page = 1;
      this.pageSize = 4;
      this.idCompany = parseInt(this.routerSnapshot.snapshot.paramMap.get('id'));
      this.companyService.getCompany(this.idCompany)
          .pipe(first())
          .subscribe(
              (data: Company) => {
                  this.company = data;
                  console.log(this.company);
              },
              error => {
                  console.log('Faild');
              }
          );
      this.companySearchJob.id = this.idCompany;
      this.jobService.getListJobOfCompany(JSON.stringify(this.companySearchJob))
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.listJobs = data;
                  console.log(this.listJobs);
              },
              error => {
                  console.log('Faild');
              }
          );
  }

  onSave(company: any) {
    this.companySaveCandidateDTO.candidateId = JSON.parse(localStorage.getItem("currentUser")).id;
    this.companySaveCandidateDTO.companyId = company.congtyId;
    this.candidateService
        .saveCompany(this.companySaveCandidateDTO)
        .pipe(first())
        .subscribe(
            (data: any) => {
                console.log(data);
            },
            error => {
                console.log("Faild");
            }
        );
}

}
