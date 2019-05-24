import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Account } from '../model/account.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;

  getAllUsers(){
      return this.http.get(this.baseUrl + '/users');
  }

  get(): Observable<HttpResponse<Account>> {
     return this.http.get<Account>(this.baseUrl + '/account', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
     return this.http.post(this.baseUrl + '/account', account, { observe: 'response' });
  }

  createUser(account: Account) {
    return this.http.post(this.baseUrl + '/register', account);
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

  changePassword(currentPassword: string, newPassword: string) {
      return this.http.post<any>(`${this.baseUrl}/account/change-password`, {currentPassword, newPassword})
  }

  requestResetKey(email: String) {
    return this.http.post(this.baseUrl + '/account/reset-password/init', email);
  }

  setNewPassword(keyAndPassword: any): Observable<any> {
    return this.http.post(this.baseUrl + '/account/reset-password/finish', keyAndPassword);
  }
}
