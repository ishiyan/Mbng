// eslint-disable-next-line max-len
import { WeightedMovingAverageParams } from 'projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params.interface';
import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';

export interface Wma {
  params: WeightedMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}
