import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedMediaViewerComponent } from 'src/app/item-page/media-viewer/themed-media-viewer.component';
import { GenericItemPageFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ItemPageImgFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/img/item-page-img-field.component';
import { ThemedItemPageTitleFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { TabbedRelatedEntitiesSearchComponent } from 'src/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from 'src/app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from 'src/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ItemPageCcLicenseFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/cc-license/item-page-cc-license-field.component';
import { KwareMediaViewerComponent } from 'src/app/shared/kware-media-viewer/kware-media-viewer.component';
@listableObjectComponent('Group', ViewMode.StandalonePage)
@Component({
  selector: 'ds-group',
  styleUrls: ['./group.component.scss'],
  templateUrl: './group.component.html',
  standalone: true,
  imports: [NgIf, ThemedResultsBackButtonComponent, ThemedItemPageTitleFieldComponent, DsoEditMenuComponent, MetadataFieldWrapperComponent, ThemedThumbnailComponent, GenericItemPageFieldComponent, RelatedItemsComponent,ThemedMetadataRepresentationListComponent, RouterLink, TabbedRelatedEntitiesSearchComponent, AsyncPipe, TranslateModule, ItemPageImgFieldComponent,ThemedMediaViewerComponent , KwareMediaViewerComponent,
      ItemPageCcLicenseFieldComponent],

})
/**
 * The component for displaying metadata and relations of an item of the type Organisation Unit
 */
export class GroupComponent extends ItemComponent {

  relatedItems;


  getRelatedItems($event: any){
    this.relatedItems=$event;    
  }

  ngOnInit(): void {
    
  }

  getItemPageRoute(object :any) :any{
    return getItemPageRoute(object)+ '/full';
   }
}
