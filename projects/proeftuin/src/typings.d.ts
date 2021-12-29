declare module 'd3-voronoi-treemap';
declare module 'seedrandom';

// Delete this when `node_modules\@types\mathjax\index.d.ts` will support version 3.
declare namespace MathJax {
    //
    // Mathjax@3 surrpot -----------
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
