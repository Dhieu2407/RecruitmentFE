import { Component, OnInit } from "@angular/core";
import { CandidateService } from '../service/candidate.service';
import { Candidate } from '../model/candidate.model';
import { Company } from '../model/company.model';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';
import { first } from 'rxjs/operators';
import { Account } from '../model/account.model';
import { Router } from "@angular/router";

@Component({
    selector: "app-candidate-notification",
    templateUrl: "./candidate-notification.component.html",
    styleUrls: ["./candidate-notification.component.css"]
})
export class CandidateNotificationComponent implements OnInit {
    constructor(
        private router: Router,
        private candidateService: CandidateService) {}

    id: number;
    candidate: Candidate;
    page: number;
    pageSize: number;
    showCandidate: boolean;
    showJob: boolean;
    companyList: Company[];
    matchedCompanyList: Company[] = [];
    companySaveCandidateDto = new CompanySaveCandidateDTO();
    notificationCount : number;
    account: Account;

    ngOnInit() {
        this.notificationCount = 0;
        this.page = 1;
        this.pageSize = 5;
        this.showJob = false;
        this.showCandidate = true;
        // console.log(JSON.parse(localStorage.getItem("currentUser")));
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_CANDIDATE") this.router.navigate(['/']);
        this.id = this.account.id;
        console.log(this.id);
        this.candidateService
            .getAllSavedCompanies(this.id)
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    // console.log(data);
                    this.companyList = data;
                    // console.log();
                    console.log(this.companyList);

                    for(var i = 0 ; i < this.companyList.length ; ++i){
                        var savedCandidatesByCurrentCompany = this.companyList[i].ungVienSaved;
                        console.log(savedCandidatesByCurrentCompany);
                        for(var y = 0 ; y < savedCandidatesByCurrentCompany.length ; ++y){
                            if(savedCandidatesByCurrentCompany[y].ungVien.ungVienId == this.id || savedCandidatesByCurrentCompany[y].ungVien == this.id){
                                this.matchedCompanyList.push(this.companyList[i]);
                                this.notificationCount++;
                                break;
                            }
                        }
                    }
                    console.log("matched");
                    console.log(this.matchedCompanyList);
                },
                error => {
                    console.log("Failed");
                }
            );
    }
}
