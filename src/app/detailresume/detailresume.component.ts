import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../service/candidate.service';
import {Candidate} from "../model/candidate.model";
import {first} from "rxjs/operators";
import {Email} from "../model/email.model";
import {Account} from "../model/account.model";
import {EmailService} from '../service/email.service';
import {ApplyService} from "../service/apply.service";

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
      private emailService: EmailService,
      private applyService: ApplyService,
  ) { }

    candidate = new Candidate();
    email = new Email();
    emailRespon = new Email();
    account = new Account();
    id: number;
    idJob: number;
    nganh: string;
    hocVan: string;
    viecLam: string;
    numberOfNotify: number;

  ngOnInit() {
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.id = +this.route.snapshot.paramMap.get('id');
      this.idJob = +this.route.snapshot.paramMap.get('idJob');
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
      this.applyService.getNumberNotify()
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
  }
  // sendEmail() {
  //     this.email.idCompany = this.account.id;
  //     this.email.idJob = this.idJob;
  //     this.email.emailCandidate = this.candidate.email;
  //     this.email.contentMail = this.formEmail.get('contentEmail').value;
  //     this.emailService.sendEmailToCandidate(JSON.stringify(this.email))
  //         .pipe(first())
  //         .subscribe(
  //             (data: Email) => {
  //                 this.emailRespon = data;
  //                 console.log(this.emailRespon);
  //             },
  //             error => {
  //                 console.log('Faild');
  //             }
  //         );
  //
  // }

}
