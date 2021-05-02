import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
})
export class HeroBannerComponent implements OnInit {
  @Input() heroName!: string;
  @Output() selected = new EventEmitter<number>();
  nameControl = new FormControl();

  title = 'Test Tour';

  constructor() {}

  ngOnInit(): void {}

  changeValue(): void {
    this.selected.emit(123);
  }
}
