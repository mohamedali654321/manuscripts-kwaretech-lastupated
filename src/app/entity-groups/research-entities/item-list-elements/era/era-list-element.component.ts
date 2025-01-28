import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { EraSearchResultListElementComponent } from '../search-result-list-elements/era/era-search-result-list-element.component';

@listableObjectComponent('Era', ViewMode.ListElement)
@Component({
  selector: 'ds-era-list-element',
  styleUrls: ['./era-list-element.component.scss'],
  templateUrl: './era-list-element.component.html',
  standalone: true,
  imports: [EraSearchResultListElementComponent],
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class EraListElementComponent extends AbstractListableElementComponent<Item> {
}
