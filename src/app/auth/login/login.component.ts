import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(fb: FormBuilder, private service: FirebaseAuthService) {
    this.myForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  onSubmit() {
    console.log('form valid', this.myForm.valid);
    if (this.myForm.valid) {
      this.service.login(this.email?.value, this.password?.value);
    }
  }
  ngOnInit(): void {}

  loginGoogle() {
    this.service.googlelogin();
  }
}
