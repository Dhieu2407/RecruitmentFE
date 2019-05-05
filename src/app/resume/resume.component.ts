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
  hocVan: string;
  viecLam: string;

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('currentUser')).id;

    this.candidateService.getCandidate(this.id)
      .pipe(first())
      .subscribe(
        (data: Candidate) => {
          this.candidate = data;
          this.nganh = this.candidate.nganh.tenNganh;
          this.hocVan = JSON.parse(this.candidate.trinhDoDaiHoc);
          this.viecLam = JSON.parse(this.candidate.lichSuLamViec);

        },
        error => {
          console.log('Failed');
        });

  }

  toModifyResume() {
      location.href = location.href='/modifyresume/' + this.id;
  }

}
