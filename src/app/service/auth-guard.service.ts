import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Account } from '../model/account.model';

@Injectable({ providedIn: 'root' })
export class AuthGuardService{
    constructor(
        private router: Router
    ) {}

    currentUser = new Account();

    canAccess(role: string){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!this.currentUser) {
            alert('Bạn chưa đăng nhập');
            this.router.navigate(['/']);
            return;
        }
        if(this.currentUser.authorities[0] !== role){
            alert('Bạn không có quyền truy cập trang này');
            this.router.navigate(['/']);
        }
    }

    canLogin(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser) {
            return true;
        } else return false;
    }
}
