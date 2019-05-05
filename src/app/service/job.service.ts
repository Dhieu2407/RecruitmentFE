import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl  =  environment.baseUrl + '/job';

  constructor(private http: HttpClient) {}
  getAllJobs() {
    return this.http.get(this.baseUrl + '/getJob');
  }
  searchJobs(body: string) {
    return this.http.post(this.baseUrl + '/searchJobs', body );
  }
  getJobById(body: string) {
    return this.http.post(this.baseUrl + '/getJobById', body );
  }
  getListJobRelate(body: string) {
    return this.http.post(this.baseUrl + '/getListJobRelate', body);
  }
  postJob(body: string) {
    return this.http.post(this.baseUrl + '/addJob', body);
  }
  getAllMajor() {
    return this.http.get(this.baseUrl + '/getAllMajor');
  }
  getListJobOfCompany(body: string) {
      return this.http.post(this.baseUrl + '/getListJobOfCompany', body);
  }
  updateJob(body: string) {
      return this.http.post( this.baseUrl + '/updateJob', body);
  }
  deleteJob(body: string) {
      return this.http.post( this.baseUrl + '/deleteJobById', body);
  }

}
