import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import Employee from './employ';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public fireservices: AngularFirestore) {}

  create_Newemployee(record: Employee) {
    return this.fireservices.collection('Employee').add(record);
  }

  get_Allemployee() {
    return this.fireservices
      .collection('Employee')
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            return {
              id: snap.payload.doc.id,
              ...(snap.payload.doc.data() as {}),
            };
          })
        ),
        first()
      );
  }

  update_employee(recordid: any, record: Employee) {
    this.fireservices.doc('Employee/' + recordid).update(record);
  }

  delete_employee(record_id: any) {
    this.fireservices.doc('Employee/' + record_id).delete();
  }
}
