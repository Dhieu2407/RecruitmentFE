import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Major } from "../model/major.model";
import { MajorService } from "../service/major.service";
import { first } from "rxjs/operators";
import { CompanyService } from "../service/company.service";
import { Company } from "../model/company.model";
import { CompanySaveCandidateDTO } from "../model/companySaveCandidateDTO.model";
import { CandidateService } from '../service/candidate.service';

@Component({
    selector: "app-browsercompany",
    templateUrl: "./browsercompany.component.html",
    styleUrls: ["./browsercompany.component.css"]
})
export class BrowsercompanyComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private majorService: MajorService, private companyService: CompanyService,  private candidateService: CandidateService, ) {}
    searchCompanyForm: FormGroup;
    listMajor: Major[];
    listSearchCompany: Company[];
    page: number;
    pageSize: number;
    companySaveCandidateDTO = new CompanySaveCandidateDTO();
    ngOnInit() {
        this.page = 1;
        this.pageSize = 10;
        this.searchCompanyForm = this.formBuilder.group({
            keyword: ["", Validators.required],
            career: ["", Validators.required]
        });
        this.majorService
            .getAllMajors()
            .pipe(first())
            .subscribe(
                (data: Major[]) => {
                    this.listMajor = data;
                },
                error => {
                    console.log("Faild");
                }
            );
        this.companyService
            .getAllCompany()
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    this.listSearchCompany = data;
                    console.log(this.listSearchCompany);
                },
                error => {
                    console.log("Faild");
                }
            );
    }

    onSave(company: any) {
        this.companySaveCandidateDTO.candidateId = JSON.parse(localStorage.getItem("currentUser")).id;
        this.companySaveCandidateDTO.companyId = company.congtyId;
        this.candidateService
            .saveCompany(this.companySaveCandidateDTO)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                error => {
                    console.log("Faild");
                }
            );
    }
}
