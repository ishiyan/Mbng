import { Component, input, output, signal, ChangeDetectionStrategy, ElementRef, inject, viewChild, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
  private document = inject(DOCUMENT);

  private trigger = viewChild.required<ElementRef>('trigger');
  private overlayRef: OverlayRef | null = null;
  private isOpen = signal(false);

  // Input properties
  readonly diameter = input<number>(280);
  readonly ringWidth = input<number>(24);
  readonly handleSize = input<number>(12);
  readonly resolution = input<number>(2);
  readonly autoResolution = input<boolean>(false); // Enable auto-detection
  readonly disabled = input<boolean>(false);
  readonly hexValue = input<string>('#ff4081');
  readonly backgroundColor = input<string>('auto'); // 'auto', 'transparent', or any CSS color
  readonly showValue = input<boolean>(true);
  readonly closeOnSelect = input<boolean>(false);

  // Output events
  readonly hexValueChange = output<string>();
  readonly colorChanged = output<{ hex: string; hsl: [number, number, number] }>();
  readonly pickerOpened = output<void>();
  readonly pickerClosed = output<void>();

  constructor() {
  }

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
    this.overlayRef.backdropClick().subscribe(() => {
      this.closePicker();
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
    componentRef.setInput('diameter', this.diameter());
    componentRef.setInput('ringWidth', this.ringWidth());
    componentRef.setInput('handleSize', this.handleSize());
    componentRef.setInput('resolution', this.resolution());
    componentRef.setInput('autoResolution', this.autoResolution());
    componentRef.setInput('disabled', this.disabled());
    componentRef.setInput('hexValue', this.hexValue());
    componentRef.setInput('backgroundColor', this.backgroundColor());

    // Handle color changes - only close if closeOnSelect is true
    componentRef.instance.hexValueChange.subscribe(hex => {
      this.hexValueChange.emit(hex);
      
      // Only close if closeOnSelect is true
      if (this.closeOnSelect()) {
        this.closePicker();
      }
    });

    componentRef.instance.colorChanged.subscribe(colorEvent => {
      this.colorChanged.emit(colorEvent);
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