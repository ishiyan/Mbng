/** Denotes the current state of the instrument. */
export enum InstrumentSecurityStatus {
  Active = 'active',
  ActiveClosingOrdersOnly = 'activeClosingOrdersOnly',
  Inactive = 'inactive',
  Suspended = 'suspended',
  PendingExpiry = 'pendingExpiry',
  Expired = 'expired',
  PendingDeletion = 'pendingDeletion',
  Delisted = 'delisted',
  KnockedOut = 'knockedOut',
  KnockOutRevoked = 'knockOutRevoked',
}
