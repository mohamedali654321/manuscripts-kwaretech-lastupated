import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { SeriesSearchResultGridElementComponent } from '../search-result-grid-elements/series/series-search-result-grid-element.component';

@listableObjectComponent('Series', ViewMode.GridElement)
@Component({
  selector: 'ds-series-grid-element',
  styleUrls: ['./series-grid-element.component.scss'],
  templateUrl: './series-grid-element.component.html',
  standalone: true,
  imports: [SeriesSearchResultGridElementComponent],
})
/**
 * The component for displaying a grid element for an item of the type Organisation Unit
 */
export class SeriesGridElementComponent extends AbstractListableElementComponent<Item> {
}
