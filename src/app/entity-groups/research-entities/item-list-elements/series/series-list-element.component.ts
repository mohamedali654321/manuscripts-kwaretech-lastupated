import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { SeriesSearchResultListElementComponent } from '../search-result-list-elements/series/series-search-result-list-element.component';

@listableObjectComponent('Series', ViewMode.ListElement)
@Component({
  selector: 'ds-series-list-element',
  styleUrls: ['./series-list-element.component.scss'],
  templateUrl: './series-list-element.component.html',
  standalone: true,
  imports: [SeriesSearchResultListElementComponent],
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class SeriesListElementComponent extends AbstractListableElementComponent<Item> {
}
