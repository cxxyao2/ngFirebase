import {
  Directive,
  Input,
  HostListener,
  Directive,
  NgModule,
} from '@angular/core';

export { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') LinkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.LinkParams;
  }
}

// Dummy module to satify Angular Language service.Never used

@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}
