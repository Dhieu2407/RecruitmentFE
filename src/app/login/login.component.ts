import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../service/candidate.service';
import {AuthenticationService} from "../service/auth.service";
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Account } from '../model/account.model';
import { AccountService } from '../service/account.service';
import { AuthGuardService } from '../service/auth-guard.service';
import { ForgotPasswordService } from '../service/forgot-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private candidateService: CandidateService,
    private authService: AuthenticationService,
    private accountService: AccountService,
    private authGuardService: AuthGuardService,
    private forgotPasswordService: ForgotPasswordService,
) {}

  account = new Account();
  registerForm: FormGroup;
  loginForm: FormGroup;
  resetForm: FormGroup;
  usernameLogin = '';
  passwordLogin = '';
  rememberMe: boolean;
  role = '';
  email = '';

  ngOnInit() {
      if(localStorage.getItem('authenticationToken') !== null || sessionStorage.getItem('authenticationToken') !== null)
          this.router.navigate(['/']);

    this.registerForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      RepeatPassword: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      usernameLogin: ['', Validators.required],
      passwordLogin: ['', Validators.required],
      rememberMe: ['',Validators],
    });

      this.resetForm = this.formBuilder.group({
          email: ['', Validators.required],
      });

  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.role = this.registerForm.get('role').value;
    this.account.login = this.registerForm.get('Username').value;
    this.account.email = this.registerForm.get('Email').value;
    this.account.password = this.registerForm.get('Password').value;
    this.account.authorities = [
        this.registerForm.get('role').value,
    ];
    console.log(this.account);
    this.accountService.createUser(this.account)
      .pipe(first())
      .subscribe(
        data => {
          alert('Đăng ký thành công, xin kiểm tra mail để hoàn tất đăng ký');
        },
        error => {
            console.log(error);
          alert('Đăng ký thất bại');
        });
  }

  onLogin(){
    if (this.loginForm.invalid) {
      return;
    }
    // call login here
    this.usernameLogin = this.loginForm.get('usernameLogin').value;
    this.passwordLogin = this.loginForm.get('passwordLogin').value;
    this.rememberMe = this.loginForm.get('rememberMe').value;
    if(this.rememberMe !== true) this.rememberMe = false;
    const data = {
        username: this.usernameLogin,
        password: this.passwordLogin,
        rememberMe: this.rememberMe
    };
    this.authService.login(data)
      .pipe(first())
      .subscribe(
        res => {
            this.accountService.getAccount().pipe(first())
                .subscribe(
                    data => {
                        this.authService.storeUserData(JSON.stringify(data.body), this.rememberMe);
                    },
                    error => {
                        console.log(error);
                    });
            alert('Đăng nhập thành công');
            location.reload();
        },
          err => console.log(err)
      );
  }

    requestReset(){
        if (this.resetForm.invalid) {
            return;
        }
        this.email = this.resetForm.get('email').value;
        this.forgotPasswordService.save(this.email).subscribe(
            () => {
                alert('Kiểm tra mail của bạn để hoàn tất khôi phục mật khẩu');
            },
            response => {
                console.log(response);
                alert('Email không tồn tại!');
            }
        );
    }
}
