import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentSettingsService {
  readonly enableChartEditing = signal<boolean>(false);
}