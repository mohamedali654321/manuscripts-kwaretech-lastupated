import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';
import { AsyncPipe } from '@angular/common';
import { MetadataValuesComponent } from 'src/app/item-page/field-components/metadata-values/metadata-values.component';

@Component({
    selector: 'ds-item-page-description-field',
    templateUrl: '../item-page-field.component.html',
    standalone: true,
  imports: [
    MetadataValuesComponent,
    AsyncPipe,
  ],
})
/**
 * This component is used for displaying the abstract (dc.description.abstract) of an item
 */
export class ItemPageDescriptionFieldComponent extends ItemPageFieldComponent {

    /**
     * The item to display metadata for
     */
    @Input() item: Item;

    /**
     * Separator string between multiple values of the metadata fields defined
     * @type {string}
     */
    separator: string;

    /**
     * Fields (schema.element.qualifier) used to render their values.
     * In this component, we want to display values for metadata 'dc.description.abstract'
     */
    fields: string[] = [
        'dc.description',
    ];

    /**
     * Label i18n key for the rendered metadata
     */
    label = 'item.page.description';

    /**
     * Use the {@link MarkdownPipe} to render dc.description.abstract values
     */
    enableMarkdown = true;
}
