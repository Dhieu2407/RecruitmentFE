import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchCandidate} from '../model/searchcandidate.model';

@Component({
  selector: 'app-listacadidate',
  templateUrl: './listacadidate.component.html',
  styleUrls: ['./listacadidate.component.css']
})
export class ListacadidateComponent implements OnInit {

  formSearchCandidate: FormGroup;
  title = '';
  major = '';
  experimentYear = '';
  searchCandidate = new SearchCandidate();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formSearchCandidate = this.formBuilder.group({
      title: ['', Validators.required],
      major: ['', Validators.required],
      experimentYear: ['', Validators.required],
    });
  }

  onSearch() {
    this.searchCandidate.title = this.formSearchCandidate.get('title').value;
    this.searchCandidate.major = this.formSearchCandidate.get('major').value;
    this.searchCandidate.experimentYear = this.formSearchCandidate.get('experimentYear').value;
    console.log(this.searchCandidate);

  }

}
