import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manageresumes',
  templateUrl: './manageresumes.component.html',
  styleUrls: ['./manageresumes.component.css']
})
export class ManageresumesComponent implements OnInit {

  constructor() { }

  id : number;
  urlToModifyResume : string;

  ngOnInit() {
      console.log(JSON.parse(localStorage.getItem("currentUser")));
      this.id = JSON.parse(localStorage.getItem("currentUser")).id;
      this.urlToModifyResume = "/modifyresume/" + this.id;
  }

}
