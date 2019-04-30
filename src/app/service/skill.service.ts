import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Candidate } from '../model/candidate.model';
import { Resume } from '../model/resume.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  baseUrl  =  environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllSkills(){
    return this.http.get(this.baseUrl + '/getAllSkills');
  }
}
