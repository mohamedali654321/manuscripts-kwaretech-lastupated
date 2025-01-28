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
import { TranslateModule } from '@ngx-translate/core';

import { DSONameService } from '../../../../../core/breadcrumbs/dso-name.service';
import { BitstreamDataService } from '../../../../../core/data/bitstream-data.service';
import { Item } from '../../../../../core/shared/item.model';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { getItemPageRoute } from '../../../../../item-page/item-page-routing-paths';
import { ThemedThumbnailComponent } from '../../../../../thumbnail/themed-thumbnail.component';
import { focusShadow } from '../../../../animations/focus';
import { ThemedBadgesComponent } from '../../../../object-collection/shared/badges/themed-badges.component';
import { ItemSearchResult } from '../../../../object-collection/shared/item-search-result.model';
import { listableObjectComponent } from '../../../../object-collection/shared/listable-object/listable-object.decorator';
import { TruncatableComponent } from '../../../../truncatable/truncatable.component';
import { TruncatableService } from '../../../../truncatable/truncatable.service';
import { TruncatablePartComponent } from '../../../../truncatable/truncatable-part/truncatable-part.component';
import { SearchResultGridElementComponent } from '../../search-result-grid-element.component';
import { LinkService } from 'src/app/core/cache/builders/link.service';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { followLink } from 'src/app/shared/utils/follow-link-config.model';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ThemedTypeBadgeComponent } from 'src/app/shared/object-collection/shared/badges/type-badge/themed-type-badge.component';
import { PublictaionCountComponent } from 'src/app/shared/publictaion-count/publictaion-count.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { ViewStatisticsComponent } from 'src/app/shared/view-statistics/view-statistics.component';

@listableObjectComponent('PublicationSearchResult', ViewMode.GridElement)
@listableObjectComponent(ItemSearchResult, ViewMode.GridElement)
@Component({
  selector: 'ds-item-search-result-grid-element',
  styleUrls: ['./item-search-result-grid-element.component.scss'],
  templateUrl: './item-search-result-grid-element.component.html',
  animations: [focusShadow],
  standalone: true,
  imports: [TruncatableComponent, NgIf,NgFor, RouterLink, ThemedThumbnailComponent, ThemedBadgesComponent, TruncatablePartComponent, AsyncPipe, DatePipe, TranslateModule,NgClass,KwareTranslatePipe,NgStyle,ViewStatisticsComponent,PublictaionCountComponent,ThemedMetadataRepresentationListComponent,ThemedTypeBadgeComponent],
})
/**
 * The component for displaying a grid element for an item search result of the type Publication
 */
export class ItemSearchResultGridElementComponent extends SearchResultGridElementComponent<ItemSearchResult, Item> {
  /**
   * Route to the item's page
   */
  itemPageRoute: string;

  dsoTitle: string;


          //kware-edit
 keywords = [];  //subject
 title: string;  // title
 authors: any;  //authors
 abstract:any; //abstract

   //kware-edit check locale
   localeAr: boolean;
   localeEn: boolean;
   arabicLang: boolean;
   englishLang: boolean;

   currentVersion:boolean;
   versionId;
   special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
   deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
   specialAr=['صفر','الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي عشر', 'الثاني عشر', 'لثالث عشر', 'الرابع عشر', 'الخامس عشر', 'السادس عشر', 'السابع عشر', 'الثامن عشر', 'التاسع عشر'];
   decaAr = ['العشرين', 'الثلاثين', 'الأربعين', 'الخمسين', 'الستين', 'السبعين', 'الثمانين', 'التسعين'];


