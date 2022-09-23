import { Band } from '../../../charts/entities/band';
import { Heatmap } from '../../../charts/entities/heatmap';
import { Scalar } from '../../../data/entities/scalar';

/** Defines indicator output. */
export type IndicatorOutput = (Scalar | Band | Heatmap)[];
