import { Ohlcv } from '../data/entities/ohlcv';
import { Quote } from '../data/entities/quote';
import { Trade } from '../data/entities/trade';
import { Scalar } from '../data/entities/scalar';

export function lineValueAccessor(array: (Ohlcv[] | Quote[] | Trade[] | Scalar[])):
  (d: Ohlcv | Quote | Trade | Scalar) => number {
  const len = array.length;
  if (array.length > 0) {
    if ((array as Ohlcv[])[0].close !== undefined) {
      return (d: Ohlcv | Quote | Trade | Scalar) => (d as Ohlcv).close;
    } else if ((array as Trade[])[0].price !== undefined) {
      return (d: Ohlcv | Quote | Trade | Scalar) => (d as Trade).price;
    } else if ((array as Quote[])[0].bidPrice !== undefined) {
      return (d: Ohlcv | Quote | Trade | Scalar) => (d as Quote).bidPrice;
    }
  }
  return (d: Ohlcv | Quote | Trade | Scalar) => (d as Scalar).value;
}
