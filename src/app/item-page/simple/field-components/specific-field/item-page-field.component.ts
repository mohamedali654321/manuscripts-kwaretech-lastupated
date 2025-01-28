import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BrowseDefinitionDataService } from '../../../../core/browse/browse-definition-data.service';
import { BrowseDefinition } from '../../../../core/shared/browse-definition.model';
import { Item } from '../../../../core/shared/item.model';
import { getFirstCompletedRemoteData } from '../../../../core/shared/operators';
import { MetadataValuesComponent } from '../../../field-components/metadata-values/metadata-values.component';
import { ImageField } from './image-field';
import { MetadataValue } from 'src/app/core/shared/metadata.models';
import { LocaleService } from 'src/app/core/locale/locale.service';


/**
 * This component can be used to represent metadata on a simple item page.
 * It expects one input parameter of type Item to which the metadata belongs.
 * This class can be extended to print certain metadata.
 */

@Component({
  templateUrl: './item-page-field.component.html',
  imports: [
    MetadataValuesComponent,
    AsyncPipe,
  ],
  standalone: true,
})
export class ItemPageFieldComponent {

  constructor(protected browseDefinitionDataService: BrowseDefinitionDataService ,public localeService: LocaleService,) {
  }

    /**
     * The item to display metadata for
     */
    @Input() item: Item;

    /**
     * Whether the {@link MarkdownDirective} should be used to render this metadata.
     */
    enableMarkdown = false;

    /**
     * Fields (schema.element.qualifier) used to render their values.
     */
    fields: string[];

    newMetadataValues:MetadataValue [];

    /**
     * Label i18n key for the rendered metadata
     */
    label: string;

    /**
     * Separator string between multiple values of the metadata fields defined
     * @type {string}
     */
    separator = '<br/>';

    /**
     * Whether any valid HTTP(S) URL should be rendered as a link
     */
    urlRegex?: string;

    /**
     * Image Configuration
     */
    img: ImageField;


    
    ngOnInit(): void {
    
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      (this.fields.includes('dc.description') || this.fields.includes('dc.description.abstract') || this.fields.includes('event.about') 
      || this.fields.includes('organization.openingHoursSpecification') || this.fields.includes('place.openingHoursSpecification') || this.fields.includes('person.description.biography') || this.fields.includes('person.jobTitle.description')
      || this.fields.includes('project.report') || this.fields.includes('dc.description.sub-property') || this.fields.includes('dc.description.tableofcontents') || this.fields.includes('dc.description.recommendations')
      || this.fields.includes('dc.description.notes') || this.fields.includes('dc.description.introduction') || this.fields.includes('dc.description.conclusion')
      || this.fields.includes('dc.description.usagerestrictions') || this.fields.includes('dc.description.maintenance') || this.fields.includes('dc.description.isrelated')
      || this.fields.includes('dc.description.statementofresponsibility') || this.fields.includes('dc.description.isversionof') || this.fields.includes('publicationissue.title.theme')
       ) 
      ? this.enableMarkdown = true : this.enableMarkdown = false;
     /**
      * kware-edit start
      * display metedata fields based on language iterface
      *  */ 

       this.newMetadataValues= this.item.allMetadata(this.fields).length > 1 && this.item.allMetadata(this.fields)[0].language ? this.item.allMetadata(this.fields).filter(item =>item.language === this.localeService.getCurrentLanguageCode()) : this.item.allMetadata(this.fields);
       /**
      * kware-edit end  */ 

      
   }

    /**
     * Return browse definition that matches any field used in this component if it is configured as a browse
     * link in dspace.cfg (webui.browse.link.<n>)
     */
    // get browseDefinition(): Observable<BrowseDefinition> {
    //   return this.browseDefinitionDataService.findByFields(this.fields).pipe(
    //     getFirstCompletedRemoteData(),
    //     map((def) => def.payload),
    //   );
    // }
}
