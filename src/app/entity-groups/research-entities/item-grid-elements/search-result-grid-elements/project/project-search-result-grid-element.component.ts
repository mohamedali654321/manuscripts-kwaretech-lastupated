import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgIf,
  NgFor,
  NgStyle,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { focusShadow } from '../../../../../shared/animations/focus';
import { ThemedBadgesComponent } from '../../../../../shared/object-collection/shared/badges/themed-badges.component';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemSearchResultGridElementComponent } from '../../../../../shared/object-grid/search-result-grid-element/item-search-result/item/item-search-result-grid-element.component';
import { TruncatableComponent } from '../../../../../shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '../../../../../shared/truncatable/truncatable-part/truncatable-part.component';
import { ThemedThumbnailComponent } from '../../../../../thumbnail/themed-thumbnail.component';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ThemedTypeBadgeComponent } from 'src/app/shared/object-collection/shared/badges/type-badge/themed-type-badge.component';
import { PublictaionCountComponent } from 'src/app/shared/publictaion-count/publictaion-count.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { ViewStatisticsComponent } from 'src/app/shared/view-statistics/view-statistics.component';

@listableObjectComponent('ProjectSearchResult', ViewMode.GridElement)
@Component({
  selector: 'ds-project-search-result-grid-element',
  styleUrls: ['./project-search-result-grid-element.component.scss'],
  templateUrl: './project-search-result-grid-element.component.html',
  animations: [focusShadow],
  standalone: true,
  imports: [TruncatableComponent, NgIf,NgFor, RouterLink, ThemedThumbnailComponent, ThemedBadgesComponent, TruncatablePartComponent, AsyncPipe, DatePipe, TranslateModule,NgClass,KwareTranslatePipe,NgStyle,ViewStatisticsComponent,PublictaionCountComponent,ThemedMetadataRepresentationListComponent,ThemedTypeBadgeComponent],
})
/**
 * The component for displaying a grid element for an item search result of the type Project
 */
export class ProjectSearchResultGridElementComponent extends ItemSearchResultGridElementComponent {
}
