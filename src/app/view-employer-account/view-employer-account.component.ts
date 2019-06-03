import { Component, OnInit } from '@angular/core';
import {AccountService} from "../service/account.service";
import {AuthGuardService} from "../service/auth-guard.service";
import {first} from "rxjs/operators";
import { Account } from '../model/account.model';
import {Company} from "../model/company.model";
import { CompanyService } from '../service/company.service';
import {Router} from '@angular/router';
import {JobService} from "../service/job.service";
import {Job} from "../model/job.model";

@Component({
    selector: 'app-view-employer-account',
    templateUrl: './view-employer-account.component.html',
    styleUrls: ['./view-employer-account.component.css']
})
export class ViewEmployerAccountComponent implements OnInit {

    constructor(
        private router: Router,
        private accountService: AccountService,
        private authGuardService: AuthGuardService,
        private companyService: CompanyService,
        private jobService: JobService,
    ) { }

    page: number;
    pageSize: number;
    acc = new Account();
    account: Account[];
    listCompany = [];
    count = 0;
    numberOfJobApprova: number;
    job = new Job();
    deleteCompany = new Company();

    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.acc = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.acc = JSON.parse(localStorage.getItem('currentUser'));
        if(this.acc.authorities[0] !== "ROLE_MANAGER") this.router.navigate(['/']);
        this.page = 1;
        this.pageSize = 5;
        this.job.trangThai = '0';
        this.accountService.getAllUsers()
            .pipe(first())
            .subscribe(
                (data: Account[]) => {
                    this.account = data;
                    console.log(this.account);
                    for(let i = 0; i < this.account.length; i++) {
                        if(this.account[i].authorities[0] === "ROLE_EMPLOYER"){
                            this.getCompany(this.account[i].id, i);
                        }
                    }
                },
                error => {
                    console.log(error);
                });
        this.jobService.getNumberOfJobApproval(JSON.stringify(this.job))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfJobApprova = data;
                },
                error1 => {
                    console.log('Error');
                }
            );
    }

    getCompany(id: number, i: number){
        this.companyService.getCompany(id)
            .pipe(first())
            .subscribe(
                (data: Company) => {
                    this.listCompany[this.count] = data;
                    if(this.listCompany[this.count] === null){
                        this.listCompany[this.count] = new Company();
                        this.listCompany[this.count].email = this.account[i].email;
                    }
                    console.log(this.listCompany);
                    this.count++;
                },
                error => {
                    console.log('Failed');
                }
            );
    }

    onDelete(i){
        this.deleteCompany.id = this.listCompany[i].congtyId;
        this.accountService.deleteUser(this.deleteCompany.id)
            .pipe(first())
            .subscribe(
                () => {
                    this.companyService.deleteCompany(this.deleteCompany)
                        .pipe(first())
                        .subscribe(
                            () => {
                                alert('Xóa công ty thành công');
                                location.reload();
                            },
                            error => {
                                console.log(error);
                                alert('Xóa công ty thất bại');
                            });
                },
                error => {
                    console.log(error);
                    alert('Xóa công ty thất bại');
                });
    }
}
