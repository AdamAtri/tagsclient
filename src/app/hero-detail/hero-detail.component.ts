import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero = null;

  constructor(
    private _route: ActivatedRoute,
    private _heroService: HeroService,
    private _location: Location
  ) { }

  ngOnInit() { 
    this.getHero();
  }
  
  getHero() {
    const heroId = +this._route.snapshot.paramMap.get('id');
    this._heroService.getHero(heroId)
      .subscribe(hero => this.hero = hero);
  }

  save() {
    this._heroService.updateHero(this.hero)
      .subscribe(result => {
        console.log(result);
        return this.goBack();
      });
  }

  goBack() {
    this._location.back();
  }

}
