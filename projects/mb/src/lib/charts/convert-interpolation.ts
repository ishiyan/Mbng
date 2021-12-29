import * as d3 from 'd3';

export function convertInterpolation(interpolation: string): d3.CurveFactory {
  switch (interpolation.toLowerCase()) {
    case 'step': return d3.curveStep;
    case 'stepbefore': return d3.curveStepBefore;
    case 'stepafter': return d3.curveStepAfter;
    case 'natural': return d3.curveNatural;
    case 'basis': return d3.curveBasis;
    case 'catmullrom': return d3.curveCatmullRom;
    case 'cardinal': return d3.curveCardinal;
    case 'monotonex': return d3.curveMonotoneX;
    case 'monotoney': return d3.curveMonotoneY;
    default: return d3.curveLinear;
  }
}
