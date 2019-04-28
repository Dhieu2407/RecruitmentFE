import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job.model';
import { JobService } from '../service/job.service';
import {Company} from '../model/company.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-manageapplications',
  templateUrl: './manageapplications.component.html',
  styleUrls: ['./manageapplications.component.css']
})
export class ManageapplicationsComponent implements OnInit {

  constructor(
      private jobService: JobService,
  ) {}

  listJobOfCompany: Job[];
  company = new Company();
  ngOnInit() {
      this.company.id = 1;
      this.jobService.getListJobOfCompany(JSON.stringify(this.company))
          .pipe(first())
          .subscribe(
              (data: Job[]) => {
                  this.listJobOfCompany = data;
                  console.log(this.listJobOfCompany);
              },
              error => {
                  console.log('Failed');
              }
          );




  }

}
