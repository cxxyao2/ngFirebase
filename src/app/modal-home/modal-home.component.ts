import { Component, OnInit } from '@angular/core';
import { JwModalService } from '../modal/jw-modal.service';

@Component({
  selector: 'app-modal-home',
  templateUrl: './modal-home.component.html',
  styleUrls: ['./modal-home.component.css'],
})
export class ModalHomeComponent implements OnInit {
  bodyText = '';

  constructor(private modalService: JwModalService) {}

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
