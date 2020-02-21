import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from './../../../../store';
import * as fromCore from './../../../../core';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/heroes.reducer';
import * as fromActions from './../actions';

export const getHeroesState = createSelector(fromFeature.getHeroesFeatureState, (state: fromFeature.HeroesFeatureState) => state.heroes);

export const getHeroesEntities = createSelector(getHeroesState, fromReducer.getHeroesEntities);

export const getSelectedHero = createSelector(getHeroesEntities, fromRoot.getRouterState, 
    (entities, router): fromCore.Hero => {
        // if router.state exists && ...
        return router.state && entities[router.state.params.id]; // using router state to look up an entity
    }
);


/**
 * Convert back the `arra-like` object to an array to bind to views
 */
export const getAllHeroes = createSelector(getHeroesEntities, (entities) => {
    /*
    * Object.keys(entities) => [1,2,3]
    * [1,2,3].map(id => entities[id] )
    * 
    */
    return Object.keys(entities)
        .map(id => entities[parseInt(id, 10)]);

});

export const getHeroesLoaded = createSelector(getHeroesState, fromReducer.getHeroesLoaded);
export const getHeroesLoading = createSelector(getHeroesState, fromReducer.getHeroesLoading);

export const checkStore = (store: Store<fromFeature.HeroesFeatureState>) : Observable<boolean> => {
  
  return store.select(getHeroesLoaded).pipe(
    // a tap() is usually ignored out from the stream returned by pipe()
    // so as if it doesnt exist, therefore, fitler receives the original
    // input from the pipe()
    tap(loaded => {
      if (!loaded) {
        store.dispatch(new fromActions.LoadHeroes());
      }
    }),
    filter( (loaded: boolean) => loaded), // wait here
      /*
        filter() emits only true values,
        So the output stream would wait until the (loaded) is true.
        Since an action was fired above, the pizzas would be loaded and hence the pipe() methods 
        would run again and now filter() can return true and return a result
      */
    take(1) // take only one value
      /*
        after loaded have become true, take only 1 value from stream and return
      */
    );
 }