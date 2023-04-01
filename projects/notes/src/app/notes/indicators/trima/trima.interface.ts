// eslint-disable-next-line max-len
import { TriangularMovingAverageParams } from 'projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average-params.interface';
import { LineStyle } from 'projects/mb/src/lib/charts/ohlcv-chart/selector/line-style';

export interface Trima {
  params: TriangularMovingAverageParams;
  style: LineStyle;
  showStyle: boolean;
}
