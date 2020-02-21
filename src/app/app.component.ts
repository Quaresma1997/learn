import { Component, ViewEncapsulation, ElementRef, ViewRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Native,
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(public host: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    console.log(this.host);
    console.log(this.cd);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/