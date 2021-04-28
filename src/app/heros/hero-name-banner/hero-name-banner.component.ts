import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-name-banner',
  templateUrl: './hero-name-banner.component.html',
  styles: [
    `
      h1 {
        color: coral;
        font-size: 200%;
      }
    `,
  ],
})
export class HeroNameBannerComponent implements OnInit {
  @Input() heroName!: string;
  nameControl = new FormControl();

  title = 'Test Tour';

  constructor() {}

  ngOnInit(): void {}
}
