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
  selector: 'hero-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-form.component.html',
  styleUrls: [ './hero-form.component.css' ],
})
export class HeroFormComponent implements OnInit, OnChanges {
  
  exists = false;
  form: FormGroup;

  @Input() hero: fromCore.Hero;
  @Output() saveHero: EventEmitter<fromCore.Hero> = new EventEmitter();
  @Output() goBack: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {}

  constructor(private fb: FormBuilder,
    private location: Location) {
      this.initializeForm();
    }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl && (this.nameControl.hasError('required') && this.nameControl.touched);
  }

  // lifecycle hook that is called when any data-bound property of a directive changes.
  ngOnChanges(changes: SimpleChanges) {
    if (this.hero && this.hero.id) {
      this.exists = true;
      this.form.patchValue(this.hero);
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
    });
  }

  back(): void {
    //this.location.back();
    this.goBack.emit();
  }

  onSubmit({ value, invalid}) {
    if (invalid) {
      return;
    }

    console.log(value);
    this.saveHero.emit(value);
  }
}
