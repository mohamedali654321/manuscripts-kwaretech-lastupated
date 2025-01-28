import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ViewMode } from '../../../../core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';
import { RelatedItemsComponent } from '../../../../item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '../../../../shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../thumbnail/themed-thumbnail.component';
import { ThemedMediaViewerComponent } from 'src/app/item-page/media-viewer/themed-media-viewer.component';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { TabbedRelatedEntitiesSearchComponent } from 'src/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';

@listableObjectComponent('JournalVolume', ViewMode.StandalonePage)
@Component({
  selector: 'ds-journal-volume',
  styleUrls: ['./journal-volume.component.scss'],
  templateUrl: './journal-volume.component.html',
  standalone: true,
  imports: [NgIf, ThemedResultsBackButtonComponent, ThemedItemPageTitleFieldComponent,ThemedMetadataRepresentationListComponent, DsoEditMenuComponent, MetadataFieldWrapperComponent, ThemedThumbnailComponent, GenericItemPageFieldComponent, RelatedItemsComponent, RouterLink, TabbedRelatedEntitiesSearchComponent, AsyncPipe, TranslateModule,ThemedMediaViewerComponent],
})
/**
 * The component for displaying metadata and relations of an item of the type Journal Volume
 */
export class JournalVolumeComponent extends ItemComponent {
}
