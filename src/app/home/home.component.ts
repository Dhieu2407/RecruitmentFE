import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchJob } from '../model/searchJob.model';
import { Account } from '../model/account.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  searchJobForm: FormGroup;
  account = new Account();
  searchJob = new SearchJob();

  onSubmit(buttonType): void {
    if (buttonType === 'Search') {
      if (this.searchJobForm.get('keyword').value === '' &&
        this.searchJobForm.get('location').value === '' &&
        this.searchJobForm.get('career').value === '') {
        return;
      }
      this.searchJob.keyword = this.searchJobForm.get('keyword').value;
      this.searchJob.location = this.searchJobForm.get('location').value;
      this.searchJob.career = this.searchJobForm.get('career').value;
      console.log(this.searchJob);
    }
  }

  ngOnInit() {
    this.searchJobForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      location: ['', Validators.required],
      career: ['', Validators.required],
    });
  }

}
