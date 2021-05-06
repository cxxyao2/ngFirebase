import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwModalService {
  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }
  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
