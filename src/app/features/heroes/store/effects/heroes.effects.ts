import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { of, empty, Observable } from "rxjs";

import * as fromRoot from './../../../../store';
import * as fromCore from './../../../../core';
import * as fromActions from "./../actions/heroes.actions";

@Injectable()
export class HeroesEffects {
  constructor(
    private actions$: Actions,
    private service: fromCore.HeroService
  ) {}

  @Effect()
  loadHeroes$ = this.actions$.ofType(fromActions.LOAD_HEROES).pipe(
    switchMap(() =>
      this.service.getHeroes().pipe(
        map((heroes: fromCore.Hero[]) => new fromActions.LoadHeroesSuccess(heroes)),
        
        /* return an observable of the error */
        catchError(error => of(new fromActions.LoadHeroesFail(error))) 
      )
    )
  );

  @Effect()
  createHero$ = this.actions$.ofType(fromActions.CREATE_HERO).pipe(
    map( (action: fromActions.CreateHero) => action.payload),
    switchMap( (hero: fromCore.Hero) => 
      this.service
        .addHero(hero)
        .pipe(
          map( (hero: fromCore.Hero) => new fromActions.CreateHeroSuccess(hero)),
          catchError(error => of(new fromActions.CreateHeroFail(error)))
        )
    )
  );

  @Effect()
  createHeroSuccess$ = this.actions$.ofType(fromActions.CREATE_HERO_SUCCESS).pipe(
    map( (action: fromActions.CreateHeroSuccess) => action.payload),
    map( (hero: fromCore.Hero) => 
      new fromRoot.Go({
        path: ["/heroes/detail", hero.id]
      })
    )
  );

  @Effect()
  updateHero$ = this.actions$.ofType(fromActions.UPDATE_HERO).pipe(
    map( (action: fromActions.UpdateHero) => action.payload),
    switchMap( (hero: fromCore.Hero) => 
      this.service
        .updateHero(hero)
        .pipe(
          map( () => new fromActions.UpdateHeroSuccess(hero)),
          catchError(error => of(new fromActions.UpdateHeroFail(error)))
        )
    )
  );

  @Effect()
  updateHeroSuccess$ = this.actions$.ofType(fromActions.UPDATE_HERO_SUCCESS).pipe(
    map( (action: fromActions.UpdateHeroSuccess) => action.payload),
    map( (hero: fromCore.Hero) => 
      new fromRoot.Go({
        path: ["/heroes"]
      })
    )
  );

  @Effect()
  removeHero$ = this.actions$.ofType(fromActions.REMOVE_HERO).pipe(
    map( (action: fromActions.RemoveHero) => action.payload),
    switchMap( (hero: fromCore.Hero) => 
      this.service
        .deleteHero(hero)
        .pipe(
          map( () => new fromActions.RemoveHeroSuccess(hero)),
          catchError(error => of(new fromActions.RemoveHeroFail(error)))
        )
    )
  );

  @Effect()
  searchHeroes$ = this.actions$.pipe(
    ofType(fromActions.LOAD_HEROES),

    switchMap(() =>
      this.service.getHeroes().pipe(
        map((heroes: fromCore.Hero[]) => new fromActions.LoadHeroesSuccess(heroes)),
        
        /* return an observable of the error */
        catchError(error => of(new fromActions.LoadHeroesFail(error))) 
      )
    )
  );

   @Effect()
  search$ = this.actions$.pipe(
    ofType<fromActions.SearchHeroes>(fromActions.SEARCH_HEROES),
    debounceTime(300),
    distinctUntilChanged(),
    map(action => action.payload),
    switchMap(query => {
      if (query === '') {
        return empty();
      }

      return this.service
        .searchHeroes(query)
        .pipe(
          map((heroes: fromCore.Hero[]) => new fromActions.SearchHeroesSuccess(heroes)),
          catchError(error => of(new fromActions.SearchHeroesFail(error)))
        );
    })
  );

}
