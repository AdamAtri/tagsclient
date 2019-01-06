import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public hero: Hero = {
    id: 1, 
    name: 'Windpasser'
  };

  protected _heroes: Array<Hero>;
  public get heroes(): Array<Hero> { 
    return this._heroes; 
  }


  // inject the hero-service through the constructor
  constructor(private _heroService: HeroService) {
    console.log('hero');
    (window as any).heroService = this._heroService;
  }

  ngOnInit() { 
    // instantiate the hero-service here
    this._heroService.heroesAsync.subscribe(heroes => this._heroes = heroes);
                          
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this._heroService.addHero({name} as Hero)
      .subscribe(hero => {this.heroes.push(hero)});
  }

  delete(hero: Hero): void {
    if (confirm(`Are you sure you want to delete: ${hero.name}`)) {
      this._heroService.deleteHero(hero)
        .subscribe(heroes => this._heroes = heroes);
    }
  }
}
