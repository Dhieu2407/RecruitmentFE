import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Job} from '../model/job.model';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {

  email = '';
  titleJob = '';
  location1 = '';
  majorJob = '';
  requireCandiate = '';
  requireYear = '';
  salary = '';
  descriptionJob = '';
  deadline = '';

  job = new Job();

  formAddJob: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.formAddJob = this.formBuilder.group({
      email: ['', Validators.required],
      titleJob: ['', Validators.required],
      location1: ['', Validators.required],
      majorJob: ['', Validators.required],
      requireCandiate: ['', Validators.required],
      requireYear: ['', Validators.required],
      salary: ['', Validators.required],
      descriptionJob: ['', Validators.required],
      deadline: ['', Validators.required],


    });
  }

  onSubmit() {

    if (this.formAddJob.invalid) {
      return;
    }

    this.job.email = this.formAddJob.get('email').value;
    this.job.titleJob = this.formAddJob.get('titleJob').value;
    this.job.location = this.formAddJob.get('location1').value;
    this.job.major = this.formAddJob.get('majorJob').value;
    this.job.requireCadiate = this.formAddJob.get('requireCandiate').value;
    this.job.requireYear = this.formAddJob.get('requireYear').value;
    this.job.salary = this.formAddJob.get('salary').value;
    this.job.description = this.formAddJob.get('descriptionJob').value;
    this.job.duedate = this.formAddJob.get('deadline').value;

    console.log(this.job);

  }
}
