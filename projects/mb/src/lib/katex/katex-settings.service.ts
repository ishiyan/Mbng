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
  private _source = sourceDefault;
  private _sourceSubject = new Subject<boolean>();

  private _tagLeft = tagLeftDefault;
  private _tagLeftSubject = new Subject<boolean>();

  private _equationLeft = equationLeftDefault;
  private _equationLeftSubject = new Subject<boolean>();

  /** Whether to show TeX source instead of math. */
  public get source(): boolean {
    return this._source;
  }
  public set source(value: boolean) {
    if (this._source !== value) {
      this._source = value;
      this._sourceSubject.next(value);
    }
  }
  public sourceObservable(): Observable<boolean> {
    return this._sourceSubject.asObservable();
  }
  
  /** Whether display math renders tags on the left side, like `\usepackage[leqno]{amsmath}` in LaTeX. */
  public get tagLeft(): boolean {
    return this._tagLeft;
  }
  public set tagLeft(value: boolean) {
    if (this._tagLeft !== value) {
      this._tagLeft = value;
      this._tagLeftSubject.next(value);
    }
  }
  public tagLeftObservable(): Observable<boolean> {
    return this._tagLeftSubject.asObservable();
  }
  
  /** Whether display math renders flush left with a `2em` left margin, like `\documentclass[fleqn]` in LaTeX. */
  public get equationLeft(): boolean {
    return this._equationLeft;
  }
  public set equationLeft(value: boolean) {
    if (this._equationLeft !== value) {
      this._equationLeft = value;
      this._equationLeftSubject.next(value);
    }
  }
  public equationLeftObservable(): Observable<boolean> {
    return this._equationLeftSubject.asObservable();
  }
}
