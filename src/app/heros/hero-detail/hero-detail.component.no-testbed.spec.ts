import { HeroDetailComponent } from './hero-detail.component';
import { asyncData, ActivatedRouteStub } from '../../testing';
import { Hero } from '../../service/hero';


// 2021 May 04, test ok
fdescribe('HeroDetailComponent- No TestBed', () => {
  let component: HeroDetailComponent;
  let expectedHero: Hero;
  let heroDetailSrv: any;
  let router: any;

  beforeEach((done: DoneFn) => {
    expectedHero = { id: 42, name: 'Bubba' };
    const activatedRoute = new ActivatedRouteStub({ id: expectedHero.id });
    router = jasmine.createSpyObj('router', ['navigate']);

    heroDetailSrv = jasmine.createSpyObj('HeroDetailService', [
      'getHero',
      'saveHero',
    ]);
    heroDetailSrv.getHero.and.returnValue(asyncData(expectedHero));
    heroDetailSrv.saveHero.and.returnValue(asyncData(expectedHero));

    component = new HeroDetailComponent(
      heroDetailSrv,
      activatedRoute as any,
      router
    );
    component.ngOnInit();

    // OnInit calls heroDetailSrv.getHero; wait for it to get the fake hero
    heroDetailSrv.getHero.calls.first().returnValue.subscribe(done);
  });

  it('should expose the hero retrieved from the service', () => {
    expect(component.hero).toBe(expectedHero);
  });

  it('should navigate when click cancel', () => {
    component.cancel();
    expect(router.navigate.calls.any()).toBe(true, 'router.navigate called');
  });

  it('should save when click save', () => {
    component.save();
    expect(heroDetailSrv.saveHero.calls.any()).toBe(
      true,
      'HeroDetailService.save called'
    );
    expect(router.navigate.calls.any()).toBe(
      false,
      'router.navigate not called yet'
    );
  });

  it('should navigate when click save resolves', (done: DoneFn) => {
    component.save();
    // waits for async save to complete before navigating
    heroDetailSrv.saveHero.calls.first().returnValue.subscribe(() => {
      expect(router.navigate.calls.any()).toBe(true, 'router.navigate called');
      done();
    });
  });
});
