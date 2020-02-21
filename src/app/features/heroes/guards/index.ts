import { HeroesGuard } from './heroes.guard';
import { HeroExistsGuard } from './hero-exists.guard';

export const guards: any[] = [HeroesGuard, HeroExistsGuard];

export * from './heroes.guard';
export * from './hero-exists.guard';