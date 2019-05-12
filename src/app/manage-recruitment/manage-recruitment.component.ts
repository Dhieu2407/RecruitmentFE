import { Component, OnInit } from '@angular/core';
import {JobService} from "../service/job.service";
import {Job} from "../model/job.model";
import {Account} from "../model/account.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-manage-recruitment',
  templateUrl: './manage-recruitment.component.html',
  styleUrls: ['./manage-recruitment.component.css']
})
export class ManageRecruitmentComponent implements OnInit {

  constructor(
      private jobService: JobService,
  ) { }

    page: number;
    pageSize: number;
    listJob: Job[];
    account = new Account();
    job = new Job();
    jobUpdate = new Job();
    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('currentUser'));
        this.page = 1;
        this.pageSize = 5;
        this.job.trangThai = "0";
        this.findByTrangThai(this.job);
    }

    onConfirmed(i){

        this.jobUpdate.trangThai = "1";
        this.jobUpdate.jobId = this.listJob[i].jobId;
        this.jobUpdate.yeuCauUngVien = this.listJob[i].yeuCauUngVien;
        this.jobUpdate.knToiThieu = this.listJob[i].knToiThieu;
        this.jobUpdate.yeuCauHoSo = this.listJob[i].yeuCauHoSo;
        this.jobUpdate.luongToiDa = this.listJob[i].luongToiDa;
        this.jobUpdate.luongToiThieu = this.listJob[i].luongToiDa;
        this.jobUpdate.hanCuoi = this.listJob[i].hanCuoi;
        this.jobUpdate.chiTiet = this.listJob[i].chiTiet;
        this.jobUpdate.tenJob = this.listJob[i].tenJob;
        this.jobUpdate.diaChi = this.listJob[i].diaChi;
        this.jobUpdate.chucVu1 = this.listJob[i].chucVu1;
        this.jobUpdate.quyenLoi = this.listJob[i].quyenLoi;
        this.jobUpdate.soLuong = this.listJob[i].soLuong;

        if(this.jobUpdate.yeuCauUngVien === undefined) this.jobUpdate.yeuCauUngVien = "";

        this.jobService.updateJob(JSON.stringify(this.jobUpdate))
            .pipe(first())
            .subscribe(
                (data) => {
                    alert('Xác nhận thành công');
                    this.findByTrangThai(this.job);
                },
                error => {
                    console.log('Failed');
                }
            );
    }

    onRejected(i){
        this.jobUpdate.trangThai = "2";
        this.jobUpdate.jobId = this.listJob[i].jobId;
        this.jobUpdate.yeuCauUngVien = this.listJob[i].yeuCauUngVien;
        this.jobUpdate.knToiThieu = this.listJob[i].knToiThieu;
        this.jobUpdate.yeuCauHoSo = this.listJob[i].yeuCauHoSo;
        this.jobUpdate.luongToiDa = this.listJob[i].luongToiDa;
        this.jobUpdate.luongToiThieu = this.listJob[i].luongToiDa;
        this.jobUpdate.hanCuoi = this.listJob[i].hanCuoi;
        this.jobUpdate.chiTiet = this.listJob[i].chiTiet;
        this.jobUpdate.tenJob = this.listJob[i].tenJob;
        this.jobUpdate.diaChi = this.listJob[i].diaChi;
        this.jobUpdate.chucVu1 = this.listJob[i].chucVu1;
        this.jobUpdate.quyenLoi = this.listJob[i].quyenLoi;
        this.jobUpdate.soLuong = this.listJob[i].soLuong;

        if(this.jobUpdate.yeuCauUngVien === undefined) this.jobUpdate.yeuCauUngVien = "";

        this.jobService.updateJob(JSON.stringify(this.jobUpdate))
            .pipe(first())
            .subscribe(
                (data) => {
                    alert('Từ chối thành công');
                    this.findByTrangThai(this.job);
                },
                error => {
                    console.log('Failed');
                }
            );
    }

    findByTrangThai(trangThai){
        this.jobService.findByTrangThai(JSON.stringify(trangThai))
            .pipe(first())
            .subscribe(
                (data: Job[]) => {
                    this.listJob = data;
                    console.log(this.listJob);
                },
                error => {
                    console.log('Failed');
                }
            );
    }
}
