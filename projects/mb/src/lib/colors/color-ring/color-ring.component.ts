import { Component, ElementRef, input, output, viewChild, effect, signal, ChangeDetectionStrategy, OnDestroy, afterNextRender, computed, inject, DOCUMENT } from '@angular/core';

interface RingGeometry {
  center: { x: number; y: number };
  centerRadius: number;
  hueRingInnerRadius: number;
  hueRingOuterRadius: number;
  saturationRingInnerRadius: number;
  saturationRingOuterRadius: number;
  lightnessRingInnerRadius: number;
  lightnessRingOuterRadius: number;
  alphaRingInnerRadius: number;
  alphaRingOuterRadius: number;
  handleRadius: number;
}

const hueRing = 'hue-ring';
const saturationRing = 'saturation-ring';
const lightnessRing = 'lightness-ring';
const alphaRing = 'alpha-ring';

@Component({
  selector: 'mb-color-ring',
  templateUrl: './color-ring.component.html',
  styleUrls: ['./color-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ColorRingComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // Input properties
  /** Enable alpha channel control (opacity/transparency) */
  readonly alphaChannel = input<boolean>(false);
  /** Overall diameter of the color ring in pixels */
  readonly diameter = input<number>(280);
  /** Width of each color ring in pixels */
  readonly ringWidth = input<number>(24);
  /** Size of the color selection handle in pixels */
  readonly handleSize = input<number>(12);
  /** Resolution for high-DPI displays - use 'auto' for automatic detection based on devicePixelRatio, or specify a number (1-3) for manual control */
  readonly resolution = input<number | 'auto'>('auto');
  /** Whether the color ring is disabled and non-interactive */
  readonly disabled = input<boolean>(false);
  /** Initial hex color value (with or without alpha channel, e.g., '#ff4081' or '#ff408180') */
  readonly hexValue = input<string>('#ff4081');
  /** Background color behind the color ring - 'auto' uses theme background, 'transparent' for no background, or any CSS color value */
  readonly backgroundColor = input<string>('auto');

  // Output events
  /** Emitted only a hex value when a color is selected from the picker */
  readonly hexValueChange = output<string>();
  /** Emitted when a color is selected from the picker */
  readonly colorChange = output<{ hex: string; hsl: [number, number, number]; alpha?: number }>();

  // Internal state
  protected readonly isDragging = signal<boolean>(false);
  private ctx: CanvasRenderingContext2D | null = null;
  private geometry: RingGeometry | null = null;
  private currentHsla = signal<[number, number, number, number]>([0, 100, 50, 1]);
  private dragTarget: 'hue-ring' | 'saturation-ring' | 'lightness-ring' | 'alpha-ring' | null = null;

  // Computed resolution that considers auto-detection
  private readonly effectiveResolution = computed(() => {
    const resolution = this.resolution();
    if (resolution === 'auto') {
      return Math.min(window.devicePixelRatio || 1, 3); // Cap at 3x for performance
    }
    return resolution;
  });

  private radialSegments(radius: number): number {
    const resolution = this.effectiveResolution();

    // Calculate circumference in actual pixels
    const circumference = 2 * Math.PI * radius * resolution;

    // Target 1-2 pixels per segment for smooth gradients
    const pixelsPerSegment = 1.5;
    let segments = Math.round(circumference / pixelsPerSegment);

    // Ensure we have enough segments for smooth gradients
    segments = Math.max(segments, 360);

    // Round to multiples of 4 to align with cardinal directions (0°, 90°, 180°, 270°)
    // This helps prevent moiré patterns at these critical angles
    const rounding = 16;
    segments = Math.round(segments / rounding) * rounding;

    // Clamp to reasonable bounds
    const maxSegments = Math.min(3600, circumference * 2); // Cap at 2 pixels per segment max
    segments = Math.min(segments, maxSegments);

    return Math.max(360, segments); // Minimum 360 for 1° precision
  }

  constructor() {
    afterNextRender(() => {
      this.initializeCanvas();
    });

    // React to hex input changes
    effect(() => {
      const hex = this.hexValue();
      if (this.isValidHex(hex) || this.isValidHexa(hex)) {
        const hsla = this.hexToHsla(hex);
        this.currentHsla.set(hsla);
        this.render();
      }
    });

    // React to layout and visual property changes
    effect(() => {
      // Read signals to make the effect reactive
      this.alphaChannel();
      this.diameter();
      this.ringWidth();
      this.handleSize();
      this.effectiveResolution();
      this.backgroundColor();

      // Reinitialize and render
      if (this.ctx) {
        this.initializeCanvas();
      }
    });
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  private initializeCanvas(): void {
    const canvasEl = this.canvas().nativeElement;
    this.ctx = canvasEl.getContext('2d');
    if (!this.ctx) return;

    const diameter = this.diameter();
    const resolution = this.effectiveResolution();

    // Set canvas size
    const pixelSize = diameter * resolution;
    const pixelDiameter = `${diameter}px`;
    canvasEl.width = pixelSize;
    canvasEl.height = pixelSize;
    canvasEl.style.width = pixelDiameter;
    canvasEl.style.height = pixelDiameter;

    // Scale context for high-DPI displays
    this.ctx.scale(resolution, resolution);

    this.calculateGeometry();
    this.setupEventListeners();
    this.render();
  }

  private calculateGeometry(): void {
    const diameter = this.diameter();
    const ringWidth = this.ringWidth();
    const handleRadius = this.handleSize() / 2;
    const alphaChannel = this.alphaChannel();

    const halfDiameter = diameter / 2;
    const center = { x: halfDiameter, y: halfDiameter };
    const totalRadius = halfDiameter;
    const smallGap = 4; // Gap between rings

    // Calculate ring positions from outside to inside
    const hueRingOuterRadius = totalRadius;
    const hueRingInnerRadius = hueRingOuterRadius - ringWidth;

    const saturationRingOuterRadius = hueRingInnerRadius - smallGap;
    const saturationRingInnerRadius = saturationRingOuterRadius - ringWidth;

    const lightnessRingOuterRadius = saturationRingInnerRadius - smallGap;
    const lightnessRingInnerRadius = lightnessRingOuterRadius - ringWidth;

    let alphaRingOuterRadius = 0;
    let alphaRingInnerRadius = 0;
    let centerRadius = 0;

    if (alphaChannel) {
      alphaRingOuterRadius = lightnessRingInnerRadius - smallGap;
      alphaRingInnerRadius = alphaRingOuterRadius - ringWidth;
      centerRadius = alphaRingInnerRadius - smallGap;
    } else {
      centerRadius = lightnessRingInnerRadius - smallGap;
    }

    this.geometry = {
      center,
      centerRadius,
      hueRingInnerRadius,
      hueRingOuterRadius,
      saturationRingInnerRadius,
      saturationRingOuterRadius,
      lightnessRingInnerRadius,
      lightnessRingOuterRadius,
      alphaRingInnerRadius,
      alphaRingOuterRadius,
      handleRadius
    };
  }

  private getEffectiveBackgroundColor(): string {
    const bgColor = this.backgroundColor();
    if (bgColor === 'auto') {
      const isDarkMode = this.isDarkMode();

      // Use CSS custom property for theme-aware background
      const computedStyle = getComputedStyle(this.canvas().nativeElement);
      const matSysSurface = computedStyle.getPropertyValue('--mat-sys-surface').trim();
      if (matSysSurface) {
        return this.extractColorFromLightDark(matSysSurface, isDarkMode);
      }

      // Fallback to default based on theme
      return isDarkMode ? '#121212' : '#ffffff';
    }

    return this.resolveCssVariables(bgColor);
  }

  private extractColorFromLightDark(colorValue: string, isDarkMode: boolean): string {
    // Check if it's a light-dark() function
    const lightDarkMatch = colorValue.match(/light-dark\(\s*([^,]+),\s*([^)]+)\s*\)/);

    if (lightDarkMatch) {
      const lightColor = lightDarkMatch[1].trim();
      const darkColor = lightDarkMatch[2].trim();
      return isDarkMode ? darkColor : lightColor;
    }

    // If it's not a light-dark() function, return the value as-is
    return colorValue;
  }

  private isDarkMode(): boolean {
    // Method 1: Check color-scheme CSS property
    const documentStyle = getComputedStyle(this.document.documentElement);
    const colorScheme = documentStyle.getPropertyValue('color-scheme').trim();
    if (colorScheme.includes('dark')) {
      return true;
    }
    if (colorScheme.includes('light')) {
      return false;
    }

    // Method 2: Check for dark theme class
    if (this.document.documentElement.classList.contains('dark-theme') ||
      this.document.documentElement.classList.contains('dark') ||
      this.document.body.classList.contains('dark-theme') ||
      this.document.body.classList.contains('dark')) {
      return true;
    }

    // Method 3: Check prefers-color-scheme media query
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Method 4: Check data attributes
    const themeAttr = this.document.documentElement.getAttribute('data-theme') ||
      this.document.documentElement.getAttribute('theme');
    if (themeAttr === 'dark') {
      return true;
    }

    // Default to light mode
    return false;
  }

  /** Resolve CSS variables to their computed values */
  private resolveCssVariables(cssValue: string): string {
    if (!cssValue.includes('var(')) {
      return cssValue;
    }

    try {
      // Use the canvas element's computed style to resolve variables
      const canvasElement = this.canvas().nativeElement;

      // Set a temporary style property and read it back
      const originalBackground = canvasElement.style.backgroundColor;
      canvasElement.style.backgroundColor = cssValue;

      // Get the computed (resolved) value
      const computedStyle = getComputedStyle(canvasElement);
      const resolvedColor = computedStyle.backgroundColor;

      // Restore original style
      canvasElement.style.backgroundColor = originalBackground;

      // Convert to hex if it's rgb format
      const hexColor = this.convertToHex(resolvedColor);

      return hexColor || resolvedColor;
    } catch (error) {
      console.warn('Failed to resolve CSS variable:', cssValue, error);
      return cssValue;
    }
  }

  /** Convert RGB/RGBA color values to hex format */
  private convertToHex(color: string): string {
    // Handle rgb(r, g, b) and rgba(r, g, b, a) formats
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);

      const toHex = (n: number): string => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // If it's already a hex color or other format, return as-is
    return color;
  }

  private render(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const geometry = this.geometry;
    const diameter = this.diameter();
    const [h, s, l, a] = this.currentHsla();

    // Clear canvas
    ctx.clearRect(0, 0, diameter, diameter);

    // Set background - only in areas not covered by rings
    this.drawBackground();

    // Draw rings from outermost to innermost
    this.drawHueRing();
    this.drawSaturationRing();
    this.drawLightnessRing();
    
    if (this.alphaChannel()) {
      this.drawAlphaRing();
    }

    // Draw center disc with current color
    this.drawCenterDisc();

    // Draw handles
    this.drawHueHandle();
    this.drawSaturationHandle();
    this.drawLightnessHandle();
    
    if (this.alphaChannel()) {
      this.drawAlphaHandle();
    }
  }

  private drawBackground(): void {
    if (!this.ctx || !this.geometry) return;

    const backgroundColor = this.backgroundColor();
    if (backgroundColor === 'transparent') return;

    const ctx = this.ctx;
    const diameter = this.diameter();

    const bgColor = this.getEffectiveBackgroundColor();
    ctx.fillStyle = bgColor;
    
    // Fill only the outer area (outside the hue ring)
    const { center, hueRingOuterRadius } = this.geometry;
    const twoPi = 2 * Math.PI;
    
    // Create a path for the entire canvas minus the color ring area
    ctx.beginPath();
    ctx.rect(0, 0, diameter, diameter);
    ctx.arc(center.x, center.y, hueRingOuterRadius + 2, 0, twoPi, true); // Add small buffer and subtract ring area
    ctx.fill();

    ctx.fillStyle = bgColor;
    
    // Gap between hue and saturation rings
    ctx.beginPath();
    ctx.arc(center.x, center.y, this.geometry.hueRingInnerRadius, 0, twoPi);
    ctx.arc(center.x, center.y, this.geometry.saturationRingOuterRadius, 0, twoPi, true);
    ctx.fill();
    
    // Gap between saturation and lightness rings
    ctx.beginPath();
    ctx.arc(center.x, center.y, this.geometry.saturationRingInnerRadius, 0, twoPi);
    ctx.arc(center.x, center.y, this.geometry.lightnessRingOuterRadius, 0, twoPi, true);
    ctx.fill();
    
    // Gap between lightness and alpha rings (if alpha is enabled)
    if (this.alphaChannel()) {
      ctx.beginPath();
      ctx.arc(center.x, center.y, this.geometry.lightnessRingInnerRadius, 0, twoPi);
      ctx.arc(center.x, center.y, this.geometry.alphaRingOuterRadius, 0, twoPi, true);
      ctx.fill();
      
      // Gap between alpha ring and center disc
      ctx.beginPath();
      ctx.arc(center.x, center.y, this.geometry.alphaRingInnerRadius, 0, twoPi);
      ctx.arc(center.x, center.y, this.geometry.centerRadius, 0, twoPi, true);
      ctx.fill();
    } else {
      // Gap between lightness ring and center disc (no alpha)
      ctx.beginPath();
      ctx.arc(center.x, center.y, this.geometry.lightnessRingInnerRadius, 0, twoPi);
      ctx.arc(center.x, center.y, this.geometry.centerRadius, 0, twoPi, true);
      ctx.fill();
    }
  }

  private drawHueRing(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, hueRingInnerRadius, hueRingOuterRadius } = this.geometry;
    const segments = this.radialSegments((hueRingInnerRadius + hueRingOuterRadius) / 2);
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;

    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * twoPi - halfPi; // Start from top
      const endAngle = ((i + 1) / segments) * twoPi - halfPi; // Start from top
      const hue = (i / segments) * 360;

      const gradient = ctx.createRadialGradient(
        center.x, center.y, hueRingInnerRadius,
        center.x, center.y, hueRingOuterRadius
      );
      const clr = `hsl(${hue}, 100%, 50%)`;
      gradient.addColorStop(0, clr);
      gradient.addColorStop(1, clr);

      ctx.beginPath();
      ctx.arc(center.x, center.y, hueRingOuterRadius, startAngle, endAngle);
      ctx.arc(center.x, center.y, hueRingInnerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  private drawSaturationRing(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, saturationRingInnerRadius, saturationRingOuterRadius } = this.geometry;
    const [h] = this.currentHsla();
    const segments = this.radialSegments((saturationRingInnerRadius + saturationRingOuterRadius) / 2);
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;

    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * twoPi - halfPi; // Start from top
      const endAngle = ((i + 1) / segments) * twoPi - halfPi; // Start from top
      const saturation = (i / segments) * 100;

      const gradient = ctx.createRadialGradient(
        center.x, center.y, saturationRingInnerRadius,
        center.x, center.y, saturationRingOuterRadius
      );
      const clr = `hsl(${h}, ${saturation}%, 50%)`;
      gradient.addColorStop(0, clr);
      gradient.addColorStop(1, clr);

      ctx.beginPath();
      ctx.arc(center.x, center.y, saturationRingOuterRadius, startAngle, endAngle);
      ctx.arc(center.x, center.y, saturationRingInnerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  private drawLightnessRing(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, lightnessRingInnerRadius, lightnessRingOuterRadius } = this.geometry;
    const [h, s] = this.currentHsla();
    const segments = this.radialSegments((lightnessRingInnerRadius + lightnessRingOuterRadius) / 2);
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;

    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * twoPi - halfPi; // Start from top
      const endAngle = ((i + 1) / segments) * twoPi - halfPi; // Start from top
      const lightness = (i / segments) * 100;

      const gradient = ctx.createRadialGradient(
        center.x, center.y, lightnessRingInnerRadius,
        center.x, center.y, lightnessRingOuterRadius
      );
      const clr = `hsl(${h}, ${s}%, ${lightness}%)`;
      gradient.addColorStop(0, clr);
      gradient.addColorStop(1, clr);

      ctx.beginPath();
      ctx.arc(center.x, center.y, lightnessRingOuterRadius, startAngle, endAngle);
      ctx.arc(center.x, center.y, lightnessRingInnerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  private drawAlphaRing(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, alphaRingInnerRadius, alphaRingOuterRadius } = this.geometry;
    const [h, s, l] = this.currentHsla();
    const segments = this.radialSegments((alphaRingInnerRadius + alphaRingOuterRadius) / 2);
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;

    // Draw checkerboard background for alpha
    this.drawCheckerboardRing(alphaRingInnerRadius, alphaRingOuterRadius);

    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * twoPi - halfPi; // Start from top
      const endAngle = ((i + 1) / segments) * twoPi - halfPi; // Start from top
      const alpha = i / segments;

      const gradient = ctx.createRadialGradient(
        center.x, center.y, alphaRingInnerRadius,
        center.x, center.y, alphaRingOuterRadius
      );
      const clr = `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
      gradient.addColorStop(0, clr);
      gradient.addColorStop(1, clr);

      ctx.beginPath();
      ctx.arc(center.x, center.y, alphaRingOuterRadius, startAngle, endAngle);
      ctx.arc(center.x, center.y, alphaRingInnerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  private drawCheckerboardRing(innerRadius: number, outerRadius: number): void {
    if (!this.ctx || !this.geometry) return;

    // Create checkerboard pattern
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d')!;
    const checkerSize = 8;
    const checkerSize2 = checkerSize * 2;

    patternCanvas.width = checkerSize2;
    patternCanvas.height = checkerSize2;

    // Draw 2x2 checker pattern
    patternCtx.fillStyle = '#f0f0f0';
    patternCtx.fillRect(0, 0, checkerSize, checkerSize);
    patternCtx.fillRect(checkerSize, checkerSize, checkerSize, checkerSize);

    patternCtx.fillStyle = '#d0d0d0';
    patternCtx.fillRect(checkerSize, 0, checkerSize, checkerSize);
    patternCtx.fillRect(0, checkerSize, checkerSize, checkerSize);

    // Create pattern
    const pattern = this.ctx.createPattern(patternCanvas, 'repeat')!;

    // Draw ring with pattern
    const { center } = this.geometry;
    const twoPi = 2 * Math.PI;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, outerRadius, 0, twoPi);
    this.ctx.arc(center.x, center.y, innerRadius, 0, twoPi, true);
    this.ctx.fillStyle = pattern;
    this.ctx.fill();
    this.ctx.restore();
  }

  private drawCenterDisc(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, centerRadius } = this.geometry;
    const [h, s, l, a] = this.currentHsla();
    const twoPi = 2 * Math.PI;

    // Draw checkerboard background if alpha is enabled
    if (this.alphaChannel()) {
      this.drawCheckerboardCenter();
    }

    ctx.beginPath();
    ctx.arc(center.x, center.y, centerRadius, 0, twoPi);
    ctx.fillStyle = this.alphaChannel() ? 
      `hsla(${h}, ${s}%, ${l}%, ${a})` : 
      `hsl(${h}, ${s}%, ${l}%)`;
    ctx.fill();
  }

  private drawCheckerboardCenter(): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, centerRadius } = this.geometry;
    const checkSize = 8;
    const checks = Math.ceil(centerRadius * 2 / checkSize);
    const twoPi = 2 * Math.PI;

    ctx.save();
    ctx.beginPath();
    ctx.arc(center.x, center.y, centerRadius, 0, twoPi);
    ctx.clip();

    for (let x = 0; x < checks; x++) {
      for (let y = 0; y < checks; y++) {
        const isLight = (x + y) % 2 === 0;
        ctx.fillStyle = isLight ? '#ffffff' : '#cccccc';
        ctx.fillRect(
          center.x - centerRadius + x * checkSize,
          center.y - centerRadius + y * checkSize,
          checkSize,
          checkSize
        );
      }
    }

    ctx.restore();
  }

  private drawHueHandle(): void {
    if (!this.ctx || !this.geometry) return;

    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const [h] = this.currentHsla();
    const angle = (h / 360) * twoPi - halfPi; // Start from top
    const radius = (this.geometry.hueRingInnerRadius + this.geometry.hueRingOuterRadius) / 2;
    
    this.drawHandle(angle, radius, `hsl(${h}, 100%, 50%)`);
  }

  private drawSaturationHandle(): void {
    if (!this.ctx || !this.geometry) return;

    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const [h, s] = this.currentHsla();
    const angle = (s / 100) * twoPi - halfPi; // Start from top
    const radius = (this.geometry.saturationRingInnerRadius + this.geometry.saturationRingOuterRadius) / 2;
    
    this.drawHandle(angle, radius, `hsl(${h}, ${s}%, 50%)`);
  }

  private drawLightnessHandle(): void {
    if (!this.ctx || !this.geometry) return;

    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const [h, s, l] = this.currentHsla();
    const angle = (l / 100) * twoPi - halfPi; // Start from top
    const radius = (this.geometry.lightnessRingInnerRadius + this.geometry.lightnessRingOuterRadius) / 2;
    
    this.drawHandle(angle, radius, `hsl(${h}, ${s}%, ${l}%)`);
  }

  private drawAlphaHandle(): void {
    if (!this.ctx || !this.geometry || !this.alphaChannel()) return;

    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const [h, s, l, a] = this.currentHsla();
    const angle = a * twoPi - halfPi; // Start from top
    const radius = (this.geometry.alphaRingInnerRadius + this.geometry.alphaRingOuterRadius) / 2;
    
    this.drawHandle(angle, radius, `hsla(${h}, ${s}%, ${l}%, ${a})`);
  }

  private drawHandle(angle: number, radius: number, fillColor: string): void {
    if (!this.ctx || !this.geometry) return;

    const ctx = this.ctx;
    const { center, handleRadius } = this.geometry;
    const twoPi = 2 * Math.PI;

    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;

    // Draw handle background
    ctx.beginPath();
    ctx.arc(x, y, handleRadius, 0, twoPi);
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Draw handle border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw handle inner border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private setupEventListeners(): void {
    const canvas = this.canvas().nativeElement;
    
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    
    // Add global listeners for drag and release
    this.document.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.document.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    this.document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private removeEventListeners(): void {
    this.document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    this.document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    this.document.removeEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private onMouseDown(event: MouseEvent): void {
    if (this.disabled()) return;
    
    event.preventDefault();
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.startDrag(x, y);
  }

  private onTouchStart(event: TouchEvent): void {
    if (this.disabled()) return;
    
    event.preventDefault();
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    this.startDrag(x, y);
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging()) return;
    
    event.preventDefault();
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.updateDrag(x, y);
  }

  private onTouchMove(event: TouchEvent): void {
    if (!this.isDragging()) return;
    
    event.preventDefault();
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    this.updateDrag(x, y);
  }

  private onMouseUp(): void {
    this.endDrag();
  }

  private onTouchEnd(): void {
    this.endDrag();
  }

  private startDrag(x: number, y: number): void {
    if (!this.geometry) return;

    const { center } = this.geometry;
    const dx = x - center.x;
    const dy = y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Determine which ring was clicked
    if (distance >= this.geometry.hueRingInnerRadius && distance <= this.geometry.hueRingOuterRadius) {
      this.dragTarget = hueRing;
    } else if (distance >= this.geometry.saturationRingInnerRadius && distance <= this.geometry.saturationRingOuterRadius) {
      this.dragTarget = saturationRing;
    } else if (distance >= this.geometry.lightnessRingInnerRadius && distance <= this.geometry.lightnessRingOuterRadius) {
      this.dragTarget = lightnessRing;
    } else if (this.alphaChannel() && distance >= this.geometry.alphaRingInnerRadius && distance <= this.geometry.alphaRingOuterRadius) {
      this.dragTarget = alphaRing;
    } else {
      return; // Not in any ring
    }

    this.isDragging.set(true);
    this.updateDrag(x, y);
  }

  private updateDrag(x: number, y: number): void {
    if (!this.geometry || !this.dragTarget) return;

    const { center } = this.geometry;
    const dx = x - center.x;
    const dy = y - center.y;
    const angle = Math.atan2(dy, dx) + Math.PI / 2; // Start from top
    const normalizedAngle = (angle < 0 ? angle + 2 * Math.PI : angle) / (2 * Math.PI);

    const [h, s, l, a] = this.currentHsla();
    let newHsla: [number, number, number, number] = [h, s, l, a];

    switch (this.dragTarget) {
      case hueRing:
        newHsla[0] = normalizedAngle * 360;
        break;
      case saturationRing:
        newHsla[1] = normalizedAngle * 100;
        break;
      case lightnessRing:
        newHsla[2] = normalizedAngle * 100;
        break;
      case alphaRing:
        newHsla[3] = normalizedAngle;
        break;
    }

    this.currentHsla.set(newHsla);
    this.render();
    this.emitColorChange();
  }

  private endDrag(): void {
    this.isDragging.set(false);
    this.dragTarget = null;
  }

  private emitColorChange(): void {
    const [h, s, l, a] = this.currentHsla();
    const hex = this.hslaToHex(h, s, l, this.alphaChannel() ? a : undefined);
    
    this.hexValueChange.emit(hex);
    
    const colorData = {
      hex,
      hsl: [h, s, l] as [number, number, number]
    };
    
    if (this.alphaChannel()) {
      (colorData as any).alpha = a;
    }
    
    this.colorChange.emit(colorData);
  }

  // Color conversion utility methods
  private isValidHex(hex: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
  }

  private isValidHexa(hex: string): boolean {
    return /^#[0-9A-Fa-f]{8}$/.test(hex);
  }

  private hexToHsla(hex: string): [number, number, number, number] {
    // Remove the hash symbol
    const cleanHex = hex.slice(1);
    
    // Parse RGB values
    const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
    const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
    const b = parseInt(cleanHex.slice(4, 6), 16) / 255;
    
    // Parse alpha if present
    let a = 1;
    if (cleanHex.length === 8) {
      a = parseInt(cleanHex.slice(6, 8), 16) / 255;
    }

    // Convert RGB to HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (max !== min) {
      const delta = max - min;
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case r:
          h = (g - b) / delta + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / delta + 2;
          break;
        case b:
          h = (r - g) / delta + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100, a];
  }

  private hslaToHex(h: number, s: number, l: number, a?: number): string {
    // Normalize values
    h = h / 360;
    s = s / 100;
    l = l / 100;

    // Convert HSL to RGB
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    // Convert to hex
    const toHex = (c: number): string => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    if (a !== undefined) {
      hex += toHex(a);
    }

    return hex;
  }

  private hexToRgb(hex: string): [number, number, number] {
    // Remove the hash symbol if present
    const cleanHex = hex.replace('#', '');
    
    // Parse RGB values (0-255)
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    
    return [r, g, b];
  }

  private getLuminance(rgb: [number, number, number]): number {
    // Convert RGB to relative luminance using the formula from WCAG
    const [r, g, b] = rgb.map(c => {
      const srgb = c / 255;
      return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}