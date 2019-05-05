import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Major } from '../model/Major.model';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
  baseUrl  =  environment.baseUrl + '/major';

  constructor(private http: HttpClient) {}

  getAllMajors(){
    return this.http.get(this.baseUrl + '/getAllMajors');
  }
}
