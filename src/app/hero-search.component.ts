import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
 
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';


 @Component({
   selector: 'hero-search',
   templateUrl: './hero-search.component.html',
   styleUrls: ['./hero-search.component.css'],
   providers: [HeroSearchService]
 })


//A Subject is a producer of an observable event stream; searchTerms produces an Observable of strings, the filter criteria for the name search.

//Each call to search() puts a new string into this subject's observable stream by calling next().

 export class HeroSearchComponent implements OnInit {
   //set heroes of type observable of type array of Hero
    heroes: Observable<Hero[]>;
   //this is how we produce a new observable of type string
    private searchTerms = new Subject<string>();
   
    constructor( 
      private heroSearchService: HeroSearchService,
      private router: Router
    ) {}

    // Push a search term into the observable stream. the next actually pushs the new string as you would an array. the Observable completes al requests but discards unneed requrests
    search(term: string): void {
      this.searchTerms.next(term)
    }
    // 
    ngOnInit(): void {
      this.heroes = this.searchTerms
          //wait 300ms after each keystroke before considering the term
          .debounceTime(300)
          // ignore if next search term is same as previous
          .distinctUntilChanged()
          .switchMap(term => term ?
            // switch to new observable each time the term changes
            // return the http search observable
            this.heroSearchService.search(term)
            // or the observable of empty heroes if there was no search term
            : Observable.of<Hero[]>([])
          ).catch(err => {
            console.log(err)
            return Observable.of<Hero[]>([])
          })
    }

    gotoDetail(hero: Hero): void {
      let link = ['/detail', hero.id];
      this.router.navigate(link)
    }

  }