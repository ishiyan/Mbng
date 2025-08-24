import { Injectable, signal } from '@angular/core';

const sourceDefault = false;
const tagLeftDefault = false;
const equationLeftDefault = false;

/** Provides settings for KaTeX math. */
@Injectable({
  providedIn: 'root'
})
export class KatexSettingsService {
  public readonly source = signal<boolean>(sourceDefault);
  public readonly tagLeft = signal<boolean>(tagLeftDefault);
  public readonly equationLeft = signal<boolean>(equationLeftDefault);
}
