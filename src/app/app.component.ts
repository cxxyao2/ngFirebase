import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowerService } from './flower.service';
import { AnimalService } from './animal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-firebase';

  constructor(public flower: FlowerService, public animal: AnimalService) {}

  onVote(newVote: any) {
    console.log('vote changed', newVote);
  }

  printLightName(name: string) {
    console.log('light name is', name);
  }
}
