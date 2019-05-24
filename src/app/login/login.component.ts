import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../service/candidate.service';
import {AuthenticationService} from "../service/auth.service";
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Account } from '../model/account.model';
import { AccountService } from '../service/account.service';
import { AuthGuardService } from '../service/auth-guard.service';

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
) {}

  account = new Account();
  registerForm: FormGroup;
  loginForm: FormGroup;
  usernameLogin = '';
  passwordLogin = '';
  rememberMe: boolean;
  role = '';

  ngOnInit() {
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
          alert('Registration succesful');
          this.router.navigate(['/home']);
        },
        error => {
            console.log(error);
          alert('Registration failed');
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
           this.authService.storeAuthenticationToken(res, this.rememberMe);
        },
          err => console.log(err)
      );
  }
}
