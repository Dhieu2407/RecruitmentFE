import { Component, OnInit } from '@angular/core';
import {JobService} from '../service/job.service';
import {Job} from '../model/job.model';
import {Account} from '../model/account.model';
import {Company} from '../model/company.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-managejob',
  templateUrl: './managejob.component.html',
  styleUrls: ['./managejob.component.css']
})
export class ManagejobComponent implements OnInit  {

    constructor(
        private jobService: JobService,
    ) {}
    page: number;
    pageSize: number;
    listJobOfCompany: Job[];
    account = new Account();
    company = new Company();
    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        this.pageSize = 5;
        this.company.id = this.account.id;
        this.jobService.getListJobOfCompany(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    this.listJobOfCompany = data;
                    console.log(this.listJobOfCompany);
                },
                error => {
                    console.log('Failed');
                }
            );




    }

}

