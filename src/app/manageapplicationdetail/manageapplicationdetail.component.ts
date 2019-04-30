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
    idJob: number;
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
      document.getElementById('titleJob').disabled = true;
      // @ts-ignore
      document.getElementById('chucVu').disabled = true;
      // @ts-ignore
      document.getElementById('location').disabled = true;
      // @ts-ignore
      document.getElementById('major').disabled = true;
      // @ts-ignore
      document.getElementById('yeuCauUngVien').disabled = true;
      // @ts-ignore
      document.getElementById('quyenLoi').disabled = true;
      // @ts-ignore
      document.getElementById('yeuCauHoSo').disabled = true;
      // @ts-ignore
      document.getElementById('descriptionJob').disabled = true;
      // @ts-ignore
      document.getElementById('soNamKinhNghiem').disabled = true;
      // @ts-ignore
      document.getElementById('soLuong').disabled = true;
      // @ts-ignore
      document.getElementById('salaryMin').disabled = true;
      // @ts-ignore
      document.getElementById('salaryMax').disabled = true;
      // @ts-ignore
      document.getElementById('deadline').disabled = true;
      // @ts-ignore
      this.jobForm = this.formBuilder.group({
           descriptionJob: ['', Validators.required],
          titleJob: ['', Validators.required],
          chucVu: ['', Validators.required],
          location: ['', Validators.required],
          major: ['', Validators.required],
          yeuCauUngVien: ['', Validators.required],
          quyenLoi: ['', Validators.required],
          yeuCauHoSo: ['', Validators.required],
          soNamKinhNghiem: ['', Validators.required],
          soLuong: ['', Validators.required],
          salaryMin: ['', Validators.required],
          salaryMax: ['', Validators.required],
          deadline: ['', Validators.required],
          });
      // @ts-ignore
      this.idJob = this.routerSnapshot.snapshot.paramMap.get('id');
      this.searchJob.id = this.idJob;
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
      document.getElementById('titleJob').disabled = false;
      // @ts-ignore
      document.getElementById('chucVu').disabled = false;
      // @ts-ignore
      document.getElementById('location').disabled = false;
      // @ts-ignore
      document.getElementById('major').disabled = false;
      // @ts-ignore
      document.getElementById('yeuCauUngVien').disabled = false;
      // @ts-ignore
      document.getElementById('quyenLoi').disabled = false;
      // @ts-ignore
      document.getElementById('yeuCauHoSo').disabled = false;
      // @ts-ignore
      document.getElementById('descriptionJob').disabled = false;
      // @ts-ignore
      document.getElementById('soNamKinhNghiem').disabled = false;
      // @ts-ignore
      document.getElementById('soLuong').disabled = false;
      // @ts-ignore
      document.getElementById('salaryMin').disabled = false;
      // @ts-ignore
      document.getElementById('salaryMax').disabled = false;
      // @ts-ignore
      document.getElementById('deadline').disabled = false;
      console.log('ok');
  }

  onUpdate() {
      this.jobUpdate.id = this.idJob;
      // @ts-ignore
      this.jobUpdate.titleJob = $('#titleJob').val();
      // @ts-ignore
      this.jobUpdate.chucVu1 = $('#chucVu').val();
      // @ts-ignore
      this.jobUpdate.location = $('#location').val();
      // @ts-ignore
      this.jobUpdate.major = $('#majorJob').val();
      // @ts-ignore
      this.jobUpdate.requireCadiate = $('#yeuCauUngVien').val();
      // @ts-ignore
      this.jobUpdate.requireYear = $('#soNamKinhNghiem').val();
      // @ts-ignore
      this.jobUpdate.description = $('#descriptionJob').val();
      // @ts-ignore
      this.jobUpdate.duedate = $('#deadline').val();
      // @ts-ignore
      this.jobUpdate.quyenLoi = $('#quyenLoi').val();
      // @ts-ignore
      this.jobUpdate.yeuCauHoSo = $('#yeuCauHoSo').val();
      // @ts-ignore
      this.jobUpdate.soLuong = $('#soLuong').val();
      // @ts-ignore
      this.jobUpdate.salaryMin = $('#salaryMin').val();

      // @ts-ignore
      this.jobUpdate.salaryMax = $('#salaryMax').val();
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
