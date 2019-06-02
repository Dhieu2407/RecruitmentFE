import { Component, OnInit } from "@angular/core";
import { Job } from "../model/job.model";
import { JobService } from "../service/job.service";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SearchJob } from "../model/searchJob.model";
import { Router } from "@angular/router";
import { Major } from "../model/major.model";
import { CandidateService } from "../service/candidate.service";
import { CandidateSaveJobsDTO } from "../model/candidateSaveJobsDTO.model";
import { MajorService } from "../service/major.service";
import { Account } from '../model/account.model'
import { AccountService } from '../service/account.service';


@Component({
    selector: "app-job",
    templateUrl: "./job.component.html",
    styleUrls: ["./job.component.css"]
})
export class JobComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private jobService: JobService,
        private candidateService: CandidateService,
        private majorService: MajorService,
        private accountService: AccountService) {}

    searchJobForm: FormGroup;
    listJobs: Job[];
    job = new Job();
    listMajor: Major[];
    page: number;
    pageSize: number;
    searchJob = new SearchJob();
    id: number;
    savedJobs : Job[];
    appliedJobs : Job[];
    savedJobsId = [];
    appliedJobsId = [];

    candidateSaveJobDTO: CandidateSaveJobsDTO;
    account: Account;
    role = '';

    onSubmit(buttonType): void {
        if (buttonType === "Search") {
            if (this.searchJobForm.get("keyword").value === "" && this.searchJobForm.get("location").value === "" && this.searchJobForm.get("career").value === "") {
                this.jobService
                    .getAllJobs()
                    .pipe(first())
                    .subscribe(
                        (data: Job[]) => {
                            this.listJobs = data;
                            console.log(this.listJobs);
                        },
                        error => {
                            console.log("Fail");
                        }
                    );
            } else {
                this.searchJob.tenJob = this.searchJobForm.get("keyword").value;
                this.searchJob.diaChi = this.searchJobForm.get("location").value;
                this.searchJob.tenNganh = this.searchJobForm.get("career").value;
                this.searchJob.tenCongTy = "";
                console.log(this.searchJob);
                this.jobService
                    .searchJobs(JSON.stringify(this.searchJob))
                    .pipe(first())
                    .subscribe(
                        (data: Job[]) => {
                            this.listJobs = [];
                            this.listJobs = data;
                            console.log(this.listJobs);
                        },
                        error => {
                            console.log("Fail");
                        }
                    );
            }
        }
    }

    goToProductDetails(id) {
        this.router.navigate(["/jobdetail/:id", id]);
    }

    ngOnInit() {
        this.page = 1;
        this.pageSize = 10;
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account !== null)
            this.id = this.account.id;
        this.searchJobForm = this.formBuilder.group({
            keyword: ["", Validators.required],
            location: ["", Validators.required],
            career: ["", Validators.required]
        });
        this.majorService
            .getAllMajors()
            .pipe(first())
            .subscribe(
                (data: Major[]) => {
                    this.listMajor = data;
                },
                error => {
                    console.log("Fail");
                }
            );

        this.job.trangThai = "1";
        this.jobService
            .findByTrangThai(JSON.stringify(this.job))
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    this.listJobs = data;
                    console.log(this.listJobs);
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
                    console.log(this.savedJobsId);
                },
                error => {
                    console.log("Failed");
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
                    console.log(this.appliedJobsId);
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
                    console.log(data);
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
