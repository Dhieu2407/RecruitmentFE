import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CandidateService } from '../service/candidate.service';

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
  constructor(private candidateService: CandidateService) {
    
  }

  ngOnInit() {
    this.newCandidate = {username: "", email : "", password : ""};
    this.rfContact = new FormGroup({
      Username: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl()
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
