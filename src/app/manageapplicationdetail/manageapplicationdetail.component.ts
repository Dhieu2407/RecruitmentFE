import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {JobService} from '../service/job.service';
import {Job} from '../model/job.model';
import {SearchJob} from '../model/searchJob.model';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manageapplicationdetail',
  templateUrl: './manageapplicationdetail.component.html',
  styleUrls: ['./manageapplicationdetail.component.css']
})
export class ManageapplicationdetailComponent implements OnInit {

  constructor(
      private router: Router,
      private routerSnapshot: ActivatedRoute,
      private jobService: JobService,
      private formBuilder: FormBuilder,
  ) { }
    jobId: number;
    job = new Job();
    searchJob = new SearchJob();
    jobForm: FormGroup;
    jobUpdate = new Job();
    idJobdetale: number;
    show: boolean;
    btnEdit: boolean;

  ngOnInit() {
      this.btnEdit = true;
      // @ts-ignore
      document.getElementById('tenJob').disabled = true;
      // @ts-ignore
      document.getElementById('chucVu').disabled = true;
      // @ts-ignore
      document.getElementById('diaChi').disabled = true;
      // @ts-ignore
      document.getElementById('tenNganh').disabled = true;
      // @ts-ignore
      document.getElementById('yeuCauUngVien').disabled = true;
      // @ts-ignore
      document.getElementById('quyenLoi').disabled = true;
      // @ts-ignore
      document.getElementById('yeuCauHoSo').disabled = true;
      // @ts-ignore
      document.getElementById('chiTiet').disabled = true;
      // @ts-ignore
      document.getElementById('soNamKinhNghiem').disabled = true;
      // @ts-ignore
      document.getElementById('soLuong').disabled = true;
      // @ts-ignore
      document.getElementById('luongToiThieu').disabled = true;
      // @ts-ignore
      document.getElementById('luongToiDa').disabled = true;
      // @ts-ignore
      document.getElementById('hanCuoi').disabled = true;
      // @ts-ignore
      this.jobForm = this.formBuilder.group({
          chiTiet: ['', Validators.required],
          tenJob: ['', Validators.required],
          chucVu: ['', Validators.required],
          diaChi: ['', Validators.required],
          tenNganh: ['', Validators.required],
          yeuCauUngVien: ['', Validators.required],
          quyenLoi: ['', Validators.required],
          yeuCauHoSo: ['', Validators.required],
          soNamKinhNghiem: ['', Validators.required],
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
                  console.log(this.job);
              },
              error => {
                  console.log('Failed');
              }
          );
  }
    onCancel() {
      location.reload();
    }
  onEdit() {
      this.btnEdit = false;
      this.show = true;
    // @ts-ignore
      document.getElementById('tenJob').disabled = false;
      // @ts-ignore
      document.getElementById('chucVu').disabled = false;
      // @ts-ignore
      document.getElementById('diaChi').disabled = false;
      // @ts-ignore
      document.getElementById('tenNganh').disabled = false;
      // @ts-ignore
      document.getElementById('yeuCauUngVien').disabled = false;
      // @ts-ignore
      document.getElementById('quyenLoi').disabled = false;
      // @ts-ignore
      document.getElementById('yeuCauHoSo').disabled = false;
      // @ts-ignore
      document.getElementById('chiTiet').disabled = false;
      // @ts-ignore
      document.getElementById('soNamKinhNghiem').disabled = false;
      // @ts-ignore
      document.getElementById('soLuong').disabled = false;
      // @ts-ignore
      document.getElementById('luongToiThieu').disabled = false;
      // @ts-ignore
      document.getElementById('luongToiDa').disabled = false;
      // @ts-ignore
      document.getElementById('hanCuoi').disabled = false;
      console.log('ok');
  }

  onUpdate() {
      this.jobUpdate.jobId = this.jobId;
      // @ts-ignore
      this.jobUpdate.tenJob = $('#tenJob').val();
      // @ts-ignore
      this.jobUpdate.chucVu = $('#chucVu').val();
      // @ts-ignore
      this.jobUpdate.diaChi = $('#diaChi').val();
      // @ts-ignore
      this.jobUpdate.tenNganh = $('#tenNganh').val();
      // @ts-ignore
      this.jobUpdate.yeuCauUngVien = $('#yeuCauUngVien').val();
      // @ts-ignore
      this.jobUpdate.soNamKinhNghiem = $('#soNamKinhNghiem').val();
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
    onDeleteJob() {
      this.jobService.deleteJob(JSON.stringify(this.searchJob))
          .pipe(first())
          .subscribe(
              (data: number) => {
                  this.idJobdetale = data;
                  console.log(this.idJobdetale);
                  alert('Đã xóa tin tuyển dụng!');
                  this.router.navigateByUrl('/manageapplications');
              },
              error => {
                  console.log('Failed');
              }
          );
  }

}
