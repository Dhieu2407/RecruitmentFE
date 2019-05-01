import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private http: HttpClient) { }
    baseUrl = environment.baseUrl;

    uploadFile(file: FormData) {
        return this.http.post(this.baseUrl + '/uploadFile', file);
    }
    uploadMultipleFiles(files: FormData) {
        return this.http.post(this.baseUrl + '/uploadMultipleFiles', files);
    }

}
