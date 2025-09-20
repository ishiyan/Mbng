import { Component, input, output, signal, ChangeDetectionStrategy, ElementRef, inject, viewChild } from '@angular/core';
import { OverlayModule, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { ColorRingComponent } from './color-ring.component';

@Component({
  selector: 'mb-color-ring-picker',
  templateUrl: './color-ring-picker.component.html',
  styleUrls: ['./color-ring-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayModule]
})
export class ColorRingPickerComponent {
  private overlay = inject(Overlay);

  private trigger = viewChild.required<ElementRef>('trigger');
  private overlayRef: OverlayRef | null = null;
  private isOpen = signal(false);

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
  /** Show the current color value as text in the trigger button */
  readonly showValue = input<boolean>(true);
  /** Automatically close the color picker when a color is selected */
  readonly closeOnSelect = input<boolean>(false);

  // Output events
  /** Emitted only a hex value when a color is selected from the picker */
  readonly hexValueChange = output<string>();
  /** Emitted when a color is selected from the picker */
  readonly colorChange = output<{ hex: string; hsl: [number, number, number]; alpha?: number }>();
  /** Emitted when the picker overlay is opened */
  readonly opened = output<void>();
  /** Emitted when the picker overlay is closed */
  readonly closed = output<void>();

  protected readonly currentHex = signal<string>('#ff4081');

  constructor() {
    // Update internal hex value when input changes
    this.currentHex.set(this.hexValue());
  }

  protected togglePicker(): void {
    if (this.disabled()) return;

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  protected open(): void {
    if (this.disabled() || this.isOpen()) return;

    const positionStrategy = this.createPositionStrategy();
    
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'color-ring-picker-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true
    });

    const portal = new ComponentPortal(ColorRingComponent);
    const componentRef = this.overlayRef.attach(portal);

    // Set input properties on the portal component
    componentRef.setInput('alphaChannel', this.alphaChannel());
    componentRef.setInput('diameter', this.diameter());
    componentRef.setInput('ringWidth', this.ringWidth());
    componentRef.setInput('handleSize', this.handleSize());
    componentRef.setInput('resolution', this.resolution());
    componentRef.setInput('disabled', false);
    componentRef.setInput('hexValue', this.currentHex());
    componentRef.setInput('backgroundColor', this.backgroundColor());

    // Subscribe to color changes
    componentRef.instance.hexValueChange.subscribe((hex: string) => {
      this.currentHex.set(hex);
      this.hexValueChange.emit(hex);
      
      if (this.closeOnSelect()) {
        this.close();
      }
    });

    componentRef.instance.colorChange.subscribe((color) => {
      this.colorChange.emit(color);
    });

    // Handle backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    // Handle escape key
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    this.isOpen.set(true);
    this.opened.emit();
  }

  protected close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.isOpen.set(false);
    this.closed.emit();
  }

  private createPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.trigger())
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8
        }
      ])
      .withPush(true)
      .withFlexibleDimensions(true)
      .withViewportMargin(16);
  }

  protected getTriggerStyle(): { [key: string]: string } {
    const hex = this.currentHex();
    return {
      'background-color': hex,
      'border': '1px solid #ccc'
    };
  }

  protected getContrastColor(hex: string): string {
    // Remove hash if present
    const cleanHex = hex.replace('#', '');
    
    // Parse RGB
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
}