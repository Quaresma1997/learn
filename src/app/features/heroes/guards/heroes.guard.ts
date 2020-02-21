import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroesGuard implements CanActivate {
  constructor(private store: Store<fromStore.HeroesFeatureState>) {}

  canActivate(): Observable<boolean> {
    return fromStore.checkStore(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
}@Injectable()
export class HeroesGuard implements CanActivate {
  constructor(private store: Store<fromStore.HeroesFeatureState>) {}

  canActivate(): Observable<boolean> {
    return fromStore.checkStore(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
}