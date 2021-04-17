import { Injectable } from '@angular/core';
import{ Router,Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of, Empty } from 'rxjs';
import { mergeMap,take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerResolverService implements Resolve<Customer> {
  constructor(private fs: AngularFirestore, private router: Router) {}
  

}
