/** Describes a line style. */
export class LineStyle {
  /** A color of the line stroke. */
  public color = 'black';

  /** A width of the line stroke in pixels. */
  public width = 1;

  /** A dash array of the line stroke, e.g. '5,5' or '20,10,5,5,5,10' or empty if no dashes. */
  public dash = '';

  /** A line curve interpoltion method:
   * - linear
   * - natural
   * - basis
   * - camullRom
   * - cardinal
   * - step
   * - stepBefore
   * - stepAfter
   */
  public interpolation = 'natural';
}
