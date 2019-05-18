import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ApplyService {
    baseUrl  =  environment.baseUrl + '/apply';
    constructor(private http: HttpClient) {}

    getNumberNotify() {
        return this.http.get(this.baseUrl + '/getNumBerNotify');
    }
    chuyenTrangThaiXem(body: string) {
        return this.http.post(this.baseUrl + '/chuyenTrangThaiXem' , body);
    }
}
