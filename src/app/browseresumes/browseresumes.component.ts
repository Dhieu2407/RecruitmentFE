import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../service/candidate.service';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  ) { }

  formSearchCandidate: FormGroup;
  listCandidate: Candidate[];

  onSearch(){

  }

  ngOnInit() {
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


  }

}
