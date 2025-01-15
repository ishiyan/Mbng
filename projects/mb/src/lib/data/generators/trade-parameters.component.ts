import { Component, Input } from '@angular/core';
import { TradeParameters } from './trade-parameters';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'mb-data-generators-trade-parameters',
    templateUrl: './trade-parameters.component.html',
    styleUrls: ['./trade-parameters.component.scss'],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatFormField, FormsModule, MatInput, MatHint]
})
export class TradeParametersComponent {
  @Input() tradeParameters!: TradeParameters;
}
