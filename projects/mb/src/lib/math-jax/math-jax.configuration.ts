/** MathJax configuration class. */
export class MathJaxConfiguration {
  /** The version of the *MathJax* library. */
  version!: string;

  /** The config name of the *MathJax* library. */
  config!: string;

  /** If *true*, will be downloaded from CDN, otherwise is expected to be in *assets/mathjax*. */
  online!: boolean;
}
