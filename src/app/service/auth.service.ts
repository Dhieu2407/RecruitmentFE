import { Injectable } from '@angular/core';
import {first, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {Router} from '@angular/router';
import { Account } from '../model/account.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  authUrl  =  environment.baseUrl;
  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;

  constructor(private router: Router,
              private http: HttpClient,
  ) {
      this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  getUsers() {
    return  this.http.get(`${this.authUrl}/authenticate`);
  }

    public get currentUserValue(): Account {
        return this.currentUserSubject.value;
    }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/authenticate`, {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        // if (account && account.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        // }

        // this.accountService.getUserByLogin(username)
        //     .pipe(first())
        //     .subscribe(
        //         (data) => {
        //             localStorage.setItem('currentUser', JSON.stringify(data));
        //             window.location.reload();
        //           },
        //         error => {
        //                 console.log('Failed');
        //           });
        return user;
      }));


  }

  loggedIn(){
      return !!localStorage.getItem('currentUser');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
