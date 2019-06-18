import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "./Hero";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HeroService } from "./hero.service";
import { switchMap } from "rxjs/operators";

@Component({
  //   moduleId: module.id,
  selector: "my-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.heroService.getHero(+params["id"]))
      )
      .subscribe((hero: Hero) => (this.hero = hero));
  }
  goBack(): void {
    this.location.back();
  }
}
