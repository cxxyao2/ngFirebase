import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  category = 'car';
  welcome!: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.welcome = this.authService.isLoggedIn()
      ? 'Welcome, ' + this.authService.user.name
      : 'Please log in';
  }
}
