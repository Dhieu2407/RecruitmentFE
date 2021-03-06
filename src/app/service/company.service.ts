import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Candidate } from '../model/candidate.model';
import { Resume } from '../model/resume.model';
import { Account } from '../model/account.model';
import { Company } from '../model/company.model';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    baseUrl = environment.baseUrl + '/company';

    constructor(private http: HttpClient) {}

    addNewCompany(account: Account) {
        return this.http.post<Account>(this.baseUrl + '/companyRegister', account);
    }

    modifyCompany(company: Company) {
        return this.http.post(this.baseUrl + '/updateProfileCompany', company);
    }

    getCompany(id: number) {
        return this.http.get(this.baseUrl + '/getCompany/' + id);
    }

    deleteCompany(company: Company){
        return this.http.post(this.baseUrl + "/deleteCompany", company);
    }
    getCandidateApplyJobOCompany(id: number) {
        return this.http.get(this.baseUrl + '/getCandidateByCompany/' + id);
    }
    companySaveUngVien(companySaveUngVien: CompanySaveCandidateDTO) {
        return this.http.post(this.baseUrl + '/saveCandidate', companySaveUngVien);
    }
    getAllCompany() {
        return this.http.get(this.baseUrl + '/getAllCompanies');
    }
    getSavedCandidate(id: number) {
        return this.http.get(this.baseUrl + '/getSavedCandidate/' + id);
    }
    getSearchCompany(body: string) {
        return this.http.post(this.baseUrl + '/searchCompany' , body);
    }
    /*lay minh obj cua Candidate*/
    getCandidateSaved(id: number) {
        return this.http.get(this.baseUrl + '/getCandidateSave/' + id );
    }
}
