import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CandidateService} from "../service/candidate.service";
import {ApplyService} from "../service/apply.service";
import {CompanyService} from "../service/company.service";
import {Candidate} from "../model/candidate.model";
import {Account} from "../model/account.model";
import {Company} from "../model/company.model";
import {CompanySaveCandidateDTO} from "../model/companySaveCandidateDTO.model";
import {first} from "rxjs/operators";
import {Job} from "../model/job.model";
import {JobService} from "../service/job.service";
import {SearchJob} from "../model/searchJob.model";
import {Apply} from "../model/apply.model";

@Component({
  selector: 'app-approveresumeapply',
  templateUrl: './approveresumeapply.component.html',
  styleUrls: ['./approveresumeapply.component.css']
})
export class ApproveresumeapplyComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private candidateService: CandidateService,
              private applyService: ApplyService,
              private companyService: CompanyService,
              private jobService: JobService,
              ) { }

    candidate = new Candidate();
    job = new Job();
    account = new Account();
    id: number;
    idJob: number;
    nganh: string;
    hocVan: string;
    viecLam: string;
    numberOfNotify: number;
    numberOfNotifyTinder: number;
    company = new Company();
    companySaveCandidateDto = new CompanySaveCandidateDTO();
    applySearch = new Apply();
    applyResult = new Apply();
    hidden: boolean;
    message: string;
    applyApprove = new Apply();
    applyAfterApprove = new Apply();


    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_EMPLOYER") this.router.navigate(['/']);
        this.id = +this.route.snapshot.paramMap.get('id');
        this.idJob = +this.route.snapshot.paramMap.get('idJob');
        this.applySearch.candidateId = this.id;
        this.applySearch.jobId = this.idJob;
        this.company.id = this.account.id;
        this.applyService.getUngTuyern(JSON.stringify(this.applySearch))
            .pipe(first())
            .subscribe(
                (data: Apply) => {
                    this.applyResult = data;
                    console.log(this.applyResult);
                    this.nganh = this.applyResult.ungVien.nganh.tenNganh;
                    this.hocVan = JSON.parse(this.applyResult.ungVien.trinhDoDaiHoc);
                    this.viecLam = JSON.parse(this.applyResult.ungVien.lichSuLamViec);
                    if (0 === this.applyResult.trangThai) {
                        this.hidden = false;
                    } else {
                        this.hidden = true;
                        if ( 1 === this.applyResult.trangThai) {
                            this.message = 'Đã phê duyệt ứng viên!';
                        } else {
                            this.message = 'Đã từ chối ứng viên!';
                        }
                    }
                },
                error1 => {
                    console.log('Faild');
                }
            );
        this.applyService.getNumberNotify(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfNotify = data;
                    console.log(this.numberOfNotify);
                },
                error => {
                    console.log('Faild');
                }
            );
        this.candidateService.getNumberNotifyTinder(JSON.stringify(this.company))
            .pipe(first())
            .subscribe(
                (data: number) => {
                    this.numberOfNotifyTinder = data;
                },
                error1 => {
                    console.log('Faild');
                }
            );
    }
    onSave() {
        this.companySaveCandidateDto.candidateId = this.id;
        this.companySaveCandidateDto.companyId = JSON.parse(localStorage.getItem('currentUser')).id;
        this.companyService.companySaveUngVien(this.companySaveCandidateDto)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                error => {
                    console.log('Fail');
                }
            );
    }
    onApproveApply(status: number) {
        this.applyApprove.trangThai = status;
        this.applyApprove.jobId = this.idJob;
        this.applyApprove.candidateId = this.id;
        this.applyService.chuyenTrangThaiPheDuyet(JSON.stringify(this.applyApprove))
            .pipe(first())
            .subscribe(
                (data: Apply) => {
                    this.applyAfterApprove = data;
                    console.log(this.applyAfterApprove);
                    alert('Bạn đã phê duyệt ứng viên!');
                    window.location.reload();
                },
                error1 => {
                    console.log('Faild');
                }
            );
    }

    onRejectApply(status: number) {
        this.applyApprove.trangThai = status;
        this.applyApprove.jobId = this.idJob;
        this.applyApprove.candidateId = this.id;
        this.applyService.chuyenTrangThaiPheDuyet(JSON.stringify(this.applyApprove))
            .pipe(first())
            .subscribe(
                (data: Apply) => {
                    this.applyAfterApprove = data;
                    console.log(this.applyAfterApprove);
                    alert('Bạn đã từ chối ứng viên!');
                    window.location.reload();
                },
                error1 => {
                    console.log('Faild');
                }
            );
    }

}
