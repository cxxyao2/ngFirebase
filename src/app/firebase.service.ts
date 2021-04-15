import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import Employee from './employ';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public fireservices: AngularFirestore) {}

  create_Newemployee(record: Employee) {
    return this.fireservices.collection('Employee').add(record);
  }

  get_Allemployee() {
    return this.fireservices.collection('Employee').snapshotChanges();
  }

  update_employee(recordid: any, record: Employee) {
    this.fireservices.doc('Employee/' + recordid).update(record);
  }

  delete_employee(record_id: any) {
    this.fireservices.doc('Employee/' + record_id).delete();
  }
}
