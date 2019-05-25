import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../service/candidate.service';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchCandidate } from '../model/searchcandidate.model';
import { Major } from '../model/Major.model';
import { MajorService } from '../service/major.service';
import { Resume } from '../model/resume.model';
import { CompanySaveCandidateDTO } from '../model/companySaveCandidateDTO.model';
import { CompanyService } from '../service/company.service';
import {Account} from '../model/account.model';

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
    private companyService : CompanyService
  ) { }
    account: Account;
  formSearchCandidate: FormGroup;
  listCandidate: Candidate[];
  allMajors: Major[];
  searchCondidition = new Candidate();
  page: number;
  pageSize : number;
  companySaveCandidate = new CompanySaveCandidateDTO();


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
    this.pageSize = 10;
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

  onSave(resume : Candidate){
    this.companySaveCandidate.candidateId = resume.ungVienId;
      if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
      else this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.companySaveCandidate.companyId = this.account.id;
    this.companyService.companySaveUngVien(this.companySaveCandidate)
        .pipe(first())
        .subscribe(
            (data: any) => {
                console.log(data);
            },
            error => {
                console.log("Fail");
            }
        );
  }

}
