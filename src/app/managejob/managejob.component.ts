import { Component, OnInit } from '@angular/core';
import {JobService} from '../service/job.service';
import {Job} from '../model/job.model';
import {Account} from '../model/account.model';
import {Company} from '../model/company.model';
import {first} from 'rxjs/operators';
import {ApplyService} from "../service/apply.service";
import {Candidate} from "../model/candidate.model";
import {CandidateService} from "../service/candidate.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-managejob',
  templateUrl: './managejob.component.html',
  styleUrls: ['./managejob.component.css']
})
export class ManagejobComponent implements OnInit  {

    constructor(
        private router: Router,
        private jobService: JobService,
        private applyService: ApplyService,
        private candidateService: CandidateService,
    ) {}
    page: number;
    pageSize: number;
    listJobOfCompany: Job[];
    account = new Account();
    company = new Company();
    numberOfNotify: number;
    numberOfNotifyTinder: number;
    //update Search
    searchName: string;
    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_EMPLOYER") this.router.navigate(['/']);
        this.page = 0;
        this.pageSize = 5;
        this.company.id = this.account.id;
        this.jobService.getlistJobOfCompanyManage(JSON.stringify(this.company))
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
        this.applyService.getNumberNotify(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfNotify = data;
                   // console.log(this.numberOfNotify);
                },
                error => {
                    console.log('Faild');
                }
            );
        this.candidateService.getNumberNotifyTinder(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfNotifyTinder = data;
                },
                error => {
                    console.log('Faild');
                }
            );


    }

}

