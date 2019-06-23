import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Hero } from "./Hero";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class HeroSearchService {
  private heroesUrl = "api/heroes"; // URL to web api
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`${this.heroesUrl}/?name=${term}`)
      .pipe(map(Response => Response as Hero[]));
  }
}
