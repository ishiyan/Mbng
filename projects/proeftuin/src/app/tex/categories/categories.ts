import { Category } from './category';
import { exampleFormulasSamples } from '../samples/example-formulas-samples';
import { basicFunctionalitySamples } from '../samples/basic-functionality-samples';
import { multilineFunctionalitySamples } from '../samples/multiline-functionality-samples';
import { symbolSamples } from '../samples/symbol-samples';
import { scienceEquationsSamples } from '../samples/science-equations-samples';
import { syntheticDataSamples } from '../samples/synthetic-data-samples';

export const categories: Category[] = [
  {
    name: 'Example formulas', route: 'examples', samples: exampleFormulasSamples
  },
  {
    name: 'Basic functionality', route: 'basic', samples: basicFunctionalitySamples
  },
  {
    name: 'Multiline functionality', route: 'multiline', samples: multilineFunctionalitySamples
  },
  {
    name: 'Symbols', route: 'symbols', samples: symbolSamples
  },
  {
    name: 'Science equations', route: 'science', samples: scienceEquationsSamples
  },
  {
    name: 'Used in synthetic data forms', route: 'synthetic', samples: syntheticDataSamples
  }
];
