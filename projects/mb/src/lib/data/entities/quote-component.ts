import { Quote } from './quote';
import { QuoteComponent } from './quote-component.enum';

/** Function for calculating a price component of a _Quote_. */
export const quoteComponentValue = (component: QuoteComponent): (quote: Quote) => number => {
  switch (component) {
    case QuoteComponent.Bid:
      return (q: Quote) => q.bidPrice;
    case QuoteComponent.Ask:
      return (q: Quote) => q.askPrice;
    case QuoteComponent.Mid:
      return (q: Quote) => (q.askPrice + q.bidPrice) / 2;
    case QuoteComponent.Weighted:
      return (q: Quote) => {
        const vol = q.askSize + q.bidSize;
        return vol === 0 ? 0 : (q.askPrice * q.askSize + q.bidPrice * q.bidSize) / vol;
      };
    case QuoteComponent.WeightedMid:
      return (q: Quote) => {
        const vol = q.askSize + q.bidSize;
        return vol === 0 ? 0 : (q.askPrice * q.bidSize + q.bidPrice * q.askSize) / vol;
      };
    case QuoteComponent.SpreadBp: // Notice ask is always greater than bid.
      return (q: Quote) => {
        const sum = q.askPrice + q.bidPrice;
        return sum === 0 ? 0 : 20000 * (q.askPrice - q.bidPrice) / sum;
      };
    default: // Default to mid-price.
      return (q: Quote) => (q.askPrice + q.bidPrice) / 2;
  }
};

/** The mnemonic of a price component of a _Quote_. */
export const quoteComponentMnemonic = (component: QuoteComponent): string => {
  switch (component) {
    case QuoteComponent.Bid:
      return 'b';
    case QuoteComponent.Ask:
      return 'a';
    case QuoteComponent.Mid:
      return 'ba/2';
    case QuoteComponent.Weighted:
      return '(bbs+aas)/(bs+as)';
    case QuoteComponent.WeightedMid:
      return '(bas+abs)/(bs+as)';
    case QuoteComponent.SpreadBp:
      return 'spread bp';
    default:
      return '??';
  }
};
