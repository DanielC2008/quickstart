import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
 
import { AppRoutingModule }     from './app-routing.module';
 
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
 
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';
 
@NgModule({
// exports - the subset of declarations that should be visible and usable in the component templates of other modules.
// imports - other modules whose exported classes are needed by component templates declared in this module.
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
// declarations - the view classes that belong to this module. Angular has three kinds of view classes: components, directives, and pipes.
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
 // providers - creators of services that this module contributes to the global collection of services; they become accessible in all parts of the app.
  //The providers array tells Angular to create a fresh instance of the HeroService when it creates an AppComponent  
  providers:    [ HeroService ],
// bootstrap - the main application view, called the root component, that hosts all other app views. Only the root module should set this bootstrap property.
  bootstrap:    [ AppComponent ]
})
export class AppModule {}

