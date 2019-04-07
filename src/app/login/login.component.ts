import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CandidateServiceService } from '../candidate-service.service';

export interface Candidate{
  username : string,
  email : string,
  password : string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newCandidate : Candidate;
  rfContact: FormGroup;
  constructor(private candidateService: CandidateServiceService) {
    
  }

  ngOnInit() {
    this.newCandidate = {username: "", email : "", password : ""};
    this.rfContact = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),  Validators.minLength(3), Validators.maxLength(30)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      RepeatPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });

  }

  onSubmit() {
    this.newCandidate.username = this.rfContact.get('Username').value;
    this.newCandidate.email = this.rfContact.get('Email').value;
    this.newCandidate.password = this.rfContact.get('Password').value;
    console.log(this.newCandidate);
    this.candidateService.addNewCandidate(this.newCandidate).subscribe(x => console.log(x));
  } 

}
