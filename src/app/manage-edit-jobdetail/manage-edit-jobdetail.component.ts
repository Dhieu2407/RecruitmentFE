import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../service/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SearchJob} from "../model/searchJob.model";
import {first} from "rxjs/operators";
import {Job} from "../model/job.model";

@Component({
  selector: 'app-manage-edit-jobdetail',
  templateUrl: './manage-edit-jobdetail.component.html',
  styleUrls: ['./manage-edit-jobdetail.component.css']
})
export class ManageEditJobdetailComponent implements OnInit {

  constructor(
      private router: Router,
      private routerSnapshot: ActivatedRoute,
      private jobService: JobService,
      private formBuilder: FormBuilder,
  ) { }

    jobForm: FormGroup;
    jobId: number;
    searchJob = new SearchJob();
    job = new Job();
    jobUpdate = new Job();
  ngOnInit() {
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
        this.jobUpdate.knToiThieu = $('#knToiThieu').val();
        // @ts-ignore
        this.jobUpdate.chiTiet = $('#chiTiet').val();
        // @ts-ignore
        this.jobUpdate.hanCuoi = $('#hanCuoi').val();
        // @ts-ignore
        this.jobUpdate.quyenLoi = $('#quyenLoi').val();
        // @ts-ignore
        this.jobUpdate.yeuCauHoSo = $('#yeuCauHoSo').val();
        // @ts-ignore
        this.jobUpdate.soLuong = $('#soLuong').val();
        // @ts-ignore
        this.jobUpdate.luongToiThieu = $('#luongToiThieu').val();
        // @ts-ignore
        this.jobUpdate.luongToiDa = $('#luongToiDa').val();
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
