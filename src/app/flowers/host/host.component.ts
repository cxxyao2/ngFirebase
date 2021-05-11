import { Component, Host, OnInit, Optional } from '@angular/core';
import { FlowerService } from '../../flower.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  providers: [{ provide: FlowerService, useValue: { emoji: '🌼' } }],
})
export class HostComponent implements OnInit {
  constructor(@Host() @Optional() public flower?: FlowerService) {}

  ngOnInit(): void {}
}
