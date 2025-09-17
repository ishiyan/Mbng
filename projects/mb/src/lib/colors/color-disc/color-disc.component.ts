import { Component, ElementRef, input, output, viewChild, effect, signal, ChangeDetectionStrategy, OnDestroy, afterNextRender, computed, inject, DOCUMENT } from '@angular/core';

interface DiscGeometry {
  center: { x: number; y: number };
  wheelRadius: number;
  middleRingInnerRadius: number;
  middleRingOuterRadius: number;
  outerRingInnerRadius: number;
  outerRingOuterRadius: number;
  handleRadius: number;
}

@Component({
  selector: 'mb-color-disc',
  templateUrl: './color-disc.component.html',
  styleUrls: ['./color-disc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ColorDiscComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // Input properties
  /** Layout mode: 'outer-lightness' shows lightness on outer ring, 'outer-hue' shows hue on outer ring */
  readonly layout = input<'outer-lightness' | 'outer-hue'>('outer-hue');
  /** Enable alpha channel control (opacity/transparency) */
  readonly alphaChannel = input<boolean>(false);
  /** Overall diameter of the color disc in pixels */
  readonly diameter = input<number>(280);
  /** Width of each color ring in pixels */
  readonly ringWidth = input<number>(24);
  /** Size of the color selection handle in pixels */
  readonly handleSize = input<number>(12);
  /** Resolution for high-DPI displays - use 'auto' for automatic detection based on devicePixelRatio, or specify a number (1-3) for manual control */
  readonly resolution = input<number | 'auto'>('auto');
  /** Whether the color disc is disabled and non-interactive */
  readonly disabled = input<boolean>(false);
  /** Initial hex color value (with or without alpha channel, e.g., '#ff4081' or '#ff408180') */
  readonly hexValue = input<string>('#ff4081');
  /** Background color behind the color disc - 'auto' uses theme background, 'transparent' for no background, or any CSS color value */
  readonly backgroundColor = input<string>('auto');

  // Output events
  /** Emitted only a hex value when a color is selected from the picker */
  readonly hexValueChange = output<string>();
  /** Emitted when a color is selected from the picker */
  readonly colorChange = output<{ hex: string; hsl: [number, number, number]; alpha?: number }>();

  // Internal state
  protected readonly isDragging = signal<boolean>(false);
  private ctx: CanvasRenderingContext2D | null = null;
  private geometry: DiscGeometry | null = null;
  private currentHsla = signal<[number, number, number, number]>([0, 100, 50, 1]);
  private dragTarget: 'wheel' | 'middle-ring' | 'outer-ring' | null = null;

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
        this.scheduleRender();
      }
    });

    // React to size changes
    effect(() => {
      this.diameter();
      this.ringWidth();
      this.handleSize();
      this.effectiveResolution();
      this.alphaChannel();
      this.updateCanvasSize();
    });

    // Render when HSLA changes
    effect(() => {
      this.currentHsla();
      this.layout();
      this.scheduleRender();
    });
  }

  private abortController = new AbortController();

  ngOnDestroy(): void {
    // This will automatically remove all event listeners added with this signal
    this.abortController.abort();
  }

  private initializeCanvas(): void {
    const canvas = this.canvas().nativeElement;

    this.ctx = canvas.getContext('2d', { alpha: true });
    this.updateCanvasSize();
    this.attachEventListeners();
  }

  private updateCanvasSize(): void {
    if (!this.ctx) return;

    const canvas = this.canvas().nativeElement;
    const diameter = this.diameter();
    const resolution = this.effectiveResolution();
    const pixelSize = diameter * resolution;

    // Set canvas internal size
    canvas.width = pixelSize;
    canvas.height = pixelSize;

    // Set CSS size
    canvas.style.width = `${diameter}px`;
    canvas.style.height = `${diameter}px`;

    // Scale context for high-DPI
    this.ctx.scale(resolution, resolution);
    this.ctx.imageSmoothingEnabled = true;

    // Calculate geometry
    const center = diameter / 2;
    const ringWidth = this.ringWidth();
    const handleRadius = this.handleSize() / 2;
    const gapSize = 4;

    if (this.alphaChannel()) {
      // Layout with middle (alpha) ring between inner disc and outer ring
      const outerRingOuterRadius = center - gapSize;
      const outerRingInnerRadius = center - ringWidth - gapSize;
      const middleRingOuterRadius = outerRingInnerRadius - gapSize;
      const middleRingInnerRadius = middleRingOuterRadius - Math.round(ringWidth * 0.7);
      const wheelRadius = middleRingInnerRadius - gapSize;

      this.geometry = {
        center: { x: center, y: center },
        wheelRadius,
        middleRingInnerRadius: middleRingInnerRadius,
        middleRingOuterRadius: middleRingOuterRadius,
        outerRingInnerRadius: outerRingInnerRadius,
        outerRingOuterRadius: outerRingOuterRadius,
        handleRadius
      };
    } else {
      // layout without middle (alpha) ring
      const outerRingOuterRadius = center - gapSize;
      const outerRingInnerRadius = center - ringWidth - gapSize;
      const wheelRadius = outerRingInnerRadius - handleRadius - gapSize;

      this.geometry = {
        center: { x: center, y: center },
        wheelRadius,
        middleRingInnerRadius: 0,
        middleRingOuterRadius: 0,
        outerRingInnerRadius: outerRingInnerRadius,
        outerRingOuterRadius: outerRingOuterRadius,
        handleRadius
      };
    }

    this.scheduleRender();
  }

  private scheduleRender(): void {
    requestAnimationFrame(() => this.render());
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

    const canvas = this.canvas().nativeElement;
    const bgColor = this.getEffectiveBackgroundColor();

    // Clear/fill canvas based on background setting
    const resolution = this.effectiveResolution();
    if (bgColor === 'transparent') {
      this.ctx.clearRect(0, 0, canvas.width / resolution, canvas.height / resolution);
    } else {
      this.ctx.fillStyle = bgColor;
      this.ctx.fillRect(0, 0, canvas.width / resolution, canvas.height / resolution);
    }

    const layoutMode = this.layout();
    if (layoutMode === 'outer-lightness') {
      // Inner hue/saturation wheel, outer lightness ring
      this.renderInnerSaturationHueColorWheel();
      this.renderOuterLightnessRing();
    } else {
      // Inner saturation/lightness area, outer hue ring
      this.renderInnerSaturationLightnessColorWheel();
      this.renderOuterHueRing();
    }

    // Render middle (alpha) ring if enabled
    if (this.alphaChannel()) {
      this.renderMiddleAlphaRing();
    }

    this.renderHandles();
  }

  private renderMiddleAlphaRing(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, middleRingInnerRadius, middleRingOuterRadius } = this.geometry;
    const [hue, saturation, lightness] = this.currentHsla();

    // Draw checkerboard background
    this.drawCheckerboardInRing(center, middleRingInnerRadius, middleRingOuterRadius);

    // Draw alpha gradient overlay
    const segments = this.radialSegments(middleRingOuterRadius);
    const factor = 2 * Math.PI / segments;

    for (let i = 0; i < segments; i++) {
      const alpha = i / segments;
      const startAngle = factor * i;
      const endAngle = factor * (i + 1);

      this.ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, middleRingOuterRadius, startAngle, endAngle);
      this.ctx.arc(center.x, center.y, middleRingInnerRadius, endAngle, startAngle, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private drawCheckerboardInRing(center: { x: number; y: number }, innerR: number, outerR: number): void {
    if (!this.ctx) return;

    // Create checkerboard pattern
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d')!;
    const checkerSize = 8;

    patternCanvas.width = checkerSize * 2;
    patternCanvas.height = checkerSize * 2;

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
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, outerR, 0, Math.PI * 2);
    this.ctx.arc(center.x, center.y, innerR, 0, Math.PI * 2, true);
    this.ctx.fillStyle = pattern;
    this.ctx.fill();
    this.ctx.restore();
  }

  private renderInnerSaturationHueColorWheel(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, wheelRadius } = this.geometry;
    const segments = this.radialSegments(wheelRadius);
    const factor = 2 * Math.PI / segments;
    const coeff = 360 / segments;

    for (let i = 0; i < segments; i++) {
      const hue = coeff * i;
      const startAngle = factor * i;
      const endAngle = factor * (i + 1);

      // Create radial gradient for saturation
      const gradient = this.ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, wheelRadius
      );
      gradient.addColorStop(0, `hsl(${hue}, 0%, 50%)`);
      gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.moveTo(center.x, center.y);
      this.ctx.arc(center.x, center.y, wheelRadius, startAngle, endAngle);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private renderOuterLightnessRing(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, outerRingInnerRadius, outerRingOuterRadius } = this.geometry;
    const [hue, saturation] = this.currentHsla();
    const segments = this.radialSegments(outerRingOuterRadius);
    const factor = 2 * Math.PI / segments;
    const coeff = 100 / segments;

    for (let i = 0; i < segments; i++) {
      const lightness = coeff * i;
      const startAngle = factor * i;
      const endAngle = factor * (i + 1);

      this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, outerRingOuterRadius, startAngle, endAngle);
      this.ctx.arc(center.x, center.y, outerRingInnerRadius, endAngle, startAngle, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private renderOuterHueRing(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, outerRingInnerRadius, outerRingOuterRadius } = this.geometry;
    const [, saturation, lightness] = this.currentHsla();
    const segments = this.radialSegments(outerRingOuterRadius);
    const factor = 2 * Math.PI / segments;
    const coeff = 360 / segments;

    for (let i = 0; i < segments; i++) {
      const angle = i * factor;
      const nextAngle = (i + 1) * factor;
      const hue = coeff * i;

      const gradient = this.ctx.createRadialGradient(center.x, center.y, outerRingInnerRadius, center.x, center.y, outerRingOuterRadius);
      gradient.addColorStop(0, `hsl(${hue}, ${saturation}%, ${lightness}%)`);
      gradient.addColorStop(1, `hsl(${hue}, ${saturation}%, ${lightness}%)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, outerRingOuterRadius, angle, nextAngle);
      this.ctx.arc(center.x, center.y, outerRingInnerRadius, nextAngle, angle, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private renderInnerSaturationLightnessColorWheel(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, wheelRadius } = this.geometry;
    const [hue] = this.currentHsla();

    // Save current context state
    this.ctx.save();

    // Translate to center for easier coordinate system
    this.ctx.translate(center.x, center.y);

    // Create clipping circle to keep gradients within wheel bounds
    this.ctx.beginPath();
    this.ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
    this.ctx.clip();
    this.ctx.closePath();

    // Lightness gradient (vertical: top = white, bottom = black)
    const lightnessGradient = this.ctx.createLinearGradient(
      0, -wheelRadius, // Start at top
      0, wheelRadius   // End at bottom
    );
    lightnessGradient.addColorStop(0, 'white');
    lightnessGradient.addColorStop(1, 'black');

    // Saturation gradient (horizontal: left = transparent, right = full saturation)
    const saturationGradient = this.ctx.createLinearGradient(
      -wheelRadius, 0, // Start at left
      wheelRadius, 0   // End at right
    );
    saturationGradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0)`); // Transparent (no saturation)
    saturationGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`); // Full saturation

    // Fill the circle with lightness gradient
    this.ctx.fillStyle = lightnessGradient;
    this.ctx.fill();

    // Apply saturation gradient using multiply blend mode
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.fillStyle = saturationGradient;
    this.ctx.fill();

    // Reset blend mode
    this.ctx.globalCompositeOperation = 'source-over';

    // Restore context state
    this.ctx.restore();
  }

  private renderHandles(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, wheelRadius, middleRingInnerRadius, middleRingOuterRadius, outerRingInnerRadius, outerRingOuterRadius, handleRadius } = this.geometry;
    const [hue, saturation, lightness, alpha] = this.currentHsla();
    const layoutMode = this.layout();

    let wheelX: number, wheelY: number, ringX: number, ringY: number;

    if (layoutMode === 'outer-lightness') {
      // Wheel handle for hue/saturation, ring handle for lightness
      const wheelAngle = (hue * Math.PI) / 180;
      const wheelDistance = (saturation / 100) * wheelRadius;
      wheelX = center.x + Math.cos(wheelAngle) * wheelDistance;
      wheelY = center.y + Math.sin(wheelAngle) * wheelDistance;

      // Outer ring handle for lightness
      const ringAngle = (lightness / 100) * 2 * Math.PI;
      const ringRadius = (outerRingInnerRadius + outerRingOuterRadius) / 2;
      ringX = center.x + Math.cos(ringAngle) * ringRadius;
      ringY = center.y + Math.sin(ringAngle) * ringRadius;
    } else {
      // Wheel handle for saturation/lightness, ring handle for hue
      // rectangular positioning within circle
      // Map saturation (0-100%) to horizontal position (-wheelRadius to +wheelRadius)
      const saturationX = ((saturation / 100) * 2 - 1) * wheelRadius;

      // Map lightness (0-100%) to vertical position (+wheelRadius to -wheelRadius)
      // Note: Y increases downward in canvas, so we invert
      const lightnessY = ((1 - lightness / 100) * 2 - 1) * wheelRadius;

      // Ensure handle stays within circle bounds
      const distance = Math.sqrt(saturationX * saturationX + lightnessY * lightnessY);
      if (distance > wheelRadius) {
        const scale = wheelRadius / distance;
        wheelX = center.x + saturationX * scale;
        wheelY = center.y + lightnessY * scale;
      } else {
        wheelX = center.x + saturationX;
        wheelY = center.y + lightnessY;
      }

      // Outer ring handle for hue
      const ringAngle = (hue / 360) * 2 * Math.PI;
      const ringRadius = (outerRingInnerRadius + outerRingOuterRadius) / 2;
      ringX = center.x + Math.cos(ringAngle) * ringRadius;
      ringY = center.y + Math.sin(ringAngle) * ringRadius;
    }

    // Ring handle for the middle (alpha) ring (if alpha channel is enabled)
    if (this.alphaChannel()) {
      const middleAngle = alpha * 2 * Math.PI;
      const middleRadius = (middleRingInnerRadius + middleRingOuterRadius) / 2;
      const middleX = center.x + Math.cos(middleAngle) * middleRadius;
      const middleY = center.y + Math.sin(middleAngle) * middleRadius;
      this.drawHandle(middleX, middleY, handleRadius, '#ffffff', '#333333');
    }

    // Draw handles
    this.drawHandle(wheelX, wheelY, handleRadius, '#ffffff', '#333333');
    this.drawHandle(ringX, ringY, handleRadius, '#ffffff', '#333333');
  }

  private drawHandle(x: number, y: number, radius: number, fill: string, stroke: string): void {
    if (!this.ctx) return;

    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = 2;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  private attachEventListeners(): void {
    const canvas = this.canvas().nativeElement;
    const signal = this.abortController.signal;

    // Mouse events with abort signal
    canvas.addEventListener('mousedown', this.handlePointerDown, { signal });
    document.addEventListener('mousemove', this.handlePointerMove, { signal });
    document.addEventListener('mouseup', this.handlePointerUp, { signal });

    // Touch events with abort signal
    canvas.addEventListener('touchstart', this.handleTouchStart, { signal });
    document.addEventListener('touchmove', this.handleTouchMove, { signal });
    document.addEventListener('touchend', this.handleTouchEnd, { signal });

    // Prevent context menu with abort signal
    canvas.addEventListener('contextmenu', this.preventContextMenu, { signal });
  }

  private handlePointerDown = (event: MouseEvent): void => {
    if (this.disabled()) return;

    event.preventDefault();
    const coords = this.getEventCoordinates(event);
    this.startDragging(coords);
  };

  private handlePointerMove = (event: MouseEvent): void => {
    if (!this.isDragging() || this.disabled() || this.abortController.signal.aborted) return;

    event.preventDefault();
    const coords = this.getEventCoordinates(event);
    this.updateColor(coords);
  };

  private handlePointerUp = (): void => {
    if (this.abortController.signal.aborted) return;
    this.stopDragging();
  };

  private handleTouchStart = (event: TouchEvent): void => {
    if (this.disabled()) return;

    event.preventDefault();
    const touch = event.touches[0];
    const coords = this.getTouchCoordinates(touch);
    this.startDragging(coords);
  };

  private handleTouchMove = (event: TouchEvent): void => {
    if (!this.isDragging() || this.disabled() || this.abortController.signal.aborted) return;

    event.preventDefault();
    const touch = event.touches[0];
    const coords = this.getTouchCoordinates(touch);
    this.updateColor(coords);
  };

  private handleTouchEnd = (event: TouchEvent): void => {
    if (this.abortController.signal.aborted) return;
    event.preventDefault();
    this.stopDragging();
  };

  private preventContextMenu = (event: Event): void => {
    event.preventDefault();
  };

  private getEventCoordinates(event: MouseEvent): { x: number; y: number } {
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  private getTouchCoordinates(touch: Touch): { x: number; y: number } {
    const rect = this.canvas().nativeElement.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  private startDragging(coords: { x: number; y: number }): void {
    if (!this.geometry) return;

    const { center, wheelRadius, middleRingInnerRadius, middleRingOuterRadius, outerRingInnerRadius, outerRingOuterRadius } = this.geometry;
    const dx = coords.x - center.x;
    const dy = coords.y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Determine drag target
    if (distance <= wheelRadius + 8) {
      this.dragTarget = 'wheel';
    } else if (this.alphaChannel() && distance >= middleRingInnerRadius - 8 && distance <= middleRingOuterRadius + 8) {
      this.dragTarget = 'middle-ring';
    } else if (distance >= outerRingInnerRadius - 8 && distance <= outerRingOuterRadius + 8) {
      this.dragTarget = 'outer-ring';
    } else {
      return; // Outside valid areas
    }

    this.isDragging.set(true);
    this.updateColor(coords);
  }

  private updateColor(coords: { x: number; y: number }): void {
    if (!this.geometry || !this.dragTarget) return;

    if (this.abortController.signal.aborted) return;

    const { center } = this.geometry;
    const dx = coords.x - center.x;
    const dy = coords.y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const wheelRadius = this.geometry.wheelRadius;

    let [hue, saturation, lightness, alpha] = this.currentHsla();
    const layoutMode = this.layout();

    if (this.dragTarget === 'wheel') {
      if (layoutMode === 'outer-lightness') {
        // Inner wheel controls hue and saturation
        hue = ((angle * 180) / Math.PI + 360) % 360;
        saturation = Math.min(100, (distance / wheelRadius) * 100);
      } else {
        // Inner area controls saturation and lightness
        // Rectangular coordinate mapping within circle
        // Only process if within circle bounds
        if (distance <= wheelRadius) {
          const wheelDiameter = 2 * wheelRadius;
          // Map horizontal position to saturation (left = 0%, right = 100%)
          saturation = Math.max(0, Math.min(100, ((dx + wheelRadius) / wheelDiameter) * 100));

          // Map vertical position to lightness (top = 100%, bottom = 0%)
          lightness = Math.max(0, Math.min(100, (1 - (dy + wheelRadius) / wheelDiameter) * 100));
        }
      }
    } else if (this.dragTarget === 'middle-ring') {
      // Handle middle (alpha) ring interaction
      let normalizedAngle = angle;
      if (normalizedAngle < 0) {
        normalizedAngle += 2 * Math.PI;
      }
      alpha = normalizedAngle / (2 * Math.PI);
    } else if (this.dragTarget === 'outer-ring') {
      let normalizedAngle = angle;
      if (normalizedAngle < 0) {
        normalizedAngle += 2 * Math.PI;
      }

      if (layoutMode === 'outer-lightness') {
        // Outer ring controls lightness
        lightness = Math.max(0, Math.min(100, (normalizedAngle / (2 * Math.PI)) * 100));
      } else {
        // Outer ring controls hue
        hue = (normalizedAngle / (2 * Math.PI)) * 360;
      }
    }

    const newHsla: [number, number, number, number] = [hue, saturation, lightness, alpha];
    this.currentHsla.set(newHsla);

    // Generate hex or hexa based on alpha
    const hex = this.generateHexOutput(newHsla);

    // Check abort signal before emitting
    if (!this.abortController.signal.aborted) {
      this.hexValueChange.emit(hex);
      this.colorChange.emit({ hex, hsl: [hue, saturation, lightness], alpha });
    }
  }

  private stopDragging(): void {
    this.isDragging.set(false);
    this.dragTarget = null;
  }

  // Color conversion utilities
  protected isValidHex(hex: string): boolean {
    const original = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
    const hexa = this.alphaChannel() ? this.isValidHexa(hex) : false;
    return original || hexa;
  }

  private isValidHexa(hex: string): boolean {
    return /^#([0-9A-Fa-f]{8})$/.test(hex);
  }

  private hexToHsla(hex: string): [number, number, number, number] {
    // Remove # if present
    hex = hex.replace('#', '');

    let r: number, g: number, b: number, a: number = 1;

    if (hex.length === 3) {
      // Short hex: #RGB
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      // Long hex: #RRGGBB
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      // Hexa: #RRGGBBAA
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    } else {
      return [0, 0, 0, 1];
    }

    const [h, s, l] = this.rgbToHsl([r, g, b]);
    return [h, s, l, a];
  }

  private generateHexOutput([h, s, l, a]: [number, number, number, number]): string {
    if (!this.alphaChannel() || a === 1) {
      return this.hslToHex([h, s, l]);
    }

    // Convert to HEXA format
    const rgb = this.hslToRgb([h, s, l]);
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
    const rgbHex = rgb.map(c => Math.round(c).toString(16).padStart(2, '0')).join('');

    return `#${rgbHex}${alphaHex}`;
  }

  private rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;

    let h = 0;
    let s = 0;
    const l = sum / 2;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;

      switch (max) {
        case r:
          h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / diff + 2) / 6;
          break;
        case b:
          h = ((r - g) / diff + 4) / 6;
          break;
      }
    }

    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(l * 100)
    ];
  }

  private hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
    h /= 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 1 / 6) {
      r = c; g = x; b = 0;
    } else if (1 / 6 <= h && h < 2 / 6) {
      r = x; g = c; b = 0;
    } else if (2 / 6 <= h && h < 3 / 6) {
      r = 0; g = c; b = x;
    } else if (3 / 6 <= h && h < 4 / 6) {
      r = 0; g = x; b = c;
    } else if (4 / 6 <= h && h < 5 / 6) {
      r = x; g = 0; b = c;
    } else if (5 / 6 <= h && h < 1) {
      r = c; g = 0; b = x;
    }

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }

  private hslToHex([h, s, l]: [number, number, number]): string {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c: number): string => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}