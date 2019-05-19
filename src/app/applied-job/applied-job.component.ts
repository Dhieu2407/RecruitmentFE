import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../service/candidate.service";
import { Candidate } from "../model/candidate.model";
import { Job } from "../model/job.model";
import { CandidateSaveJobsDTO } from "../model/candidateSaveJobsDTO.model";
import { first } from "rxjs/operators";
import { Company } from "../model/company.model";

@Component({
    selector: "app-applied-job",
    templateUrl: "./applied-job.component.html",
    styleUrls: ["./applied-job.component.css"]
})
export class AppliedJobComponent implements OnInit {
    constructor(private candidateService: CandidateService) {}

    id: number;
    candidate: Candidate;
    jobList: Job[];
    page: number;
    pageSize: number;
    showCandidate: boolean;
    showJob: boolean;
    candidateSaveJobDTO: CandidateSaveJobsDTO;
    companyList: Company[];
    notificationCount: number;

    ngOnInit() {
        this.notificationCount = 0;
        this.page = 1;
        this.pageSize = 10;
        this.showJob = false;
        this.showCandidate = true;
        // console.log(JSON.parse(localStorage.getItem("currentUser")));
        this.id = JSON.parse(localStorage.getItem("currentUser")).id;
        this.candidateService
            .getAppliedJobs(this.id)
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
}
