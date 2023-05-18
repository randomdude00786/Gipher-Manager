import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { RouterService } from '../service/router.service';
import { Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitMessage: String = '';
  submitted : Boolean = false;
  constructor(private authenticationService: AuthenticationService, private routerService:  RouterService,private notifyService:NotificationService) {}

  loginForm = new FormGroup ({
    userId : new FormControl('', [Validators.required]),
    userPassword : new FormControl('', [Validators.required, Validators.minLength(4)])
  });

    loginSubmit() {
      this.submitted = true;
      const userId = this.loginForm.value.userId;
      this.authenticationService.authenticateUser(this.loginForm.value).subscribe(
        data => {
          console.log(data['token']);
          this.authenticationService.setBearerToken(data['token']);
          this.authenticationService.setUserId(userId);
          this.routerService.routeToDashboard();
          this.notifyService.showSuccess("Login successfull !!", "Gipher App")
        }, err => {
          console.log(err);
          if (err.status === 403) {
            this.submitMessage = err.error.message;
          } else if (err.status === 404) {
            this.submitMessage = err.message;
          }else if(err.status === 401){
            this.notifyService.showError("Invalid username password", "Gipher App")
          }
          this.notifyService.showError("Login Failed !!", "Gipher App")
        }
      );

    }
    usernamehaserror() {
      return this.userId.hasError('required') ? true : false;
    }
    passwordhaserror() {
      return this.userPassword.hasError('required') ? true : false;
    }

    passwordhaserrorminlength() {
      return this.userPassword.hasError('minlength') ? true : false;
    }

    get userId() {
      return this.loginForm.get('userId');
    }
    get userPassword() {
      return this.loginForm.get('userPassword');
    }

    set userId(username) {
      this.userId.setValue(username);
    }

    set userPassword(password) {
      this.userPassword.setValue(password);
    }

    get lf() {
      return this.loginForm.controls;
    }
}
