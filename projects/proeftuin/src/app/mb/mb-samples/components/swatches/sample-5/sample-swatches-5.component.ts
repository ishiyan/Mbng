import { Component } from '@angular/core';

import { parametricProceduralPalette } from 'projects/mb/src/lib/colors/parametric-procedural-palettes';

@Component({
  selector: 'mb-sample-swatches-5',
  templateUrl: './sample-swatches-5.component.html',
  styleUrls: ['./sample-swatches-5.component.scss']
})
export class SampleSwatches5Component {

  private a = [0.5, 0.5, 0.5];
  private b = [0.5, 0.5, 0.5];
  private c = [1.0, 1.0, 1.0];
  private d = [0.0, 0.33, 0.67];

  katex1 = 'r_t=a_1+b_1\\cos(2\\pi(c_1t+d_1))';
  katex2 = 'g_t=a_2+b_2\\cos(2\\pi(c_2t+d_2))';
  katex3 = 'b_t=a_3+b_3\\cos(2\\pi(c_3t+d_3))';

  generatedPalettesSwatches = 20;
  generatedPalettes = this.generatePalettes(this.generatedPalettesSwatches);

  generatedPaletteSwatches = 20;
  generatedPalette = parametricProceduralPalette(this.generatedPaletteSwatches, this.a, this.b, this.c, this.d);

  private generatePalettes(generatedPalettesSwatches: number): string[][] {
    return [
      parametricProceduralPalette(generatedPalettesSwatches, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.00, 0.33, 0.67]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.00, 0.10, 0.20]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.30, 0.20, 0.20]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 0.5], [0.80, 0.90, 0.30]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 0.7, 0.4], [0.00, 0.15, 0.20]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [2.0, 1.0, 0.0], [0.50, 0.20, 0.25]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.8, 0.5, 0.4], [0.2, 0.4, 0.2], [2.0, 1.0, 1.0], [0.00, 0.25, 0.25]),
      parametricProceduralPalette(generatedPalettesSwatches, [0.3, 0.5, 0.6], [0.1, 0, 0.6], [1.0, 1.0, 1.0], [0.8, 0.5, 0.25])
    ];
  }

  private regenerate() {
    this.generatedPalette = parametricProceduralPalette(this.generatedPaletteSwatches,
      this.a, this.b, this.c, this.d);
  }

  get generatedPalettesLength(): number {
    return this.generatedPalettesSwatches;
  }
  set generatedPalettesLength(value: number) {
    this.generatedPalettesSwatches = value;
    this.generatedPalettes = this.generatePalettes(this.generatedPalettesSwatches);
  }

  get generatedPaletteLength(): number {
    return this.generatedPaletteSwatches;
  }
  set generatedPaletteLength(value: number) {
    this.generatedPaletteSwatches = value;
    this.regenerate();
  }

  get a1(): number {
    return this.a[0];
  }
  set a1(value: number) {
    this.a[0] = value;
    this.regenerate();
  }

  get a2(): number {
    return this.a[1];
  }
  set a2(value: number) {
    this.a[1] = value;
    this.regenerate();
  }

  get a3(): number {
    return this.a[2];
  }
  set a3(value: number) {
    this.a[2] = value;
    this.regenerate();
  }

  get b1(): number {
    return this.b[0];
  }
  set b1(value: number) {
    this.b[0] = value;
    this.regenerate();
  }

  get b2(): number {
    return this.b[1];
  }
  set b2(value: number) {
    this.b[1] = value;
    this.regenerate();
  }

  get b3(): number {
    return this.b[2];
  }
  set b3(value: number) {
    this.b[2] = value;
    this.regenerate();
  }

  get c1(): number {
    return this.c[0];
  }
  set c1(value: number) {
    this.c[0] = value;
    this.regenerate();
  }

  get c2(): number {
    return this.c[1];
  }
  set c2(value: number) {
    this.c[1] = value;
    this.regenerate();
  }

  get c3(): number {
    return this.c[2];
  }
  set c3(value: number) {
    this.c[2] = value;
    this.regenerate();
  }

  get d1(): number {
    return this.d[0];
  }
  set d1(value: number) {
    this.d[0] = value;
    this.regenerate();
  }

  get d2(): number {
    return this.d[1];
  }
  set d2(value: number) {
    this.d[1] = value;
    this.regenerate();
  }

  get d3(): number {
    return this.d[2];
  }
  set d3(value: number) {
    this.d[2] = value;
    this.regenerate();
  }

  a1Changed(event: any) {
    this.a1 = event.value;
  }

  a2Changed(event: any) {
    this.a2 = event.value;
  }

  a3Changed(event: any) {
    this.a3 = event.value;
  }

  b1Changed(event: any) {
    this.b1 = event.value;
  }

  b2Changed(event: any) {
    this.b2 = event.value;
  }

  b3Changed(event: any) {
    this.b3 = event.value;
  }

  c1Changed(event: any) {
    this.c1 = event.value;
  }

  c2Changed(event: any) {
    this.c2 = event.value;
  }

  c3Changed(event: any) {
    this.c3 = event.value;
  }

  d1Changed(event: any) {
    this.d1 = event.value;
  }

  d2Changed(event: any) {
    this.d2 = event.value;
  }

  d3Changed(event: any) {
    this.d3 = event.value;
  }
}
