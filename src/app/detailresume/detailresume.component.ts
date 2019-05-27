import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../service/candidate.service';
import {Candidate} from '../model/candidate.model';
import {first} from 'rxjs/operators';
import {Account} from '../model/account.model';
import {ApplyService} from '../service/apply.service';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';
import { CompanyService } from '../service/company.service';
import {Company} from "../model/company.model";

@Component({
    selector: 'app-detailresume',
    templateUrl: './detailresume.component.html',
    styleUrls: ['./detailresume.component.css']
})
export class DetailresumeComponent implements OnInit {
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private candidateService: CandidateService,
      private applyService: ApplyService,
      private companyService: CompanyService,
  ) { }
    candidate = new Candidate();
    account = new Account();
    id: number;
    idJob: number;
    nganh: string;
    hocVan: string;
    viecLam: string;
    numberOfNotify: number;
    numberOfNotifyTinder: number;
    company = new Company();
    companySaveCandidateDto = new CompanySaveCandidateDTO();

  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.id = +this.route.snapshot.paramMap.get('id');
      this.idJob = +this.route.snapshot.paramMap.get('idJob');
      this.company.id = this.account.id;
      this.candidateService.getCandidate(this.id)
          .pipe(first())
          .subscribe(
              (data: Candidate) => {
                  this.candidate = data;
                  this.nganh = this.candidate.nganh.tenNganh;
                  this.hocVan = JSON.parse(this.candidate.trinhDoDaiHoc);
                  this.viecLam = JSON.parse(this.candidate.lichSuLamViec);

              },
              error => {
                  console.log('Failed');
              });
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
    onSave() {
        this.companySaveCandidateDto.candidateId = this.id;
        this.companySaveCandidateDto.companyId = JSON.parse(localStorage.getItem('currentUser')).id;
        this.companyService.companySaveUngVien(this.companySaveCandidateDto)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                error => {
                    console.log('Fail');
                }
            );
    }
}
