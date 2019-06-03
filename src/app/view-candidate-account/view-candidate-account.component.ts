import { Component, OnInit } from '@angular/core';
import {AccountService} from "../service/account.service";
import {AuthGuardService} from "../service/auth-guard.service";
import {first} from "rxjs/operators";
import { Account } from '../model/account.model';
import {Candidate} from "../model/candidate.model";
import { CandidateService } from '../service/candidate.service';
import {Router} from '@angular/router';
import {Company} from "../model/company.model";
import {JobService} from '../service/job.service';
import {Job} from '../model/job.model';

@Component({
  selector: 'app-view-candidate-account',
  templateUrl: './view-candidate-account.component.html',
  styleUrls: ['./view-candidate-account.component.css']
})
export class ViewCandidateAccountComponent implements OnInit {

  constructor(
      private router: Router,
      private accountService: AccountService,
      private authGuardService: AuthGuardService,
      private candidateService: CandidateService,
      private jobService: JobService,
  ) { }

    page: number;
    pageSize: number;
    acc = new Account();
  account: Account[];
  listCandidate = [];
  count = 0;
    numberOfJobApprova: number;
    job = new Job();
  deleteCandidate = new Candidate();

  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.acc = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.acc = JSON.parse(localStorage.getItem('currentUser'));
      if(this.acc.authorities[0] !== "ROLE_MANAGER") this.router.navigate(['/']);
      this.page = 1;
      this.pageSize = 5;
      this.job.trangThai = '0';
      this.accountService.getAllUsers()
          .pipe(first())
          .subscribe(
              (data: Account[]) => {
                  this.account = data;
                  console.log(this.account);
                  for(let i = 0; i < this.account.length; i++) {
                      if(this.account[i].authorities[0] === "ROLE_CANDIDATE"){
                          this.getCandidate(this.account[i].id, i);
                      }
                  }
              },
              error => {
                  console.log(error);
              });
      this.jobService.getNumberOfJobApproval(JSON.stringify(this.job))
          .pipe(first())
          .subscribe(
              (data: number) => {
                  this.numberOfJobApprova = data;
              },
              error1 => {
                  console.log('Error');
              }
          );
  }

  getCandidate(id: number, i: number){
      this.candidateService.getCandidate(id)
          .pipe(first())
          .subscribe(
              (data: Candidate) => {
                  this.listCandidate[this.count] = data;

                  if(this.listCandidate[this.count] === null){
                      this.listCandidate[this.count] = new Candidate();
                      this.listCandidate[this.count].email = this.account[i].email;
                  }
                  console.log(this.listCandidate);
                  this.count++;
              },
              error => {
                  console.log('Failed');
              }
          );
  }

  onDelete(i){
      this.deleteCandidate.id = this.listCandidate[i].ungVienId;
      this.accountService.deleteUser(this.deleteCandidate.id)
          .pipe(first())
          .subscribe(
              () => {
                  this.candidateService.deleteCandidate(this.deleteCandidate)
                      .pipe(first())
                      .subscribe(
                          () => {
                              alert('Xóa ứng viên thành công');
                              location.reload();
                          },
                          error => {
                              console.log(error);
                              alert('Xóa ứng viên thất bại');
                          });
              },
              error => {
                  console.log(error);
                  alert('Xóa ứng viên thất bại');
              });
  }
}
