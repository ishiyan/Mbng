import { ChangeDetectionStrategy, Component } from '@angular/core';

import  { SamplesComponent }  from  '../shared/samples/samples.component' ;
import { treeNodes } from './mb-samples';

@Component({
  selector: 'app-mb-collection',
  templateUrl: './mb.component.html',
  styleUrls: ['./mb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SamplesComponent
  ]
})
export class MbComponent {
  protected treeNodes = treeNodes;
}