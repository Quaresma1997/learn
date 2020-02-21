import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHeroes from './heroes.reducer';
import * as fromSearch from './heroes-search.reducer';

/**
 * Prepare feature module state
 */
export interface HeroesFeatureState {
    heroes: fromHeroes.HeroesState;
    search: fromSearch.SearchHeroesState
}

/**
 * Register the reducers for the HeroesFeatureState
 */
export const reducers: ActionReducerMap<HeroesFeatureState> = {
    heroes: fromHeroes.reducer,
    search: fromSearch.reducer
}

export const getHeroesFeatureState = createFeatureSelector<HeroesFeatureState>('heroes');