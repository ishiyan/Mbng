import {
  Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef, ChangeDetectorRef, NgZone
} from '@angular/core';

import {
  ColorFormats, Cmyk, Hsla, Hsva, Rgba, stringToHsva, hsvaToRgba, rgbaToHsva, hsva2hsla, hsla2hsva,
  denormalizeCMYK, rgbaToCmyk, cmykToRgb, normalizeCMYK, denormalizeRGBA, outputFormat, rgbaToHex
} from './formats';
import { ColorPickerService } from './color-picker.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ColorPickerSliderDirective } from './color-picker-slider.directive';
import { NgIf, NgFor } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

type TwoDimEvent = {
  s: number;
  v: number;
  rgX: number;
  rgY: number;
};

type OneDimEvent = {
  v: number;
  rgX: number;
};

type BoundingRectangle = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
};

class SliderPosition {
  constructor(public h: number, public s: number, public v: number, public a: number) {}
}

class SliderDimension {
  constructor(public h: number, public s: number, public v: number, public a: number) {}
}

const calculateAutoPositioning = (elBounds: BoundingRectangle, triggerElBounds: BoundingRectangle): string => {
  // Defaults
  let usePositionX = 'right';
  let usePositionY = 'bottom';

  // Calculate collisions
  const { height, width } = elBounds;
  const { top, left } = triggerElBounds;
  const bottom = top + triggerElBounds.height;
  const right = left + triggerElBounds.width;

  const collisionTop = top - height < 0;
  const collisionBottom = bottom + height > (window.innerHeight || document.documentElement.clientHeight);
  const collisionLeft = left - width < 0;
  const collisionRight = right + width > (window.innerWidth || document.documentElement.clientWidth);
  const collisionAll = collisionTop && collisionBottom && collisionLeft && collisionRight;

  // Generate X & Y position values
  if (collisionBottom) {
    usePositionY = 'top';
  }

  if (collisionTop) {
    usePositionY = 'bottom';
  }

  if (collisionLeft) {
    usePositionX = 'right';
  }

  if (collisionRight) {
    usePositionX = 'left';
  }

  // Choose the largest gap available
  if (collisionAll) {
    const postions = ['left', 'right', 'top', 'bottom'];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return postions.reduce((prev, next) => elBounds[prev] > elBounds[next] ? prev : next);
  }

  if ((collisionLeft && collisionRight)) {
    if (collisionTop) { return 'bottom'; }
    if (collisionBottom) { return 'top'; }
    return top > bottom ? 'top' : 'bottom';
  }

  if ((collisionTop && collisionBottom)) {
    if (collisionLeft) {
      return 'right';
    }
    if (collisionRight) {
      return 'left';
    }

    return left > right ? 'left' : 'right';
  }

  return `${usePositionY}-${usePositionX}`;
};

/**
 *  Do not store that on the class instance since the condition will be run every time the class is created.
 */
const SUPPORTS_TOUCH = typeof window !== 'undefined' && 'ontouchstart' in window;

const widthSaturation = 252;
const heightSaturation = 130;
const widthHue = 196;
const widthAlpha = 196;
const gap = 10;

@Component({
    selector: 'mb-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    imports: [MatExpansionPanel, ColorPickerSliderDirective, NgIf, MatIconButton, MatIcon, MatFormField, MatLabel, FormsModule, MatInput, NgFor]
})
export class ColorPickerComponent implements OnInit, OnDestroy {
  private hexText = '#ffffff';
  private hexAlpha = 1;
  private rgba = new Rgba(255, 255, 255, 1);
  private hsla = new Hsla(360, 100, 100, 1);
  private cmyk = new Cmyk(100, 100, 100, 1);
  private hsva!: Hsva;
  private outputColor!: string;
  private initialColor!: string;
  private fallbackColor = '#fff';
  private listenerResize: any;
  private listenerMouseDown!: EventListener;
  private directiveInstance: any;
  private sliderH!: number;
  private sliderDimMax!: SliderDimension;
  private directiveElementRef!: ElementRef;
  private dialogInputFields: ColorFormats[] = [
    ColorFormats.HEX,
    ColorFormats.RGBA,
    ColorFormats.HSLA,
    ColorFormats.CMYK
  ];

  protected showAlpha = true;
  protected hidden!: boolean;
  protected top!: number;
  protected left!: number;
  protected position!: string;
  protected format = ColorFormats.HEX;
  protected slider!: SliderPosition;
  protected selectedColor!: string;
  protected hueSliderColor!: string;
  protected alphaSliderColor!: string;
  protected cpColorMode = 1;
  protected cpPresetColors!: string[];
  protected cpTriggerElement!: ElementRef;
  protected readonly widthDialog = widthSaturation;

