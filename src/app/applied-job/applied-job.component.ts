import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../service/candidate.service';
import { Candidate } from '../model/candidate.model';
import { Job } from '../model/job.model';
import { CandidateSaveJobsDTO } from '../model/candidateSaveJobsDTO.model';
import { first } from 'rxjs/operators';
import { Account } from '../model/account.model';

@Component({
  selector: 'app-applied-job',
  templateUrl: './applied-job.component.html',
  styleUrls: ['./applied-job.component.css']
})
export class AppliedJobComponent implements OnInit {

   constructor(private candidateService: CandidateService) { }
   account: Account;
    id: number;
    candidate : Candidate;
    jobList : Job[];
    page : number;
    pageSize : number;
    showCandidate : boolean;
    showJob : boolean;
    candidateSaveJobDTO : CandidateSaveJobsDTO;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.showJob = false;
    this.showCandidate = true;
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.candidateService.getAppliedJobs(this.account.id)
        .pipe(first())
        .subscribe(
            (data: any) => {
                // console.log(data);
                this.jobList = data;
                console.log(this.jobList);
            },
            error => {
                console.log("Failed");
            }
        );
  }

}
