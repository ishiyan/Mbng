import { ChangeDetectionStrategy, Component } from '@angular/core';

import  { SamplesComponent }  from  '../shared/samples/samples.component' ;
import { treeNodes } from './d3-samples';

@Component({
  selector: 'app-d3-collection',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SamplesComponent
  ]
})
export class D3Component {
  protected treeNodes = treeNodes;
}
