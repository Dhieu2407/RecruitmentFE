import { Component, OnInit } from '@angular/core';
import {JobService} from "../service/job.service";
import {Job} from "../model/job.model";
import {Account} from "../model/account.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-manage-recruitment',
  templateUrl: './manage-recruitment.component.html',
  styleUrls: ['./manage-recruitment.component.css']
})
export class ManageRecruitmentComponent implements OnInit {

  constructor(
      private jobService: JobService,
  ) { }

    page: number;
    pageSize: number;
    listJob: Job[];
    account = new Account();
    job = new Job();
    jobUpdate = new Job();
    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('currentUser'));
        this.page = 1;
        this.pageSize = 5;
        this.job.trangThai = "0";
        this.jobService.findByTrangThai(JSON.stringify(this.job))
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    this.listJob = data;
                    console.log(this.listJob);
                },
                error => {
                    console.log('Failed');
                }
            );
    }

    onConfirmed(i: number){
        this.listJob[i].trangThai = "1";

        console.log(this.listJob[i]);

        this.jobService.updateJob(JSON.stringify(this.listJob[i]))
            .pipe(first())
            .subscribe(
                (data) => {
                    alert('Xác nhận thành công');
                },
                error => {
                    console.log('Failed');
                }
            );
    }

    onRejected(i: number){
        this.listJob[i].trangThai = "2";

        this.jobService.updateJob(JSON.stringify(this.listJob[i]))
            .pipe(first())
            .subscribe(
                (data) => {
                    alert('Từ chối thành công');
                },
                error => {
                    console.log('Failed');
                }
            );
    }
}
