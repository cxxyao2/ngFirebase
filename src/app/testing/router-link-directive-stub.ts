import { Directive, Input, HostListener, NgModule } from '@angular/core';

export { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

// Dummy module to satify Angular Language service.Never used

@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}
