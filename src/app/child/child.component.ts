import { Component, Host, OnInit, Optional, SkipSelf } from '@angular/core';
import { FlowerService } from '../flower.service';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [{ provide: FlowerService, useValue: { emoji: '🌻' } }],
  viewProviders: [{ provide: AnimalService, useValue: { emoji: '🐶' } }],
})
export class ChildComponent implements OnInit {
  // constructor(public flower: FlowerService, public animal: AnimalService) {}
  constructor(
    @Host() public flower: FlowerService,
    @Optional() @Host() public animal?: AnimalService
  ) {}

  // constructor(
  //   public flower: FlowerService,
  //   @Optional() @Host() public animal?: AnimalService
  // ) {}

  // constructor(
  //   @Host() public animal: AnimalService,
  //   @Host() @Optional() public flower?: FlowerService
  // ) {}

  // in the following case, AnimalService gets wrong. viewProvider.
  // but FlowerService is ok. provider
  // constructor(
  //   @SkipSelf() @Host() public animal: AnimalService,
  //   @SkipSelf() @Host() @Optional() public flower?: FlowerService
  // ) {}
  ngOnInit(): void {}
}
