import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/account.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;

  getAccount() {
    return this.http.get(this.baseUrl + '/account');
  }

  saveAccount(account: Account) {
    return this.http.post(this.baseUrl + '/account', account);
  }

  createUser(account: Account) {
    return this.http.post(this.baseUrl + '/users', account);
  }

  getUserByLogin(login: string) {
      return this.http.get<Account>(this.baseUrl + '/users/' + login);
  }

  updateUser(account: Account) {
    return this.http.put(this.baseUrl + '/' + account.id, account);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  requestResetKey(email: String) {
    return this.http.post(this.baseUrl + '/account/reset-password/init', email);
  }

  setNewPassword(keyAndPassword: any): Observable<any> {
    return this.http.post(this.baseUrl + '/account/reset-password/finish', keyAndPassword);
  }
}
