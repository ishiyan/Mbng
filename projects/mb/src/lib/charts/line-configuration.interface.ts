/** Describes a line configuration. */
export interface LineConfiguration {
  /** A fill color. */
  fillColor?: string;

  /** A color of the line stroke. */
  strokeColor?: string;

  /** A width of the line stroke in pixels. */
  strokeWidth?: number;

  /** A line curve interpoltion method, one of:
   * - linear
   * - natural
   * - basis
   * - camullRom
   * - cardinal
   * - step
   * - stepBefore
   * - stepAfter
   * - monotoneX
   * - monotoneY
   */
  interpolation?: string;
}
