import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';
import { KwareTranslatePipe } from '../utils/kware-translate.pipe';

/**
 * This component renders any content inside this wrapper.
 * The wrapper prints a label before the content (if available)
 */
@Component({
  selector: 'ds-metadata-field-wrapper',
  styleUrls: ['./metadata-field-wrapper.component.scss'],
  templateUrl: './metadata-field-wrapper.component.html',
  standalone: true,
  imports: [NgIf,NgClass,KwareTranslatePipe],
})
export class MetadataFieldWrapperComponent {

  /**
   * The label (title) for the content
   */
  @Input() label: string;

  @Input() hideIfNoTextContent = true;
}
