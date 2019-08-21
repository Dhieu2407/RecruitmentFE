import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { Company } from '../model/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Account} from '../model/account.model';
import {CandidateService} from "../service/candidate.service";
import {CompanySaveCandidateDTO} from "../model/companySaveCandidateDTO.model";
import {JobService} from "../service/job.service";
import {Job} from "../model/job.model";
import {CandidateSaveJobsDTO} from "../model/candidateSaveJobsDTO.model";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  constructor(private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private jobService: JobService) { }

    account = new Account();
    company: Company;
    companyJob = new Company();
    id: number;
    idCandidate: number;
    savedCompanyId = [];
    savedCompany: Company[];
    listJobOfCompany: Company[];
    companySaveCandidateDTO = new CompanySaveCandidateDTO();
    savedJobs : Job[];
    appliedJobs : Job[];
    savedJobsId = [];
    appliedJobsId = [];
    candidateSaveJobDTO: CandidateSaveJobsDTO;
    page: number;
    pageSize: number;

  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.page = 1;
      this.pageSize = 10;
    this.id = +this.route.snapshot.paramMap.get("id");
    this.idCandidate = this.account.id;
    this.companyJob.id = this.id;
      if(this.account.authorities[0] === 'ROLE_CANDIDATE' )
      this.candidateService.getAllSavedCompanies(this.idCandidate)
          .pipe(first())
          .subscribe(
              (data: Company[]) => {
                  this.savedCompany = data;
                  for(var i = 0 ; i < this.savedCompany.length ; ++i) {
                      this.savedCompanyId.push(this.savedCompany[i].congtyId);
                  }
              //    console.log("saved  : " + this.savedCompanyId);
              },
              error => {
                  console.log("Fail");
              }
          );
    this.companyService.getCompany(this.id)
        .pipe(first())
        .subscribe(
            (data: Company) => {
                this.company = data;
            },
            error => {
                console.log("Failed");
            }
        );
    this.jobService.getListJobOfCompany(JSON.stringify(this.companyJob))
        .pipe(first())
        .subscribe(
            (data: Company[]) => {
                this.listJobOfCompany = data;
             //   console.log(this.listJobOfCompany);
            },
            error => {
                console.log('Failed');
            }
        );
      if(this.account.authorities[0] === 'ROLE_CANDIDATE' )
      this.candidateService.getBookmarkedJob(this.idCandidate)
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.savedJobs = data;
                  for(var i = 0 ; i < this.savedJobs.length ; ++i) {
                      this.savedJobsId.push(this.savedJobs[i].jobId);
                  }
               //   console.log(this.savedJobsId);
              },
              error => {
                  console.log("Failed");
              }
          );
      if(this.account.authorities[0] === 'ROLE_CANDIDATE' )
      this.candidateService.getAppliedJobs(this.idCandidate)
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.appliedJobs = data;
                  for(var i = 0 ; i < this.appliedJobs.length ; ++i) {
                      this.appliedJobsId.push(this.appliedJobs[i].jobId);
                  }
               //   console.log(this.appliedJobsId);
              },
              error => {
                  console.log("Failed");
              }
          );

  }
    onSave(company: any) {
        this.companySaveCandidateDTO.candidateId = this.account.id;
        this.companySaveCandidateDTO.companyId = company.congtyId;
        this.candidateService
            .saveCompany(this.companySaveCandidateDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    if (this.savedCompanyId.indexOf(company.congtyId) !== -1) {
                        alert("Bạn đã bỏ lưu công ty " + company.tenCongTy + " thành công");
                    } else {
                        alert("Bạn đã lưu công ty " + company.tenCongTy + " thành công");
                    }
                    window.location.reload();
                },
                error => {
                    console.log("Faild");
                }
            );
    }
    onBookmark(jobs: Job) {
        this.candidateSaveJobDTO = new CandidateSaveJobsDTO();
        this.candidateSaveJobDTO.candidateId =  this.account.id;
        this.candidateSaveJobDTO.jobId =  jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService.candidateSaveJob(this.candidateSaveJobDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    if(this.savedJobsId.indexOf(jobs.jobId) !== -1){
                        alert("Bạn đã bỏ lưu job " + jobs.tenJob + " thành công");
                    }else{
                        alert("Bạn đã lưu job " + jobs.tenJob + " thành công");
                    }
                    window.location.reload();
                },
                error => {
                    console.log("Fail");
                    window.location.reload();
                }
            );
    }
    onApply(jobs: Job) {
        this.candidateSaveJobDTO = new CandidateSaveJobsDTO();
        this.candidateSaveJobDTO.candidateId =  this.account.id;
        this.candidateSaveJobDTO.jobId = jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService
            .candidateApplyJob(this.candidateSaveJobDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    if(this.appliedJobsId.indexOf(jobs.jobId) !== -1){
                        alert("Bạn đã bỏ ứng tuyển job " + jobs.tenJob + " thành công");
                    }else{
                        alert("Bạn đã ứng tuyển job " + jobs.tenJob + " thành công");
                    }
                    window.location.reload();
                },
                error => {
                    console.log("Fail");
                    window.location.reload();
                }
            );
    }

  toModifyCompany() {
    location.href='/modifycompany/' + this.id;
  }

}
