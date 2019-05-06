import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from '../model/job.model';
import {JobService} from '../service/job.service';
import {first} from 'rxjs/operators';
import {SearchJob} from '../model/searchJob.model';
import {Major} from "../model/major.model";
import { AuthGuardService } from '../service/auth-guard.service';
import {Router} from "@angular/router";
import {Account} from "../model/account.model";
import {MajorService} from "../service/major.service";

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private authGuardService: AuthGuardService,
    private router: Router,
    private majorService: MajorService,
  ) {}

    public flag: boolean;
    job = new Job();
    jobResult = new Job();
    account = new Account();
    // try
    major = new Major();
    listMajor: Major[];
    formAddJob: FormGroup;

  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.formAddJob = this.formBuilder.group({
      tenJob: ['', Validators.required],
      diaChi: ['', Validators.required],
      tenNganh: ['', Validators.required],
      yeuCauUngVien: ['', Validators.required],
      knToiThieu: ['', Validators.required],
      chiTiet: ['', Validators.required],
      hanCuoi: ['', Validators.required],
      chucVu1: ['', Validators.required],
      quyenLoi: ['', Validators.required],
      yeuCauHoSo: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      soLuong: ['', Validators.required],
      luongToiThieu: ['', Validators.required],
      luongToiDa: ['', Validators.required],
      tgLamViec: ['', Validators.required],
    });
    // try
      this.majorService.getAllMajors()
      .pipe(first())
      .subscribe(
        (data: Major[]) => {
          this.listMajor = data;
        },
        error => {
          console.log('Fail');
        }
      );
  }

  onSubmit() {

    if (this.formAddJob.invalid) {
      return;
    }
    this.job.tenJob = this.formAddJob.get('tenJob').value;
    this.job.chucVu1 = this.formAddJob.get('chucVu1').value;
    this.job.diaChi = this.formAddJob.get('diaChi').value;
    this.job.tenNganh = this.formAddJob.get('tenNganh').value;
    this.job.yeuCauUngVien = this.formAddJob.get('yeuCauUngVien').value;
    this.job.knToiThieu = this.formAddJob.get('knToiThieu').value;
    this.job.chiTiet = this.formAddJob.get('chiTiet').value;
    this.job.hanCuoi = this.formAddJob.get('hanCuoi').value;
    this.job.quyenLoi = this.formAddJob.get('quyenLoi').value;
    this.job.yeuCauHoSo = this.formAddJob.get('yeuCauHoSo').value;
    this.job.gioiTinh = this.formAddJob.get('gioiTinh').value;
    this.job.soLuong = this.formAddJob.get('soLuong').value;
    this.job.luongToiThieu = this.formAddJob.get('luongToiThieu').value;
    this.job.luongToiDa = this.formAddJob.get('luongToiDa').value;
    this.job.tgLamViec = this.formAddJob.get('tgLamViec').value;
    this.job.congTyId =  this.account.id;
    this.jobResult.jobId = 1;
    console.log(this.job);
    this.jobService.postJob(JSON.stringify(this.job))
      .pipe(first())
      .subscribe(
        (data: Job) => {
          this.jobResult = data;
          alert('Bạn đã thêm tin tuyển dụng thành công!');
          this.router.navigateByUrl('/managejob');
        },
        error => {
          console.log('Fail');
        }
      );

  }

  onselectClient(major1: Major) {
    if (parseInt(major1.nganhId) !== 0) {
      this.major = major1;
      this.flag = false;
    }     else {
      return false;
    }
  }
}
