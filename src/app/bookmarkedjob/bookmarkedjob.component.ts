import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../service/candidate.service";
import { Candidate } from "../model/candidate.model";
import { Job } from "../model/job.model";
import { CandidateSaveJobsDTO } from "../model/candidateSaveJobsDTO.model";
import { first } from "rxjs/operators";
import { Company } from "../model/company.model";
import { Account } from '../model/account.model';
import { Router} from "@angular/router";

@Component({
    selector: "app-bookmarkedjob",
    templateUrl: "./bookmarkedjob.component.html",
    styleUrls: ["./bookmarkedjob.component.css"]
})
export class BookmarkedjobComponent implements OnInit {
    constructor(
        private router: Router,
        private candidateService: CandidateService) {}

    account: Account;
    id: number;
    candidate: Candidate;
    jobList: Job[];
    page: number;
    pageSize: number;
    searchName: string;
    showCandidate: boolean;
    showJob: boolean;
    candidateSaveJobDTO: CandidateSaveJobsDTO;
    notificationCount: number;
    companyList: Company[];
    appliedJobs: Job[];
    appliedJobsId = [];

    ngOnInit() {
        this.notificationCount = 0;
        this.page = 1;
        this.pageSize = 10;
        this.showJob = false;
        this.showCandidate = true;
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_CANDIDATE") this.router.navigate(['/']);
        this.id = this.account.id;
        this.candidateService
            .getBookmarkedJob(this.id)
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
        this.candidateService
            .getAppliedJobs(this.id)
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    this.appliedJobs = data;
                    for (var i = 0; i < this.appliedJobs.length; ++i) {
                        this.appliedJobsId.push(this.appliedJobs[i].jobId);
                    }
                    console.log(this.appliedJobsId);
                },
                error => {
                    console.log("Failed");
                }
            );
        this.candidateService
            .getAllSavedCompanies(this.id)
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    // console.log(data);
                    this.companyList = data;
                    // console.log();
                    console.log(this.companyList);

                    for (var i = 0; i < this.companyList.length; ++i) {
                        var savedCandidatesByCurrentCompany = this.companyList[i].ungVienSaved;
                        console.log(savedCandidatesByCurrentCompany);
                        for (var y = 0; y < savedCandidatesByCurrentCompany.length; ++y) {
                            if (savedCandidatesByCurrentCompany[y].ungVien.ungVienId == this.id || savedCandidatesByCurrentCompany[y].ungVien == this.id) {
                                this.notificationCount++;
                                break;
                            }
                        }
                    }
                    console.log("matched");
                    console.log(this.notificationCount);
                },
                error => {
                    console.log("Failed");
                }
            );
    }

    onBookmark(jobs: Job) {
        this.candidateSaveJobDTO = new CandidateSaveJobsDTO();
        this.candidateSaveJobDTO.candidateId = this.id;
        console.log(jobs);
        this.candidateSaveJobDTO.jobId = jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService
            .candidateSaveJob(this.candidateSaveJobDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data);
                    alert("Bạn đã bỏ lưu job " + jobs.tenJob + " thành công");
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
        this.candidateSaveJobDTO.candidateId = this.id;
        console.log(jobs);
        this.candidateSaveJobDTO.jobId = jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService
            .candidateApplyJob(this.candidateSaveJobDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data);
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
