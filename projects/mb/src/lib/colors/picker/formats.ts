export enum ColorFormats {
  HEX,
  RGBA,
  HSLA,
  CMYK
}

export class Rgba {
  constructor(public r: number, public g: number, public b: number, public a: number) {}
}

export class Hsva {
  constructor(public h: number, public s: number, public v: number, public a: number) {}
}

export class Hsla {
  constructor(public h: number, public s: number, public l: number, public a: number) {}
}

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number, public a: number = 1) {}
}

export const rgbaToHex = (rgba: Rgba, allowHex8?: boolean): string => {
  // eslint-disable-next-line
  let hex = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substring(1);
  if (allowHex8) {
    // eslint-disable-next-line
    hex += ((1 << 8) | Math.round(rgba.a * 255)).toString(16).substring(1);
  }

  return hex;
};

export const rgbaToHsva = (rgba: Rgba): Hsva => {
  const r = Math.min(rgba.r, 1);
  const g = Math.min(rgba.g, 1);
  const b = Math.min(rgba.b, 1);
  const a = Math.min(rgba.a, 1);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v: number = max;
  const d = max - min;
  const s = (max === 0) ? 0 : d / max;

  let h = 0;
  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h /= 6;
  }

  return new Hsva(h, s, v, a);
};

export const rgbaToCmyk = (rgba: Rgba): Cmyk => {
  const k: number = 1 - Math.max(rgba.r, rgba.g, rgba.b);
  if (k === 1) {
    return new Cmyk(0, 0, 0, 1, rgba.a);
  } else {
    const c = (1 - rgba.r - k) / (1 - k);
    const m = (1 - rgba.g - k) / (1 - k);
    const y = (1 - rgba.b - k) / (1 - k);

    return new Cmyk(c, m, y, k, rgba.a);
  }
};

export const cmykToRgb = (cmyk: Cmyk): Rgba => {
  const r = ( 1 - cmyk.c ) * (1 - cmyk.k);
  const g = ( 1 - cmyk.m ) * (1 - cmyk.k);
  const b = ( 1 - cmyk.y ) * (1 - cmyk.k);

  return new Rgba(r, g, b, cmyk.a);
};

export const hsvaToRgba = (hsva: Hsva): Rgba => {
  const h = hsva.h;
  const s = hsva.s;
  const v = hsva.v;
  const a = hsva.a;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r = 0;
  let g = 0;
  let b = 0;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }

  return new Rgba(r, g, b, a);
};

export const hsla2hsva = (hsla: Hsla): Hsva => {
  const h = Math.min(hsla.h, 1);
  const s = Math.min(hsla.s, 1);
  const l = Math.min(hsla.l, 1);
  const a = Math.min(hsla.a, 1);

  if (l === 0) {
    return new Hsva(h, 0, 0, a);
  } else {
    const v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
    return new Hsva(h, 2 * (v - l) / v, v, a);
  }
};

export const hsva2hsla = (hsva: Hsva): Hsla => {
  const h = hsva.h;
  const s = hsva.s;
  const v = hsva.v;
  const a = hsva.a;

  if (v === 0) {
    return new Hsla(h, 0, 0, a);
  } else if (s === 0 && v === 1) {
    return new Hsla(h, 1, 1, a);
  } else {
    const l = v * (2 - s) / 2;
    return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
  }
};

export const normalizeCMYK = (cmyk: Cmyk): Cmyk => new Cmyk(
  cmyk.c / 100,
  cmyk.m / 100,
  cmyk.y / 100,
  cmyk.k / 100,
  cmyk.a);

export const denormalizeCMYK = (cmyk: Cmyk): Cmyk => new Cmyk(
  Math.floor(cmyk.c * 100),
  Math.floor(cmyk.m * 100),
  Math.floor(cmyk.y * 100),
  Math.floor(cmyk.k * 100),
  cmyk.a);

export const denormalizeRGBA = (rgba: Rgba): Rgba => new Rgba(
  Math.round(rgba.r * 255),
  Math.round(rgba.g * 255),
  Math.round(rgba.b * 255),
  rgba.a);

export const stringToHsva = (colorString = '', allowHex8 = false): Hsva | null => {
  colorString = (colorString || '').toLowerCase();
  const stringParsers = [
    {
      re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      parse: (execResult: any) =>
        new Rgba(parseInt(execResult[2], 10) / 255,
          parseInt(execResult[3], 10) / 255,
          parseInt(execResult[4], 10) / 255,
          isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]))
    }, {
      re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      parse: (execResult: any) =>
        new Hsla(parseInt(execResult[2], 10) / 360,
          parseInt(execResult[3], 10) / 100,
          parseInt(execResult[4], 10) / 100,
          isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]))
    }
  ];

  if (allowHex8) {
    stringParsers.push({
      re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,
      parse: (execResult: any) =>
        new Rgba(parseInt(execResult[1], 16) / 255,
          parseInt(execResult[2], 16) / 255,
          parseInt(execResult[3], 16) / 255,
          parseInt(execResult[4] || 'FF', 16) / 255)
    });
  } else {
    stringParsers.push({
      re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
      parse: (execResult: any) =>
        new Rgba(parseInt(execResult[1], 16) / 255,
          parseInt(execResult[2], 16) / 255,
          parseInt(execResult[3], 16) / 255,
          1)
    });
  }

  stringParsers.push({
    re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
    parse: (execResult: any) =>
      new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
        parseInt(execResult[2] + execResult[2], 16) / 255,
        parseInt(execResult[3] + execResult[3], 16) / 255,
        1)
  });

  let hsva: Hsva | null = null;
  for (const key in stringParsers) {
    if (Object.prototype.hasOwnProperty.call(stringParsers, key)) {
      const parser = stringParsers[key];
      const match = parser.re.exec(colorString);
      const color: any = match && parser.parse(match);

      if (color) {
        if (color instanceof Rgba) {
          hsva = rgbaToHsva(color);
        } else if (color instanceof Hsla) {
          hsva = hsla2hsva(color);
        }

        return hsva;
      }
    }
  }

  return hsva;
};

export const outputFormat = (hsva: Hsva): string => {
  if (hsva.a < 1) {
    const rgba = denormalizeRGBA(hsvaToRgba(hsva));
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${Math.round(rgba.a * 100) / 100})`;
  } else {
    return rgbaToHex(denormalizeRGBA(hsvaToRgba(hsva)), false);
  }
};
