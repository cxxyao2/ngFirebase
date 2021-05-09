import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Nice, it worked');
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        console.log('something went wrong: ', err);
      });
  }

  googlelogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider).then((value) => {
      console.log('Success', value);
      this.router.navigateByUrl('/home');
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
