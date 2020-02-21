import * as fromCore from './../../../../core';
import * as fromActions from './../actions/heroes.actions';

export interface SearchHeroesState { 
  ids: number[];
  loading: boolean;
  query: string;
}

export const initialState: SearchHeroesState = {
  ids: [],
  loading: false,
  query: '',
};

export function reducer(
    state: SearchHeroesState = initialState,
    action: fromActions.HeroesAction
): SearchHeroesState {

    switch (action.type) {
        
        case fromActions.SEARCH_HEROES: {
          const query = action.payload;

            if (query === '') {
              return {
                ids: [],
                loading: false,
                query,
              };
            }

            return {
              ...state,
              loading: true,
              query,
            };
        }

        case fromActions.SEARCH_HEROES_SUCCESS: {
          return {
            ids: action.payload.map(hero => hero.id),
            loading: false,
            query: state.query,
          };
        }

        case fromActions.SEARCH_HEROES_FAIL: {
            return {
                ...state,
                loading: false,
                query: '',
            };
        }

    }

    return state;
}

export const getIds = (state: SearchHeroesState) =>  state.ids;
export const getQuery = (state: SearchHeroesState) =>  state.query;
export const getLoading = (state: SearchHeroesState) => state.loading;
