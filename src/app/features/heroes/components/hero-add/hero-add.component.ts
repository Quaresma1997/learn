import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { tap } from 'rxjs/operators';

import * as fromCore from './../../../../core';

@Component({
  selector: 'hero-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-add.component.html',
  styleUrls: [ './hero-add.component.css' ],
})
export class HeroAddComponent {
  
  @Output() addHero: EventEmitter<string> = new EventEmitter();
  
  form = this.fb.group({
    name: ["", Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl && (this.nameControl.hasError('required') && this.nameControl.touched);
  }

  onSubmit({ value, invalid }) {
    if (invalid) {
      return;
    }

    this.addHero.emit(this.form.value);
    this.form.patchValue({ name: ''});
  }

}
