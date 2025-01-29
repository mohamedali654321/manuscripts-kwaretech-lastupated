import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Item } from '../../../../../../core/shared/item.model';
import { ViewMode } from '../../../../../../core/shared/view-mode.model';
import { getItemPageRoute } from '../../../../../../item-page/item-page-routing-paths';
import { ThemedThumbnailComponent } from '../../../../../../thumbnail/themed-thumbnail.component';
import { ThemedBadgesComponent } from '../../../../../object-collection/shared/badges/themed-badges.component';
import { ItemSearchResult } from '../../../../../object-collection/shared/item-search-result.model';
import { listableObjectComponent } from '../../../../../object-collection/shared/listable-object/listable-object.decorator';
import { TruncatableComponent } from '../../../../../truncatable/truncatable.component';
import { TruncatablePartComponent } from '../../../../../truncatable/truncatable-part/truncatable-part.component';
import { SearchResultListElementComponent } from '../../../search-result-list-element.component';
import { hasValue } from 'src/app/shared/empty.util';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ThemedTypeBadgeComponent } from 'src/app/shared/object-collection/shared/badges/type-badge/themed-type-badge.component';
import { PublictaionCountComponent } from 'src/app/shared/publictaion-count/publictaion-count.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { ViewStatisticsComponent } from 'src/app/shared/view-statistics/view-statistics.component';
import { followLink } from 'src/app/shared/utils/follow-link-config.model';
import { VersionsCounterComponent } from "../../../../../versions-counter/versions-counter.component";

@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement)
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement)
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: ['./item-search-result-list-element.component.scss'],
  templateUrl: './item-search-result-list-element.component.html',
  standalone: true,
  imports: [TruncatableComponent, NgIf, NgFor, RouterLink, ThemedThumbnailComponent, ThemedBadgesComponent, TruncatablePartComponent, AsyncPipe, DatePipe, TranslateModule, NgClass, KwareTranslatePipe, NgStyle, ViewStatisticsComponent, PublictaionCountComponent, ThemedMetadataRepresentationListComponent, ThemedTypeBadgeComponent, VersionsCounterComponent],
})
/**
 * The component for displaying a list element for an item search result of the type Publication
 */
export class ItemSearchResultListElementComponent extends SearchResultListElementComponent<ItemSearchResult, Item> {
  /**
   * Route to the item's page
   */
  itemPageRoute: string;

  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = this.showThumbnails ?? this.appConfig.browseBy.showThumbnails;
    this.itemPageRoute = getItemPageRoute(this.dso);
    this.linkService.resolveLink<Item>(this.dso, followLink('thumbnail')); //kware-edit
    this.linkService.resolveLink<Item>(this.dso, followLink('version')); //kware-edit
    this.linkService.resolveLink<Item>(this.dso, followLink('relationships')); 
  }

     // kware edit

    // replace comma ', or ;' to '،' if language  is Arabic
    convertComma(str: string): string{
      let newstr = '';
      if ((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar'){
        let regx = /;|,/gi;
       newstr = str?.replace(regx, '،');
       return newstr;

      } else {
        return str;
      }
    }
    // put comma ',' to '،' if language  is Arabic
    regxComma(): string{
      if ((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar') {return '،';} else {return ',';}
    }
       // replace comma ';' to '؛' if language  is Arabic
     regxColon(): string{
      if ((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar') {return '؛';} else {return ';';}
    }

    removeMarkdown(text: string):string{
      const mdRegx= text?.replace(/__|\*|\#|\-|\!|(?:\[([^\]]*)\]\([^)]*\))/gm, '');
      return mdRegx;
         }
}

