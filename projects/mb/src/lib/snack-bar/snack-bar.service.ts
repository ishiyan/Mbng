import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

export class SnackBarMessage {
  message!: string;
  action: string | undefined | null = null;
  config: MatSnackBarConfig | undefined | null = null;
}

@Injectable()
export class SnackBarService {
  private snackBarRef!: MatSnackBarRef<SimpleSnackBar>;
  private msgQueue: any[] = [];
  private isInstanceVisible = false;

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

  private showNext(): void {
    if (this.msgQueue.length === 0) {
      return;
    }

    const message = this.msgQueue.shift();
    this.isInstanceVisible = true;
    this.zone.run(() => {
      this.snackBarRef = this.snackBar.open(message.message, message.action ? message.action : 'Close',
        { durtion: 0, verticalPosition: 'bottom', horizontalPosition: 'center', ...message.config });
    });

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isInstanceVisible = false;
      this.showNext();
    });
  }

  /**
   * Add a message.
   *
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  add(message: string, action?: string, config?: MatSnackBarConfig): void {

    const sbMessage = new SnackBarMessage();
    sbMessage.message = message;
    sbMessage.action = action;
    sbMessage.config = config;

    this.msgQueue.push(sbMessage);
    if (!this.isInstanceVisible) {
      this.showNext();
    }
  }
}
