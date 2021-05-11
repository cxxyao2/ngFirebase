import { Component, OnInit, SkipSelf } from '@angular/core';
import { LeafService } from '../../leaf.service';

@Component({
  selector: 'app-skipself',
  templateUrl: './skipself.component.html',
  styleUrls: ['./skipself.component.css'],
  // Angular would ignore this LeafService instance
  providers: [{ provide: LeafService, useValue: { emoji: '🍁' } }],
})
export class SkipselfComponent implements OnInit {
  // Use @SkipSelf() in the constructor
  constructor(@SkipSelf() public leaf: LeafService) {}

  ngOnInit(): void {}
}
