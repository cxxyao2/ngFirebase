import { Component, OnInit } from '@angular/core';
import { FlowerService } from '../flower.service';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css'],
})
export class InspectorComponent implements OnInit {
  constructor(public flower: FlowerService, public animal: AnimalService) {}

  ngOnInit(): void {}
}
