import { Component, OnInit } from '@angular/core';
import { FlowerService } from '../../flower.service';

@Component({
  selector: 'app-host-child',
  templateUrl: './host-child.component.html',
  styleUrls: ['./host-child.component.css'],
})
export class HostChildComponent implements OnInit {
  constructor(public flower: FlowerService) {}

  ngOnInit(): void {}
}
