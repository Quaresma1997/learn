import { NgModule, ModuleWithProviders } from '@angular/core';
import * as ngCommon from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as fromServices from './services';

export const CORE_SERVICES = [
  fromServices.HeroService,
  fromServices.MessageService,
];

@NgModule({
    imports: [
      ngCommon.CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    ], 
    exports: [
        RouterModule,
    ], 
    declarations: [],
    providers: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...CORE_SERVICES
      ]
    }
  }
}