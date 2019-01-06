import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public topHeroes: Hero[] = [];

  constructor(private _heroService: HeroService) { }

  ngOnInit() {
    this._heroService.heroesAsync.subscribe(heroes => {
      this.topHeroes = heroes.slice(1, 5);
    });
  }

}
