import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job.model';
import { JobService } from '../service/job.service';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchJob } from '../model/searchJob.model';
import {Router} from '@angular/router';
import {Major} from "../model/major.model";
import { CandidateService } from '../service/candidate.service';
import { CandidateSaveJobsDTO } from '../model/candidateSaveJobsDTO.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jobService: JobService,
    private candidateService : CandidateService
  ) { }

  searchJobForm: FormGroup;
  listJobs: Job[];
  listMajor: Major[];
  page: number;
  pageSize: number;
  searchJob = new SearchJob();

  candidateSaveJobDTO : CandidateSaveJobsDTO;

  onSubmit(buttonType): void {
    if (buttonType === 'Search') {
      if (this.searchJobForm.get('keyword').value === '' &&
        this.searchJobForm.get('location').value === '' &&
        this.searchJobForm.get('career').value === '') {
        this.jobService.getAllJobs()
          .pipe(first())
          .subscribe(
            (data: Job[]) => {
              this.listJobs = data;
              console.log(this.listJobs);
            },
            error => {
              console.log('Faild');
            }
          );
      } else {
        this.searchJob.tenJob = this.searchJobForm.get('keyword').value;
        this.searchJob.diaChi = this.searchJobForm.get('location').value;
        this.searchJob.tenNgannh = this.searchJobForm.get('career').value;
        this.searchJob.tenCongty = '';
        console.log(this.searchJob);
        this.jobService.searchJobs(JSON.stringify(this.searchJob))
          .pipe(first())
          .subscribe(
            (data: Job[]) => {
              this.listJobs = [];
              this.listJobs = data;
              console.log(this.listJobs);
            },
            error => {
              console.log('Faild');
            }
          );
      }
    }
  }

  goToProductDetails(id) {
    this.router.navigate(['/jobdetail/:id', id]);
  }

  ngOnInit() {
      this.page = 1;
      this.pageSize = 10;
      this.searchJobForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      location: ['', Validators.required],
      career: ['', Validators.required],
    });
      this.jobService.getAllMajor()
          .pipe(first())
          .subscribe(
              (data: Major[]) => {
                  this.listMajor = data;
              },
              error => {
                  console.log('Fail');
              }
          );
      this.jobService.getAllJobs()
      .pipe(first())
      .subscribe(
        (data: Job[]) => {
          this.listJobs = data;
          console.log(this.listJobs);
        },
        error => {
          console.log('Faild');
        }
      );
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
                },
                error => {
                    console.log("Faild");
                }
            );;
}

}
