import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = { name: 'Test user' };
  redirectUrl!: string;
  constructor() {}

  isLoggedIn(): boolean {
    return true;
  }

  logout(): void {
    this.user = { name: '' };
  }
}
