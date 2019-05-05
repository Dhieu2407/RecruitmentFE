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

    titleJob = '';
    chucVu = '';
    location1 = '';
    majorJob = '';
    descriptionJob = '';
    yeuCauUngVien = '';
    quyenLoi = '';
    yeuCauHoSo = '';
    soNamKinhNghiem = '';
    yeuCauGioiTinh = '';
    soLuong = '';
    salaryMin = '';
    salaryMax = '';
    tgLamViec = '';
    deadline = '';

    job = new Job();
    jobResult = new Job();
    searchJob = new SearchJob();
    idJob: number;
    account = new Account();
    // try
    major = new Major();
    listMajor: Major[];
    formAddJob: FormGroup;

  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.formAddJob = this.formBuilder.group({
      titleJob: ['', Validators.required],
      location1: ['', Validators.required],
      majorJob: ['', Validators.required],
      yeuCauUngVien: ['', Validators.required],
      soNamKinhNghiem: ['', Validators.required],
      descriptionJob: ['', Validators.required],
      deadline: ['', Validators.required],
      chucVu: ['', Validators.required],
      quyenLoi: ['', Validators.required],
      yeuCauHoSo: ['', Validators.required],
      yeuCauGioiTinh: ['', Validators.required],
      soLuong: ['', Validators.required],
      salaryMin: ['', Validators.required],
      salaryMax: ['', Validators.required],
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
          console.log('Faild');
        }
      );
  }

  onSubmit() {

    if (this.formAddJob.invalid) {
      return;
    }
    this.job.titleJob = this.formAddJob.get('titleJob').value;
    this.job.chucVu1 = this.formAddJob.get('chucVu').value;
    this.job.location = this.formAddJob.get('location1').value;
    this.job.major = this.formAddJob.get('majorJob').value;
    this.job.requireCadiate = this.formAddJob.get('yeuCauUngVien').value;
    this.job.requireYear = this.formAddJob.get('soNamKinhNghiem').value;
    this.job.description = this.formAddJob.get('descriptionJob').value;
    this.job.duedate = this.formAddJob.get('deadline').value;
    this.job.quyenLoi = this.formAddJob.get('quyenLoi').value;
    this.job.yeuCauHoSo = this.formAddJob.get('yeuCauHoSo').value;
    this.job.yeuCauGioiTinh = this.formAddJob.get('yeuCauGioiTinh').value;
    this.job.soLuong = this.formAddJob.get('soLuong').value;
    this.job.salaryMin = this.formAddJob.get('salaryMin').value;
    this.job.salaryMax = this.formAddJob.get('salaryMax').value;
    this.job.tgLamViec = this.formAddJob.get('tgLamViec').value;
    this.job.idCongTy =  this.account.id;
    this.jobResult.id = 1;
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
          console.log('Faild');
        }
      );

  }

  onselectClient(major1: Major) {
    if (major1.nganhId !== 0) {
      this.major = major1;
      this.flag = false;
    }     else {
      return false;
    }
  }
}
