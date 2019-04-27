import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Resume } from "../model/resume.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CandidateService } from "../service/candidate.service";
import { Candidate } from "../model/candidate.model";
import { first } from "rxjs/operators";
import { Major } from "../model/major.model";
import { MajorService } from "../service/major.service";

@Component({
    selector: "app-modifyresume",
    templateUrl: "./modifyresume.component.html",
    styleUrls: ["./modifyresume.component.css"]
})
export class ModifyresumeComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private candidateService: CandidateService,
        private majorService: MajorService
    ) {}

    modifyResumeForm: FormGroup;

    resume = new Resume();

    id: number;
    candidate = new Candidate();
    nganh: string;
    hocVan: string;
    allMajors: Major[];
    viecLam: string;

    ngOnInit() {
        this.majorService
            .getAllMajors()
            .pipe(first())
            .subscribe(
                (data: Major[]) => {
                    this.allMajors = data;
                    console.log(this.allMajors);
                },
                error => {
                    console.log("Failed");
                }
            );
        this.modifyResumeForm = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", Validators.required],
            phone: ["", Validators.required],
            career: ["", Validators.required],
            wantedPosition: ["", Validators.required],
            age: ["", Validators.required],
            wantedSalary: ["", Validators.required],
            yearsOfExperience: ["", Validators.required],
            workForm: ["", Validators.required],
            expertise: ["", Validators.required],
            careerGoals: ["", Validators.required],
            certificate: ["", Validators.required],
            major: ["", Validators.required],
            school: ["", Validators.required],
            fromDate: ["", Validators.required],
            toDate: ["", Validators.required],
            description: ["", Validators.required],
            companyName: ["", Validators.required],
            workPosition: ["", Validators.required],
            startDate: ["", Validators.required],
            endDate: ["", Validators.required],
            workDescription: ["", Validators.required],
            skill: this.formBuilder.array([])
        });
        this.id = +this.route.snapshot.paramMap.get("id");
        this.candidateService
            .getCandidate(this.id)
            .pipe(first())
            .subscribe(
                (data: Candidate) => {
                    this.candidate = data;
                    this.modifyResumeForm
                        .get("name")
                        .setValue(this.candidate.tenUngVien);
                    this.modifyResumeForm
                        .get("email")
                        .setValue(this.candidate.email);
                    this.modifyResumeForm
                        .get("phone")
                        .setValue(this.candidate.sdt);
                    this.modifyResumeForm
                        .get("career")
                        .setValue(this.candidate.nganh.tenNganh);
                    this.modifyResumeForm
                        .get("wantedSalary")
                        .setValue(this.candidate.luongMongMuon);
                    this.modifyResumeForm
                        .get("careerGoals")
                        .setValue(this.candidate.mucTieuNgheNghiep);
                    this.nganh = this.candidate.nganh.tenNganh;
                    var skill = JSON.parse(
                        JSON.stringify(this.candidate.kiNang) + ""
                    );
                    console.log(skill.length);
                    var controlArray = <FormArray>(
                        this.modifyResumeForm.get("skill")
                    );
                    for (var i = 0; i < skill.length; ++i) {
                        controlArray.push(this.createSkill());
                        controlArray.controls[i]
                            .get("skillName")
                            .setValue(skill[i].kiNang.tenKiNang);
                        controlArray.controls[i]
                            .get("expYear")
                            .setValue(skill[i].soNamKinhNghiem);
                    }
                    this.hocVan = JSON.parse(this.candidate.trinhDoDaiHoc);
                    this.viecLam = JSON.parse(this.candidate.lichSuLamViec);

                    console.log(this.viecLam);
                    console.log(this.hocVan);
                    console.log(this.candidate);
                },
                error => {
                    console.log("Failed");
                }
            );
    }

    createSkill(): FormGroup {
        return this.formBuilder.group({
            skillName: "",
            expYear: ""
        });
    }

    createInputSkill() {
        var controlArray = <FormArray>this.modifyResumeForm.get("skill");
        controlArray.push(this.createSkill());
    }

    onSubmit(buttonType): void {
        if (buttonType === "Submit") {
            if (this.modifyResumeForm.invalid) {
                return;
            }
            this.resume.name = this.modifyResumeForm.get("name").value;
            this.resume.email = this.modifyResumeForm.get("email").value;
            this.resume.phone = this.modifyResumeForm.get("phone").value;
            this.resume.career = this.modifyResumeForm.get("career").value;
            this.resume.wantedPosition = this.modifyResumeForm.get(
                "wantedPosition"
            ).value;
            this.resume.age = this.modifyResumeForm.get("age").value;
            this.resume.wantedSalary = this.modifyResumeForm.get(
                "wantedSalary"
            ).value;
            this.resume.yearsOfExperience = this.modifyResumeForm.get(
                "yearsOfExperience"
            ).value;
            this.resume.workForm = this.modifyResumeForm.get("workForm").value;
            this.resume.expertise = this.modifyResumeForm.get(
                "expertise"
            ).value;
            this.resume.careerGoals = this.modifyResumeForm.get(
                "careerGoals"
            ).value;
            this.resume.certificate = this.modifyResumeForm.get(
                "certificate"
            ).value;
            this.resume.major = this.modifyResumeForm.get("major").value;
            this.resume.school = this.modifyResumeForm.get("school").value;
            this.resume.fromDate = this.modifyResumeForm.get("fromDate").value;
            this.resume.toDate = this.modifyResumeForm.get("toDate").value;
            this.resume.description = this.modifyResumeForm.get(
                "description"
            ).value;
            this.resume.companyName = this.modifyResumeForm.get(
                "companyName"
            ).value;
            this.resume.workPosition = this.modifyResumeForm.get(
                "workPosition"
            ).value;
            this.resume.startDate = this.modifyResumeForm.get(
                "startDate"
            ).value;
            this.resume.endDate = this.modifyResumeForm.get("endDate").value;
            this.resume.workDescription = this.modifyResumeForm.get(
                "workDescription"
            ).value;
            this.resume.skillName = this.modifyResumeForm.get(
                "skillName"
            ).value;
            this.resume.competentlyPercent = this.modifyResumeForm.get(
                "competentlyPercent"
            ).value;

            console.log(this.resume);
        }
    }
}
