import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight!: string;
  @Input() defaultColor!: string;

  constructor(private el: ElementRef) {}

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
}
