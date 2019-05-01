import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Resume } from '../model/resume.model';
import { AuthGuardService } from '../service/auth-guard.service';
import {Router} from '@angular/router';
import { Account } from '../model/account.model';
import { first } from 'rxjs/operators';
import { UploadService } from '../service/upload.service';

@Component({
  selector: 'app-addresume',
  templateUrl: './addresume.component.html',
  styleUrls: ['./addresume.component.css']
})
export class AddresumeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authGuardService: AuthGuardService,
    private uploadService: UploadService
  ) { }

  addResumeForm: FormGroup;
  account = new Account();
  resume = new Resume();
  imageFile: File;

  ngOnInit() {
      this.authGuardService.canAccess('ROLE_CANDIDATE');
      this.account = JSON.parse(localStorage.getItem('currentUser'));
      this.addResumeForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        career: ['', Validators.required],
        wantedPosition: ['', Validators.required],
        age: ['', Validators.required],
        wantedSalary: ['', Validators.required],
        yearsOfExperience: ['', Validators.required],
        workForm: ['', Validators.required],
        expertise: ['', Validators.required],
        careerGoals: ['', Validators.required],
        certificate: ['', Validators.required],
        major: ['', Validators.required],
        school: ['', Validators.required],
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
        description: ['', Validators.required],
        companyName: ['', Validators.required],
        workPosition: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        workDescription: ['', Validators.required],
        skillName: ['', Validators.required],
        competentlyPercent: ['', Validators.required],
    });
      this.addResumeForm.get('email').setValue(this.account.email)
  }

  onSubmit(buttonType): void{
      if(buttonType==="Submit") {
          if (this.addResumeForm.invalid) {
              return;
          }

          this.resume.id = this.account.id;
          this.resume.name = this.addResumeForm.get('name').value;
          this.resume.email = this.addResumeForm.get('email').value;
          this.resume.phone = this.addResumeForm.get('phone').value;
          this.resume.career = this.addResumeForm.get('career').value;
          this.resume.wantedPosition = this.addResumeForm.get('wantedPosition').value;
          this.resume.age = this.addResumeForm.get('age').value;
          this.resume.wantedSalary = this.addResumeForm.get('wantedSalary').value;
          this.resume.yearsOfExperience = this.addResumeForm.get('yearsOfExperience').value;
          this.resume.workForm = this.addResumeForm.get('workForm').value;
          this.resume.expertise = this.addResumeForm.get('expertise').value;
          this.resume.careerGoals = this.addResumeForm.get('careerGoals').value;
          this.resume.certificate = this.addResumeForm.get('certificate').value;
          this.resume.major = this.addResumeForm.get('major').value;
          this.resume.school = this.addResumeForm.get('school').value;
          this.resume.fromDate = this.addResumeForm.get('fromDate').value;
          this.resume.toDate = this.addResumeForm.get('toDate').value;
          this.resume.description = this.addResumeForm.get('description').value;
          this.resume.companyName = this.addResumeForm.get('companyName').value;
          this.resume.workPosition = this.addResumeForm.get('workPosition').value;
          this.resume.startDate = this.addResumeForm.get('startDate').value;
          this.resume.endDate = this.addResumeForm.get('endDate').value;
          this.resume.workDescription = this.addResumeForm.get('workDescription').value;
          this.resume.skill = this.addResumeForm.get('skillName').value;
          this.resume.competentlyPercent = this.addResumeForm.get('competentlyPercent').value;

          console.log(this.resume);

          this.onUpload();
          // lấy ảnh hiển thị thì dùng lệnh này (lưu thêm 1 trường trong db để lưu tên file ảnh)
          // this.downloadUrl = 'http://localhost:8080/api/downloadFile/'+ this.imageFile.name;
      }
  }

  onFileChanged(event) {
      this.imageFile = event.target.files[0];
      console.log(this.imageFile);
  }

  onUpload(){
      const uploadData = new FormData();
      uploadData.append('file', this.imageFile, this.imageFile.name);
      this.uploadService.uploadFile(uploadData)
          .pipe(first())
          .subscribe(
              data => {
                  // Success
                  console.log('Uploaded');
                  },
              error => {
                  // Failed
                  console.log('Failed');
              });
  }

}
