import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { Candidate } from "../model/candidate.model";
import { Resume } from "../model/resume.model";
import { Account } from "../model/account.model";
import { CandidateSaveJobsDTO } from "../model/candidateSaveJobsDTO.model";
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';

@Injectable({
    providedIn: "root"
})
export class CandidateService {
    baseUrl = environment.baseUrl + "/candidate";

    constructor(private http: HttpClient) {}

    addNewCandidate(account: Account) {
        return this.http.post<Account>(this.baseUrl + "/candidateRegister", account);
    }

    getAllCandidates() {
        return this.http.get(this.baseUrl + "/getAllCandidates");
    }

    getCandidate(id: number) {
        return this.http.get(this.baseUrl + "/getCandidate/" + id);
    }

    searchCandidate(candidate: Candidate) {
        return this.http.post(this.baseUrl + "/searchCandidates", candidate);
    }

    deleteCandidate(candidate: Candidate){
        return this.http.post(this.baseUrl + "/deleteCandidate", candidate);
    }

    modifyResume(resume: Resume) {
        return this.http.post(this.baseUrl + "/updateProfileCandidates", resume);
    }

    candidateSaveJob(candidateSaveJob: CandidateSaveJobsDTO) {
        return this.http.post(this.baseUrl + "/bookmarkJob", candidateSaveJob);
    }

    getBookmarkedJob(id: number) {
        return this.http.get(this.baseUrl + "/getBookmarkedJobs/" + id);
    }

    candidateApplyJob(candidateSaveJob: CandidateSaveJobsDTO) {
        return this.http.post(this.baseUrl + "/applyJob", candidateSaveJob);
    }

    getAppliedJobs(id: number) {
        return this.http.get(this.baseUrl + "/getAppliedJobs/" + id);
    }
    /*update phuc.nh*/
    getAppliiedJobs1(id: number) {
        return this.http.get( this.baseUrl + "/getAppliedJobs1/" + id);
    }
    getListCandidateOfApply(body: string) {
        return this.http.post(this.baseUrl + "/getListUngTuyen", body);
    }

    saveCompany(candidateSaveCompany : CompanySaveCandidateDTO){
        return this.http.post(this.baseUrl + "/saveCompany", candidateSaveCompany);
    }

    getAllSavedCompanies(id : number){
        return this.http.get(this.baseUrl + "/getAllCompaniesSaved/" + id);
    }
  getCandidateApplyAllJobOfCompany(body: string) {
      return this.http.post(this.baseUrl + '/getListUngTuyenOfCompany', body);
  }
  getNumberNotifyTinder(body: string) {
        return this.http.post(this.baseUrl + '/getNumberNotifyTinder', body);
  }
  getListCandidateTinder(body: string) {
        return this.http.post(this.baseUrl + '/getCandidateTinder', body);
  }
}
