import {
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemMetadataRepresentationListElementComponent } from '../../../../shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { TruncatableComponent } from '../../../../shared/truncatable/truncatable.component';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { MetadataRepresentationType } from 'src/app/core/shared/metadata-representation/metadata-representation.model';
import { metadataRepresentationComponent } from 'src/app/shared/metadata-representation/metadata-representation.decorator';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';

// @metadataRepresentationComponent('Person', MetadataRepresentationType.Item)
@Component({
  selector: 'ds-person-item-metadata-list-element',
  templateUrl: './person-item-metadata-list-element.component.html',
  standalone: true,
  imports: [NgIf, NgFor, TruncatableComponent, RouterLink, NgbTooltipModule,NgClass,KwareTranslatePipe,NgStyle],
})
/**
 * The component for displaying an item of the type Person as a metadata field
 */
export class PersonItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
    /* kware start edit -- issue.8.0.021
  - Metadata Visualization (representation) for all new entities
  */
  isPublication:boolean;
  constructor(public localeService: LocaleService,  /* kware edit - call service from LocaleService */
    public dsoNameService: DSONameService, 
  ){
    
    super();
    this.isPublication= document.URL.includes('entities/publication');

  }

  


  // replace comma ', or ;' to '،' if language  is Arabic
  convertComma(str: string): string{
    let newstr = '';
    if (this.localeService.getCurrentLanguageCode() === 'ar'){
      let regx = /;|,/gi;
     newstr = str.replace(regx, '،');
     return newstr;

    } else {
      return str;
    }
  }

  // kware end edit -- issue.8.0.021
}
