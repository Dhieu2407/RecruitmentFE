import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../model/company.model';
import { first } from 'rxjs/operators';
import { CompanyService } from '../service/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthGuardService} from "../service/auth-guard.service";

@Component({
  selector: 'app-modify-company-info',
  templateUrl: './modify-company-info.component.html',
  styleUrls: ['./modify-company-info.component.css']
})
export class ModifyCompanyInfoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private authGuardService: AuthGuardService
    ) { }

  modifyCompanyForm: FormGroup;
  company = new Company();
  id: number;
  email : string;
  ngOnInit() {
      this.authGuardService.canAccess('ROLE_EMPLOYER');
    this.email = JSON.parse(localStorage.getItem("currentUser")).email;
    this.company.id = JSON.parse(localStorage.getItem("currentUser")).id;
    this.modifyCompanyForm = this.formBuilder.group({
        name: ["", Validators.required],
        email: ["", Validators.required],
        phone: ["", Validators.required],
        address: ["", Validators.required]
    });
    this.id = +this.route.snapshot.paramMap.get("id");
    this.companyService.getCompany(this.id)
    .pipe(first())
    .subscribe(
        (data: Company) => {
            this.company = data;
            this.modifyCompanyForm.get("email").setValue(this.email);
            this.modifyCompanyForm.get("name").setValue(this.company.tenCongTy);
            this.modifyCompanyForm.get("phone").setValue(this.company.sdt);
            this.modifyCompanyForm.get("address").setValue(this.company.diaChi);
        },
        error => {
            console.log("Failed");
        }
    );
  }

  onSubmit(buttonType): void {
    if (buttonType === "Submit") {
        if(this.company == null){
            this.company = new Company();
        }
        this.company.id = JSON.parse(localStorage.getItem("currentUser")).id;
        this.company.tenCongTy = this.modifyCompanyForm.get("name").value;
        this.company.email = this.modifyCompanyForm.get("email").value;
        this.company.sdt = this.modifyCompanyForm.get("phone").value;
        this.company.diaChi = this.modifyCompanyForm.get("address").value;
        console.log(this.company);
        this.companyService.modifyCompany(this.company)
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    console.log(data);
                },
                error => {
                    console.log('Failed');
                }
            );;
    }
}

}
