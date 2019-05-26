import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SearchJob } from "../model/searchJob.model";
import { Account } from "../model/account.model";
import { Job } from "../model/job.model";
import { JobService } from "../service/job.service";
import { first } from "rxjs/operators";
import { MajorService } from '../service/major.service';
import { Major } from '../model/major.model';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private jobService: JobService, private majorService: MajorService) {}

    searchJobForm: FormGroup;
    account = new Account();
    searchJob = new SearchJob();
    jobList: Job[];
    page: number;
    pageSize: number;
    majorList: Major[];
    onSubmit(buttonType): void {
        if (buttonType === "Search") {
            if (this.searchJobForm.get("keyword").value === "" && this.searchJobForm.get("location").value === "" && this.searchJobForm.get("career").value === "") {
                return;
            }
            this.searchJob.keyword = this.searchJobForm.get("keyword").value;
            this.searchJob.location = this.searchJobForm.get("location").value;
            this.searchJob.career = this.searchJobForm.get("career").value;
            console.log(this.searchJob);
        }
    }

    ngOnInit() {
        this.page = 1;
        this.pageSize = 4;
        this.searchJobForm = this.formBuilder.group({
            keyword: ["", Validators.required],
            location: ["", Validators.required],
            career: ["", Validators.required]
        });
        this.jobService
            .getAllJobs()
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    var unorderedJobList = data;
                    this.jobList =  unorderedJobList.sort(function(a, b) {
                                        return a.soLuongView < b.soLuongView ? 1 : a.soLuongView > b.soLuongView ? -1 : 0;
                                    });
                },
                error => {
                    console.log("Faild");
                }
            );
        this.majorService
            .getAllMajors()
            .pipe(first())
            .subscribe(
                (data: Major[]) => {
                    var unorderedMajorList = data;
                    this.majorList =  unorderedMajorList.sort(function(a, b) {
                                        return a.tinTuyenDung.length < b.tinTuyenDung.length ? 1 : a.tinTuyenDung.length > b.tinTuyenDung.length ? -1 : 0;
                                    });
                    if(this.majorList.length > 8){
                        this.majorList.length = 8;
                    }
                },
                error => {
                    console.log("Faild");
                }
            );
    }
}
