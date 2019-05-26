import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivateService } from '../service/activate.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private activateService: ActivateService,
  ) { }

    error: string;
    success: string;

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.activateService.get(params['key']).subscribe(
              () => {
                  this.error = null;
                  this.success = 'OK';
              },
              () => {
                  this.success = null;
                  this.error = 'ERROR';
              }
          );
      });
  }

}
