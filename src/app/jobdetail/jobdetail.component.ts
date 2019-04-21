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
  idJob: number;
  idMajor: number;
  job: Job;
  listJobRelate: Job[];
  major = new Major();
  searchJob = new SearchJob();

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
          console.log('Faild');
        }
      );
    // get list job Related
    // @ts-ignore
    this.idMajor = this.routerSnapshot.snapshot.paramMap.get('idMajor');
    this.major.nganhId = this.idMajor;
    this.jobService.getListJobRelate(JSON.stringify(this.major))
      .pipe(first())
      .subscribe(
        (data: Job[]) => {
          this.listJobRelate = data;
          console.log(this.listJobRelate);
        },
        error => {
          console.log('Faild');
        }
      );

  }

}
