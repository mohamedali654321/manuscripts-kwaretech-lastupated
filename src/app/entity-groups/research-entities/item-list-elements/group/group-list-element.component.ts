import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { GroupSearchResultListElementComponent } from '../search-result-list-elements/group/group-search-result-list-element.component';

@listableObjectComponent('Group', ViewMode.ListElement)
@Component({
  selector: 'ds-group-list-element',
  styleUrls: ['./group-list-element.component.scss'],
  templateUrl: './group-list-element.component.html',
    standalone: true,
    imports: [GroupSearchResultListElementComponent],
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class GroupListElementComponent extends AbstractListableElementComponent<Item> {
}
