import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseUrl;
    save(mail: string): Observable<any> {
        return this.http.post(this.baseUrl + '/account/reset-password/init', mail);
    }
}
