import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { Company } from '../model/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Account} from '../model/account.model';
import {CandidateService} from "../service/candidate.service";
import {CompanySaveCandidateDTO} from "../model/companySaveCandidateDTO.model";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  constructor(private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private candidateService: CandidateService ) { }

    account = new Account();
    company: Company;
    id: number;
    idCompany: number;
    savedCompanyId = [];
    savedCompany: Company[];
    companySaveCandidateDTO = new CompanySaveCandidateDTO();
  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));

    this.id = +this.route.snapshot.paramMap.get("id");
    this.idCompany = this.account.id;

      this.candidateService.getAllSavedCompanies(this.idCompany)
          .pipe(first())
          .subscribe(
              (data: Company[]) => {
                  this.savedCompany = data;
                  for(var i = 0 ; i < this.savedCompany.length ; ++i) {
                      this.savedCompanyId.push(this.savedCompany[i].congtyId);
                  }
                  console.log("saved  : " + this.savedCompanyId);
              },
              error => {
                  console.log("Fail");
              }
          );
    this.companyService.getCompany(this.id)
        .pipe(first())
        .subscribe(
            (data: Company) => {
                console.log(data);
                this.company = data;
                console.log(this.company);
            },
            error => {
                console.log("Failed");
            }
        )
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
                    if (this.savedCompanyId.indexOf(company.congtyId) !== -1) {
                        alert("Bạn đã bỏ lưu công ty " + company.tenCongTy + " thành công");
                    } else {
                        alert("Bạn đã lưu công ty " + company.tenCongTy + " thành công");
                    }
                    window.location.reload();
                },
                error => {
                    console.log("Faild");
                }
            );
    }

  toModifyCompany() {
    location.href='/modifycompany/' + this.id;
  }

}
