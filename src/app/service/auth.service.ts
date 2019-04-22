import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  authUrl  =  environment.baseUrl;
  constructor(private router: Router,
              private http: HttpClient) {}
  getUsers() {
    return  this.http.get(`${this.authUrl}/authenticate`);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/authenticate`, {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log('login successful');
        this.router.navigate(['/home']);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
