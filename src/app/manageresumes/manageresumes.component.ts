import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../service/candidate.service";
import { first } from "rxjs/operators";
import { Candidate } from "../model/candidate.model";
import { Job } from "../model/job.model";
import { CandidateSaveJobsDTO } from "../model/candidateSaveJobsDTO.model";
import { Company } from "../model/company.model";
import { Account } from '../model/account.model';

@Component({
    selector: "app-manageresumes",
    templateUrl: "./manageresumes.component.html",
    styleUrls: ["./manageresumes.component.css"]
})
export class ManageresumesComponent implements OnInit {
    constructor(
        private candidateService: CandidateService) {}
    account: Account;
    id: number;
    candidate: Candidate;
    jobList: Job[];
    page: number;
    pageSize: number;
    showCandidate: boolean;
    showJob: boolean;
    candidateSaveJobDTO: CandidateSaveJobsDTO;
    notificationCount: number;
    companyList: Company[];

    ngOnInit() {
        this.page = 1;
        this.pageSize = 10;
        this.notificationCount = 0;
        this.showJob = false;
        this.showCandidate = true;
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        this.id = this.account.id;

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

    showCandidateClick() {
        this.showCandidate = true;
        this.showJob = false;
    }

    showJobClick() {
        this.showCandidate = false;
        this.showJob = true;
    }

    onBookmark(jobs: Job) {
        this.candidateSaveJobDTO = new CandidateSaveJobsDTO();
        this.candidateSaveJobDTO.candidateId =  this.account.id;
        console.log(jobs);
        this.candidateSaveJobDTO.jobId = jobs.jobId;
        console.log(this.candidateSaveJobDTO);
        this.candidateService
            .candidateSaveJob(this.candidateSaveJobDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data);
                    location.reload();
                },
                error => {
                    console.log("Faild");
                }
            );
    }
}
