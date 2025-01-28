import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ItemPageTitleFieldComponent as BaseComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';

@Component({
  selector: 'ds-themed-item-page-title-field',
  // templateUrl: './item-page-title-field.component.html',
  templateUrl: '../../../../../../../../app/item-page/simple/field-components/specific-field/title/item-page-title-field.component.html',
  standalone: true,
  imports: [NgIf, TranslateModule,KwareTranslatePipe],

})
export class ItemPageTitleFieldComponent extends BaseComponent {
}