  protected get isHex(): boolean {
    return this.format === ColorFormats.HEX;
  }
  protected get isRgba(): boolean {
    return this.format === ColorFormats.RGBA;
  }
  protected get isHsla(): boolean {
    return this.format === ColorFormats.HSLA;
  }
  protected get isCmyk(): boolean {
    return this.format === ColorFormats.CMYK;
  }

  protected get hexT(): string {
    return this.hexText;
  }
  protected set hexT(value: string) {
    if (value && value[0] !== '#') {
      value = '#' + value;
    }

    const validHex = /^#([a-f0-9]{3}|[a-f0-9]{6})$/gi;
    if (validHex.test(value)) {
      if (value.length < 5) {
        value = '#' + value.substring(1)
          .split('')
          .map(c => c + c)
          .join('');
      }
      this.setColorFromString(value, true, false);
    }
  }

  protected get hexA(): number {
    return this.hexAlpha;
  }
  protected set hexA(value: number) {
    this.onAlphaInput(value);
  }

  protected get rgbaRed(): number {
    return this.rgba.r;
  }
  protected set rgbaRed(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 255) {
      const rgba = hsvaToRgba(this.hsva);
      rgba.r = value / 255;
      this.hsva = rgbaToHsva(rgba);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
  }

  protected get rgbaGreen(): number {
    return this.rgba.g;
  }
  protected set rgbaGreen(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 255) {
      const rgba = hsvaToRgba(this.hsva);
      rgba.g = value / 255;
      this.hsva = rgbaToHsva(rgba);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
  }

  protected get rgbaBlue(): number {
    return this.rgba.b;
  }
  protected set rgbaBlue(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 255) {
      const rgba = hsvaToRgba(this.hsva);
      rgba.b = value / 255;
      this.hsva = rgbaToHsva(rgba);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
  }

  protected get rgbaAlpha(): number {
    return this.rgba.a;
  }
  protected set rgbaAlpha(value: number) {
    this.onAlphaInput(value);
  }

  protected get hslaHue(): number {
    return this.hsla.h;
  }
  protected set hslaHue(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 360) {
      this.hsva.h = value / 360;
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
  }

  protected get hslaSaturation(): number {
    return this.hsla.s;
  }
  protected set hslaSaturation(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      const hsla = hsva2hsla(this.hsva);
      hsla.s = value / 100;
      this.hsva = hsla2hsva(hsla);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
  }

  protected get hslaLightness(): number {
    return this.hsla.l;
  }
  protected set hslaLightness(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      const hsla = hsva2hsla(this.hsva);
      hsla.l = value / 100;
      this.hsva = hsla2hsva(hsla);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
  }

  protected get hslaAlpha(): number {
    return this.hsla.a;
  }
  protected set hslaAlpha(value: number) {
    this.onAlphaInput(value);
  }

