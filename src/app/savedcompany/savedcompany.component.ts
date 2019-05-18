import { Component, OnInit } from "@angular/core";
import { Candidate } from "../model/candidate.model";
import { Company } from "../model/company.model";
import { CandidateService } from "../service/candidate.service";
import { first } from "rxjs/operators";
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';

@Component({
    selector: "app-savedcompany",
    templateUrl: "./savedcompany.component.html",
    styleUrls: ["./savedcompany.component.css"]
})
export class SavedcompanyComponent implements OnInit {
    constructor(private candidateService: CandidateService) {}

    id: number;
    candidate: Candidate;
    page: number;
    pageSize: number;
    showCandidate: boolean;
    showJob: boolean;
    companyList: Company[];
    companySaveCandidateDto = new CompanySaveCandidateDTO();

    ngOnInit() {
        this.page = 1;
        this.pageSize = 10;
        this.showJob = false;
        this.showCandidate = true;
        // console.log(JSON.parse(localStorage.getItem("currentUser")));
        this.id = JSON.parse(localStorage.getItem("currentUser")).id;
        console.log(this.id);
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
    }

    onSave(company: any){
        this.id = JSON.parse(localStorage.getItem("currentUser")).id;
        this.companySaveCandidateDto.candidateId = this.id;
        this.companySaveCandidateDto.companyId = company.congtyId;
        this.candidateService.saveCompany(this.companySaveCandidateDto)
        .pipe(first())
        .subscribe(
            (data: any) => {
                console.log(data);
            },
            error => {
                console.log("Failed");
            }
        );
    }
}