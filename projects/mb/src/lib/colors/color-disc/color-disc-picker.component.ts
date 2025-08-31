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
  /** Automatically close the color picker when a color is selected */
  readonly closeOnSelect = input<boolean>(false);

  // Output events
  /** Emitted only a hex value when a color is selected from the picker */
  readonly hexValueChange = output<string>();
  /** Emitted when a color is selected from the picker */
  readonly colorChange = output<{ hex: string; hsl: [number, number, number]; alpha?: number }>();
  /** Emitted when the picker overlay is opened */
  readonly pickerOpened = output<void>();
  /** Emitted when a picker overlay is closed */
  readonly pickerClosed = output<void>();

  protected togglePicker(): void {
    if (this.disabled()) return;

    if (this.isOpen()) {
      this.closePicker();
    } else {
      this.openPicker();
    }
  }

  private openPicker(): void {
    if (this.overlayRef || this.disabled()) return;

    const positionStrategy: PositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger())
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8 }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'color-picker-overlay'
    });

    // Close when backdrop is clicked (this handles click-outside)
    // Handle both click and touchstart for mobile compatibility
    this.overlayRef.backdropClick().subscribe(() => {
      this.closePicker();
    });

    // Add additional touch event handling for mobile
    this.overlayRef.attachments().subscribe(() => {
      const backdropElement = this.overlayRef?.backdropElement;
      if (backdropElement) {
        // Add both mouse and touch events
        backdropElement.addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.closePicker();
        }, { passive: false });

        // Also handle touchend as fallback
        backdropElement.addEventListener('touchend', (event) => {
          event.preventDefault();
          this.closePicker();
        }, { passive: false });
      }
    });

    // Close on Escape key
    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closePicker();
      }
    });

    const colorDiscPortal = new ComponentPortal(ColorDiscComponent);
    const componentRef = this.overlayRef.attach(colorDiscPortal);

    // Configure the color disc
    componentRef.setInput('alphaChannel', this.alphaChannel());
    componentRef.setInput('layout', this.layout());
    componentRef.setInput('diameter', this.diameter());
    componentRef.setInput('ringWidth', this.ringWidth());
    componentRef.setInput('handleSize', this.handleSize());
    componentRef.setInput('resolution', this.resolution());
    componentRef.setInput('disabled', this.disabled());
    componentRef.setInput('hexValue', this.hexValue());
    componentRef.setInput('backgroundColor', this.backgroundColor());

    // Handle color changes - only close if closeOnSelect is true
    componentRef.instance.hexValueChange.subscribe((hex) => {
      this.hexValueChange.emit(hex);

      // Close if closeOnSelect is true
      if (this.closeOnSelect()) {
        setTimeout(() => {
          this.closePicker();
        }, 0);
      }
    });

    componentRef.instance.colorChange.subscribe((colorEvent) => {
      this.colorChange.emit(colorEvent);
    });

    this.isOpen.set(true);
    this.pickerOpened.emit();
  }

  private closePicker(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOpen.set(false);
      this.pickerClosed.emit();
    }
  }
}