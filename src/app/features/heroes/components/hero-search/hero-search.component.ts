import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import * as fromCore from './../../../../core';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent {
  @Input() query = '';
  @Output() search = new EventEmitter<string>();
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/