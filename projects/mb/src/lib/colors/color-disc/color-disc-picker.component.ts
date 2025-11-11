import { Component, input, output, signal, ChangeDetectionStrategy, ElementRef, inject, viewChild } from '@angular/core';
import { OverlayModule, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { ColorDiscComponent } from './color-disc.component';

@Component({
  selector: 'mb-color-disc-picker',
  templateUrl: './color-disc-picker.component.html',
  styleUrls: ['./color-disc-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayModule]
})
export class ColorDiscPickerComponent {
  private overlay = inject(Overlay);

  private trigger = viewChild.required<ElementRef>('trigger');
  private overlayRef: OverlayRef | null = null;
  private isOpen = signal(false);

  // Input properties
  /** Layout mode: 'outer-lightness' shows lightness on outer ring, 'outer-hue' shows hue on outer ring */
  readonly layout = input<'outer-lightness' | 'outer-hue'>('outer-lightness');
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
   /** Show the current color value as text in the trigger button */
  readonly showValue = input<boolean>(true);

  // Output events
  /** Emitted only a hex value when a color is selected from the picker */
  readonly hexValueChange = output<string>();
  /** Emitted when a color is selected from the picker */
  readonly colorChange = output<{ hex: string; hsl: [number, number, number]; alpha?: number }>();
  /** Emitted when the picker overlay is opened */
  readonly opened = output<void>();
  /** Emitted when a picker overlay is closed */
  readonly closed = output<void>();

  protected togglePicker(): void {
    if (this.disabled()) return;

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    if (this.overlayRef || this.disabled()) return;

    const positionStrategy: PositionStrategy = this.createPositionStrategy();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'color-picker-overlay',
      disposeOnNavigation: true
    });

    // Close when backdrop is clicked (this handles click-outside)
    // Handle both click and touchstart for mobile compatibility
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    // Add additional touch event handling for mobile
    this.overlayRef.attachments().subscribe(() => {
      const backdropElement = this.overlayRef?.backdropElement;
      if (backdropElement) {
        // Add both mouse and touch events
        backdropElement.addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.close();
        }, { passive: false });

        // Also handle touchend as fallback
        backdropElement.addEventListener('touchend', (event) => {
          event.preventDefault();
          this.close();
        }, { passive: false });
      }
    });

    // Close on Escape key
    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    const colorDiscPortal = new ComponentPortal(ColorDiscComponent);
    const componentRef = this.overlayRef.attach(colorDiscPortal);

    // Set input properties on the portal component
    componentRef.setInput('alphaChannel', this.alphaChannel());
    componentRef.setInput('layout', this.layout());
    componentRef.setInput('diameter', this.diameter());
    componentRef.setInput('ringWidth', this.ringWidth());
    componentRef.setInput('handleSize', this.handleSize());
    componentRef.setInput('resolution', this.resolution());
    componentRef.setInput('disabled', this.disabled());
    componentRef.setInput('hexValue', this.hexValue());
    componentRef.setInput('backgroundColor', this.backgroundColor());

    // Subscribe to color changes
    componentRef.instance.hexValueChange.subscribe((hex) => {
      this.hexValueChange.emit(hex);
    });

    componentRef.instance.colorChange.subscribe((colorEvent) => {
      this.colorChange.emit(colorEvent);
    });

    this.isOpen.set(true);
    this.opened.emit();
  }

  private close(): void {
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
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8 }
      ])
      .withPush(true)
      .withFlexibleDimensions(true)
      .withViewportMargin(16);
  }

}