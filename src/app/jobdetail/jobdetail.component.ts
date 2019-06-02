import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Job} from '../model/job.model';
import {JobService} from '../service/job.service';
import {first} from 'rxjs/operators';
import {SearchJob} from '../model/searchJob.model';
import {Major} from '../model/major.model';


@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {

  constructor(
    private router: Router,
    private routerSnapshot: ActivatedRoute,
    private jobService: JobService,
  ) { }
  jobId: number;
  job = new Job();
  listJobRelate: Job[];
  major = new Major();
  searchJob = new SearchJob();

  ngOnInit() {
    this.jobId = parseInt(this.routerSnapshot.snapshot.paramMap.get('id'));
    this.searchJob.jobId = this.routerSnapshot.snapshot.paramMap.get('id');
    this.jobService.updateViewCount(JSON.stringify(this.searchJob))
        .pipe(first())
        .subscribe(
        (data: any) => {
            console.log(data);
        },
        error => {
            console.log('Fail');
        });
    this.jobService.getJobById(JSON.stringify(this.searchJob))
      .pipe(first())
      .subscribe(
        (data: Job) => {
          this.job = data;
          console.log(this.job);
            this.major.nganhId = this.job.nganh.nganhId;
            // get list job Related
            this.jobService.getListJobRelate(JSON.stringify(this.major))
                .pipe(first())
                .subscribe(
                    (data: Job[]) => {
                        this.listJobRelate = data;
                        console.log(this.listJobRelate);
                    },
                    error => {
                        console.log(error);
                    }
                );
        },
        error => {
          console.log('Fail');
        }
      );
  }

}
