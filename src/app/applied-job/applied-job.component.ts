import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../service/candidate.service";
import { Candidate } from "../model/candidate.model";
import { Job } from "../model/job.model";
import {Router} from "@angular/router";
import { CandidateSaveJobsDTO } from "../model/candidateSaveJobsDTO.model";
import { first } from "rxjs/operators";
import { Company } from "../model/company.model";
import { Account } from '../model/account.model';
import {Apply} from "../model/apply.model";
@Component({
    selector: "app-applied-job",
    templateUrl: "./applied-job.component.html",
    styleUrls: ["./applied-job.component.css"]
})
export class AppliedJobComponent implements OnInit {
    constructor(
        private router: Router,
        private candidateService: CandidateService) {}
   account: Account;
    id: number;
    candidate: Candidate;
    jobList: Apply[];
    page: number;
    pageSize: number;
    showCandidate: boolean;
    showJob: boolean;
    candidateSaveJobDTO: CandidateSaveJobsDTO;
    companyList: Company[];
    notificationCount: number;
    savedJobs: Job[];
    savedJobsId = [];
    searchName: string;

    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_CANDIDATE") this.router.navigate(['/']);
        this.notificationCount = 0;
        this.page = 1;
        this.pageSize = 10;
        this.showJob = false;
        this.showCandidate = true;

        this.id = this.account.id;
        this.candidateService
            .getAppliiedJobs1(this.id)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    this.jobList = data;
                },
                error => {
                    console.log("Failed");
                }
            );
        this.candidateService
            .getBookmarkedJob(this.id)
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    this.savedJobs = data;
                    for (var i = 0; i < this.savedJobs.length; ++i) {
                        this.savedJobsId.push(this.savedJobs[i].jobId);
                    }
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
                    this.companyList = data;

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
                    if(this.savedJobsId.indexOf(jobs.jobId) !== -1){
                        alert("Bạn đã bỏ lưu job " + jobs.tenJob + " thành công");
                    }else{
                        alert("Bạn đã lưu job " + jobs.tenJob + " thành công");
                    }
                    window.location.reload();
                },
                error => {
                    console.log("Fail");
                    alert("Lưu tin tuyển dụng thất bại");
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
                    alert("Bạn đã bỏ ứng tuyển job " + jobs.tenJob + " thành công");
                    window.location.reload();
                },
                error => {
                    console.log("Fail");
                    window.location.reload();
                }
            );
    }
}
