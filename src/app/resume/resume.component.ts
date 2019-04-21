import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Candidate } from '../model/candidate.model';
import { CandidateService } from '../service/candidate.service';
import {first} from "rxjs/operators";


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
  ) { }

  candidate = new Candidate();
  id: number;
  nganh: string;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.candidateService.getCandidate(this.id)
      .pipe(first())
      .subscribe(
        (data: Candidate) => {
          this.candidate = data;
          this.nganh = this.candidate.nganh.tenNganh;
          console.log(this.candidate);
        },
        error => {
          console.log('Failed');
        });

  }

}
