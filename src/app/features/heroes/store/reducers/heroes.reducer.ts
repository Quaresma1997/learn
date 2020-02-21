import * as fromCore from './../../../../core';
import * as fromActions from './../actions/heroes.actions';

// export interface HeroesState {
//   [componentId: string]: {
//     entities: {[id: number]: fromCore.Hero},
//     loaded: boolean,
//     loading: boolean,
//   }
// }

export interface HeroesState { 
    entities: {[id: number]: fromCore.Hero},
    loaded: boolean,
    loading: boolean,
}

export const initialState: HeroesState = {
    entities: {},
    loaded: false,
    loading: false,
};

export function reducer(
    state: HeroesState = initialState,
    action: fromActions.HeroesAction  // type checking
): HeroesState {

    switch (action.type) {
        
        case fromActions.LOAD_HEROES: {
            return { // return new object (immutable state)
                ...state,
                loading: true
            };
        }

        case fromActions.LOAD_HEROES_SUCCESS: {
            const heroes = action.payload;

            /**
             * - data is in the form of: [ {id:1,...}, {id:2,...} ]
             * 
             * - we want to convert it to:
             *   const heroes: any = {
             *      1: {
             *          id: 1,
             *          name: 'Narco'
             *      }
             *   }
             * 
             */

             const entities = heroes.reduce(
                 (accEntities: { [id: number]: fromCore.Hero }, hero) => {
                    return { // return a collection of { [id: number]: Hero } => merged in one list
                       ...accEntities,
                        [hero.id]: hero
                    };
                }, {
                 ...state.entities // initial value
                }
            );

            return { // return new object (immutable state)
                ...state,
                loading: false,
                loaded: true,
                entities,
            };
        }

        case fromActions.LOAD_HEROES_FAIL: {
            return { // return new object (immutable state)
                ...state,
                loaded: false,
                loading: false,
            };
        }

        case fromActions.CREATE_HERO_SUCCESS:
        case fromActions.UPDATE_HERO_SUCCESS: {
          const hero = action.payload;

          // Add the hero to the list of heroes
          const entities = {
            ...state.entities,
            [hero.id]: hero
          };

          return {
            ...state,
            entities
          };
        }

        case fromActions.REMOVE_HERO_SUCCESS: {
          const hero = action.payload;

      /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment */
          const { [hero.id]: removed, ...entities } = state.entities;

          return {
            ...state,
            entities
          };
        }
    }

    return state;
}

export const getHeroesLoading = (state: HeroesState) =>  state.loading;
export const getHeroesLoaded = (state: HeroesState) =>  state.loaded;
export const getHeroesEntities = (state: HeroesState) =>  state.entities;