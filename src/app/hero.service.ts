import { Injectable } from "@angular/core";
// import { HEROES } from "./mock-heroes";
import { Hero } from "./Hero";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InMemoryDataService } from "./in-memory-data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class HeroService {
  private heroesUrl = "api/heroes"; // URL to web api
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl)
      .toPromise()
      .then(response => response as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, hero, { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: String): Promise<Hero> {
    let obj = new Hero();
    const db = new InMemoryDataService();
    const newid = db.genId;
    obj.name = String(name);
    obj.id = Number(newid);

    return this.http
      .post(this.heroesUrl, obj, { headers: this.headers })
      .toPromise()
      .then(Response => Response as Hero)
      .catch(this.handleError);
  }

  delete(id: Number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  //   search(term: String): Observable<Hero[]> {
  //     return this.http
  //       .get(`${this.heroesUrl}/?name=${term}`)
  //       .pipe(map(Response => Response as Hero[]));
  //   }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
