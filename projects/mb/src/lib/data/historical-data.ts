import { Ohlcv } from './entities/ohlcv';
import { Trade } from './entities/trade';
import { Quote } from './entities/quote';
import { Scalar } from './entities/scalar';
import { TemporalEntityKind } from './entities/temporal-entity-kind.enum';
import { TimeGranularity } from '../trading/time/time-granularity.enum';

/** @deprecated */
export interface HistoricalData {
  temporalEntityKind: TemporalEntityKind | undefined;
  timeGranularity: TimeGranularity | undefined;
  isDataAdjusted?: boolean | undefined;
  name: string | undefined;
  moniker: string | undefined;
  data: (Ohlcv | Quote | Trade | Scalar)[];
}
