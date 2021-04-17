import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl!: string;
  constructor() {}

  isLoggedIn(): boolean {
    return true;
  }
}
