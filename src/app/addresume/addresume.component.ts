import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Resume } from '../model/resume.model';

@Component({
  selector: 'app-addresume',
  templateUrl: './addresume.component.html',
  styleUrls: ['./addresume.component.css']
})
export class AddresumeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  addResumeForm: FormGroup;

  resume = new Resume();

  onSubmit(buttonType): void{
    if(buttonType==="Submit") {
      if (this.addResumeForm.invalid) {
        return;
      }
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

    }

    if(buttonType==="Browse") {
      // browse picture
    }
  }

  ngOnInit() {
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
  }

}
