import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from '../service/auth-guard.service';
import {Router} from '@angular/router';
import { AccountService } from '../service/account.service';
import {first} from "rxjs/operators";
import {Account} from "../model/account.model";

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
  ) { }

  account = new Account();
  changePasswordForm: FormGroup;

  roleCandidate = false;
  roleEmployer = false;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  ngOnInit() {
      this.changePasswordForm = this.formBuilder.group({
          currentPassword: ['', Validators.required],
          newPassword: ['', Validators.required],
          confirmPassword: ['', Validators.required],
      });

      this.account = JSON.parse(localStorage.getItem('currentUser'));
      if (this.account.authorities[0] === 'ROLE_CANDIDATE') {
          this.roleCandidate = true;
          this.roleEmployer = false;
      } if(this.account.authorities[0] === 'ROLE_EMPLOYER') {
          this.roleEmployer = true;
          this.roleCandidate = false;
      }
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
                  alert('Change password success');
                  this.router.navigate(['/home']);
              },
              error => {
                  console.log(error);
              });
  }
}
