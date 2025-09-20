import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ColorRingComponent } from 'projects/mb/src/lib/colors/color-ring/color-ring.component';

@Component({
  selector: 'app-mb-color-ring-01-features',
  templateUrl: './color-ring-01-features.component.html',
  styleUrls: ['./color-ring-01-features.component.scss'],
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
    ColorRingComponent
  ]
})
export class ColorRing01FeaturesComponent {
  // Default
  protected defaultHexColor = signal<string>('#ff4081');
  protected defaultColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);

  // Alpha channel
  protected alphaHexColor = signal<string>('#2196f380');
  protected alphaColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected alphaEnabled = signal<boolean>(true);

  // Diameter variations
  protected diameterHexColor = signal<string>('#ff9800');
  protected diameterColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected diameterValue = signal<number>(240);

  // Ring width variations
  protected ringWidthHexColor = signal<string>('#9c27b0');
  protected ringWidthColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected ringWidthValue = signal<number>(20);

  // Handle size variations
  protected handleSizeHexColor = signal<string>('#607d8b');
  protected handleSizeColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected handleSizeValue = signal<number>(16);

  // Resolution variations
  protected resolutionHexColor = signal<string>('#795548');
  protected resolutionColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected resolutionValue = signal<number | 'auto'>(2);

  // Background variations
  protected backgroundHexColor = signal<string>('#f44336');
  protected backgroundColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected backgroundValue = signal<string>('auto');

  // Disabled state
  protected disabledHexColor = signal<string>('#3f51b5');
  protected disabledColor = signal<{ hex: string; hsl: [number, number, number]; alpha: number } | null>(null);
  protected disabledState = signal<boolean>(false);

  protected readonly resolutionOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' }
  ];

  protected readonly backgroundOptions = [
    { value: 'auto', label: 'Auto (Theme)' },
    { value: 'transparent', label: 'Transparent' },
    { value: '#ffffff', label: 'White' },
    { value: '#000000', label: 'Black' },
    { value: '#f5f5f5', label: 'Light Gray' },
    { value: '#0000ff', label: 'Blue' },
    { value: '#00ff00', label: 'Green' }
  ];

  protected readonly diameterOptions = [180, 200, 240, 280, 320, 360];
  protected readonly ringWidthOptions = [16, 20, 24, 28, 32];
  protected readonly handleSizeOptions = [8, 10, 12, 14, 16, 18, 20];
}