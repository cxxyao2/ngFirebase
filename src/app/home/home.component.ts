import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/firebase-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public service: FirebaseAuthService) {}

  ngOnInit(): void {}

  signOut() {
    this.service.logout();
  }
}
