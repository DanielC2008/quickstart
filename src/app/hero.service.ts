import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //toPromise()
import { Hero }          from './hero';


//Dependency Injection is a coding pattern in which a class receives its dependencies from external sources rather than creating them itself.

//Don't forget the parentheses after Injectable Omitting them leads to an error that's difficult to diagnose.
@Injectable()
export class HeroService{
  private heroesUrl = 'api/heroes'
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
              //can convert observable to promise
               .toPromise()
               //notice TS as syntax here
               .then( response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error)
  }


  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get(url)
               .toPromise()
               .then( response => response.json().data as Hero)
               .catch(this.handleError)
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`

    return this.http
               .put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then( () => hero)
               .catch( this.handleError)
  }

  create(name: string): Promise<Hero> {
    return this.http
               .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
               .toPromise()
               .then( res => res.json().data as Hero)
               .catch(this.handleError)   
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError)
  }
}