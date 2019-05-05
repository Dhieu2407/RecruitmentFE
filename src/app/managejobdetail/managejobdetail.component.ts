import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../service/job.service';
import {FormBuilder} from '@angular/forms';
import {Job} from '../model/job.model';
import {SearchJob} from '../model/searchJob.model';
import {first} from 'rxjs/operators';
import {CandidateService} from "../service/candidate.service";
import {Apply} from "../model/apply.model";

@Component({
  selector: 'app-managejobdetail',
  templateUrl: './managejobdetail.component.html',
  styleUrls: ['./managejobdetail.component.css']
})
export class ManagejobdetailComponent implements OnInit {

  constructor(
      private router: Router,
      private routerSnapshot: ActivatedRoute,
      private jobService: JobService,
      private formBuilder: FormBuilder,
      private candidateService: CandidateService,
  ) { }

    idJob: number;
    job = new Job();
    searchJob = new SearchJob();
    idJobdetale: number;
    listApply: Apply[];
    page: number;
    pageSize: number;
  ngOnInit() {
      this.page = 1;
      this.pageSize = 5;
      // @ts-ignore
      this.idJob = this.routerSnapshot.snapshot.paramMap.get('id');
      this.searchJob.id = this.idJob;
      this.jobService.getJobById(JSON.stringify(this.searchJob))
          .pipe(first())
          .subscribe(
              (data: Job) => {
                  this.job = data;
                  console.log(this.job);
              },
              error => {
                  console.log('Failed');
              }
          );
      this.candidateService.getListCandidateOfApply(JSON.stringify(this.searchJob))
          .pipe(first())
          .subscribe(
              (data: Apply[]) => {
                  this.listApply = data;
                  console.log(this.listApply);
              },
              error => {
                  console.log('Faild');
              }
          );
  }
    onDeleteJob() {
        this.jobService.deleteJob(JSON.stringify(this.searchJob))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.idJobdetale = data;
                    console.log(this.idJobdetale);
                    alert('Đã xóa tin tuyển dụng!');
                    this.router.navigateByUrl('/managejob');
                },
                error => {
                    console.log('Failed');
                }
            );
    }
    onEditJob() {
      location.href = '/manageeditjobdetail/' + this.idJob;
    }

}
