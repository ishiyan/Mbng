import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecondService {

  get message(): string {
    return 'Second service works';
  }

  constructor() { }
}
