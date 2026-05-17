
/** The height of a vertical gap between an arrow and a price point in pixels. */
export const verticalArrowGap = 3;
/** The minimal width of an arrow in pixels. */
export const minArrowWidth = 3;
/** The arrow height / width ratio. */
export const arrowHeightToWidthRatio = 5 / 4;
/** @deprecated Use `arrowHeightToWidthRatio` instead. */
export const arowHeightToWidthRatio = arrowHeightToWidthRatio;

export class IndicatorArrow {
  arrow: any;
  path: any;
  isDown!: boolean;
  price!: number;
}
