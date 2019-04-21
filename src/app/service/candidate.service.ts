import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Candidate } from '../model/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl  =  environment.baseUrl;

  constructor(private http: HttpClient) {}

  addNewCandidate(candidate: Candidate) {
    return this.http.post<Candidate>(this.baseUrl + '/candidateRegister', candidate);
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
}
