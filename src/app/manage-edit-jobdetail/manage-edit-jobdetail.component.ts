import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../service/job.service';
import {FormBuilder, Validators} from '@angular/forms';
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

    idJob: number;
    searchJob = new SearchJob();
    job = new Job();
    jobUpdate = new Job();
  ngOnInit() {
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
              },
              error1 => {
                  console.log('Faild');
              }
          );
  }
    onCancel() {
        location.reload();
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

}
