import { Injectable } from "@angular/core";
import { HEROES } from "./mock-heroes";
import { Hero } from "./Hero";
import { Observable, of, from } from "rxjs";

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
  //     getHero(id: number): Observable<Hero[]> {
  //         this.getHeroes(`HeroService: fetched hero id=${id}`);
  //         return of(heroes.find(hero => hero.id === id));
  //     // return this.getHeroes().then(heroes => heroes.find(hero.id === id));
  //   }
  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }
}
