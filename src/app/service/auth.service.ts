import { Injectable } from '@angular/core';
import {first, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {Router} from '@angular/router';
import { AccountService } from '../service/account.service';
import { Account } from '../model/account.model';

@Injectable()
export class AuthenticationService {

  authUrl  =  environment.baseUrl;
  account = new Account();

  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService
  ) {}

  getUsers() {
    return  this.http.get(`${this.authUrl}/authenticate`);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/authenticate`, {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        this.router.navigate(['/home']);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
        }

        this.accountService.getUserByLogin(username)
            .pipe(first())
            .subscribe(
                (data) => {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                  },
                error => {
                        console.log('Failed');
                  });
        return user;
      }));


  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
