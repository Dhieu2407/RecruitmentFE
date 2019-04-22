import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from '../model/job.model';
import {JobService} from '../service/job.service';
import {first} from 'rxjs/operators';
import {SearchJob} from '../model/searchJob.model';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
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

  formAddJob: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
  ) {

  }

  ngOnInit() {
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
    this.jobResult.id = 1;
    console.log(this.job);
    this.jobService.postJob(JSON.stringify(this.job))
      .pipe(first())
      .subscribe(
        (data: Job) => {
          this.jobResult = data;
        },
        error => {
          console.log('Faild');
        }
      );
    // this.idJob = 1;
    // this.searchJob.id = this.idJob;
    // this.jobService.getJobById(JSON.stringify(this.searchJob))
    //   .pipe(first())
    //   .subscribe(
    //     (data: Job) => {
    //       this.jobResult = data;
    //       // console.log(this.job.congTy.tenCongTy);
    //       console.log(this.job);
    //     },
    //     error => {
    //       console.log('Faild');
    //     }
    //   );

  }
}
