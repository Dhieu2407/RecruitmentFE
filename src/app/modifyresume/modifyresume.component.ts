import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Resume } from "../model/resume.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CandidateService } from "../service/candidate.service";
import { Candidate } from "../model/candidate.model";
import { first } from "rxjs/operators";
import { Major } from "../model/major.model";
import { skill } from "../model/skill.model";
import { MajorService } from "../service/major.service";
import { formatDate } from "@angular/common";
import { SkillService } from "../service/skill.service";
import { AuthGuardService } from "../service/auth-guard.service";
import { UploadService } from "../service/upload.service";
import { Certificate } from "../model/certificate.model";
import { CertificateService } from "../service/certificate.service";
import { Account } from '../model/account.model';

@Component({
    selector: "app-modifyresume",
    templateUrl: "./modifyresume.component.html",
    styleUrls: ["./modifyresume.component.css"]
})
export class ModifyresumeComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private candidateService: CandidateService, private majorService: MajorService, private skillService: SkillService, private authGuardService: AuthGuardService, private uploadService: UploadService, private certificateService: CertificateService) {}

    modifyResumeForm: FormGroup;

    resume = new Resume();
    account: Account;
    id: number;
    candidate = new Candidate();
    nganh: string;
    hocVan: string;
    allMajors: Major[];
    allSkills: skill[];
    viecLam: string;
    allSkillsBasedOnMajor: skill[];
    username: string;
    email: string;
    imageFile: File;
    allCertificates: Certificate[];
    imageSrc = '';

    ngOnInit() {
        if(!!localStorage.getItem('currentUser') === false) this.account = JSON.parse(sessionStorage.getItem('currentUser'));
        else this.account = JSON.parse(localStorage.getItem('currentUser'));
        if(this.account.authorities[0] !== "ROLE_CANDIDATE") this.router.navigate(['/']);
        this.email = this.account.email;

        console.log(this.email);
        this.candidate.id = this.account.id;

        this.majorService
            .getAllMajors()
            .pipe(first())
            .subscribe(
                (data: Major[]) => {
                    this.allMajors = data;
                    console.log(this.allMajors);
                    // this.filterSkillsBasedOnMajor();
                },
                error => {
                    console.log("Failed");
                }
            );

        this.skillService
            .getAllSkills()
            .pipe(first())
            .subscribe(
                (data: skill[]) => {
                    console.log("skill success");
                    this.allSkills = data;
                    console.log(this.allSkills);
                    // this.filterSkillsBasedOnMajor();
                },
                error => {
                    console.log("Failed");
                }
            );

        this.certificateService
            .getAllCertificates()
            .pipe(first())
            .subscribe(
                (data: Certificate[]) => {
                    console.log("skill success");
                    this.allCertificates = data;
                    console.log(this.allCertificates);
                },
                error => {
                    console.log("Failed");
                }
            );

        this.modifyResumeForm = this.formBuilder.group({
            name: ["", Validators.required],
            phone: ["", Validators.required],
            address: ["", Validators.required],
            career: ["", Validators.required],
            wantedPosition: ["", Validators.required],
            age: ["", Validators.required],
            wantedSalary: ["", Validators.required],
            yearsOfExperience: ["", Validators.required],
            workForm: ["", Validators.required],
            expertise: ["", Validators.required],
            careerGoals: ["", Validators.required],
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
            skill: this.formBuilder.array([]),
            certificate: this.formBuilder.array([])
        });
        this.id = +this.route.snapshot.paramMap.get("id");
        this.candidateService
            .getCandidate(this.id)
            .pipe(first())
            .subscribe(
                (data: Candidate) => {
                    this.candidate = data;
                    if(this.candidate.imgUrl !== null) this.imageSrc = this.candidate.imgUrl;
                    this.modifyResumeForm.get("name").setValue(this.candidate.tenUngVien);
                    this.modifyResumeForm.get("phone").setValue(this.candidate.sdt);
                    this.modifyResumeForm.get("address").setValue(this.candidate.diaChi);
                    this.modifyResumeForm.get("career").setValue(this.candidate.nganh.tenNganh);
                    this.modifyResumeForm.get("wantedSalary").setValue(this.candidate.luongMongMuon);
                    this.modifyResumeForm.get("careerGoals").setValue(this.candidate.mucTieuNgheNghiep);
                    // this.filterSkillsBasedOnMajor();
                    this.nganh = this.candidate.nganh.tenNganh;

                    var skill = JSON.parse(JSON.stringify(this.candidate.kiNang) + "");
                    console.log(skill.length);
                    var controlArray = <FormArray>this.modifyResumeForm.get("skill");
                    if (skill.length == 0) {
                        controlArray.push(this.createSkill());
                    } else {
                        for (var i = 0; i < skill.length; ++i) {
                            controlArray.push(this.createSkill());
                            controlArray.controls[i].get("skillName").setValue(skill[i].kiNang.tenKiNang);
                            controlArray.controls[i].get("expYear").setValue(skill[i].soNamKinhNghiem);
                        }
                    }

                    // certificate
                    console.log("cer");
                    console.log(this.candidate);
                    var certificate = JSON.parse(JSON.stringify(this.candidate.chungChi) + "");
                    console.log("certificate  : " + certificate.length);
                    var controlCertificateArray = <FormArray>this.modifyResumeForm.get("certificate");
                    if (certificate.length == 0) {
                        controlCertificateArray.push(this.createCertificate());
                    } else {
                        for (var i = 0; i < certificate.length; ++i) {
                            controlCertificateArray.push(this.createCertificate());
                            controlCertificateArray.controls[i].get("certificateName").setValue(certificate[i].chungChi.tenChungChi);
                            controlCertificateArray.controls[i].get("score").setValue(certificate[i].diemSo);
                        }
                    }

                    var controlArraySchool = <FormArray>this.modifyResumeForm.get("school");
                    if (this.candidate.trinhDoDaiHoc != null) {
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
                    } else {
                        controlArraySchool.push(this.createSchool());
                    }

                    var controlArrayWork = <FormArray>this.modifyResumeForm.get("workDescription");
                    if (this.candidate.lichSuLamViec != null) {
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
                    } else {
                        controlArrayWork.push(this.createWork());
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
        return this.modifyResumeForm.get("skill") as FormArray;
    }

    get school(): FormArray {
        return this.modifyResumeForm.get("school") as FormArray;
    }

    get workDescription(): FormArray {
        return this.modifyResumeForm.get("workDescription") as FormArray;
    }

    get certificate(): FormArray {
        return this.modifyResumeForm.get("certificate") as FormArray;
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

    createCertificate(): FormGroup {
        return this.formBuilder.group({
            certificateName: "",
            score: ""
        });
    }

    createInputCertificate() {
        var controlArray = <FormArray>this.modifyResumeForm.get("certificate");
        controlArray.push(this.createCertificate());
    }

    removeCertificate(index: number) {
        this.certificate.removeAt(index);
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
            this.resume.id = this.account.id;
            this.resume.name = this.modifyResumeForm.get("name").value;
            this.resume.email = this.email;
            this.resume.phone = this.modifyResumeForm.get("phone").value;
            this.resume.address = this.modifyResumeForm.get("address").value;
            this.resume.wantedSalary = this.modifyResumeForm.get("wantedSalary").value;
            this.resume.careerGoals = this.modifyResumeForm.get("careerGoals").value;
            this.resume.skill = this.modifyResumeForm.get("skill").value;
            this.resume.certificate = this.modifyResumeForm.get("certificate").value;
            this.resume.school = this.modifyResumeForm.get("school").value;
            this.resume.workDescription = this.modifyResumeForm.get("workDescription").value;
            this.resume.major = this.modifyResumeForm.get("career").value;
            console.log("#resume ");
            console.log(this.resume);

            const uploadData = new FormData();
            if (!this.imageFile) {
                this.submitData();
            } else {
                uploadData.append("file", this.imageFile, this.imageFile.name);
                this.uploadService
                    .uploadFile(uploadData)
                    .pipe(first())
                    .subscribe(
                        data => {
                            // Success
                            console.log("Uploaded");
                            this.resume.imgUrl = "http://localhost:8080/api/downloadFile/" + this.imageFile.name;
                            this.submitData();
                        },
                        error => {
                            // Failed
                            console.log("Failed");
                            this.submitData();
                        }
                    );
            }
        }
    }
    onFileChanged(event) {
        this.imageFile = event.target.files[0];
        console.log(this.imageFile);
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => (this.imageSrc = reader.result as string);

            reader.readAsDataURL(file);
        }
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
        this.candidateService
            .modifyResume(this.resume)
            .pipe(first())
            .subscribe(
                (data: Candidate[]) => {
                    console.log(data);
                    alert('Gửi thành công');
                    this.router.navigate(['/resume/' + this.resume.id]);
                },
                error => {
                    console.log("Failed");
                }
            );
    };
}
