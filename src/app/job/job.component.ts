import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job.model';
import { JobService } from '../service/job.service';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchJob } from '../model/searchJob.model';
import {Router} from '@angular/router';

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
  ) { }

  searchJobForm: FormGroup;
  listJobs: Job[];

  searchJob = new SearchJob();

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
    this.searchJobForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      location: ['', Validators.required],
      career: ['', Validators.required],
    });
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

}
