import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { DSONameService } from '../../../../core/breadcrumbs/dso-name.service';
import { ItemMetadataRepresentationListElementComponent } from '../../../../shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { TruncatableComponent } from '../../../../shared/truncatable/truncatable.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { MetadataRepresentationType } from 'src/app/core/shared/metadata-representation/metadata-representation.model';
import { metadataRepresentationComponent } from 'src/app/shared/metadata-representation/metadata-representation.decorator';
// @metadataRepresentationComponent('Project', MetadataRepresentationType.Item)
@Component({
  selector: 'ds-project-item-metadata-list-element',
  templateUrl: './project-item-metadata-list-element.component.html',
  standalone: true,
  imports: [TruncatableComponent, RouterLink, NgbTooltipModule,KwareTranslatePipe],
})
/**
 * The component for displaying an item of the type Project as a metadata field
 */
export class ProjectItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
  /**
   * Initialize instance variables
   *
   * @param dsoNameService
   */
  constructor(
    public dsoNameService: DSONameService,
  ) {
    super();
  }
}
