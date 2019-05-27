import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetFinishService } from '../service/password-reset-finish.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private passwordResetFinishService: PasswordResetFinishService
  ) { }

  resetForm: FormGroup;
  newPassword = '';
  confirmPassword = '';
    key: string;
    keyMissing: boolean;

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.key = params['key'];
      });
      this.keyMissing = !this.key;
      console.log(this.key);
      console.log(this.keyMissing);
      if(this.keyMissing){
          this.router.navigate(['/']);
      }

      this.resetForm = this.formBuilder.group({
          newPassword: ['', Validators.required],
          confirmPassword: ['', Validators.required],
      });
  }

  passwordReset(){
      this.newPassword = this.resetForm.get('newPassword').value;
      this.confirmPassword = this.resetForm.get('confirmPassword').value;
      if(this.confirmPassword !== this.newPassword){
          alert('Mật khẩu không trùng khớp');
          return;
      }
      this.passwordResetFinishService.save({ key: this.key, newPassword: this.newPassword}).subscribe(
          () => {
              alert('Đổi mật khẩu tài khoản thành công');
              this.router.navigate(['/login']);
              },
          () => {
              alert('Đổi mật khẩu tài khoản thất bại');
             }
             );
  }

}
