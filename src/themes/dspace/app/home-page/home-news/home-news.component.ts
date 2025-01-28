import { Component } from '@angular/core';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
  /* kware start edit -- issue.8.0.025
  - home news customization
  */

import { ThemedSearchFormComponent } from 'src/app/shared/search-form/themed-search-form.component';
import { TranslateModule } from '@ngx-translate/core';
// kware end edit -- issue.8.0.02
@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  standalone: true,
  /* kware start edit -- issue.8.0.025
  - home news customization
  */
  imports:[ThemedSearchFormComponent,TranslateModule]
  // kware end edit -- issue.8.0.025
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {}

