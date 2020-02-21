import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromCore from './../../../../core';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/heroes-search.reducer';
import * as fromHeroes from './../selectors/heroes.selectors';

export const getSearchState = createSelector(fromFeature.getHeroesFeatureState, (state: fromFeature.HeroesFeatureState) => state.search);

export const getSearchHeroIds = createSelector(
  getSearchState,
  fromReducer.getIds
);

export const getSearchQuery = createSelector(
  getSearchState,
  fromReducer.getQuery
);

export const getSearchLoading = createSelector(
  getSearchState,
  fromReducer.getLoading
);

export const getSearchResults = createSelector(
  fromHeroes.getHeroesEntities,
  getSearchHeroIds,
  (heroes, searchIds) => {
    return searchIds.map(id => heroes[id]);
  }
);