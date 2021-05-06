import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { VchildComponent } from '../vchild/vchild.component';

@Component({
  selector: 'app-vparent',
  templateUrl: './vparent.component.html',
  styleUrls: ['./vparent.component.css'],
})
export class VparentComponent implements OnInit, AfterViewInit {
  @ViewChild('child1') componentChild!: VchildComponent; // template variable
  @ViewChild(VchildComponent) componentChildByType!: VchildComponent; // 通过组件类型取得
  @ViewChild('child2', { read: ElementRef }) componentElement!: ElementRef; // 直接找到子组件对应的DOM
  @ViewChildren(VchildComponent)
  componentChildList!: QueryList<VchildComponent>; // get all vchilds

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // DOM  elements
    console.log('child1', this.componentChild);
    console.log('first child', this.componentChildByType);
    console.log('child2', this.componentElement);
    console.log('begin printing list...');
    if (
      this.componentChildList !== null &&
      this.componentChildList.length > 0
    ) {
      this.componentChildList.forEach((eleRef) => console.log(eleRef));
    }
  }
}
