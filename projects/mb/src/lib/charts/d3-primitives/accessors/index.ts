import { value as value_} from './value';
import { ohlcv as ohlcv_} from './ohlcv';
import { volume as volume_} from './volume';
import { quote as quote_} from './quote';
import { trade as trade_} from './trade';
import { tick as tick_} from './tick';
import { crosshair as crosshair_} from './crosshair';
import { trendline as trendline_} from './trendline';
import { supstance as supstance_} from './supstance';

export const accessors = () => ({
  value: value_,
  ohlcv: ohlcv_,
  volume: volume_,
  quote: quote_,
  trade: trade_,
  tick: tick_,
  crosshair: crosshair_,
  trendline: trendline_,
  supstance: supstance_
});
