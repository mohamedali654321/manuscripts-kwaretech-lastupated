import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemMetadataRepresentationListElementComponent } from '../../../../shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { TruncatableComponent } from '../../../../shared/truncatable/truncatable.component';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { TranslateModule } from '@ngx-translate/core';
import { MetadataRepresentationType } from 'src/app/core/shared/metadata-representation/metadata-representation.model';
import { metadataRepresentationComponent } from 'src/app/shared/metadata-representation/metadata-representation.decorator';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';

// @metadataRepresentationComponent('OrgUnit', MetadataRepresentationType.Item)
@Component({
  selector: 'ds-org-unit-item-metadata-list-element',
  templateUrl: './org-unit-item-metadata-list-element.component.html',
  standalone: true,
  imports: [NgIf, NgFor, TruncatableComponent, RouterLink, NgbTooltipModule,NgClass,KwareTranslatePipe,NgStyle,TranslateModule],

})
/**
 * The component for displaying an item of the type OrgUnit as a metadata field
 */
export class OrgUnitItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
    /* kware start edit -- issue.8.0.021
  - Metadata Visualization (representation) for all new entities
  */
  isPublication:boolean;
  isOrgUnit:boolean;
  constructor(public localeService: LocaleService, public dsoNameService: DSONameService,  /* kware edit - call service from LocaleService */){
    
    super();
    this.isPublication= document.URL.includes('entities/publication');
    this.isOrgUnit= document.URL.includes('entities/orgunit');


  }

  // kware end edit -- issue.8.0.021
}
