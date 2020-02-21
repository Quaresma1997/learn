import { Action } from "@ngrx/store";
import * as fromCore from './../../../../core';

export const LOAD_HEROES = "[Heroes] Load Heroes";
export const LOAD_HEROES_FAIL = "[Heroes] Load Heroes Fail";
export const LOAD_HEROES_SUCCESS = "[Heroes] Load Heroes Success";

export const CREATE_HERO = "[Heroes] Create Hero";
export const CREATE_HERO_FAIL = "[Heroes] Create Hero Fail";
export const CREATE_HERO_SUCCESS = "[Heroes] Create Hero Success";

export const REMOVE_HERO = "[Heroes] Remove Hero";
export const REMOVE_HERO_FAIL = "[Heroes] Remove Hero Fail";
export const REMOVE_HERO_SUCCESS = "[Heroes] Remove Hero Success";

export const UPDATE_HERO = "[Heroes] Update Hero";
export const UPDATE_HERO_FAIL = "[Heroes] Update Hero Fail";
export const UPDATE_HERO_SUCCESS = "[Heroes] Update Hero Success";

export const SEARCH_HEROES = "[Heroes Search] Search Heroes";
export const SEARCH_HEROES_FAIL = "[Heroes Search] Search Heroes Fail";
export const SEARCH_HEROES_SUCCESS = "[Heroes Search] Search Heroes Success";

export class SearchHeroes implements Action {
  readonly type = SEARCH_HEROES;
  constructor(public payload: string) {}
}

export class SearchHeroesFail implements Action {
  readonly type = SEARCH_HEROES_FAIL;
  constructor(public payload: any) {}
}

export class SearchHeroesSuccess implements Action {
  readonly type = SEARCH_HEROES_SUCCESS;
  constructor(public payload: fromCore.Hero[]) {}
}

export class LoadHeroes implements Action {
  readonly type = LOAD_HEROES;
}

export class LoadHeroesFail implements Action {
  readonly type = LOAD_HEROES_FAIL;
  constructor(public payload: any) {} // can pass any error from server-side
}

export class LoadHeroesSuccess implements Action {
  readonly type = LOAD_HEROES_SUCCESS;
  constructor(public payload: fromCore.Hero[]) {}
}

export class CreateHero implements Action {
  readonly type = CREATE_HERO;
  constructor(public payload: fromCore.Hero) {}
}

export class CreateHeroFail implements Action {
  readonly type = CREATE_HERO_FAIL;
  constructor(public payload: any) {} // can pass any error from server-side
}

export class CreateHeroSuccess implements Action {
  readonly type = CREATE_HERO_SUCCESS;
  constructor(public payload: fromCore.Hero) {}
}

export class RemoveHero implements Action {
  readonly type = REMOVE_HERO;
  constructor(public payload: fromCore.Hero) {}
}

export class RemoveHeroFail implements Action {
  readonly type = REMOVE_HERO_FAIL;
  constructor(public payload: any) {} // can pass any error from server-side
}

export class RemoveHeroSuccess implements Action {
  readonly type = REMOVE_HERO_SUCCESS;
  constructor(public payload: fromCore.Hero) {}
}

export class UpdateHero implements Action {
  readonly type = UPDATE_HERO;
  constructor(public payload: fromCore.Hero) {}
}

export class UpdateHeroFail implements Action {
  readonly type = UPDATE_HERO_FAIL;
  constructor(public payload: any) {} // can pass any error from server-side
}

export class UpdateHeroSuccess implements Action {
  readonly type = UPDATE_HERO_SUCCESS;
  constructor(public payload: fromCore.Hero) {}
}

export type HeroesAction =
  | LoadHeroes
  | LoadHeroesFail
  | LoadHeroesSuccess
  | CreateHero
  | CreateHeroFail
  | CreateHeroSuccess
  | RemoveHero
  | RemoveHeroFail
  | RemoveHeroFail
  | RemoveHeroSuccess
  | UpdateHero
  | UpdateHeroFail
  | UpdateHeroSuccess
  | SearchHeroes
  | SearchHeroesFail
  | SearchHeroesSuccess;

