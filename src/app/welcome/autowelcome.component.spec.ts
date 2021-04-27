import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WelcomeComponent } from './welcome.component';
import { AuthService } from '../auth.service';
import { DebugElement } from '@angular/core';

class MockAuthService {
  user = { name: 'Mike' };
  isLoggedIn(): boolean {
    return true;
  }
}

fdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let service: AuthService;
  let fixture: ComponentFixture<WelcomeComponent>;
  let div1: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        WelcomeComponent,
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    div1 = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not have welcome message after construction', () => {
    expect(component.welcome).toBeUndefined('welcome is undefined');
  });

  it('should welcome logged in after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.welcome).toContain(service.user.name, 'user have name');
  });

  it('should contain welcome works', () => {
    const welcomeElement: HTMLElement = fixture.nativeElement;
    expect(welcomeElement.textContent).toContain('welcome works');
  });

  it('should find the <p> with fixture.debugElement.nativeElement querySelector', () => {
    const welcomeDe: DebugElement = fixture.debugElement;
    const welcomeEl: HTMLElement = welcomeDe.nativeElement;
    const para = welcomeEl.querySelector('p');
    expect(para?.textContent).toContain('welcome works');
  });

  it('should find the <p> with fixture.debugElement.query(By.css)', () => {
    const welcomeDe: DebugElement = fixture.debugElement;
    const paragraphDe = welcomeDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toContain('welcome works');
  });

  it('should no content in the Dom after createComponent()', () => {
    expect(div1.innerHTML).toEqual('');
  });

  it('should display title after detectChanges()', () => {
    fixture.detectChanges();
    expect(div1.innerHTML).toContain(component.category);
  });
});
