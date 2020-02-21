import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import * as fromCore from './../../../../core';
import * as fromStore from './../../store';

export abstract class Bilal {
  abstract hello();
}

@Component({
  selector: 'hero-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hero-add (addHero)="onAddHero($event)"></hero-add>

    <div class="row">
      <div class="column">
        <div class="heroes">
          <div *ngFor="let hero of heroes$ | async">
            <hero-item 
              [hero]="hero"
              (deleteHero)="onDeleteHero($event)">
            </hero-item>
          </div>
        </div>
      </div>
      <div class="column">
        <hero-search [query]="searchQuery$ | async" (search)="onSearch($event)"></hero-search>
        <hero-search-results [heroes]="searchResults$ | async"></hero-search-results>
      </div>
    </div>
  `,
  styles: [
    `
    .heroes {
      margin: 0 0 2em 0;
      padding: 0;
      width: 15em;
    }
    .row {
        display: flex;
    }
    .column {
        flex: 50%;
    }
  `
  ],
  providers: [
    {
      provide: Bilal, useExisting: forwardRef(() => HeroListComponent)
    }
  ]
})
export class HeroListComponent implements Bilal {
  heroes$: Observable<fromCore.Hero[]>;
  searchQuery$: Observable<string>;
  searchResults$: Observable<fromCore.Hero[]>;

  hello() {
    
  }

  constructor(private store: Store<fromStore.HeroesFeatureState>, public cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.heroes$ = this.store.pipe(select(fromStore.getAllHeroes));

    console.log(this.cd);

    this.searchQuery$ = this.store.pipe(select(fromStore.getSearchQuery), take(1));
    this.searchResults$ = this.store.pipe(select(fromStore.getSearchResults));


    // this.store.dispatch(new fromStore.LoadHeroes());
  }

  onAddHero(hero: fromCore.Hero): void {
    this.store.dispatch(new fromStore.CreateHero(hero));
  }

  onDeleteHero(hero: fromCore.Hero): void {
    const remove = window.confirm('Are you sure you want to remove this hero?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveHero(hero));
    }
  }

  onSearch(query: string) {
    this.store.dispatch(new fromStore.SearchHeroes(query));
  }


}
