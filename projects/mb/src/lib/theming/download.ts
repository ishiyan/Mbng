import { DynamicThemingParameters } from './generate';
import { generateCSS } from './generate-css';
import { generateSCSS } from './generate-scss';

export function downloadSCSS(params: DynamicThemingParameters,
  includeHighContrast: boolean = true): void {
  download(generateSCSS(params, includeHighContrast), true);
}

export function downloadCSS(params: DynamicThemingParameters,
  includeHighContrast: boolean = true): void {
  download(generateCSS(params, includeHighContrast), false);
}

function download(content: string, isSCSS: boolean): void {
  const contentType = isSCSS ? 'scss' : 'css'
  const blob = new Blob([content], { type: 'text/' + contentType });

  // Create a temporary URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'dynamic-theme.' + contentType;
  anchor.style.display = 'none';

  // Append to document, click, and remove
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Clean up the URL object
  window.URL.revokeObjectURL(url);
}
