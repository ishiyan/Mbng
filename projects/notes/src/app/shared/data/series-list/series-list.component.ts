import { Component } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { BarSeriesListComponent } from '../bar-series/bar-series-list/bar-series-list.component';
import { ScalarSeriesListComponent } from '../scalar-series/scalar-series-list/scalar-series-list.component';
import { TradeSeriesListComponent } from '../trade-series/trade-series-list/trade-series-list.component';
import { QuoteSeriesListComponent } from '../quote-series/quote-series-list/quote-series-list.component';

@Component({
    selector: 'app-series-list',
    templateUrl: './series-list.component.html',
    styleUrls: ['./series-list.component.scss'],
    imports: [MatTabGroup, MatTab, BarSeriesListComponent, ScalarSeriesListComponent, TradeSeriesListComponent, QuoteSeriesListComponent]
})
export class SeriesListComponent {
}
