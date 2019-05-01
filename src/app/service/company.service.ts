import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Candidate } from '../model/candidate.model';
import { Resume } from '../model/resume.model';
import { Account } from '../model/account.model';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl  =  environment.baseUrl;

  constructor(private http: HttpClient) {}

  addNewCompany(account: Account) {
    return this.http.post<Account>(this.baseUrl + '/companyRegister', account);
  }

  modifyCompany(company: Company) {
    return this.http.post(this.baseUrl + '/updateProfileCompany', company);
  }

  getCompany(id: number){
      return this.http.get(this.baseUrl + '/getCompany/' + id);
  }
}