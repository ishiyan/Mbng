import { Component, ElementRef, input, output, viewChild, effect, signal, ChangeDetectionStrategy, OnDestroy, afterNextRender, computed, inject, DOCUMENT } from '@angular/core';

interface DiscGeometry {
  center: { x: number; y: number };
  wheelRadius: number;
  ringInnerRadius: number;
  ringOuterRadius: number;
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
  readonly diameter = input<number>(280);
  readonly ringWidth = input<number>(24);
  readonly handleSize = input<number>(12);
  readonly resolution = input<number>(1); // For high-DPI displays
  readonly autoResolution = input<boolean>(false); // Enable auto-detection
  readonly disabled = input<boolean>(false);
  readonly hexValue = input<string>('#ff4081');
  readonly backgroundColor = input<string>('auto'); // 'auto', 'transparent', 'var(--mat-sys-primary)', or any CSS color

  // Output events
  readonly hexValueChange = output<string>();
  readonly colorChanged = output<{ hex: string; hsl: [number, number, number] }>();

  // Internal state
  protected readonly isDragging = signal<boolean>(false);
  private ctx: CanvasRenderingContext2D | null = null;
  private geometry: DiscGeometry | null = null;
  private currentHsl = signal<[number, number, number]>([0, 100, 50]);
  private dragTarget: 'wheel' | 'ring' | null = null;

  // Computed resolution that considers auto-detection
  private readonly effectiveResolution = computed(() => {
    if (this.autoResolution()) {
      return Math.min(window.devicePixelRatio || 1, 3); // Cap at 3x for performance
    }
    return this.resolution();
  });

  constructor() {
    afterNextRender(() => {
      this.initializeCanvas();
    });

    // React to hex input changes
    effect(() => {
      const hex = this.hexValue();
      if (this.isValidHex(hex)) {
        const hsl = this.hexToHsl(hex);
        this.currentHsl.set(hsl);
        this.scheduleRender();
      }
    });

    // React to size changes
    effect(() => {
      this.diameter();
      this.ringWidth();
      this.handleSize();
      this.effectiveResolution();
      this.updateCanvasSize();
    });

    // Render when HSL changes
    effect(() => {
      this.currentHsl();
      this.scheduleRender();
    });
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
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

    this.geometry = {
      center: { x: center, y: center },
      wheelRadius: center - ringWidth - handleRadius - 8,
      ringInnerRadius: center - ringWidth - 4,
      ringOuterRadius: center - 4,
      handleRadius
    };

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
    if (bgColor === 'transparent') {
      this.ctx.clearRect(0, 0, canvas.width / this.effectiveResolution(), canvas.height / this.effectiveResolution());
    } else {
      this.ctx.fillStyle = bgColor;
      this.ctx.fillRect(0, 0, canvas.width / this.effectiveResolution(), canvas.height / this.effectiveResolution());
    }

    this.renderColorWheel();
    this.renderLightnessRing();
    this.renderHandles();
  }

  private renderColorWheel(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, wheelRadius } = this.geometry;
    const segments = 360;

