import { Directive, OnChanges, OnDestroy, HostListener, ComponentRef, ElementRef, ViewContainerRef, input, output, inject } from '@angular/core';

import { ColorPickerComponent } from './color-picker.component';

@Directive({
    selector: '[mbColorPicker]',
    exportAs: 'mbColorPicker'
})
export class ColorPickerDirective implements OnChanges, OnDestroy {
  private vcRef = inject(ViewContainerRef);
  private elRef = inject(ElementRef);

  private dialog: ColorPickerComponent | null = null;
  private cmpRef: ComponentRef<ColorPickerComponent> | null = null;
  private dialogCreated = false;

  readonly colorPicker = input.required<string>();
  readonly colorPresets = input<string[]>([]);
  readonly colorAlpha = input(true);

  readonly colorSelected = output<string>();
  readonly colorChanged = output<string>();

  @HostListener('click') handleClick(): void {
    this.inputFocus();
  }

  @HostListener('focus') handleFocus(): void {
    this.inputFocus();
  }

  ngOnDestroy(): void {
    if (this.cmpRef != null) {
      this.cmpRef.destroy();
      this.cmpRef = null;
      this.dialog = null;
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.colorPicker) {
      if (this.dialog) {
        this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
      }
    }

    if (changes.colorPresets) {
      if (this.dialog) {
        this.dialog.setPresetColors(this.colorPresets());
      }
    }

    if (changes.colorAlpha) {
      if (this.dialog) {
        this.dialog.setAlpha(this.colorAlpha());
      }
    }
  }

  public openDialog(): void {
    if (!this.dialogCreated) {
      const vcRef = this.vcRef;

      this.dialogCreated = true;
      this.cmpRef = vcRef.createComponent(ColorPickerComponent);
      this.cmpRef.instance.setupDialog(this, this.elRef, this.colorPicker(), this.colorAlpha(), this.colorPresets(), this.elRef);
      this.dialog = this.cmpRef.instance;

      if (this.vcRef !== vcRef) {
        this.cmpRef.changeDetectorRef.detectChanges();
      }
    } else if (this.dialog) {
      this.dialog.openDialog(this.colorPicker());
    }
  }

  public closeDialog(): void {
    if (this.dialog) {
      this.dialog.closeDialog();
    }
  }

  public colorChange(value: string): void {
    //TODO this.colorPicker = value;
    this.colorChanged.emit(value);
  }

  public colorSelect(value: string): void {
    //TODO this.colorPicker = value
    this.colorSelected.emit(value);
  }

  public inputFocus(): void {
    const element = this.elRef.nativeElement;

    if (typeof document !== 'undefined' && element === document.activeElement) {
      this.openDialog();
    } else if (!this.dialog || !this.dialog.show) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }
}
