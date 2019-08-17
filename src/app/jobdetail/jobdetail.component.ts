import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Job} from '../model/job.model';
import {JobService} from '../service/job.service';
import {first} from 'rxjs/operators';
import {SearchJob} from '../model/searchJob.model';
import {Major} from '../model/major.model';
import {CandidateService} from "../service/candidate.service";
import {Account} from "../model/account.model";
import {CandidateSaveJobsDTO} from "../model/candidateSaveJobsDTO.model";


@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {

  constructor(
    private router: Router,
    private routerSnapshot: ActivatedRoute,
    private candidateService: CandidateService,
    private jobService: JobService,
  ) { }
  jobId: number;
  job = new Job();
  listJobRelate: Job[];
  major = new Major();
  searchJob = new SearchJob();
  appliedJobs: Job[];
  savedJobs: Job[];
  appliedJobsId = [];
  savedJobsId = [];
  account: Account;
  id: number;
  candidateSaveJobDTO: CandidateSaveJobsDTO;
  ngOnInit() {
      if (!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.id = this.account.id;
    // this.jobId = parseInt(this.routerSnapshot.snapshot.paramMap.get('id'));
    this.searchJob.jobId = this.routerSnapshot.snapshot.paramMap.get('id');
    this.jobService.updateViewCount(JSON.stringify(this.searchJob))
        .pipe(first())
        .subscribe(
        (data: any) => {
         //   console.log(data);
        },
        error => {
            console.log('Fail');
        });
    this.jobService.getJobById(JSON.stringify(this.searchJob))
      .pipe(first())
      .subscribe(
        (data: Job) => {
          this.job = data;
         // console.log(this.job);
            this.major.nganhId = this.job.nganh.nganhId;
            // get list job Related
            this.jobService.getListJobRelate(JSON.stringify(this.major))
                .pipe(first())
                .subscribe(
                    (data: Job[]) => {
                        this.listJobRelate = data;
                    //    console.log(this.listJobRelate);
                    },
                    error => {
                        console.log(error);
                    }
                );
        },
        error => {
          console.log('Fail');
        }
      );
      this.candidateService.getAppliedJobs(this.id)
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.appliedJobs = data;
                  for(var i = 0 ; i < this.appliedJobs.length ; ++i) {
                      this.appliedJobsId.push(this.appliedJobs[i].jobId);
                  }
                //  console.log(this.appliedJobsId);
              },
              error => {
                  console.log("Failed");
              }
          );
      this.candidateService.getBookmarkedJob(this.id)
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.savedJobs = data;
                  for(var i = 0 ; i < this.savedJobs.length ; ++i) {
                      this.savedJobsId.push(this.savedJobs[i].jobId);
                  }
                 // console.log(this.savedJobsId);
              },
              error => {
                  console.log("Failed");
              }
          );
  }
    onBookmark(jobs: Job) {
        this.candidateSaveJobDTO = new CandidateSaveJobsDTO();
        this.candidateSaveJobDTO.candidateId =  this.account.id;
        console.log(jobs);
        this.candidateSaveJobDTO.jobId =  jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService.candidateSaveJob(this.candidateSaveJobDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                   // console.log(data);
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

}
