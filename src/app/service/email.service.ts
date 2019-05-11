import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    baseUrl = environment.baseUrl + '/email';

    constructor(private http: HttpClient) {}
    sendEmailToCandidate(body: string ) {
        return this.http.post(this.baseUrl + '/sendEmail', body);
    }
}
