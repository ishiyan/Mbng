// eslint-disable-next-line max-len
import { SimpleMovingAverageParams } from 'projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params.interface';
import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';

export interface Sma {
  params: SimpleMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}
