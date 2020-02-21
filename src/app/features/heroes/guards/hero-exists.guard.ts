import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../store';
import { Hero } from './../../../core/models/hero';

@Injectable()
export class HeroExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.HeroesFeatureState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return fromStore.checkStore(this.store).pipe(
      switchMap(() => {
        const id = parseInt(route.params.id, 10);
        return this.hasHero(id);
      })
    );
  }

  hasHero(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getHeroesEntities)
      .pipe(
        map((entities: { [key: number]: Hero }) => !!entities[id]),
        take(1)
      );
  }

  /**
   * Despite the fact checkStore was also called on the pizza component,
   * Angular Guards are not sync. This means, they fire a guard and move on,
   * so we have to check again if the data from server is already retrieved 
   * before we go on.
   */
  
}