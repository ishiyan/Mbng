import { Component } from '@angular/core';
import { BrushHandlesComponent } from './brush-handles/brush-handles.component';
import { BrushHandles2Component } from './brush-handles-2/brush-handles-2.component';
import { ClickToRecenterBrushComponent } from './click-to-recenter-brush/click-to-recenter-brush.component';
import { ClickToRecenterBrush2Component } from './click-to-recenter-brush-2/click-to-recenter-brush-2.component';
import { ClickToSelectAllComponent } from './click-to-select-all/click-to-select-all.component';

@Component({
    selector: 'app-d3-sample-2',
    templateUrl: './sample-2.component.html',
    styleUrls: ['./sample-2.component.scss'],
    imports: [BrushHandlesComponent, BrushHandles2Component, ClickToRecenterBrushComponent, ClickToRecenterBrush2Component, ClickToSelectAllComponent]
})
export class Sample2Component { }
