import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../service/hero';
import { HeroService } from '../service/hero.service';

@Injectable()
export class HeroDetailService {
  testHero: Hero = { id: 0, name: '' };
  constructor(private heroService: HeroService) {}

  // Returns a clone which caller may modify safely
  getHero(id: number | string): Observable<Hero | null> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    return this.heroService.getHero(id).pipe(
      map((hero) => {
        return hero ? Object.assign({}, hero) : null; // clone or null;
      })
    );
  }

  saveHero(hero: Hero) {
    return this.heroService.updateHero(hero);
  }
}
