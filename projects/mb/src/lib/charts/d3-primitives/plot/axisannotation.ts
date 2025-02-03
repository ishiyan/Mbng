import * as d3 from 'd3';

// Injected dependencies.
export const axisannotation = (valueAccessor: any, plotMixin: any) =>
  // Closure function.
  () => {
    const p = {} as any;
    const point = 4;
    let axis = d3.axisTop(d3.scaleLinear());
    let format: any;
    let height = 14;
    let width = 50;
    let translate = [0, 0];
    let orient = 'bottom';

    const annotation = (g: any) => {
      const group = p.dataSelector.mapper(filterInvalidValues(p.accessor, axis.scale()))(g);

      group.entry.append('path');
      group.entry.append('text');

      annotation.refresh(g);
    };

    annotation.refresh = (g: any) => {
      const fmt = format ? format :
        (axis.tickFormat() ? axis.tickFormat() : (axis.scale() as any).tickFormat());

      refresh(p.dataSelector.select(g), p.accessor, axis, orient, fmt, height, width, point, translate);
    };

    /** Supports getter and setter. */
    annotation.axis = function(_?: any) {
      if (!arguments.length) {
        return axis;
      }

      axis = _;
      return annotation;
    };

    /** Supports getter and setter. */
    annotation.orient = function(_?: any) {
      if (!arguments.length) {
        return orient;
      }

      orient = _;
      return annotation;
    };

    /** Supports getter and setter. */
    annotation.format = function(_?: any) {
      if (!arguments.length) {
        return format;
      }

      format = _;
      return annotation;
    };

    /** Supports getter and setter. */
    annotation.height = function(_?: any) {
      if (!arguments.length) {
        return height;
      }

      height = _;
      return annotation;
    };

    /** Supports getter and setter. */
    annotation.width = function(_?: any) {
      if (!arguments.length) {
        return width;
      }

      width = _;
      return annotation;
    };

    /** Supports getter and setter. */
    annotation.translate = function(_?: any) {
      if (!arguments.length) {
        return translate;
      }

      translate = _;
      return annotation;
    };

    plotMixin(annotation, p)
      .accessor(valueAccessor())
      .dataSelector();

    return annotation;
  };

const refresh =
  (selection: any, accessor: any, axis: any, orient: any, format: any, height: any, width: any, point: any, translate: any) => {
  const neg = orient === 'left' || orient === 'top' ? -1 : 1;

  selection.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ')');
  selection.select('path').attr('d', backgroundPath(accessor, axis, orient, height, width, point, neg));
  selection.select('text').text(textValue(accessor, format)).call(textAttributes, accessor, axis, orient, neg);
};

const filterInvalidValues = (accessor: any, scale: any) => (data: any) => {
  let range = scale.range();
  const start = range[0];
  const end = range[range.length - 1];

  range = start < end ? [start, end] : [end, start];

  return data.filter((d: any) => {
      if (accessor(d) === null || accessor(d) === undefined) {
        return false;
      }

      const value = scale(accessor(d));
      return value !== null && !isNaN(value) && range[0] <= value && value <= range[1];
    });
};

const textAttributes = (text: any, accessor: any, axis: any, orient: any, neg: any) => {
  const scale = axis.scale();

  switch (orient) {
    case 'left':
    case 'right':
      text.attr('x', neg * (Math.max(axis.tickSizeInner(), 0) + axis.tickPadding()))
        .attr('y', textPosition(accessor, scale))
        .attr('dy', '.32em')
        .style('text-anchor', neg < 0 ? 'end' : 'start');
      break;
    case 'top':
    case 'bottom':
      text.attr('x', textPosition(accessor, scale))
        .attr('y', neg * (Math.max(axis.tickSizeInner(), 0) + axis.tickPadding()))
        .attr('dy', neg < 0 ? '0em' : '.72em')
        .style('text-anchor', 'middle');
      break;
  }
};

const textPosition = (accessor: any, scale: any) => (d: any) => scale(accessor(d));

const textValue = (accessor: any, format: any) => (d: any) => format(accessor(d));

const backgroundPath = (accessor: any, axis: any, orient: any, height: any, width: any, point: any, neg: any) => (d: any) => {
  const scale = axis.scale();
  const value = scale(accessor(d));
  let pt = point;

  switch (orient) {
    case 'left':
    case 'right': {
      let h = 0;

      if (height / 2 < point) {
        pt = height / 2;
      }
      else {
        h = height / 2 - point;
      }

      return 'M 0 ' + value + ' l ' + (neg * Math.max(axis.tickSizeInner(), 1)) + ' ' + (-pt) +
        ' l 0 ' + (-h) + ' l ' + (neg * width) + ' 0 l 0 ' + height +
        ' l ' + (neg * -width) + ' 0 l 0 ' + (-h);
    }
    case 'top':
    case 'bottom': {
      let w = 0;

      if (width / 2 < point) {
        pt = width / 2;
      }
      else {
        w = width / 2 - point;
      }

      return 'M ' + value + ' 0 l ' + (-pt) + ' ' + (neg * Math.max(axis.tickSizeInner(), 1)) +
        ' l ' + (-w) + ' 0 l 0 ' + (neg * height) + ' l ' + width + ' 0 l 0 ' + (neg * -height) +
        ' l ' + (-w) + ' 0';
    }
    default: throw new Error('Unsupported orient value: axisannotation.orient('
      + orient + '). Set to one of: \'top\', \'bottom\', \'left\', \'right\'');
  }
};