    for (let i = 0; i < segments; i++) {
      const hue = i;
      const startAngle = (i * 2 * Math.PI) / segments;
      const endAngle = ((i + 1) * 2 * Math.PI) / segments;

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

  private renderLightnessRing(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, ringInnerRadius, ringOuterRadius } = this.geometry;
    const [hue, saturation] = this.currentHsl();
    const segments = 100;

    for (let i = 0; i < segments; i++) {
      const lightness = (i / segments) * 100;
      const startAngle = (i * 2 * Math.PI) / segments;
      const endAngle = ((i + 1) * 2 * Math.PI) / segments;

      this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, ringOuterRadius, startAngle, endAngle);
      this.ctx.arc(center.x, center.y, ringInnerRadius, endAngle, startAngle, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private renderHandles(): void {
    if (!this.ctx || !this.geometry) return;

    const { center, wheelRadius, ringInnerRadius, ringOuterRadius, handleRadius } = this.geometry;
    const [hue, saturation, lightness] = this.currentHsl();

    // Wheel handle position
    const wheelAngle = (hue * Math.PI) / 180;
    const wheelDistance = (saturation / 100) * wheelRadius;
    const wheelX = center.x + Math.cos(wheelAngle) * wheelDistance;
    const wheelY = center.y + Math.sin(wheelAngle) * wheelDistance;

    // Ring handle position  
    const ringAngle = (lightness / 100) * 2 * Math.PI;
    const ringRadius = (ringInnerRadius + ringOuterRadius) / 2;
    const ringX = center.x + Math.cos(ringAngle) * ringRadius;
    const ringY = center.y + Math.sin(ringAngle) * ringRadius;

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

    // Mouse events
    canvas.addEventListener('mousedown', this.handlePointerDown);
    document.addEventListener('mousemove', this.handlePointerMove);
    document.addEventListener('mouseup', this.handlePointerUp);

    // Touch events
    canvas.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);

    // Prevent context menu
    canvas.addEventListener('contextmenu', e => e.preventDefault());
  }

  private removeEventListeners(): void {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) return;

    canvas.removeEventListener('mousedown', this.handlePointerDown);
    document.removeEventListener('mousemove', this.handlePointerMove);
    document.removeEventListener('mouseup', this.handlePointerUp);
    canvas.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  private handlePointerDown = (event: MouseEvent): void => {
    if (this.disabled()) return;

    event.preventDefault();
    const coords = this.getEventCoordinates(event);
    this.startDragging(coords);
  };

  private handlePointerMove = (event: MouseEvent): void => {
    if (!this.isDragging() || this.disabled()) return;

    event.preventDefault();
    const coords = this.getEventCoordinates(event);
    this.updateColor(coords);
  };

  private handlePointerUp = (): void => {
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
    if (!this.isDragging() || this.disabled()) return;

    event.preventDefault();
    const touch = event.touches[0];
    const coords = this.getTouchCoordinates(touch);
    this.updateColor(coords);
  };

  private handleTouchEnd = (event: TouchEvent): void => {
    event.preventDefault();
    this.stopDragging();
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

    const { center, wheelRadius, ringInnerRadius, ringOuterRadius } = this.geometry;
    const dx = coords.x - center.x;
    const dy = coords.y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Determine drag target
    if (distance <= wheelRadius + 8) {
      this.dragTarget = 'wheel';
    } else if (distance >= ringInnerRadius - 8 && distance <= ringOuterRadius + 8) {
      this.dragTarget = 'ring';
    } else {
      return; // Outside valid areas
    }

    this.isDragging.set(true);
    this.updateColor(coords);
  }

  private updateColor(coords: { x: number; y: number }): void {
    if (!this.geometry || !this.dragTarget) return;

    const { center } = this.geometry;
    const dx = coords.x - center.x;
    const dy = coords.y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    let [hue, saturation, lightness] = this.currentHsl();

    if (this.dragTarget === 'wheel') {
      // Update hue and saturation
      hue = ((angle * 180) / Math.PI + 360) % 360;
      saturation = Math.min(100, (distance / this.geometry.wheelRadius) * 100);
    } else if (this.dragTarget === 'ring') {
      // Update lightness
      let normalizedAngle = angle;
      if (normalizedAngle < 0) {
        normalizedAngle += 2 * Math.PI; // Convert negative angles to positive
      }
      lightness = Math.max(0, Math.min(100, (normalizedAngle / (2 * Math.PI)) * 100));
    }

    const newHsl: [number, number, number] = [hue, saturation, lightness];
    this.currentHsl.set(newHsl);

    const hex = this.hslToHex(newHsl);
    this.hexValueChange.emit(hex);
    this.colorChanged.emit({ hex, hsl: newHsl });
  }

  private stopDragging(): void {
    this.isDragging.set(false);
    this.dragTarget = null;
  }

  // Color conversion utilities
  private isValidHex(hex: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
  }

  private hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    const l = sum / 2;

    let h = 0;
    let s = 0;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;

      switch (max) {
        case r: h = ((g - b) / diff) + (g < b ? 6 : 0); break;
        case g: h = (b - r) / diff + 2; break;
        case b: h = (r - g) / diff + 4; break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
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