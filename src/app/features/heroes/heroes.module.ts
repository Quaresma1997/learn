import { NgModule } from '@angular/core';
import * as ngCommon from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';
import { reducers, effects } from './store';

export const CONTAINER_COMPONENTS = [
  fromContainers.HeroesComponent,
  fromContainers.HeroDetailComponent,
  fromContainers.HeroListComponent,
];

export const BASIC_COMPONENTS = [
  fromComponents.HeroFormComponent,
  fromComponents.HeroItemComponent,
  fromComponents.HeroAddComponent,
  fromComponents.HeroSearchComponent,
  fromComponents.HeroSearchResultsComponent,
];

const routes: Routes = [
    {
      path: '',
      component: fromContainers.HeroesComponent,
      children: [
        {
          path: '',
          canActivate: [fromGuards.HeroesGuard],
          component: fromContainers.HeroListComponent
        },
        {
          path: 'detail/:id', 
          canActivate: [fromGuards.HeroExistsGuard],
          component: fromContainers.HeroDetailComponent
        }
      ]
    },
];

@NgModule({
    imports: [
      ngCommon.CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forChild(routes),
      StoreModule.forFeature('heroes', reducers),
      EffectsModule.forFeature(effects)
    ], 
    exports: [
        RouterModule,
    ], 
    declarations: [
      ...CONTAINER_COMPONENTS,
      ...BASIC_COMPONENTS
    ],
    providers: [
      {
        provide: ngCommon.LocationStrategy,
        useClass: ngCommon.HashLocationStrategy
      },
      ...fromGuards.guards
    ]
})
export class HeroesModule {}