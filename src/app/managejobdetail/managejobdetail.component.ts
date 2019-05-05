import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../service/job.service';
import {FormBuilder} from '@angular/forms';
import {Job} from '../model/job.model';
import {SearchJob} from '../model/searchJob.model';
import {first} from 'rxjs/operators';

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
  ) { }

    idJob: number;
    job = new Job();
    searchJob = new SearchJob();
    idJobdetale: number;
  ngOnInit() {
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
