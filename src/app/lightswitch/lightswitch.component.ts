import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-light-switch',
  template: ` <button (click)="clicked()">Click me</button>
    <span>{{ message }}</span>
    <div><button (click)="print()">print</button></div>`,
})
export class LightswitchComponent implements OnInit {
  @Input() lightName!: string;
  @Output() selected = new EventEmitter<string>();
  isOn = false;
  clicked(): void {
    this.isOn = !this.isOn;
  }
  get message() {
    return `The light is ${this.isOn ? 'on' : 'off'}`;
  }

  print() {
    this.selected.emit(this.lightName);
  }
  constructor() {}

  ngOnInit(): void {}
}
