import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ColorDiscPickerComponent } from 'projects/mb/src/lib/colors/color-disc/color-disc-picker.component';

@Component({
  selector: 'app-mb-color-disc-02-picker',
  templateUrl: './color-disc-02-picker.component.html',
  styleUrls: ['./color-disc-02-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatSelectModule,
    MatSlideToggleModule,
    ColorDiscPickerComponent
  ]
})
export class ColorDisc02PickerComponent {
  // Default
  protected defaultHexColor = signal<string>('#ff4081');
  protected defaultColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);

  // Layout
  protected layoutMode = signal<'outer-lightness' | 'outer-hue'>('outer-hue');
  protected layoutHexColor = signal<string>('#4caf50');
  protected layoutColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);

  // Alpha channel
  protected alphaHexColor = signal<string>('#2196f3');
  protected alphaColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected alphaEnabled = signal<boolean>(false);

  // Diameter variations
  protected diameterHexColor = signal<string>('#ff9800');
  protected diameterColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected diameterValue = signal<number>(280);

  // Ring width variations
  protected ringWidthHexColor = signal<string>('#9c27b0');
  protected ringWidthColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected ringWidthValue = signal<number>(24);

  // Handle size variations
  protected handleSizeHexColor = signal<string>('#795548');
  protected handleSizeColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected handleSizeValue = signal<number>(12);

  // Resolution
  protected resolutionHexColor = signal<string>('#607d8b');
  protected resolutionColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected resolutionValue = signal<number | 'auto'>('auto');

  // Background
  protected backgroundHexColor = signal<string>('#e91e63');
  protected backgroundColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected backgroundValue = signal<string>('auto');

  // Show value
  protected showValueHexColor = signal<string>('#00bcd4');
  protected showValueColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected showValueEnabled = signal<boolean>(true);

  // Disabled state
  protected disabledHexColor = signal<string>('#3f51b5');
  protected disabledColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected disabledValue = signal<boolean>(false);

  // Advanced configuration
  protected advancedHexColor = signal<string>('#ff5722');
  protected advancedColor = signal<{ hex: string; hsl: [number, number, number]; alpha?: number } | null>(null);
  protected advancedLayout = signal<'outer-lightness' | 'outer-hue'>('outer-hue');
  protected advancedDiameter = signal<number>(320);
  protected advancedRingWidth = signal<number>(28);
  protected advancedHandleSize = signal<number>(14);
  protected advancedResolution = signal<number | 'auto'>('auto');
  protected advancedBackground = signal<string>('auto');
  protected advancedAlpha = signal<boolean>(true);
  protected advancedShowValue = signal<boolean>(true);
  protected advancedDisabled = signal<boolean>(false);

  // Picker events tracking
  protected pickerEvents = signal<string[]>([]);

  protected onPickerOpened(): void {
    const events = this.pickerEvents();
    events.push('opened');
    this.pickerEvents.set([...events]);
  }

  protected onPickerClosed(): void {
    const events = this.pickerEvents();
    events.push('closed');
    this.pickerEvents.set([...events]);
  }
}
