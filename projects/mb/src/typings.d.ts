declare module 'd3-voronoi-treemap';

declare module 'seedrandom';

// TypeScript versions 4.4.3 and higher:
// Error TS2339: Property 'msSaveBlob' does not exist on type 'Navigator'.
// Use declaration merging to add it back to the 'Navigator'.
interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
}

// Delete this when `node_modules\@types\mathjax\index.d.ts` will support version 3.
declare namespace MathJax {
    //
    // Mathjax@3 support -----------
    //
    export const typeset: () => any;
    export const typesetPromise: () => any;
    export const startup: Startup;

    export interface Startup {
       promise: any;
    }
    //
    // -----------------------------------
    //
}