  constructor(
    public dsoNameService: DSONameService,
    protected truncatableService: TruncatableService,
    protected bitstreamDataService: BitstreamDataService,
    protected linkService: LinkService, //kware-edit
    public localeService: LocaleService, //kware-edit
  ) {
    super(dsoNameService, truncatableService, bitstreamDataService,linkService,localeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.itemPageRoute = getItemPageRoute(this.dso);
    this.dsoTitle = this.dsoNameService.getHitHighlights(this.object, this.dso);


    this.linkService.resolveLink<Item>(this.dso, followLink('thumbnail')); //kware-edit
    this.linkService.resolveLink<Item>(this.dso, followLink('version')); //kware-edit
    this.currentVersion= document.URL.includes('/entities/publication/');
    if(this.currentVersion){
     this.versionId = document.URL.split('/entities/publication/')[1];
    }
         // this.keywords=this.dso.allMetadataValues('dc.subject').slice(0,3); //kwar-edit
         let  arabic = /[\u0600-\u06FF]/;
         let english = /[a-zA-Z]/;
         let arabicKeyswords = this.dso.allMetadataValues('dc.subject').filter(key=>arabic.test(key));
         let englishKeywords = this.dso.allMetadataValues('dc.subject').filter(key=>english.test(key));
       this.localeService.getCurrentLanguageCode() === 'ar' ? this.keywords = arabicKeyswords.slice(0,3) : this.keywords = englishKeywords.slice(0,3);


      // kware-edit replace title ith alternative-title of items based on langugae

      this.localeAr = this.localeService.getCurrentLanguageCode() === 'ar';
      this.localeEn = this.localeService.getCurrentLanguageCode() === 'en';
      this.arabicLang = this.dso.firstMetadataValue('dc.language.iso') === 'Arabic | العربية';
      this.englishLang = this.dso.firstMetadataValue('dc.language.iso') === 'English | الإنجليزية';

       switch (true){
           case (this.localeAr && this.arabicLang):
              this.title = this.dso.firstMetadataValue('dc.title');
              break;
            case (this.localeAr && !this.arabicLang && !!this.dso.firstMetadataValue('dc.title.alternative')  ):
              this.title = this.dso.firstMetadataValue('dc.title.alternative');
              break;
            case (this.localeAr && !this.arabicLang  && !this.dso.firstMetadataValue('dc.title.alternative') ):
              this.title = this.dso.firstMetadataValue('dc.title');
              break;
            case (this.localeEn && this.englishLang) :
              this.title = this.dso.firstMetadataValue('dc.title');
              break;
             case (this.localeEn && !this.englishLang && !!this.dso.firstMetadataValue('dc.title.alternative')  ) :
                this.title = this.dso.firstMetadataValue('dc.title.alternative');
                break;
              case (this.localeEn && !this.englishLang && !this.dso.firstMetadataValue('dc.title.alternative') ) :
                this.title = this.dso.firstMetadataValue('dc.title');
                break;
       }
       //kware-edit end

     // kware-edit replace author ith alternative-author of items based on langugaee



     switch (true){
      case (this.localeAr && this.arabicLang):
        this.authors = this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator']);
         break;
       case (this.localeAr && !this.arabicLang && this.dso.allMetadataValues(['dc.contributor.authoralternative']).length > 0   ):
       this.authors = this.dso.allMetadataValues(['dc.contributor.authoralternative',]);
         break;
       case (this.localeAr && !this.arabicLang  && this.dso.allMetadataValues(['dc.contributor.authoralternative']).length <= 0 ):
        this.authors = this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator']);
         break;
       case (this.localeEn && this.englishLang) :
        this.authors = this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator']);
         break;
        case (this.localeEn && !this.englishLang && this.dso.allMetadataValues(['dc.contributor.authoralternative']).length > 0  ) :
          this.authors = this.dso.allMetadataValues(['dc.contributor.authoralternative']);
           break;
         case (this.localeEn && !this.englishLang && this.dso.allMetadataValues(['dc.contributor.authoralternative']).length <= 0 ) :
          this.authors = this.dso.allMetadataValues(['dc.contributor.author', 'dc.creator']);
           break;
    }


    if(this.localeService.getCurrentLanguageCode() === 'ar' && this.dso.firstMetadataValue('dc.description.abstract') && this.dso.firstMetadataValue('dc.description.abstract').includes('|') === true )
        {
           this.abstract=this.dso.firstMetadataValue('dc.description.abstract').split('|')[1];
        }
        if(this.localeService.getCurrentLanguageCode() === 'en' && this.dso.firstMetadataValue('dc.description.abstract') && this.dso.firstMetadataValue('dc.description.abstract').includes('|') === true )
        {
           this.abstract=this.dso.firstMetadataValue('dc.description.abstract').split('|')[0];
        }
        if(this.dso.firstMetadataValue('dc.description.abstract') &&  this.dso.firstMetadataValue('dc.description.abstract').includes('|') === false  )
        {
           this.abstract=this.dso.firstMetadataValue('dc.description.abstract');
        }

    // kware-edit end
  }

  // replace comma ', or ;' to '،' if language  is Arabic
  convertComma(str: string): string{
    let newstr = '';
    if (this.localeService.getCurrentLanguageCode() === 'ar'){
      let regx = /;|,/gi;
     newstr = str?.replace(regx, '،');
     return newstr;

    } else {
      return str;
    }
  }
  // replace comma ',' to '،' if language  is Arabic
  regxComma(): string{
    if (this.localeService.getCurrentLanguageCode() === 'ar') {return '،';} else {return ',';}
  }
     // replace comma ';' to '؛' if language  is Arabic
   regxColon(): string{
    if (this.localeService.getCurrentLanguageCode() === 'ar') {return '؛';} else {return ';';}
  }

  removeMarkdown(text: string):string{
    const mdRegx= text?.replace(/__|\*|\#|\-|\!|(?:\[([^\]]*)\]\([^)]*\))/gm, '');
    return mdRegx;
       }

       translateDate():any{
        let date=new Date(this.dso.firstMetadataValue('dc.date.accessioned').split('T')[0]);
       if(date && this.localeService.getCurrentLanguageCode() === 'ar'){
         var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
         "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
       ];
       var delDateString =date.getDate() + ' ' + months[date.getMonth()] + '، ' + date.getFullYear(); 
       
       return delDateString;
       }
       else return null;
       
         }

         
         stringifyNumber(n) {
          if(this.localeAr){
            if (n < 20) return this.specialAr[n];
            if (n%10 === 0) return this.decaAr[Math.floor(n/10)-2] + 'ieth';
            return this.decaAr[Math.floor(n/10)-2] + 'y-' + this.special[n%10];
          }
          else{
            if (n < 20) return this.special[n];
            if (n%10 === 0) return this.deca[Math.floor(n/10)-2] + 'ieth';
            return this.deca[Math.floor(n/10)-2] + 'y-' + this.special[n%10];
          }
         
        }
  // end kware edit
}
