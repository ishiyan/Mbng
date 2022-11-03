import { Filter } from 'mb';

export class IdentityFilter implements Filter {
  getMnemonic(): string {
    return 'identity';
  }

  update(sample: number): number {
    return sample;
  }
}
