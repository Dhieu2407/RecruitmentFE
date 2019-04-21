import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../service/candidate.service';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchCandidate } from '../model/searchcandidate.model';
import { Major } from '../model/Major.model';
import { MajorService } from '../service/major.service';

@Component({
  selector: 'app-browseresumes',
  templateUrl: './browseresumes.component.html',
  styleUrls: ['./browseresumes.component.css']
})
export class BrowseresumesComponent implements OnInit {
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private candidateService: CandidateService,
    private majorService: MajorService,
  ) { }

  formSearchCandidate: FormGroup;
  listCandidate: Candidate[];
  allMajors: Major[];
  searchCondidition = new Candidate();
  page: number;
  pageSize : number;
  

  onSearch(){
    this.searchCondidition.email = this.formSearchCandidate.get('title').value;
    this.searchCondidition.username = this.formSearchCandidate.get('title').value;
    this.searchCondidition.major = this.formSearchCandidate.get('major').value;
    this.candidateService.searchCandidate(this.searchCondidition)
      .pipe(first())
      .subscribe(
        (data: Candidate[]) => {
          this.listCandidate = data;
          console.log(this.listCandidate);
        },
        error => {
          console.log('Failed');
        }
      );
  }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 2;
    this.formSearchCandidate = this.formBuilder.group({
      title: ['', Validators.required],
      major: ['', Validators.required],
      experimentYear: ['', Validators.required],
    });

    this.candidateService.getAllCandidates()
      .pipe(first())
      .subscribe(
        (data: Candidate[]) => {
          this.listCandidate = data;
          console.log(this.listCandidate);
        },
        error => {
          console.log('Failed');
        });

    this.majorService.getAllMajors()
        .pipe(first())
        .subscribe(
          (data: Major[]) => {
            this.allMajors = data;
            console.log(this.allMajors);
          },
          error => {
            console.log('Failed');
          });


  }

}
