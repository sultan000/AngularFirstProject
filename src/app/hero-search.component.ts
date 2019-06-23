import { Component, OnInit } from "@angular/core";
import { Hero } from "./Hero";
import { Observable, Subject, from } from "rxjs";
import { of } from "rxjs";
// Observable operators

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { HeroSearchService } from "./hero-search.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-hero-search",
  templateUrl: "./hero-search.component.html",
  styleUrls: ["./hero-search.component.css"],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private HeroSearchService: HeroSearchService,
    private router: Router
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      debounceTime(50),
      distinctUntilChanged(),
      switchMap(term =>
        term ? this.HeroSearchService.search(term) : of<Hero[]>([])
      )
    );
  }
  gotoDetail(hero: Hero): void {
    let link = ["/detail", hero.id];
    this.router.navigate(link);
  }
}
