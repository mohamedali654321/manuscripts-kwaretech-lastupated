import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  take,
} from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import { RouteService } from '../../../../core/services/route.service';
import { Item } from '../../../../core/shared/item.model';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { getItemPageRoute } from '../../../item-page-routing-paths';
import {
  getDSpaceQuery,
  isIiifEnabled,
  isIiifSearchEnabled,
} from './item-iiif-utils';
import { LinkService } from 'src/app/core/cache/builders/link.service';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { AppState } from 'src/app/app.reducer';
import { AccessStatusDataService } from 'src/app/core/data/access-status-data.service';
import { HostWindowService } from 'src/app/shared/host-window.service';
import { hasValue } from 'src/app/shared/empty.util';
import { AccessStatusObject } from 'src/app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { followLink } from 'src/app/shared/utils/follow-link-config.model';
import { BehaviorSubject ,Subscription,Observable, of as observableOf } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isAuthenticated } from 'src/app/core/auth/selectors';
import { MediaViewerService } from 'src/app/shared/kware-media-viewer/services/media-viewer.service';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { ITEM } from 'src/app/core/shared/item.resource-type';
import { HttpClient } from '@angular/common/http';
import {
  NgbModal,
  NgbModalRef,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import Cite from "citation-js";
import { KwareCitationComponent } from 'src/app/shared/kware-citation/kware-citation.component';
import { DSpaceObjectDataService } from 'src/app/core/data/dspace-object-data.service';
import { getFirstSucceededRemoteDataPayload } from 'src/app/core/shared/operators';
require("@citation-js/plugin-bibtex");
require("@citation-js/plugin-ris");
@Component({
  selector: 'ds-item',
  template: '',
  standalone: true,
})
/**
 * A generic component for displaying metadata and relations of an item
 */
export class ItemComponent implements OnInit {
  @Input() object: Item;
  modalRef: NgbModalRef;
  /**
   * Whether to show the badge label or not
   */
  @Input() showLabel = true;

  /**
   * The viewmode we matched on to get this component
   */
  @Input() viewMode: ViewMode;

  /**
   * This regex matches previous routes. The button is shown
   * for matching paths and hidden in other cases.
   */
  previousRoute = /^(\/search|\/browse|\/collections|\/admin\/search|\/mydspace)/;

  /**
   * Used to show or hide the back to results button in the view.
   */
  showBackButton$: Observable<boolean>;

  /**
   * Route to the item page
   */
  itemPageRoute: string;

  /**
   * Enables the mirador component.
   */
  iiifEnabled: boolean;

  /**
   * Used to configure search in mirador.
   */
  iiifSearchEnabled: boolean;

  /**
   * The query term from the previous dspace search.
   */
  iiifQuery$: Observable<string>;

  mediaViewer;

  isAuthorized$: Observable<boolean>;  //kware-edit

  fileUrl: string;  //kware-edit

  locale:any;  //kware-edit

  lang:boolean  //kware-edit

  private subs: Subscription[] = [];

  accessStatus$: Observable<string>;

  
  /**
   * Whether to show the access status badge or not
   */
  showAccessStatus: boolean;

  
  /**
   * Value based stylesheet class for access status badge
   */
  accessStatusClass: string;


  accessStatusConfigs={
    'access-status.unknown.listelement.badge':{ icon: 'fa-solid fa-question' , style:'background-color: #767676 !important;' },
    'access-status.restricted.listelement.badge':{ icon: 'fa-solid fa-ban' , style:'background-color: #d33b36 !important;' },
    'access-status.open.access.listelement.badge':{ icon: 'fa-solid fa-unlock' , style:'background-color: #3a833a !important;' },
    'access-status.metadata.only.listelement.badge':{ icon: 'fa-solid fa-file-invoice' , style:'background-color: #2f6fa7  !important;' },
    'access-status.embargo.listelement.badge':{ icon: 'fa-regular fa-clock' , style:'background-color: #eb9419 !important;' },
  }
  public isXs = new BehaviorSubject<boolean>(false);
  isFilesMenuOpen=new  BehaviorSubject<boolean>(false);
  isViewerPanelOpen =new  BehaviorSubject<boolean>(false);
  constructor(protected routeService: RouteService,
    protected cdRef: ChangeDetectorRef,
    public store: Store<AppState>, //kware-edit
    protected linkService: LinkService, //kware-edit
    public localeService: LocaleService, //kware-edit
    protected dsoService: DSpaceObjectDataService,
    protected accessStatusDataService: AccessStatusDataService,
    protected mediaViewerService:MediaViewerService,
    public hostWindowService: HostWindowService,
    protected modalService: NgbModal,
    private httpClient: HttpClient,
              protected router: Router) {
    this.mediaViewer = environment.mediaViewer;
  }

  /**
   * The function used to return to list from the item.
   */
  back = () => {
    this.routeService.getPreviousUrl().pipe(
      take(1),
    ).subscribe(
      (url => {
        this.router.navigateByUrl(url);
      }),
    );
  };

  groupItem : Observable<DSpaceObject>
  startPage:string ='1';
  endPage;

  ngOnInit(): void {

    if(hasValue(this.object.firstMetadataValue('relation.isGroupOfPublication'))){
      this.groupItem= this.dsoService.findById(this.object.firstMetadataValue('relation.isGroupOfPublication')).pipe(getFirstSucceededRemoteDataPayload());
     if(hasValue(this.object.firstMetadataValue('dc.format.pagenumber')) ){
      this.startPage = this.object.firstMetadataValue('dc.format.pagenumber') ;
  
          }    else{
            this.startPage='1';
          }
     }
  this.showAccessStatus = environment.item.showAccessStatuses;
this.getAccessStatusOfItem(this.object.uuid).then(status=>{
  status.subscribe(res=>{
   this.accessStatus$ =observableOf(`access-status.${res.status.toLowerCase()}.listelement.badge`) 
  })
}).catch(() => this.accessStatus$ = observableOf('access-status.unknown.listelement.badge'))


    this.subs.push(this.hostWindowService.isXs()
    .subscribe((status: boolean) => {
      this.isXs.next(status) ;
      
      this.cdRef.markForCheck();
    }));
    
    
    this.mediaViewerService.viewerPanelsStatus.subscribe(status => {this.isFilesMenuOpen.next(status.isFilesMenuOpen); this.isViewerPanelOpen.next(status.isViewerPanelOpen)})
    if (typeof window === 'object' && hasValue(window.localStorage)) {
      this.locale = window.localStorage.getItem('selectedLangCode');
     }
     //kware-edit
     this.lang =this.locale ==='ar'? true : false;
     this.isAuthorized$ = this.store.pipe(select(isAuthenticated)); //kware-edi

    this.itemPageRoute = getItemPageRoute(this.object);
    // hide/show the back button
    this.showBackButton$ = this.routeService.getPreviousUrl().pipe(
      map((url: string) => this.previousRoute.test(url)),
      take(1),
    );
    // check to see if iiif viewer is required.
    this.iiifEnabled = isIiifEnabled(this.object);
    this.iiifSearchEnabled = isIiifSearchEnabled(this.object);
    if (this.iiifSearchEnabled) {
      this.iiifQuery$ = getDSpaceQuery(this.object, this.routeService);
    }
  }

  getCreativeCommonsIcons(uri:string):any[]{
    if(typeof uri === 'string' && uri && (uri?.includes('licenses/')|| uri?.includes('publicdomain/'))){
       return uri?.includes('licenses/') ?  uri?.split('licenses/')[1]?.split('/')[0]?.split('-') : uri?.split('publicdomain/')[1]?.split('/')[0]?.split('-') ;
    }
    else{return;}

  }

  translateDate():any{
    let date=new Date(this.object.firstMetadataValue('dc.date.accessioned').split('T')[0]);
   if(date && this.localeService.getCurrentLanguageCode() === 'ar'){
     var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
     "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
   ];
   var delDateString =date.getDate() + ' ' + months[date.getMonth()] + '، ' + date.getFullYear(); 
   
   return delDateString;
   }
   else return null;
   
     }


async getAccessStatusOfItem(itemId:string):Promise<any>{
  const  data= await this.httpClient.get(`${environment.rest.baseUrl}/api/core/items/${itemId}/accessStatus`);
  return await data;
}

showModal() {
  this.modalRef = this.modalService.open(KwareCitationComponent, {
    size: 'lg',
  });
  const modalComp = this.modalRef.componentInstance;
  modalComp.object = this.object;
}
  
}
