import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-vchild',
  templateUrl: './vchild.component.html',
  styles: [
    `
      :host {
        border: 5px solid green;
      }
      p {
        color: coral;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VchildComponent implements OnInit {
  @Input() id!: number;
  private domElement: any;
  constructor(private el: ElementRef) {
    this.domElement = el;
  }

  ngOnInit(): void {
    console.log('vchild ngOnInit dom Element', this.domElement);
  }
}
