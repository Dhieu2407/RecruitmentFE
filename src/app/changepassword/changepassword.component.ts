import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from '../service/auth-guard.service';
import {Router} from '@angular/router';
import { AccountService } from '../service/account.service';
import {first} from "rxjs/operators";
import {Account} from "../model/account.model";
import {CandidateService} from "../service/candidate.service";
import {Company} from "../model/company.model";
import {ApplyService} from "../service/apply.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  constructor(
      private formBuilder: FormBuilder,
      private authGuardService: AuthGuardService,
      private accountService: AccountService,
      private router: Router,
      private candidateService: CandidateService,
      private applyService: ApplyService,
  ) { }

  account = new Account();
  changePasswordForm: FormGroup;
    company = new Company();
  roleCandidate: boolean;
  roleEmployer: boolean;
    numberOfNotifyTinder: number;
    numberOfNotify: number;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  ngOnInit() {
      this.changePasswordForm = this.formBuilder.group({
          currentPassword: ['', Validators.required],
          newPassword: ['', Validators.required],
          confirmPassword: ['', Validators.required],
      });

      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));

      this.roleCandidate = false;
      this.roleEmployer = false;
      if (this.account.authorities[0] === 'ROLE_CANDIDATE')   this.roleCandidate = true;
      else if(this.account.authorities[0] === 'ROLE_EMPLOYER') this.roleEmployer = true;

      this.company.id = this.account.id;

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
      this.applyService.getNumberNotify(JSON.stringify(this.company))
          .pipe(first())
          .subscribe(
              (data: number) => {
                  this.numberOfNotify = data;
              },
              error1 => {
                  console.log('Faild');
              }
          );
  }

  onChangePassword(){
      this.currentPassword = this.changePasswordForm.get('currentPassword').value;
      this.newPassword = this.changePasswordForm.get('newPassword').value;
      this.confirmPassword = this.changePasswordForm.get('confirmPassword').value;
      if(this.confirmPassword !== this.newPassword){
          alert('Mật khẩu không trùng khớp');
          return;
      }

      this.accountService.changePassword(this.currentPassword, this.newPassword)
          .pipe(first())
          .subscribe(
              data => {
                  alert('Đổi mật khẩu thành công');
              },
              error => {
                  alert('Mật khẩu cũ không đúng');
              });
  }
}
