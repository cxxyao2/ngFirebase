import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Hero } from '../../service/hero';

@Component({
  selector: 'app-herolist',
  templateUrl: './herolist.component.html',
  styleUrls: ['./herolist.component.css'],
})
export class HerolistComponent implements OnInit {
  heros: Hero[] = [
    { id: 1, name: 'Denise' },
    { id: 2, name: 'Mike' },
  ];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  gotoHero(id: number): void {
    this.router.navigate(['/hero', id]);
  }
}
