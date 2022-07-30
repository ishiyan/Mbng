import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const sourceDefault = false;
const tagLeftDefault = false;
const equationLeftDefault = false;

/** Provides settings for KaTeX math. */
@Injectable({
  providedIn: 'root'
})
export class KatexSettingsService {
  private sourceValue = sourceDefault;
  private sourceSubject = new Subject<boolean>();

  private tagLeftValue = tagLeftDefault;
  private tagLeftSubject = new Subject<boolean>();

  private equationLeftValue = equationLeftDefault;
  private equationLeftSubject = new Subject<boolean>();

  /** Whether to show TeX source instead of math. */
  public get source(): boolean {
    return this.sourceValue;
  }
  public set source(value: boolean) {
    if (this.sourceValue !== value) {
      this.sourceValue = value;
      this.sourceSubject.next(value);
    }
  }
  public sourceObservable(): Observable<boolean> {
    return this.sourceSubject.asObservable();
  }

  /** Whether display math renders tags on the left side, like `\usepackage[leqno]{amsmath}` in LaTeX. */
  public get tagLeft(): boolean {
    return this.tagLeftValue;
  }
  public set tagLeft(value: boolean) {
    if (this.tagLeftValue !== value) {
      this.tagLeftValue = value;
      this.tagLeftSubject.next(value);
    }
  }
  public tagLeftObservable(): Observable<boolean> {
    return this.tagLeftSubject.asObservable();
  }

  /** Whether display math renders flush left with a `2em` left margin, like `\documentclass[fleqn]` in LaTeX. */
  public get equationLeft(): boolean {
    return this.equationLeftValue;
  }
  public set equationLeft(value: boolean) {
    if (this.equationLeftValue !== value) {
      this.equationLeftValue = value;
      this.equationLeftSubject.next(value);
    }
  }
  public equationLeftObservable(): Observable<boolean> {
    return this.equationLeftSubject.asObservable();
  }
}
