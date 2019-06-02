import { Component, OnInit } from "@angular/core";
import { Candidate } from "../model/candidate.model";
import { Company } from "../model/company.model";
import { CandidateService } from "../service/candidate.service";
import { first } from "rxjs/operators";
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';
import { Account } from '../model/account.model';
import {Router} from'@angular/router';

@Component({
    selector: "app-savedcompany",
    templateUrl: "./savedcompany.component.html",
    styleUrls: ["./savedcompany.component.css"]
})
export class SavedcompanyComponent implements OnInit {
    constructor(
        private router: Router,
        private candidateService: CandidateService) {}
    account: Account;
    id: number;
    candidate: Candidate;
    page: number;
    pageSize: number;
    showCandidate: boolean;
    showJob: boolean;
    companyList: Company[];
    companySaveCandidateDto = new CompanySaveCandidateDTO();
    notificationCount : number;

    ngOnInit() {
        this.notificationCount = 0;
        this.page = 1;
        this.pageSize = 5;
        this.showJob = false;
        this.showCandidate = true;
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_CANDIDATE") this.router.navigate(['/']);
        this.id = this.account.id;
        this.candidateService
            .getAllSavedCompanies(this.id)
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    // console.log(data);
                    this.companyList = data;
                    console.log(this.companyList);
                },
                error => {
                    console.log("Failed");
                }
            );
        this.candidateService
            .getAllSavedCompanies(this.id)
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    // console.log(data);
                    this.companyList = data;
                    // console.log();
                    console.log(this.companyList);

                    for (var i = 0; i < this.companyList.length; ++i) {
                        var savedCandidatesByCurrentCompany = this.companyList[i].ungVienSaved;
                        console.log(savedCandidatesByCurrentCompany);
                        for (var y = 0; y < savedCandidatesByCurrentCompany.length; ++y) {
                            if (savedCandidatesByCurrentCompany[y].ungVien.ungVienId == this.id || savedCandidatesByCurrentCompany[y].ungVien == this.id) {
                                this.notificationCount++;
                                break;
                            }
                        }
                    }
                    console.log("matched");
                    console.log(this.notificationCount);
                },
                error => {
                    console.log("Failed");
                }
            );
    }

    onSave(company: any){
        this.id = this.account.id;
        this.companySaveCandidateDto.candidateId = this.id;
        this.companySaveCandidateDto.companyId = company.congtyId;
        this.candidateService.saveCompany(this.companySaveCandidateDto)
        .pipe(first())
        .subscribe(
            (data: any) => {
                console.log(data);
                window.location.reload();
            },
            error => {
                console.log("Failed");
            }
        );
    }
}
