import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  OnChanges, 
  SimpleChanges, 
  ChangeDetectionStrategy,
  EventEmitter} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { tap } from 'rxjs/operators';

import * as fromCore from './../../../../core';

@Component({
  selector: 'hero-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-item.component.html',
  styleUrls: [ './hero-item.component.css' ],
})
export class HeroItemComponent {
  
  @Input() hero: fromCore.Hero;
  @Output() deleteHero: EventEmitter<fromCore.Hero> = new EventEmitter();

  public delete(hero: fromCore.Hero): void {
    if (!hero) {
      return;
    }

    this.deleteHero.emit(hero);
  }
}
