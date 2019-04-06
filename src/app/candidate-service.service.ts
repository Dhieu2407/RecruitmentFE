import { Injectable } from '@angular/core';
import { Candidate } from './login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {
  constructor(private http: HttpClient) {}
  addNewCandidate(candidate: Candidate) {
    return this.http.post<Candidate>('http://localhost:8080/candidateRegister', candidate);
  }
}
