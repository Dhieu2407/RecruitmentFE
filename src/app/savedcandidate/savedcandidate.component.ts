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
import {Router} from '@angular/router';

@Component({
    selector: 'app-savedcandidate',
    templateUrl: './savedcandidate.component.html',
    styleUrls: ['./savedcandidate.component.css']
})
export class SavedcandidateComponent implements OnInit {
    constructor(
        private router: Router,
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
    //update
    searchName: string;
    companySaveCandidate = new CompanySaveCandidateDTO();
    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_EMPLOYER") this.router.navigate(['/']);
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

    onSave(candidate: Candidate, stt: number){
        this.companySaveCandidate.companyId = this.id;
        this.companySaveCandidate.candidateId = candidate.ungVienId;
        this.companyService.companySaveUngVien(this.companySaveCandidate)
        .pipe(first())
        .subscribe(
            (data: any) => {
                alert('Bạn đã bỏ lưu ứng viên: ' + candidate.tenUngVien);
                console.log(data);
                window.location.reload();
            },
            error => {
                console.log('Failed');
            }
        );
    }

}
