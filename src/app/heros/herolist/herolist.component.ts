import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../../service/hero';

@Component({
  selector: 'app-herolist',
  templateUrl: './herolist.component.html',
  styleUrls: ['./herolist.component.css'],
})
export class HerolistComponent implements OnInit {
  heroValue = 0;
  heros: Hero[] = [
    { id: 1, name: 'Denise' },
    { id: 2, name: 'Mike' },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoHero(id: number): void {
    // this.router.navigate(['/hero', id]);
    const url = `/hero/${id}`;
    this.router.navigateByUrl(url);
  }

  gotoNewValue(newValue: any): void {
    this.heroValue = newValue;
    console.log('newValue is ,', newValue);
  }
}
