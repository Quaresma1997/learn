import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import * as fromCore from './../../../../core';
import * as fromRoot from './../../../../store';
import * as fromStore from './../../store';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<fromCore.Hero>;

  constructor(
    private store: Store<fromStore.HeroesFeatureState>,
    private heroService: fromCore.HeroService
  ) {}

  ngOnInit(): void {    
      this.hero$ = this.store.select(fromStore.getSelectedHero);
  }

  onSaveHero(hero: fromCore.Hero): void {
    console.log(hero);
    this.store.dispatch(new fromStore.UpdateHero(hero));
  }

  onGoBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/