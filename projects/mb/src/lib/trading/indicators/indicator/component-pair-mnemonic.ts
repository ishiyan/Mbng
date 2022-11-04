import { BarComponent } from '../../../data/entities/bar-component.enum';
import { QuoteComponent } from '../../../data/entities/quote-component.enum';
import { barComponentMnemonic } from '../../../data/entities/bar-component';
import { quoteComponentMnemonic } from '../../../data/entities/quote-component';

/** Function to calculate mnemonic for a component pair. */
export const componentPairMnemonic = (barComponent?: BarComponent, quoteComponent?: QuoteComponent): string => {
    let str = '';

    if (barComponent && barComponent != null) {
        str += ', ' + barComponentMnemonic(barComponent);
    }

    if (quoteComponent && quoteComponent != null) {
        str += ', ' + quoteComponentMnemonic(quoteComponent);
    }

    return str;
};
