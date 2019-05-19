import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { Candidate } from '../model/candidate.model';
import { first } from 'rxjs/operators';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';
import {ApplyService} from '../service/apply.service';
import {Account} from '../model/account.model';
import {AuthGuardService} from '../service/auth-guard.service';
import {Company} from "../model/company.model";
import {CandidateService} from "../service/candidate.service";

@Component({
    selector: 'app-savedcandidate',
    templateUrl: './savedcandidate.component.html',
    styleUrls: ['./savedcandidate.component.css']
})
export class SavedcandidateComponent implements OnInit {
    constructor(
        private companyService: CompanyService,
        private applyService: ApplyService,
        private candidateService: CandidateService,
        private authGuardService: AuthGuardService,
        ) {}

    id: number;
    listCandidate : Candidate[];
    page: number;
    company = new Company();
    pageSize: number;
    numberOfNotify: number;
    numberOfNotifyTinder: number;
    account = new Account();
    companySaveCandidate = new CompanySaveCandidateDTO();
    ngOnInit() {
        this.authGuardService.canAccess('ROLE_EMPLOYER');
        this.account = JSON.parse(localStorage.getItem('currentUser'));
        this.company.id = this.account.id;
        this.page = 1;
        this.pageSize = 10;
        this.id = this.account.id;
        this.applyService.getNumberNotify(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfNotify = data;
                    console.log(this.numberOfNotify);
                },
                error => {
                    console.log('Faild');
                }
            );
        this.companyService.getSavedCandidate(this.id)
        .pipe(first())
        .subscribe(
            (data: Candidate[]) => {
                // console.log(data);
                this.listCandidate = data;
                console.log(this.listCandidate);
            },
            error => {
                console.log('Failed');
            }
        );
        this.candidateService.getNumberNotifyTinder(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfNotifyTinder = data;
                },
                error1 => {
                    console.log('Faild');
                }
            );
    }

    onSave(candidate: Candidate){
        this.companySaveCandidate.companyId = this.id;
        this.companySaveCandidate.candidateId = candidate.ungVienId;
        this.companyService.companySaveUngVien(this.companySaveCandidate)
        .pipe(first())
        .subscribe(
            (data: any) => {
                // console.log(data);
                // this.listCandidate = data;
                console.log(data);
                window.location.reload();
            },
            error => {
                console.log('Failed');
            }
        );
    }
}
