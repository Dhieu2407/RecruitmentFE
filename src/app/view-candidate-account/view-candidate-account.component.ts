import { Component, OnInit } from '@angular/core';
import {AccountService} from "../service/account.service";
import {AuthGuardService} from "../service/auth-guard.service";
import {first} from "rxjs/operators";
import { Account } from '../model/account.model';
import {Candidate} from "../model/candidate.model";
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'app-view-candidate-account',
  templateUrl: './view-candidate-account.component.html',
  styleUrls: ['./view-candidate-account.component.css']
})
export class ViewCandidateAccountComponent implements OnInit {

  constructor(
      private accountService: AccountService,
      private authGuardService: AuthGuardService,
      private candidateService: CandidateService,
  ) { }

  account: Account[];
  resume: Candidate[]

  ngOnInit() {
      this.accountService.getAllUsers()
          .pipe(first())
          .subscribe(
              (data: Account[]) => {
                  this.account = data;
                  for(let i = 0; i < this.account.length; i++) {
                      if(this.account[i].authorities[0] === "ROLE_CANDIDATE"){
                          this.getCandidate(this.account[i].id);
                      }
                  }
              },
              error => {
                  console.log(error);
              });
  }

  getCandidate(i: number){
      this.candidateService.getCandidate(i)
          .pipe(first())
          .subscribe(
              (data: Candidate[]) => {
                  this.resume = data;
                  console.log(this.resume);
              },
              error => {
                  console.log('Failed');
              }
          );
  }

  onDelete(i){

  }


}
