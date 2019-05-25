import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../service/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SearchJob} from "../model/searchJob.model";
import {first} from "rxjs/operators";
import {Job} from "../model/job.model";
import {ApplyService} from "../service/apply.service";
import {CandidateService} from "../service/candidate.service";
import {Company} from "../model/company.model";
import {AuthGuardService} from "../service/auth-guard.service";
import {Account} from "../model/account.model";
import {Candidate} from "../model/candidate.model";

@Component({
  selector: 'app-manage-edit-jobdetail',
  templateUrl: './manage-edit-jobdetail.component.html',
  styleUrls: ['./manage-edit-jobdetail.component.css']
})
export class ManageEditJobdetailComponent implements OnInit {

  constructor(
      private authGuardService: AuthGuardService,
      private router: Router,
      private routerSnapshot: ActivatedRoute,
      private jobService: JobService,
      private formBuilder: FormBuilder,
      private applyService: ApplyService,
      private candidateService: CandidateService,
  ) { }

    jobForm: FormGroup;
    numberOfNotifyTinder: number;
    numberOfNotify: number;
    company = new Company();
    jobId: number;
    searchJob = new SearchJob();
    job = new Job();
    jobUpdate = new Job();
    account = new Account();
  ngOnInit() {
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.company.id = this.account.id;
      this.jobForm = this.formBuilder.group({
          chiTiet: ['', Validators.required],
          tenJob: ['', Validators.required],
          chucVu1: ['', Validators.required],
          diaChi: ['', Validators.required],
          tenNganh: ['', Validators.required],
          yeuCauUngVien: ['', Validators.required],
          quyenLoi: ['', Validators.required],
          yeuCauHoSo: ['', Validators.required],
          knToiThieu: ['', Validators.required],
          soLuong: ['', Validators.required],
          luongToiThieu: ['', Validators.required],
          luongToiDa: ['', Validators.required],
          hanCuoi: ['', Validators.required],
      });
      this.jobId = parseInt(this.routerSnapshot.snapshot.paramMap.get('id'));
      this.searchJob.jobId = this.routerSnapshot.snapshot.paramMap.get('id');
      this.jobService.getJobById(JSON.stringify(this.searchJob))
          .pipe(first())
          .subscribe(
              (data: Job) => {
                  this.job = data;
              },
              error1 => {
                  console.log('Fail');
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
              error => {
                  console.log('Faild');
              }
          );
  }
    onCancel() {
        location.reload();
    }

    onUpdate() {
        this.jobUpdate.jobId = this.jobId;
        // @ts-ignore
        this.jobUpdate.tenJob = $('#tenJob').val();
        // @ts-ignore
        this.jobUpdate.chucVu1 = $('#chucVu1').val();
        // @ts-ignore
        this.jobUpdate.diaChi = $('#diaChi').val();
        // @ts-ignore
        this.jobUpdate.tenNganh = $('#tenNganh').val();
        // @ts-ignore
        this.jobUpdate.yeuCauUngVien = $('#yeuCauUngVien').val();
        // @ts-ignore
        this.jobUpdate.knToiThieu = parseInt($('#knToiThieu').val());
        // @ts-ignore
        this.jobUpdate.chiTiet = $('#chiTiet').val();
        // @ts-ignore
        this.jobUpdate.hanCuoi = $('#hanCuoi').val();
        // @ts-ignore
        this.jobUpdate.quyenLoi = $('#quyenLoi').val();
        // @ts-ignore
        this.jobUpdate.yeuCauHoSo = $('#yeuCauHoSo').val();
        // @ts-ignore
        this.jobUpdate.soLuong = parseInt($('#soLuong').val());
        // @ts-ignore
        this.jobUpdate.luongToiThieu = parseInt($('#luongToiThieu').val());
        // @ts-ignore
        this.jobUpdate.luongToiDa = parseInt($('#luongToiDa').val());
        this.jobUpdate.trangThai = this.job.trangThai.toString();
        console.log(this.jobUpdate);
        this.jobService.updateJob(JSON.stringify(this.jobUpdate))
            .pipe(first())
            .subscribe(
                (data: Job) => {
                    this.job = data;
                    alert('Cập nhật tin tuyển dụng thành công!');
                    location.reload();
                },
                error => {
                    alert('Fail');
                }
            );
    }

}
