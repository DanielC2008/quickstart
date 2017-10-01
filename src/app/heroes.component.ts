import { Component, OnInit } from '@angular/core'
import { Hero }              from './hero'
import { HeroService }       from './hero.service'
import { Router }            from '@angular/router'


//A decorator is just an expression that will be evaluated and has to return a function.
//the decorator runs the Component code while adding the things we pass to it.
//then this all becomes available to the component below which we wrap up and send off to the rest of the app 
@Component({
  //metadata that will decorate a class
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  //The styleUrls property is an array of style file names (with paths). You could list multiple style files from different locations if you needed them.
  styleUrls: ['./heroes.component.css']
})

//OnInit is a life cycle hook, there are others that can help you load data at specific times https://angular.io/guide/lifecycle-hooks
export class HeroesComponent implements OnInit {
  //array of objs of type hero
  heroes: Hero[];
  //of type Hero
  selectedHero: Hero;
  //builds obj with prop heroService from hero service
  constructor(
    private heroService: HeroService, 
    private router: Router
  ) {}
  //when called gets heros and sets variable
  getHeroes(): void {
    this.heroService.getHeroes().then( heroes => this.heroes = heroes);
  }
  // on page load call this function
  ngOnInit(): void {
    this.getHeroes();
  }
  //pass in a hero of type hero. set selectedHero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    //just like router link in html building url with two parts
    this.router.navigate(['/detail', this.selectedHero.id])
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return }
    this.heroService.create(name)
        .then( hero => {
          this.heroes.push(hero);
          this.selectedHero = null
        })
  }
  delete(hero: Hero): void {
  this.heroService.delete(hero.id)
    .then( () => {
      this.heroes = this.heroes.filter( h => h !== hero)
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    })
  }

}
