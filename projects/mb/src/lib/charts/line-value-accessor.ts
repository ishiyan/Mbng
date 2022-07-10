import { Bar } from '../data/entities/bar';
import { Quote } from '../data/entities/quote';
import { Trade } from '../data/entities/trade';
import { Scalar } from '../data/entities/scalar';

export const lineValueAccessor = (array: (Bar[] | Quote[] | Trade[] | Scalar[])): (d: Bar | Quote | Trade | Scalar) => number => {
  if (array.length > 0) {
    if ((array as Bar[])[0].close !== undefined) {
      return (d: Bar | Quote | Trade | Scalar) => (d as Bar).close;
    } else if ((array as Trade[])[0].price !== undefined) {
      return (d: Bar | Quote | Trade | Scalar) => (d as Trade).price;
    } else if ((array as Quote[])[0].bidPrice !== undefined) {
      return (d: Bar | Quote | Trade | Scalar) => (d as Quote).bidPrice;
    }
  }

  return (d: Bar | Quote | Trade | Scalar) => (d as Scalar).value;
};
