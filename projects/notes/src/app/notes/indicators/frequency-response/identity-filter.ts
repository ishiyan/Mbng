import { Filter } from 'mb';

export class IdentityFilter implements Filter {
  getName(): string {
    return 'identity';
  }

  update(sample: number): number {
    return sample;
  }
}
