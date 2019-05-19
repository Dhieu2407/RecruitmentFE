import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../service/company.service";
import { Candidate } from '../model/candidate.model';
import { first } from 'rxjs/operators';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';

@Component({
    selector: "app-savedcandidate",
    templateUrl: "./savedcandidate.component.html",
    styleUrls: ["./savedcandidate.component.css"]
})
export class SavedcandidateComponent implements OnInit {
    constructor(private companyService: CompanyService) {}

    id: number;
    listCandidate : Candidate[];
    page : number;
    pageSize : number;
    companySaveCandidate = new CompanySaveCandidateDTO();
    ngOnInit() {
        this.page = 1;
        this.pageSize = 10;
        this.id = JSON.parse(localStorage.getItem("currentUser")).id;
        this.companyService.getSavedCandidate(this.id)
        .pipe(first())
        .subscribe(
            (data: Candidate[]) => {
                // console.log(data);
                this.listCandidate = data;
                console.log(this.listCandidate);
            },
            error => {
                console.log("Failed");
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
                console.log("Failed");
            }
        );
    }
}
