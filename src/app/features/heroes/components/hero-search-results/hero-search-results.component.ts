import { Component, Input } from '@angular/core';
import { Hero } from './../../../../core/models/hero';

@Component({
  selector: 'hero-search-results',
  template: `
    <ul class="search-result">
      <li *ngFor="let hero of heroes" >
        <a routerLink="detail/{{hero.id}}">
          {{hero.name}}
        </a>
      </li>
    </ul>
  `,
  styles: [
    `
    .search-result li {
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      border-left: 1px solid gray;
      border-right: 1px solid gray;
      width:195px;
      height: 16px;
      padding: 5px;
      background-color: white;
      cursor: pointer;
      list-style-type: none;
    }

    .search-result li:hover {
      background-color: #607D8B;
    }

    .search-result li a {
      color: #888;
      display: block;
      text-decoration: none;
    }

    .search-result li a:hover {
      color: white;
    }
    .search-result li a:active {
      color: white;
    }

    ul.search-result {
      margin-top: 0;
      padding-left: 0;
  }
  `,
  ],
})
export class HeroSearchResultsComponent {
  @Input() heroes: Hero[];


}
