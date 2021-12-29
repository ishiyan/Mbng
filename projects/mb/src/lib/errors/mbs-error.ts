import { InnerError } from './inner-error';

/** Encapsulates an internal error. */
export class MbsError {
  /** The status code of the error. */
  statusCode?: number | undefined;

  /** A human-readable representation of the error. */
  message?: string | undefined;

  /** Inner errors of this error. */
  details?: InnerError[] | undefined;

  static toMessage(internalError: MbsError): string {
    let text = '';
    if (internalError.statusCode) {
      text += internalError.statusCode.toString();
      text += ': ';
    }
    if (internalError.message) {
      text += internalError.message as string;
    }
    if (internalError.details) {
      (internalError.details as InnerError[]).forEach(element => {
        text += ' (';
        text = InnerError.appendMessage(text, element);
        text += ')';
      });
    }
    return text;
  }
}
