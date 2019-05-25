import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  baseUrl  =  environment.baseUrl + '/certificate';

  constructor(private http: HttpClient) {}

  getAllCertificates(){
    return this.http.get(this.baseUrl + '/getAllCertificates');
  }
}
