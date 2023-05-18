import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../notification.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitMessage: String = '';
  submitSuccessMessage: String = '';
  submitted: Boolean = false;

  constructor(private authenticationService: AuthenticationService,private notifyService:NotificationService ) { }

  RegisterForm = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  Submit() {
    this.submitted = true;
    console.log(this.RegisterForm.value);
    this.authenticationService.registerUser(this.RegisterForm.value).subscribe(
      data => {
        this.notifyService.showSuccess("User is registered sucessfully", "Gipher App");
      }, err => {
        if (err.status === 403) {
          this.submitMessage = err.error.message;
        } else if (err.status === 404) {
          this.submitMessage = err.message;
        }
      }
    );

  }
  ngOnInit() {
  }

  usernamehaserror() {
    return this.userId.hasError('required') ? true : false;
  }
  passwordhaserror() {
    return this.userPassword.hasError('minlength') ? true : false;
  }
  firstnamehaserror() {
    return this.firstName.hasError('required') ? true : false;
  }
  lastnamehaserror() {
    return this.lastName.hasError('required') ? true : false;
  }
  useremailhaserror() {
    return this.email.hasError('required') ? true : false;
  }
  
  get userId(){
    return this.RegisterForm.get('userId');
  }
  get userPassword(){
    return this.RegisterForm.get('userPassword');
  }

  set userId(username){
    this.userId.setValue(username);
  }

  set userPassword(password){
    this.userPassword.setValue(password);
  }
  get firstName(){
    return this.RegisterForm.get('firstName');
  }
  get lastName(){
    return this.RegisterForm.get('lastName');
  }

  set firstName(firstName){
    this.userId.setValue(firstName);
  }

  set lastName(lastName){
    this.userPassword.setValue(lastName);
  }
  
  get useremail(){
    return this.RegisterForm.get('email');
  }

  set email(email){
    this.userId.setValue(email);
  }

}
