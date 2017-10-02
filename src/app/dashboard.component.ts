import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service'

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = []
  
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().then( heroes => {
      this.heroes = heroes.slice(1, 5)
    })
  }

  heroEmitted(hero: Hero): void {
    let name: string = hero.name
    console.log(name)
    console.log(name, ` was your last Hero, this was sent from a child componet, to a Parent`)
  }
}