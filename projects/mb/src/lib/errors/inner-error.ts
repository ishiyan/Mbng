/** A recursive inner error. */
export class InnerError {
  /** The message of an inner error. */
  message?: string | undefined;

  /** Inner errors of this inner error. */
  details?: InnerError | undefined;

  static appendMessage(text: string, innerError: InnerError): string {
    if (innerError.message) {
      text += innerError.message as string;
    }

    if (innerError.details) {
      text += ' (';
      text = InnerError.appendMessage(text, innerError.details as InnerError);
      text += ')';
    }

    return text;
  }
}
