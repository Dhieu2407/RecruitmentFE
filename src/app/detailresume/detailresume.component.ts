import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../service/candidate.service';
import {Candidate} from "../model/candidate.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-detailresume',
  templateUrl: './detailresume.component.html',
  styleUrls: ['./detailresume.component.css']
})
export class DetailresumeComponent implements OnInit {

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
      this.id = +this.route.snapshot.paramMap.get('id');
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

}
