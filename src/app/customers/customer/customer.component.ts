import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../../customer';
import { DialogService } from '../../dialog.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer!: Customer;
  newName = '';
  recordId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AngularFirestore,
    private dialogSrv: DialogService
  ) {}

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.newName || this.customer.name === this.newName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogSrv.confirm('Discard changes?');
  }

  save(): void {
    this.service
      .collection('Customer')
      .doc(this.recordId)
      .update({
        name: this.newName,
      })
      .then(() => {
        this.backToCenter();
      })
      .catch((err) => {
        console.log('error is', err);
      });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.recordId = params.get('id') || '';
          return this.service.doc('Customer/' + params.get('id') || '').get();
        })
      )
      .subscribe(
        (item) => {
          this.customer = item.data() as Customer;
          // console.log('data is', item.data(), ' id is', item.id);
        },
        (err) => {
          console.log('error is', err);
        },
        () => {
          console.log('get customer');
        }
      );
  }

  cancel() {
    this.backToCenter();
  }

  // Relative navigation back to the upper level --customers center
  backToCenter(): void {
    this.router.navigate(['../../', { foo: 'foo' }], {
      relativeTo: this.route,
    });
  }
}
