import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../service/candidate.service';
import { Candidate } from '../model/candidate.model';
import { Job } from '../model/job.model';
import { CandidateSaveJobsDTO } from '../model/candidateSaveJobsDTO.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-applied-job',
  templateUrl: './applied-job.component.html',
  styleUrls: ['./applied-job.component.css']
})
export class AppliedJobComponent implements OnInit {

   constructor(private candidateService: CandidateService) { }


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
    // console.log(JSON.parse(localStorage.getItem("currentUser")));
    this.id = JSON.parse(localStorage.getItem("currentUser")).id;
    this.candidateService.getAppliedJobs(this.id)
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