  protected get cmykCyan(): number {
    return this.cmyk.c;
  }
  protected set cmykCyan(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      this.cmyk.c = value;
      this.updateColorPicker(true, true, true);
    }
  }

  protected get cmykMagenta(): number {
    return this.cmyk.m;
  }
  protected set cmykMagenta(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      this.cmyk.m = value;
      this.updateColorPicker(true, true, true);
    }
  }

  protected get cmykYellow(): number {
    return this.cmyk.y;
  }
  protected set cmykYellow(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      this.cmyk.y = value;
      this.updateColorPicker(true, true, true);
    }
  }

  protected get cmykBlack(): number {
    return this.cmyk.k;
  }
  protected set cmykBlack(value: number) {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      this.cmyk.k = value;
      this.updateColorPicker(true, true, true);
    }
  }

  protected get cmykAlpha(): number {
    return this.cmyk.a;
  }
  protected set cmykAlpha(value: number) {
    this.onAlphaInput(value);
  }

  show!: boolean;
  @ViewChild('dialogPopup', { static: true }) dialogElement!: ElementRef;

  @HostListener('document:keyup.esc', ['$event']) handleEsc(event: any): void {
    if (this.show) {
      this.onCancelColor(event);
    }
  }

  @HostListener('document:keyup.enter', ['$event']) handleEnter(event: any): void {
    if (this.show) {
      this.onAcceptColor(event);
    }
  }

  constructor(
    private ngZone: NgZone,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private service: ColorPickerService
    ) {}

  ngOnInit(): void {
    this.slider = new SliderPosition(widthHue, widthSaturation, heightSaturation, widthAlpha);
    this.sliderDimMax = new SliderDimension(widthHue, widthSaturation, heightSaturation, widthAlpha);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.listenerMouseDown = (event: MouseEvent) => { this.onMouseDown(event); };
    this.listenerResize = () => { this.onResize(); };
    this.openDialog(this.initialColor, false);
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }

  public openDialog(color: any, emit = true): void {
    this.service.setActive(this);
    this.initialColor = color;
    this.setColorFromString(color, emit);
    this.openColorPicker();
  }

  public closeDialog(): void {
    this.closeColorPicker();
  }

  public setupDialog(instance: any, elementRef: ElementRef, color: any,
    cpAlpha: boolean, cpPresetColors: string[], cpTriggerElement: ElementRef): void
  {
    this.initialColor = color;
    this.directiveInstance = instance;
    this.directiveElementRef = elementRef;
    this.showAlpha = cpAlpha;
    this.cpPresetColors = cpPresetColors;
    this.cpTriggerElement = cpTriggerElement;
  }

  public setAlpha(value: boolean): void {
    this.showAlpha = value;
  }

  public setPresetColors(cpPresetColors: string[]): void {
    this.cpPresetColors = cpPresetColors;
  }

  public setColorFromString(value: string, emit = true, update = true): void {
    let localHsva: Hsva | null = stringToHsva(value, false);
    if (!localHsva && !this.hsva) {
      localHsva = stringToHsva(this.fallbackColor, false);
    }

    if (localHsva) {
      this.hsva = localHsva;
      this.sliderH = localHsva.h;
      this.updateColorPicker(emit, update);
    }
  }

  private onResize(): void {
    if (this.position === 'fixed') {
      this.setDialogPosition();
    } else {
      this.closeColorPicker();
    }
  }

  private onMouseDown(event: MouseEvent): void {
    if (
      this.show &&
      event.target !== this.directiveElementRef.nativeElement &&
      !this.isDescendant(this.elRef.nativeElement, event.target) &&
      !this.isDescendant(this.directiveElementRef.nativeElement, event.target)
    ) {
      this.ngZone.run(() => {
        this.directiveInstance.colorSelect(this.outputColor);
        this.closeColorPicker();
      });
    }
  }

  private onAcceptColor(event: Event): void {
    event.stopPropagation();
    if (this.outputColor) {
      this.directiveInstance.colorSelect(this.outputColor);
    }

    this.closeColorPicker();
  }

  private onCancelColor(event: Event): void {
    event.stopPropagation();
    this.setColorFromString(this.initialColor, true);
    this.directiveInstance.colorChange(this.initialColor);
    this.closeColorPicker();
  }

  protected onFormatToggle(change: number): void {
    const length = this.dialogInputFields.length;
    const nextFormat = (((this.dialogInputFields.indexOf(this.format) + change) % length) + length) % length;
    this.format = this.dialogInputFields[nextFormat];
  }

  protected onColorChange(value: TwoDimEvent): void {
    this.hsva.s = value.s / value.rgX;
    this.hsva.v = value.v / value.rgY;
    this.updateColorPicker();
  }

  protected onHueChange(value: OneDimEvent): void {
    this.hsva.h = value.v / value.rgX;
    this.sliderH = this.hsva.h;
    this.updateColorPicker();
  }

  protected onAlphaChange(value: OneDimEvent): void {
    this.hsva.a = value.v / value.rgX;
    this.updateColorPicker();
  }

  private onAlphaInput(value: number): void {
    if (!isNaN(value) && value >= 0 && value <= 1) {
      this.hsva.a = value;
      this.updateColorPicker();
    }
  }

  private openColorPicker(): void {
    if (!this.show) {
      this.show = true;
      this.hidden = true;

      setTimeout(() => {
        this.hidden = false;
        this.setDialogPosition();
        this.cdRef.detectChanges();
      }, 0);

      this.ngZone.runOutsideAngular(() => {
        if (SUPPORTS_TOUCH) {
          document.addEventListener('touchstart', this.listenerMouseDown);
        } else {
          document.addEventListener('mousedown', this.listenerMouseDown);
        }
      });

      window.addEventListener('resize', this.listenerResize);
    }
  }

  private closeColorPicker(): void {
    if (this.show) {
      this.show = false;

      if (SUPPORTS_TOUCH) {
        document.removeEventListener('touchstart', this.listenerMouseDown);
      } else {
        document.removeEventListener('mousedown', this.listenerMouseDown);
      }

      window.removeEventListener('resize', this.listenerResize);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!this.cdRef.destroyed) {
        this.cdRef.detectChanges();
      }
    }
  }

  private updateColorPicker(emit = true, update = true, cmykInput = false): void {
    if (this.sliderDimMax) {
      const lastOutput = this.outputColor;
      const hslaTmp: Hsla = hsva2hsla(this.hsva);

      let rgbaTmp: Rgba;
      if (!cmykInput) {
        rgbaTmp = hsvaToRgba(this.hsva);
        this.cmyk = denormalizeCMYK(rgbaToCmyk(rgbaTmp));
      } else {
        rgbaTmp = cmykToRgb(normalizeCMYK(this.cmyk));
        this.hsva = rgbaToHsva(rgbaTmp);
      }

      rgbaTmp = denormalizeRGBA(rgbaTmp);
      this.sliderH = this.hsva.h;

      const hue = denormalizeRGBA(hsvaToRgba(new Hsva(this.sliderH || this.hsva.h, 1, 1, 1)));

      if (update) {
        this.hsla = new Hsla(
          Math.round((hslaTmp.h) * 360),
          Math.round(hslaTmp.s * 100),
          Math.round(hslaTmp.l * 100),
          Math.round(hslaTmp.a * 100) / 100);
        this.rgba = new Rgba(
          rgbaTmp.r,
          rgbaTmp.g,
          rgbaTmp.b,
          Math.round(rgbaTmp.a * 100) / 100);
        this.cmyk.a = Math.round(this.cmyk.a * 100) / 100;
        this.hexText = rgbaToHex(rgbaTmp, false);
        this.hexAlpha = this.rgba.a;
      }

      this.hueSliderColor = `rgb(${hue.r},${hue.g},${hue.b})`;
      this.alphaSliderColor = `rgb(${rgbaTmp.r},${rgbaTmp.g},${rgbaTmp.b})`;
      this.outputColor = outputFormat(this.hsva);
      this.selectedColor = outputFormat(this.hsva);

      this.slider = new SliderPosition(
        (this.sliderH || this.hsva.h) * this.sliderDimMax.h - 10,
        this.hsva.s * this.sliderDimMax.s - 10,
        (1 - this.hsva.v) * this.sliderDimMax.v - 10,
        this.hsva.a * this.sliderDimMax.a - 10
      );

      if (emit && lastOutput !== this.outputColor) {
        this.directiveInstance.colorChange(this.outputColor);
      }
    }
  }

  private setDialogPosition(): void {
      let position = 'static';
      let transform = '';
      let parentNode: any = null;
      let transformNode: any = null;
      let node = this.directiveElementRef.nativeElement.parentNode;

      const dialogHeight = this.dialogElement.nativeElement.offsetHeight;

      while (node !== null && node.tagName !== 'HTML') {
        const style = window.getComputedStyle(node);
        position = style.getPropertyValue('position');
        transform = style.getPropertyValue('transform');

        if (position !== 'static' && parentNode === null) {
          parentNode = node;
        }

        if (transform && transform !== 'none' && transformNode === null) {
          transformNode = node;
        }

        if (position === 'fixed') {
          parentNode = transformNode;
          break;
        }

        node = node.parentNode;
      }

      const boxDirective = this.createDialogBox(this.directiveElementRef.nativeElement, (position !== 'fixed'));

      if (position === 'fixed' &&
         (!parentNode || parentNode instanceof HTMLUnknownElement))
      {
        this.top = boxDirective.top;
        this.left = boxDirective.left;
      } else {
        if (parentNode === null) {
          parentNode = node;
        }

        const boxParent = this.createDialogBox(parentNode, (position !== 'fixed'));

        this.top = boxDirective.top - boxParent.top;
        this.left = boxDirective.left - boxParent.left;
      }

      if (position === 'fixed') {
        this.position = 'fixed';
      }

      const dialogBounds = this.dialogElement.nativeElement.getBoundingClientRect();
      const triggerBounds = this.cpTriggerElement.nativeElement.getBoundingClientRect();
      const usePosition = calculateAutoPositioning(dialogBounds, triggerBounds);

      if (usePosition === 'top') {
        this.top -= dialogHeight + gap;
      } else if (usePosition === 'bottom') {
        this.top += boxDirective.height + gap;
      } else if (usePosition === 'top-left' || usePosition === 'left-top') {
        this.top -= dialogHeight - boxDirective.height;
        this.left -= widthSaturation + gap - 2;
      } else if (usePosition === 'top-right' || usePosition === 'right-top') {
        this.top -= dialogHeight - boxDirective.height;
        this.left += boxDirective.width + gap - 2;
      } else if (usePosition === 'left' || usePosition === 'bottom-left' || usePosition === 'left-bottom') {
        this.left -= widthSaturation + gap - 2;
      } else { // usePosition === 'right' || usePosition === 'bottom-right' || usePosition === 'right-bottom'
        this.left += boxDirective.width + gap - 2;
      }
  }

  private isDescendant(parent: any, child: any): boolean {
    let node: any = child.parentNode;

    while (node !== null) {
      if (node === parent) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }

  private createDialogBox(element: any, offset: boolean): any {
    const { top, left } = element.getBoundingClientRect();
    return {
      top: top + (offset ? window.pageYOffset : 0),
      left: left + (offset ? window.pageXOffset : 0),
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
}
