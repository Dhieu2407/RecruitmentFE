import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../service/candidate.service';
import {first} from "rxjs/operators";
import {Account} from "../model/account.model";
import {CompanyService} from "../service/company.service";
import {CompanySaveCandidateDTO} from "../model/companySaveCandidateDTO.model";


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private companyService: CompanyService,
  ) { }

  candidate = new Candidate();
  id: number;
  nganh: string;
  hocVan: string;
  viecLam: string;
  account = new Account();
  candidateSave: Candidate[];
  candidateSaveId = [];
  companySaveCandidate = new CompanySaveCandidateDTO();

  ngOnInit() {
    // this.id = JSON.parse(localStorage.getItem('currentUser')).id;
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.id = +this.route.snapshot.paramMap.get("id");

    this.candidateService.getCandidate(this.id)
      .pipe(first())
      .subscribe(
        (data: Candidate) => {
          this.candidate = data;
          this.nganh = this.candidate.nganh.tenNganh;
          this.hocVan = JSON.parse(this.candidate.trinhDoDaiHoc);
          this.viecLam = JSON.parse(this.candidate.lichSuLamViec);
         // console.log(this.candidate);

        },
        error => {
          console.log('Failed');
        });
      this.companyService.getCandidateSaved(this.account.id)
          .pipe(first())
          .subscribe(
              (data: Candidate[]) => {
                  this.candidateSave = data;
                 // console.log(this.candidateSave);
                  for(var i = 0 ; i < this.candidateSave.length ; ++i) {
                      this.candidateSaveId.push(this.candidateSave[i].ungVienId);
                  }
                 // console.log(this.candidateSaveId);
              }
          );

  }

  toModifyResume() {
      location.href='/modifyresume/' + this.id;
  }
    onSave(resume: Candidate, stt: number) {
        this.companySaveCandidate.candidateId = resume.ungVienId;
        this.companySaveCandidate.companyId = this.account.id;
        this.companyService.companySaveUngVien(this.companySaveCandidate)
            .pipe(first())
            .subscribe(
                (data: any) => {
                   // console.log(data);
                    if (stt === 1) {
                        alert('Bạn đã bỏ lưu ứng viên: ' + resume.tenUngVien);
                    } else {
                        alert('Bạn đã lưu ứng viên: ' + resume.tenUngVien);
                    }
                    window.location.reload();
                },
                error => {
                    console.log('Fail');
                }
            );
    }

}
