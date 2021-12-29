/** An optional source of the security id value. Conditionally required when security id is specified. */
export enum SecurityIdSource {
  Isin = 'isin',
  Cuisp = 'cuisp',
  Sedol = 'sedol',
  RicCode = 'ricCode',
  BloombergSymbol = 'bloombergSymbol',
  BloombergOpenSymbologyBbgid = 'bloombergOpenSymbologyBbgid',
  ExchangeSymbol = 'exchangeSymbol',
  IsoCurrencyCode = 'isoCurrencyCode',
}
