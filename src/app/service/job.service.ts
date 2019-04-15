import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl  =  environment.baseUrl;

  constructor(private http: HttpClient) {}
  getAllJobs() {
    return this.http.get(this.baseUrl + '/getJob');
  }
  searchJobs(body: string) {
    return this.http.post(this.baseUrl + '/searchJobs', body );
  }
}
