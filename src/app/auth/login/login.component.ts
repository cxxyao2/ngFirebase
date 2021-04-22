import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      name: ['', Validators.required],
      email: [],
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get email() {
    return this.myForm.get('email');
  }

  onSubmit() {
    console.log('form valid', this.myForm.valid);
  }
  ngOnInit(): void {}
}
