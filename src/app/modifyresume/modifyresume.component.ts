import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Resume } from "../model/resume.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CandidateService } from "../service/candidate.service";
import { Candidate } from "../model/candidate.model";
import { first } from "rxjs/operators";
import { Major } from "../model/major.model";
import { MajorService } from "../service/major.service";
import { formatDate } from '@angular/common';

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
            school: this.formBuilder.array([]),
            fromDate: ["", Validators.required],
            toDate: ["", Validators.required],
            description: ["", Validators.required],
            companyName: ["", Validators.required],
            workPosition: ["", Validators.required],
            startDate: ["", Validators.required],
            endDate: ["", Validators.required],
            workDescription: this.formBuilder.array([]),
            skill: this.formBuilder.array([])
        });
        this.id = +this.route.snapshot.paramMap.get("id");
        this.candidateService
            .getCandidate(this.id)
            .pipe(first())
            .subscribe(
                (data: Candidate) => {
                    this.candidate = data;
                    this.candidate.id = JSON.parse(JSON.stringify(data)).ungVienId;
                    this.modifyResumeForm.get("name").setValue(this.candidate.tenUngVien);
                    this.modifyResumeForm.get("email").setValue(this.candidate.email);
                    this.modifyResumeForm.get("phone").setValue(this.candidate.sdt);
                    this.modifyResumeForm.get("career").setValue(this.candidate.nganh.tenNganh);
                    this.modifyResumeForm.get("wantedSalary").setValue(this.candidate.luongMongMuon);
                    this.modifyResumeForm.get("careerGoals").setValue(this.candidate.mucTieuNgheNghiep);
                    this.nganh = this.candidate.nganh.tenNganh;
                    var skill = JSON.parse(JSON.stringify(this.candidate.kiNang) + "");
                    console.log(skill.length);
                    var controlArray = <FormArray>this.modifyResumeForm.get("skill");
                    for (var i = 0; i < skill.length; ++i) {
                        controlArray.push(this.createSkill());
                        controlArray.controls[i].get("skillName").setValue(skill[i].kiNang.tenKiNang);
                        controlArray.controls[i].get("expYear").setValue(skill[i].soNamKinhNghiem);
                    }

                    var controlArraySchool = <FormArray>this.modifyResumeForm.get("school");
                    var schoolData = JSON.parse(this.candidate.trinhDoDaiHoc);
                    for (var i = 0; i < schoolData.length; ++i) {
                        controlArraySchool.push(this.createSchool());
                        controlArraySchool.controls[i].get("daihoc").setValue(schoolData[i].daihoc);
                        // var startDateElements = formatDate(schoolData[i].batdau, "en-US","dd/MM/yyyy");
                        controlArraySchool.controls[i].get("batdau").setValue(schoolData[i].batdau);
                        controlArraySchool.controls[i].get("ketthuc").setValue(schoolData[i].ketthuc);
                        controlArraySchool.controls[i].get("GPA").setValue(schoolData[i].GPA);
                        controlArraySchool.controls[i].get("chuyennganh").setValue(schoolData[i].chuyennganh);
                        controlArraySchool.controls[i].get("mota").setValue(schoolData[i].mota);
                    }

                    var controlArrayWork = <FormArray>this.modifyResumeForm.get("workDescription");
                    var workData = JSON.parse(this.candidate.lichSuLamViec);
                    for (var i = 0; i < workData.length; ++i) {
                        controlArrayWork.push(this.createWork());
                        controlArrayWork.controls[i].get("congTy").setValue(workData[i].congTy);
                        // var startDateElements = formatDate(schoolData[i].batdau, "en-US","dd/MM/yyyy");
                        controlArrayWork.controls[i].get("batdau").setValue(workData[i].batdau);
                        controlArrayWork.controls[i].get("ketthuc").setValue(workData[i].ketthuc);
                        controlArrayWork.controls[i].get("vitri").setValue(workData[i].vitri);
                        controlArrayWork.controls[i].get("mota").setValue(workData[i].mota);
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

    get skill(): FormArray {
        return this.modifyResumeForm.get('skill') as FormArray;
    }

    get school(): FormArray {
        return this.modifyResumeForm.get('school') as FormArray;
    }

    get workDescription(): FormArray {
        return this.modifyResumeForm.get('workDescription') as FormArray;
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

    removeSkill(index: number) {
        this.skill.removeAt(index);
    }

    createSchool(): FormGroup {
        return this.formBuilder.group({
            daihoc: "",
            GPA: "",
            batdau: "",
            ketthuc: "",
            chuyennganh: "",
            mota: ""
        });
    }

    createInputSchool() {
        var controlArray = <FormArray>this.modifyResumeForm.get("school");
        controlArray.push(this.createSchool());
    }

    removeSchool(index: number) {
        this.school.removeAt(index);
    }

    createWork(): FormGroup {
        return this.formBuilder.group({
            congTy: "",
            batdau: "",
            ketthuc: "",
            vitri: "",
            mota: ""
        });
    }

    createInputWork() {
        var controlArray = <FormArray>this.modifyResumeForm.get("workDescription");
        controlArray.push(this.createWork());
    }

    removeWork(index: number) {
        this.workDescription.removeAt(index);
    }

    onSubmit(buttonType): void {
        if (buttonType === "Submit") {
            // if (this.modifyResumeForm.invalid) {
            //     return;
            // }
            this.resume.id = this.candidate.id;
            this.resume.name = this.modifyResumeForm.get("name").value;
            this.resume.email = this.modifyResumeForm.get("email").value;
            this.resume.phone = this.modifyResumeForm.get("phone").value;
            this.resume.wantedSalary = this.modifyResumeForm.get("wantedSalary").value;
            this.resume.careerGoals = this.modifyResumeForm.get("careerGoals").value;
            this.resume.skill = this.modifyResumeForm.get("skill").value;
            this.resume.school = this.modifyResumeForm.get("school").value;
            this.resume.workDescription = this.modifyResumeForm.get("workDescription").value;
            this.resume.major = this.modifyResumeForm.get("career").value;
            console.log("#resume ");
            console.log(this.resume);
            // this.candidateService.modifyResume(this.resume);
            // var c = new Candidate();
            // c.tenUngVien = "name";
            this.candidateService.modifyResume(this.resume).pipe(first())
            .subscribe(
              (data: Candidate[]) => {
                  console.log(data);
              },
              error => {
                console.log('Failed');
              }
            );;
        }
    }
}