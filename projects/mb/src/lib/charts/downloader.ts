// TypeScript versions 4.4.3 and higher:
// Error TS2339: Property 'msSaveBlob' does not exist on type 'Navigator'.
// Use declaration merging to add it back to the 'Navigator'.
declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

export class Downloader {

  public static download(blob: Blob, filename: string): void {
    if (!blob || blob === null) {
      return;
    }

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('visibility', 'hidden');
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  public static getChildElementById(parentNativeElement: any, id: string): any {
    const siblings = parentNativeElement.children;
    let child = null;
    for (let i = siblings.length; --i;) {
      if (siblings[i].id && siblings[i].id === id) {
        child = siblings[i].children[0];
        break;
      }
    }

    return child;
  }

  public static serializeToSvg(svgNativeElement: any, textBefore: string = '', textAfter: string = ''): Blob {
    if (svgNativeElement === null) {
      return svgNativeElement;
    }

    const xmlns = 'http://www.w3.org/2000/xmlns/';
    const xlinkns = 'http://www.w3.org/1999/xlink';
    const svgns = 'http://www.w3.org/2000/svg';
    svgNativeElement = svgNativeElement.cloneNode(true);
    const fragment = window.location.href + '#';
    const walker = document.createTreeWalker(svgNativeElement, NodeFilter.SHOW_ELEMENT, null/*, false*/); // Needed for InternetExplorer.
    while (walker.nextNode()) {
      const currentNode: any = walker.currentNode;
      for (const attr of currentNode.attributes) {
        if (attr.value.includes(fragment)) {
          attr.value = attr.value.replace(fragment, '#');
        }
      }
    }

    svgNativeElement.setAttributeNS(xmlns, 'xmlns', svgns);
    svgNativeElement.setAttributeNS(xmlns, 'xmlns:xlink', xlinkns);
    const serializer = new window.XMLSerializer();
    const str = serializer.serializeToString(svgNativeElement);
    return new Blob([textBefore, str, textAfter], { type: 'image/svg+xml' });
  }

  public static rasterizeToPng(svgNativeElement: any): any {
    if (svgNativeElement === null) {
      return svgNativeElement;
    }

    let resolve: any;
    let reject: any;
    const promise = new Promise((y, n) => (resolve = y, reject = n));
    const image = new Image();
    image.onerror = reject;
    image.onload = () => {
      const rect = svgNativeElement.getBoundingClientRect();
      const context = Downloader.context2d(rect.width, rect.height);
      context.drawImage(image, 0, 0, rect.width, rect.height);
      context.canvas.toBlob(resolve);
    };

    image.src = URL.createObjectURL(Downloader.serializeToSvg(svgNativeElement));
    return promise;
  }

  private static context2d(width: number, height: number): any {
    const dpi = devicePixelRatio;
    const canvas = document.createElement('canvas');
    canvas.width = width * dpi;
    canvas.height = height * dpi;
    canvas.style.width = width + 'px';
    const context = canvas.getContext('2d');
    // @ts-ignore
    context.scale(dpi, dpi);
    return context;
  }
}
