import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CandidateService } from '../service/candidate.service';
import { Candidate} from '../model/candidate.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  candidate = new Candidate();
  rfContact: FormGroup;
  constructor(private candidateService: CandidateService) {
    
  }

  ngOnInit() {
    this.rfContact = new FormGroup({
      Username: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl()
    });

  }

  onSubmit() {
    this.candidate.username = this.rfContact.get('Username').value;
    this.candidate.email = this.rfContact.get('Email').value;
    this.candidate.password = this.rfContact.get('Password').value;
    console.log(this.candidate);
    this.candidateService.addNewCandidate(this.candidate).subscribe(x => console.log(x));
  }

}
