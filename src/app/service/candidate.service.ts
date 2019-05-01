import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Candidate } from '../model/candidate.model';
import { Resume } from '../model/resume.model';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl  =  environment.baseUrl;

  constructor(private http: HttpClient) {}

  addNewCandidate(account: Account) {
    return this.http.post<Account>(this.baseUrl + '/candidateRegister', account);
  }

  getAllCandidates(){
    return this.http.get(this.baseUrl + '/getAllCandidates');
  }

  getCandidate(id: number) {
    return this.http.get(this.baseUrl + '/getCandidate/' + id);
  }

  searchCandidate(candidate: Candidate){
    return this.http.post(this.baseUrl + '/searchCandidates', candidate);
  }

  modifyResume(resume: Resume){
    return this.http.post(this.baseUrl + '/updateProfileCandidates', resume);
  }
}
