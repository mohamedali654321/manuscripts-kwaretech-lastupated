import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { GroupSearchResultGridElementComponent } from '../search-result-grid-elements/group/group-search-result-grid-element.component';

@listableObjectComponent('Group', ViewMode.GridElement)
@Component({
  selector: 'ds-group-grid-element',
  styleUrls: ['./group-grid-element.component.scss'],
  templateUrl: './group-grid-element.component.html',
    standalone: true,
    imports: [GroupSearchResultGridElementComponent],
})
/**
 * The component for displaying a grid element for an item of the type Organisation Unit
 */
export class GroupGridElementComponent extends AbstractListableElementComponent<Item> {
}
