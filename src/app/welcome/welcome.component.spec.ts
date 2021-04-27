import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { AuthService } from '../auth.service';

class MockAuthService {
  user = { name: 'Mike' };
  isLoggedIn(): boolean {
    return true;
  }
}

fdescribe('WelcomeComponent 2 ', () => {
  let component: WelcomeComponent;
  let service: AuthService;
  let fixture: ComponentFixture<WelcomeComponent>;
  let div1: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    // method2:  service = fixture.debugElement.injector.get(UserService);
    div1 = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display original category no need deleteChanges', () => {
    expect(div1.innerHTML).toContain(component.category);
  });
});
