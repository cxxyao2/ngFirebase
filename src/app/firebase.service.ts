import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import Employee from './employ';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  get_employee(recordId:string) {
    return this.fireservices.doc('Employee/' + recordId);
  }

  update_employee(recordId: any, record: Employee) {
    this.fireservices.doc('Employee/' + recordId).update(record);
  }

  delete_employee(record_id: any) {
    this.fireservices.doc('Employee/' + record_id).delete();
  }
}
