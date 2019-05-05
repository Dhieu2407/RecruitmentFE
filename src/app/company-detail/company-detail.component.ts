import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { Company } from '../model/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgLocalization } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  constructor(private companyService : CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }

  company : Company;
  id: number;
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.companyService.getCompany(this.id)
        .pipe(first())
        .subscribe(
            (data: Company) => {
                console.log(data);
                this.company = data;
                console.log(this.company);
            },
            error => {
                console.log("Failed");
            }
        )
  }

  toModifyCompany() {
    location.href='/modifycompany/' + this.id;
  }

}
