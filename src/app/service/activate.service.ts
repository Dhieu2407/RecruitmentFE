import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ActivateService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseUrl;
    get(key: string): Observable<any> {
        return this.http.get(this.baseUrl + '/activate', {
            params: new HttpParams().set('key', key)
        });
    }
}
