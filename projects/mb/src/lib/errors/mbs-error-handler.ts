import { Injectable, Injector, ErrorHandler, NgZone, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable(
  { providedIn: 'root' }
)
export class MbsErrorHandler implements ErrorHandler {
  private injector = inject(Injector);
  private zone = inject(NgZone);
  private snackBar!: MatSnackBar;

  handleError(error: any): void {
    if (!this.snackBar) {
      this.snackBar = this.injector.get(MatSnackBar);
    }
    // this.base.handleError(error);
    if (error as string) {
      this.openSnackBar(error as string);
    } else {
      this.openSnackBar('error cannot be represented as a string');
    }
  }

  private openSnackBar(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'Ok', { duration: 5000, verticalPosition: 'top' });
    });
  }
}
