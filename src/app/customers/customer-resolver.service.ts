import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerResolverService implements Resolve<Customer> {
  constructor(private fs: AngularFirestore, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.fs
      .doc('Customer/' + id)
      .get()
      .pipe(
        take(1),
        mergeMap((crisis) => {
          console.log('crisis ,', crisis.data());
          if (crisis.data()) {
            return of(crisis.data());
          } else {
            // id not found
            this.router.navigate(['/customers']);
            return EMPTY;
          }
        })
      );
  }
}
