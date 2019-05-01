import { Component, OnInit } from "@angular/core";
import { CandidateService } from '../service/candidate.service';
import { first } from 'rxjs/operators';
import { Candidate } from '../model/candidate.model';
import { Job } from '../model/job.model';
import { CandidateSaveJobsDTO } from '../model/candidateSaveJobsDTO.model';

@Component({
    selector: "app-manageresumes",
    templateUrl: "./manageresumes.component.html",
    styleUrls: ["./manageresumes.component.css"]
})
export class ManageresumesComponent implements OnInit {
    constructor(
        private candidateService: CandidateService) {}

    id: number;
    urlToModifyResume: string;
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
        this.urlToModifyResume = "/modifyresume/" + this.id;

        this.candidateService
            .getCandidate(this.id)
            .pipe(first())
            .subscribe(
                (data: Candidate) => {
                    console.log(data);
                    this.candidate = data;
                },
                error => {
                    console.log("Failed");
                }
            );
        this.candidateService.getBookmarkedJob(this.id)
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

    showCandidateClick(){
        this.showCandidate = true;
        this.showJob = false;
    }


    showJobClick(){
        this.showCandidate = false;
        this.showJob = true;
    }

    onBookmark(jobs: Job) {
        this.candidateSaveJobDTO = new CandidateSaveJobsDTO();
        this.candidateSaveJobDTO.candidateId =  JSON.parse(localStorage.getItem("currentUser")).id;
        console.log(jobs);
        this.candidateSaveJobDTO.jobId =  jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService.candidateSaveJob(this.candidateSaveJobDTO)
                .pipe(first())
                .subscribe(
                    (data: any) => {
                        console.log(data);
                        location.reload();
                    },
                    error => {
                        console.log("Faild");
                    }
                );;
    }
}
