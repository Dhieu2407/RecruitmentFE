import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Company } from "../model/company.model";
import { first } from "rxjs/operators";
import { CompanyService } from "../service/company.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthGuardService } from "../service/auth-guard.service";
import { UploadService } from "../service/upload.service";

@Component({
    selector: "app-modify-company-info",
    templateUrl: "./modify-company-info.component.html",
    styleUrls: ["./modify-company-info.component.css"]
})
export class ModifyCompanyInfoComponent implements OnInit {
    constructor(private uploadService: UploadService, private formBuilder: FormBuilder, private companyService: CompanyService, private router: Router, private route: ActivatedRoute, private authGuardService: AuthGuardService) {}

    modifyCompanyForm: FormGroup;
    company = new Company();
    id: number;
    email: string;
    imageFile: File;
    ngOnInit() {
        this.authGuardService.canAccess("ROLE_EMPLOYER");
        this.email = JSON.parse(localStorage.getItem("currentUser")).email;
        this.company.id = JSON.parse(localStorage.getItem("currentUser")).id;
        this.modifyCompanyForm = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", Validators.required],
            phone: ["", Validators.required],
            address: [""],
            moTa: [""],
            phucLoi: [""],
            quyMo: [""]
        });
        this.id = +this.route.snapshot.paramMap.get("id");
        this.companyService
            .getCompany(this.id)
            .pipe(first())
            .subscribe(
                (data: Company) => {
                    console.log(data);
                    this.company = data;
                    this.modifyCompanyForm.get("email").setValue(this.email);
                    this.modifyCompanyForm.get("name").setValue(this.company.tenCongTy);
                    this.modifyCompanyForm.get("phone").setValue(this.company.sdt);
                    this.modifyCompanyForm.get("address").setValue(this.company.diaChi);
                    this.modifyCompanyForm.get("moTa").setValue(this.company.moTa);
                    this.modifyCompanyForm.get("phucLoi").setValue(this.company.phucLoi);
                    this.modifyCompanyForm.get("quyMo").setValue(this.company.quyMo);
                },
                error => {
                    console.log("Failed");
                }
            );
    }

    onSubmit(buttonType): void {
        if (buttonType === "Submit") {
            if (this.company == null) {
                this.company = new Company();
            }
            this.company.id = JSON.parse(localStorage.getItem("currentUser")).id;
            this.company.tenCongTy = this.modifyCompanyForm.get("name").value;
            this.company.email = this.modifyCompanyForm.get("email").value;
            this.company.sdt = this.modifyCompanyForm.get("phone").value;
            this.company.diaChi = this.modifyCompanyForm.get("address").value;
            this.company.moTa = this.modifyCompanyForm.get("moTa").value;
            this.company.phucLoi = this.modifyCompanyForm.get("phucLoi").value;
            this.company.quyMo = this.modifyCompanyForm.get("quyMo").value;
            console.log(this.company);
            const uploadData = new FormData();
            uploadData.append('file', this.imageFile, this.imageFile.name);
            this.uploadService.uploadFile(uploadData)
                .pipe(first())
                .subscribe(
                    data => {
                        // Success
                        console.log('Uploaded');
                        this.company.imgUrl = 'http://localhost:8080/api/downloadFile/'+ this.imageFile.name;
                        this.submitData();
                        },
                    error => {
                        // Failed
                        console.log('Failed');
                        this.submitData();
                    });
        }
    }

    onFileChanged(event) {
        this.imageFile = event.target.files[0];
        console.log(this.imageFile);
    }

    onUpload() {
        const uploadData = new FormData();
        uploadData.append("file", this.imageFile, this.imageFile.name);
        this.uploadService
            .uploadFile(uploadData)
            .pipe(first())
            .subscribe(
                data => {
                    // Success
                    console.log("Uploaded");
                },
                error => {
                    // Failed
                    console.log("Failed");
                }
            );
    }

    submitData = function() {
        this.companyService
            .modifyCompany(this.company)
            .pipe(first())
            .subscribe(
                (data: Company[]) => {
                    console.log(data);
                    location.href =  '/companydetail/' + this.id ;
                },
                error => {
                    console.log("Failed");
                }
            );
    };
}
