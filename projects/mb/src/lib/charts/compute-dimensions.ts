import { ElementRef } from '@angular/core';

export function computeDimensions(elementRef: ElementRef, width: number | string, height: number | string,
                                  defaultWidth: number, defaultHeight: number): [number, number] {
  let w = defaultWidth;
  let h = defaultHeight;
  const nativeElement = elementRef.nativeElement;
  const computedStyle: CSSStyleDeclaration = getComputedStyle(nativeElement);

  // width
  let extracted: [number | undefined, boolean, string] = extractValue(computedStyle.width);
  let value = extracted[0];
  if (value && value > 0) {
    if (extracted[1] === true) {
      const val = computePercentageWidth(value, extracted[2], nativeElement);
      if (val) {
        w = val;
      }
    } else {
      w = value;
    }
  } else {
    extracted = extractValue(width);
    value = extracted[0];
    if (value && value > 0) {
      if (extracted[1] === true) {
        const val = computePercentageWidth(value, extracted[2], nativeElement);
        if (val) {
          w = val;
        }
      } else {
        w = value;
      }
    }
  }

  // minWidth
  extracted = extractValue(computedStyle.minWidth);
  value = extracted[0];
  if (value && value > 0) {
    if (extracted[1] === true) {
      const val = computePercentageWidth(value, extracted[2], nativeElement);
      if (val && w < val) {
        w = val;
      }
    } else if (w < value) {
      w = value;
    }
  }

  // maxWidth
  extracted = extractValue(computedStyle.maxWidth);
  value = extracted[0];
  if (value && value > 0) {
    if (extracted[1] === true) {
      const val = computePercentageWidth(value, extracted[2], nativeElement);
      if (val && w > val) {
        w = val;
      }
    } else if (w > value) {
      w = value;
    }
  }

  // height
  extracted = extractValue(computedStyle.height);
  value = extracted[0];
  if (value && value > 0) {
    if (extracted[1] === true) {
      const val = computePercentageHeight(value, extracted[2], nativeElement, w);
      if (val) {
        h = val;
      }
    } else {
      h = value;
    }
  } else {
    extracted = extractValue(height);
    value = extracted[0];
    if (value && value > 0) {
      if (extracted[1] === true) {
        const val = computePercentageHeight(value, extracted[2], nativeElement, w);
        if (val) {
          h = val;
        }
      } else {
        h = value;
      }
    }
  }

  // minHeight
  extracted = extractValue(computedStyle.minHeight);
  value = extracted[0];
  if (value && value > 0) {
    if (extracted[1] === true) {
      const val = computePercentageHeight(value, extracted[2], nativeElement, w);
      if (val && h < val) {
        h = val;
      }
    } else if (h < value) {
      h = value;
    }
  }

  // maxHeight
  extracted = extractValue(computedStyle.maxHeight);
  value = extracted[0];
  if (value && value > 0) {
    if (extracted[1] === true) {
      const val = computePercentageHeight(value, extracted[2], nativeElement, w);
      if (val && h > val) {
        h = val;
      }
    } else if (h > value) {
      h = value;
    }
  }

  // console.log('1.11%%foo ->', extractValue('1.11%foo'));
  // console.log('1.11% ->', extractValue('1.11%'));
  // console.log('1.11px ->', extractValue('1.11px'));
  // console.log('1.11 ->', extractValue('1.11'));

  return [w, h];
}

function extractValue(input: number | string | null | undefined): [number | undefined, boolean, string] {
  if (input === undefined || input === null) {
    return [undefined, false, ''];
  }
  if (typeof input !== 'number') {
    const matches = input.match(/^(\d+(?:\.\d+)?)(px|%)(.*)$/);
    if (matches === null) {
      return [undefined, false, ''];
    }
    const value = parseFloat(matches[1]);
    const isPercent = matches[2] === '%';
    return [value, isPercent, matches[3]];
  }
  return [+input, false, ''];
}

function computePercentageWidth(percentage: number, name: string, element: any): number | undefined {

  if (name != null && name.length > 0) {
    if (name === 'offsetParent') {
      const offsetParent = element.offsetParent;
      if (offsetParent && offsetParent != null && offsetParent.clientWidth > 0) {
        return +offsetParent.clientWidth * percentage / 100;
      }
      return undefined;
    } else if (name === 'parent') {
      const p = element.parentElement;
      if (p !== null && p.clientWidth && p.clientWidth > 0) {
        return p.clientWidth * percentage / 100;
      }
      return undefined;
    } else {
      const closest = element.closest(name);
      if (closest !== null && closest.clientWidth && closest.clientWidth > 0) {
        return closest.clientWidth * percentage / 100;
      }
      return undefined;
    }
  }

  const parent = element.parentElement;
  if (parent !== null && parent.clientWidth && parent.clientWidth > 0) {
    return parent.clientWidth * percentage / 100;
  }
  return undefined;
}


function computePercentageHeight(percentage: number, name: string, element: any, width: number): number | undefined {

  if (name != null && name.length > 0) {
    if (name === 'width') {
      return width * percentage / 100;
    } else if (name === 'offsetParent') {
      const offsetParent = element.offsetParent;
      if (offsetParent && offsetParent != null && offsetParent.clientHeight > 0) {
        return +offsetParent.clientHeight * percentage / 100;
      }
      return undefined;
    } else if (name === 'parent') {
      const p = element.parentElement;
      if (p !== null && p.clientHeight && p.clientHeight > 0) {
        return p.clientHeight * percentage / 100;
      }
      return undefined;
    } else {
      const closest = element.closest(name);
      if (closest !== null && closest.clientHeight && closest.clientHeight > 0) {
        return closest.clientHeight * percentage / 100;
      }
      return undefined;
    }
  }

  const parent = element.parentElement;
  if (parent !== null && parent.clientHeight && parent.clientHeight > 0) {
    return parent.clientHeight * percentage / 100;
  }
  return undefined;
}
