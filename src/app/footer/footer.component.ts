import {
  AsyncPipe,
  DatePipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  Observable,
  of as observableOf,
} from 'rxjs';

import {
  APP_CONFIG,
  AppConfig,
} from '../../config/app-config.interface';
import { NotifyInfoService } from '../core/coar-notify/notify-info/notify-info.service';
import { AuthorizationDataService } from '../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../core/data/feature-authorization/feature-id';
import { KlaroService } from '../shared/cookies/klaro.service';
import { hasValue } from '../shared/empty.util';
declare global {
  interface Window {
    _paq: any[];
  }
}
@Component({
  selector: 'ds-base-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, DatePipe, TranslateModule],
})
export class FooterComponent implements OnInit {
  dateObj: number = Date.now();
  private previousPageUrl: string;
  /**
   * A boolean representing if to show or not the top footer container
   */
  showTopFooter = false;
  showPrivacyPolicy: boolean;
  showEndUserAgreement: boolean;
  showSendFeedback$: Observable<boolean>;
  coarLdnEnabled$: Observable<boolean>;

  constructor(
    @Optional() public cookies: KlaroService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
  ) {
  }

  ngOnInit(): void {
    this.showPrivacyPolicy = this.appConfig.info.enablePrivacyStatement;
    this.showEndUserAgreement = this.appConfig.info.enableEndUserAgreement;
    this.coarLdnEnabled$ = this.appConfig.info.enableCOARNotifySupport ? this.notifyInfoService.isCoarConfigEnabled() : observableOf(false);
    this.showSendFeedback$ = this.authorizationService.isAuthorized(FeatureID.CanSendFeedback);
  }

  showCookieSettings() {
    if (hasValue(this.cookies)) {
      this.cookies.showSettings();
    }
    return false;
  }
  ngAfterViewInit() {
    this.initializeMatomo();
     this.trackPageViews();
  }
  private initializeMatomo() {
    window._paq = window._paq || [];
    window._paq.push(['trackPageView']);
    window._paq.push(['enableLinkTracking']);
    window._paq.push(['setTrackerUrl', '//matomo.kwaretech.com/matomo.php']);
    window._paq.push(['setSiteId', '11']);
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//matomo.kwaretech.com/matomo.js';
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  private trackPageViews(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.previousPageUrl) {
          window._paq.push(['setReferrerUrl', this.previousPageUrl]);
        }
        var name = "User Name: " + localStorage.userName;
        var email = "Email: " + localStorage.userEmail;
        var userInfo = name + " ,     " + email;
        window._paq.push([ 'setUserId',userInfo ]);
        window._paq.push(['setLinkClasses', "matomo_link"]);
        window._paq.push(['setDownloadClasses', "matomo_download"]);
        window._paq.push(['enableLinkTracking']);
        window._paq.push(['setCustomUrl', window.location.pathname + window.location.search]); 
        
        window._paq.push(['setDocumentTitle', document.title]);
        window._paq.push(["trackPageView"]);
        this.previousPageUrl= window.location.href;
      }
    })

  }

}
