import { Injectable, Injector, ErrorHandler, NgZone } from '@angular/core';
import { MatSnackBar/*, MatSnackBarVerticalPosition*/ } from '@angular/material';

@Injectable()
export class MbsErrorHandler implements ErrorHandler {

  private snackBar: MatSnackBar;

  constructor(private injector: Injector, private zone: NgZone) { }

  handleError(error: any): void {
    if (!this.snackBar) {
      this.snackBar = this.injector.get(MatSnackBar);
    }
    // this.base.handleError(error);
    if (error as string) {
      this.openSnackBar(error as string);
    } else {
      this.openSnackBar('foobar');
    }
  }

  private openSnackBar(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'Ok', { duration: 5000, verticalPosition: 'top' });
    });
  }
}
