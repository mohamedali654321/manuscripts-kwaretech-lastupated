import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { ActivitySearchResultListElementComponent } from '../search-result-list-elements/activity/activity-search-result-list-element.component';

@listableObjectComponent('Activity', ViewMode.ListElement)
@Component({
  selector: 'ds-activity-list-element',
  styleUrls: ['./activity-list-element.component.scss'],
  templateUrl: './activity-list-element.component.html',
  standalone: true,
  imports: [ActivitySearchResultListElementComponent],
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class ActivityListElementComponent extends AbstractListableElementComponent<Item> {
}
