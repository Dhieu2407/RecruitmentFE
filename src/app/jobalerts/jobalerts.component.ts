import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../service/auth-guard.service';

@Component({
  selector: 'app-jobalerts',
  templateUrl: './jobalerts.component.html',
  styleUrls: ['./jobalerts.component.css']
})
export class JobalertsComponent implements OnInit {

  constructor(
      private authGuardService: AuthGuardService,
  ) { }

  ngOnInit() {
      this.authGuardService.canAccess('ROLE_CANDIDATE');
  }

}
