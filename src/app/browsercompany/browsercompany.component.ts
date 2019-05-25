import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Major } from "../model/major.model";
import { MajorService } from "../service/major.service";
import { first } from "rxjs/operators";
import { CompanyService } from "../service/company.service";
import { Company } from "../model/company.model";
import { CompanySaveCandidateDTO } from "../model/companySaveCandidateDTO.model";
import { CandidateService } from '../service/candidate.service';
import {SearchCompany} from "../model/searchCompany.model";
import {Account} from '../model/account.model';

@Component({
    selector: "app-browsercompany",
    templateUrl: "./browsercompany.component.html",
    styleUrls: ["./browsercompany.component.css"]
})
export class BrowsercompanyComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private majorService: MajorService,
                private companyService: CompanyService,
                private candidateService: CandidateService, ) {}

    account:Account;
    searchCompanyForm: FormGroup;
    listMajor: Major[];
    listSearchCompany: Company[];
    page: number;
    pageSize: number;
    searchCompany = new SearchCompany();
    companySaveCandidateDTO = new CompanySaveCandidateDTO();
  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.page = 1;
      this.pageSize = 10;
      this.searchCompanyForm = this.formBuilder.group({
          keyword: ['', Validators.required],
          career: ['', Validators.required],
      });
      this.majorService.getAllMajors()
          .pipe(first())
          .subscribe(
              (data: Major[]) => {
                  this.listMajor = data;
              },
              error => {
                  console.log('Fail');
              }
          );
      this.companyService.getAllCompany()
          .pipe(first())
          .subscribe(
              (data: Company[]) => {
                  this.listSearchCompany = data;
                  console.log(this.listSearchCompany);
              },
              error => {
                  console.log('Fail');
              }
          );
  }

    onSave(company: any) {
        this.companySaveCandidateDTO.candidateId = this.account.id;
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
    onSubmit(buttonType): void {
        if (buttonType === 'Search') {
            this.searchCompany.companyName = this.searchCompanyForm.get('keyword').value;
            this.searchCompany.careerId = this.searchCompanyForm.get('career').value;
            this.companyService.getSearchCompany(JSON.stringify(this.searchCompany))
                .pipe(first())
                .subscribe(
                    (data: Company[]) => {
                        this.listSearchCompany = data;
                        console.log(this.listSearchCompany);
                    },
                    error => {
                        console.log('Faild');
                    }
                );
        }
    }
}
