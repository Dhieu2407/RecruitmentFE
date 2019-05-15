import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuardService{
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) {}

    canActivate(): boolean{
        if(this.authService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
