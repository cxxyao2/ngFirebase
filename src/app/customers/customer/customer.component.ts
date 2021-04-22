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
        this.newName = '';
        this.backToCenter();
      })
      .catch((err) => {
        console.log('error is', err);
      });
  }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get('id') || '';
    this.route.data.subscribe((data) => {
      console.log('data is ', data);
      this.customer = data.customer as Customer;
      console.log('hi', this.customer);
    });
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

  delete(): void {
    this.service
      .doc('Customer/' + this.recordId)
      .delete()
      .then((result) => {
        console.log('delete result is ', JSON.stringify(result));
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  add(): void {
    this.service
      .collection('Customer')
      .add({
        name: 'Lau ki Loogn',
        value: 500000,
        address: 'Japan Musium',
      })
      .then(() => {
        console.log('add ok ');
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }
}
