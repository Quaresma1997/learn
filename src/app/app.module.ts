import { NgModule, ModuleWithProviders }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import * as fromCore from './core';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MessagesComponent }    from './messages/messages.component';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AppState, reducers, CustomSerializer, effects } from './store';

export const metaReducers: MetaReducer<any>[] =
  !environment.production ? [storeFreeze]: [];

export const storeDevTools: ModuleWithProviders[] = 
  !environment.production ? [StoreDevtoolsModule.instrument()] : [];

@NgModule({
  imports: [
    BrowserModule,
    fromCore.CoreModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(
      fromCore.InMemoryDataService, { dataEncapsulation: false }
    ),

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    storeDevTools,
    StoreRouterConnectingModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent
  ],
  providers: [
    { 
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/