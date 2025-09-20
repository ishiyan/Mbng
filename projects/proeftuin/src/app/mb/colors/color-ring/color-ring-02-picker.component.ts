import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ColorRingPickerComponent } from 'projects/mb/src/lib/colors/color-ring/color-ring-picker.component';

@Component({
  selector: 'app-mb-color-ring-02-picker',
  templateUrl: './color-ring-02-picker.component.html',
  styleUrls: ['./color-ring-02-picker.component.scss'],
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
    ColorRingPickerComponent
  ]
})
export class ColorRing02PickerComponent {
  // Default picker
  protected defaultHexColor = signal<string>('#ff4081');
  protected defaultColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);

  // Show value option
  protected showValueHexColor = signal<string>('#4caf50');
  protected showValueColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected showValueEnabled = signal<boolean>(true);

  // Close on select option
  protected closeOnSelectHexColor = signal<string>('#2196f3');
  protected closeOnSelectColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected closeOnSelectEnabled = signal<boolean>(false);

  // Alpha channel with picker
  protected alphaHexColor = signal<string>('#ff980080');
  protected alphaColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected alphaEnabled = signal<boolean>(true);

  // Custom size picker
  protected customSizeHexColor = signal<string>('#9c27b0');
  protected customSizeColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected customDiameter = signal<number>(320);
  protected customRingWidth = signal<number>(28);
  protected customHandleSize = signal<number>(16);

  // Background variations
  protected backgroundHexColor = signal<string>('#f44336');
  protected backgroundPickerColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected backgroundValue = signal<string>('auto');

  // Disabled picker
  protected disabledHexColor = signal<string>('#607d8b');
  protected disabledColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected disabledState = signal<boolean>(false);

  // Event tracking
  protected pickerEvents = signal<string[]>([]);

  protected readonly backgroundOptions = [
    { value: 'auto', label: 'Auto (Theme)' },
    { value: 'transparent', label: 'Transparent' },
    { value: '#ffffff', label: 'White' },
    { value: '#000000', label: 'Black' },
    { value: '#f5f5f5', label: 'Light Gray' },
    { value: '#0000ff', label: 'Blue' },
    { value: '#00ff00', label: 'Green' }
  ];

  protected readonly diameterOptions = [240, 280, 320, 360, 400];
  protected readonly ringWidthOptions = [20, 24, 28, 32, 36];
  protected readonly handleSizeOptions = [12, 14, 16, 18, 20];

  protected onPickerOpened(): void {
    this.addEvent('Picker opened');
  }

  protected onPickerClosed(): void {
    this.addEvent('Picker closed');
  }

  private addEvent(event: string): void {
    const currentEvents = this.pickerEvents();
    const timestamp = new Date().toLocaleTimeString();
    const newEvent = `${timestamp}: ${event}`;
    this.pickerEvents.set([newEvent, ...currentEvents.slice(0, 4)]); // Keep last 5 events
  }
}