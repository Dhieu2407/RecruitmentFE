import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchJob } from '../model/searchJob.model';
import { Account } from '../model/account.model';
import {Job} from "../model/job.model";
import {JobService} from "../service/job.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
  ) { }

  searchJobForm: FormGroup;
  account = new Account();
  searchJob = new SearchJob();
  jobList: Job[];
    page: number;
    pageSize: number;

  onSubmit(buttonType): void {
    if (buttonType === 'Search') {
      if (this.searchJobForm.get('keyword').value === '' &&
        this.searchJobForm.get('location').value === '' &&
        this.searchJobForm.get('career').value === '') {
        return;
      }
      this.searchJob.keyword = this.searchJobForm.get('keyword').value;
      this.searchJob.location = this.searchJobForm.get('location').value;
      this.searchJob.career = this.searchJobForm.get('career').value;
      console.log(this.searchJob);
    }
  }

  ngOnInit() {
      this.page = 1;
      this.pageSize = 4;
      this.searchJobForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      location: ['', Validators.required],
      career: ['', Validators.required],
    });
      this.jobService.getAllJobs()
        .pipe(first())
        .subscribe(
            (data: Job[]) => {
                this.jobList = data;
            },
            error => {
                console.log('Faild');
            }
        );
  }

}
