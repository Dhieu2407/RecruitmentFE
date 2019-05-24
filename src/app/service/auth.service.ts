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

  constructor(private router: Router,
              private http: HttpClient,
  ) {}

  public getToken() {
     return localStorage.getItem('authenticationToken');
  }

    login(data) {
        return this.http.post<any>(`${this.authUrl}/authenticate`, {username: data.username, password: data.password},
            { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));

        function authenticateSuccess(resp) {
            const bearerToken = resp.headers.get('Authorization');
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const token = bearerToken.slice(7, bearerToken.length);
                //this.storeAuthenticationToken(jwt, credentials.rememberMe);
                return token;
            }
        }
    }

    loginWithToken(jwt, rememberMe) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('Rejected');
        }
    }

    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            localStorage.setItem('authenticationToken', jwt);
        } else {
            sessionStorage.setItem('authenticationToken', jwt);
        }
        console.log(jwt);
    }

  loggedIn(){
      return !!localStorage.getItem('authenticationToken');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('authenticationToken');
  }
}
