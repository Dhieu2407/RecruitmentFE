import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ApplyService {
    baseUrl  =  environment.baseUrl + '/apply';
    constructor(private http: HttpClient) {}

    getNumberNotify(body: string) {
        return this.http.post(this.baseUrl + '/getNumBerNotify' , body );
    }
    chuyenTrangThaiXem(body: string) {
        return this.http.post(this.baseUrl + '/chuyenTrangThaiXem' , body);
    }
}
