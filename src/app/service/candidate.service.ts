import { Injectable } from '@angular/core';
import { Candidate } from '../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  baseUrl  =  environment.baseUrl;

  constructor(private http: HttpClient) {}

  addNewCandidate(candidate: Candidate) {
    return this.http.post<Candidate>(`${this.baseUrl}/candidateRegister`, candidate);
  }
}
