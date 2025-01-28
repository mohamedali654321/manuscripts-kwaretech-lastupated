/* eslint-disable unused-imports/no-unused-imports */
import { NgIf, AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SortOptions } from 'src/app/core/cache/models/sort-options.model';
import { PaginatedList } from 'src/app/core/data/paginated-list.model';
import { RemoteData } from 'src/app/core/data/remote-data';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { Item } from 'src/app/core/shared/item.model';
import { CategoriesComponent } from 'src/app/home-page/browse-categories/components/categories/categories.component';
import { hasNoValue, isNotEmpty } from 'src/app/shared/empty.util';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from 'src/app/shared/object-collection/object-collection.component';
import { PaginationComponentOptions } from 'src/app/shared/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from 'src/app/shared/search/models/paginated-search-options.model';
import { SearchExportCsvComponent } from 'src/app/shared/search/search-export-csv/search-export-csv.component';
import { VarDirective } from 'src/app/shared/utils/var.directive';

@Component({
  selector: 'ds-search-category-content',
  templateUrl: './search-category-content.component.html',
  styleUrls: ['./search-category-content.component.scss'],
  standalone: true,
  imports:[ThemedLoadingComponent,CategoriesComponent,ObjectCollectionComponent,SearchExportCsvComponent,ErrorComponent,VarDirective, NgIf,RouterLink,AsyncPipe,TranslateModule]
})
export class SearchCategoryContentComponent {
  @Input() paginationConfig:PaginationComponentOptions;;
  @Input() SearchOptions;
  @Input() sortConfig: SortOptions;
  @Input() objects: Observable<RemoteData<PaginatedList<Item>>>;
  @Input() loadMoreLink: string;
  @Input() loadMoreParams = {
    value: '',
    view: '',
    source: ''
  };
  @Input() searchConfig:PaginatedSearchOptions;
  

  /**
   * Check if search results are loading
   */
  isLoading(searchResults) {
    return !this.showError(searchResults) && (hasNoValue(searchResults) || hasNoValue(searchResults.payload) || searchResults.isLoading);
  }

  
  showError(searchResults): boolean {
    return searchResults?.hasFailed && (!searchResults?.errorMessage || searchResults?.statusCode !== 400);
  }

  errorMessageLabel(searchResults): string {
    return (searchResults?.statusCode  === 422) ? 'error.invalid-search-query' : 'error.search-results';
  }

  /**
   * Method to change the given string by surrounding it by quotes if not already present.
   */
  surroundStringWithQuotes(input: string): string {
    let result = input;

    if (isNotEmpty(result) && !(result.startsWith('\"') && result.endsWith('\"'))) {
      result = `"${result}"`;
    }

    return result;
  }
}

