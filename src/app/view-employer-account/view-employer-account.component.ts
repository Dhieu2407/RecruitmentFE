import { Component, OnInit } from '@angular/core';
import {AccountService} from "../service/account.service";
import {AuthGuardService} from "../service/auth-guard.service";
import {first} from "rxjs/operators";
import { Account } from '../model/account.model';
import {Company} from "../model/company.model";
import { CompanyService } from '../service/company.service';

@Component({
    selector: 'app-view-employer-account',
    templateUrl: './view-employer-account.component.html',
    styleUrls: ['./view-employer-account.component.css']
})
export class ViewEmployerAccountComponent implements OnInit {

    constructor(
        private accountService: AccountService,
        private authGuardService: AuthGuardService,
        private companyService: CompanyService,
    ) { }

    page: number;
    pageSize: number;
    account: Account[];
    listCompany = [];
    count = 0;

    ngOnInit() {
        this.page = 1;
        this.pageSize = 5;
        this.accountService.getAllUsers()
            .pipe(first())
            .subscribe(
                (data: Account[]) => {
                    this.account = data;
                    console.log(this.account);
                    for(let i = 0; i < this.account.length; i++) {
                        if(this.account[i].authorities[0] === "ROLE_EMPLOYER"){
                            this.getCandidate(this.account[i].id);
                        }
                    }
                },
                error => {
                    console.log(error);
                });
    }

    getCandidate(i: number){
        this.companyService.getCompany(i)
            .pipe(first())
            .subscribe(
                (data: Company) => {
                    this.listCompany[this.count] = data;
                    console.log(this.listCompany);
                    this.count++;
                },
                error => {
                    console.log('Failed');
                }
            );
    }

    onDelete(i){

    }
}
