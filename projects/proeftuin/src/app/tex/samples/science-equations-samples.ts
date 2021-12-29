import { Sample } from './sample';

export const scienceEquationsSamples: Sample[] =
  [
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of delta',
      code: 'a\\delta (n) \\Leftrightarrow a'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of shifted delta',
      code: '\\delta (n - n_o ) \\Leftrightarrow e^{ - j\\omega n_o }'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of a constant',
      code: 'a \\Leftrightarrow 2\\pi a\\sum\\limits_{k =  - \\infty }^\\infty  {\\delta (\\omega  + 2\\pi k)} ,( - \\infty  < n < \\infty )' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of unit step function',
      code: 'u(n) \\Leftrightarrow \\frac{1}{{(1 - e^{ - j\\omega } )}} + \\sum\\limits_{k =  - \\infty }^\\infty  {\\pi \\delta (\\omega  + 2\\pi k)}' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of unit step function and exponential',
      code: 'a^n u(n) \\Leftrightarrow \\frac{1}{{(1 - ae^{ - j\\omega } )}},\\left| a \\right| < 1'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of unit step function and exponential',
      code: '(n + 1)a^n u(n) \\Leftrightarrow \\frac{1}{{(1 - ae^{ - j\\omega } )^2 }},\\left| a \\right| < 1'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of complex exponential',
      code: 'e^{j\\omega _o n}  \\Leftrightarrow 2\\pi \\sum\\limits_{k =  - \\infty }^\\infty  {\\delta (\\omega  - \\omega _o  + 2\\pi k)}' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of a sinc sequence',
      code: '\\frac{{\\sin (\\omega _c n)}}{n} \\Leftrightarrow X(e^{j\\omega } ) = \\left\\{ {\\begin{array}{*{20}c}   {1,\\left| \\omega  \\right| \\le \\omega _c }  \\\\   {0,\\omega _c  < \\left| \\omega  \\right| \\le \\omega _c }  \\\\\\end{array}} \\right.' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform of a boxcar sequence',
      code: 'x(n) = \\left\\{ {\\begin{array}{*{20}c}\n   {1,0 \\le n \\le N - 1}  \\\\\n   {0,{\\rm{otherwise}}}  \\\\\n\\end{array} \\Leftrightarrow } \\right.\\frac{{\\sin (\\omega N/2)}}{{\\sin (\\omega /2)}}e^{ - j\\omega (N - 1)/2}' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier linearity theorem',
      code: 'ax(n) + by(n) \\Leftrightarrow aX(e^{j\\omega } ) + bY(e^{j\\omega } )'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier time shift property',
      code: 'x(n - n_o ) \\Leftrightarrow e^{ - j\\omega n_o } X(e^{j\\omega } )'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier frequency shift property',
      code: 'e^{ + j\\omega _o n} x(n) \\Leftrightarrow X(e^{j(\\omega  - \\omega _o )} )'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier time reversal property',
      code: 'x( - n) \\Leftrightarrow X(e^{ - j\\omega } )'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier time reversal property: x(n) real',
      code: 'x( - n) \\Leftrightarrow X^* (e^{j\\omega } )'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier frequency differentiation property',
      code: 'nx(n) \\Leftrightarrow j\\frac{{dX(e^{j\\omega } )}}{{d\\omega }}'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier time/space convolution property',
      code: 'x(n) * y(n) \\Leftrightarrow X(e^{j\\omega } )Y(e^{j\\omega } )'
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier windowing, modulation, frequency convolution property',
      code: 'x(n)y(n) \\Leftrightarrow \\frac{1}{{2\\pi }}\\int\\limits_{ - \\pi }^\\pi  {X(e^{j\\theta } )Y(e^{j(\\omega  - \\theta )} )d\\theta }' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform - Parseval\'s theorem',
      code: '\\sum\\limits_{n =  - \\infty }^\\infty  {\\left| {x(n)} \\right|^2 }  = \\frac{1}{{2\\pi }}\\int\\limits_{ - \\pi }^\\pi  {\\left| {X(e^{j\\omega } )} \\right|^2 d\\omega }' // eslint-disable-line
    },
    {
      name: 'Signal processing: Fourier transform: discrete-time Fourier transform - Parseval\'s theorem',
      code: '\\sum\\limits_{n =  - \\infty }^\\infty  {x(n)y^* (n)}  = \\frac{1}{{2\\pi }}\\int\\limits_{ - \\pi }^\\pi  {X(e^{j\\omega } )Y^* (e^{j\\omega } )d\\omega }' // eslint-disable-line
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform of Kroeneker delta function',
      code: '\\delta (t) \\Leftrightarrow 1'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform of unit step function times a constant (K)',
      code: 'Ku(t) \\Leftrightarrow \\frac{K}{s}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function',
      code: 'tu(t) \\Leftrightarrow \\frac{1}{{s^2 }}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function',
      code: 't^n u(t) \\Leftrightarrow \\frac{{n!}}{{s^{n + 1} }}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function and an exponential',
      code: 'Ke^{ - at} u(t) \\Leftrightarrow \\frac{K}{{s + a}}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function and an exponential',
      code: 't^n e^{ - at} u(t) \\Leftrightarrow \\frac{{n!}}{{(s + a)^{n + 1} }}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function and sine',
      code: '\\sin (\\Omega t)u(t) \\Leftrightarrow \\frac{\\Omega }{{(s^2  + \\Omega ^2 )}}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function and cosine',
      code: '\\cos (\\Omega t)u(t) \\Leftrightarrow \\frac{s}{{(s^2  + \\Omega ^2 )}}'
    },
    {
      name: 'Signal processing: Laplace transform: Laplace transform involving the unit step function, cosine, and an exponential',
      code: 'e^{ - at} \\cos (\\Omega t)u(t) \\Leftrightarrow \\frac{{s + a}}{{(s + a)^2  + \\Omega ^2 }}'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform involving the unit step function, sine, and an exponential',
      code: 'e^{ - at} \\sin (\\Omega t)u(t) \\Leftrightarrow \\frac{\\Omega }{{(s + a)^2  + \\Omega ^2 }}'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform linearity property',
      code: 'a_1 x_1 (t) + a_2 x_2 (t) \\Leftrightarrow a_1 X_1 (s) + a_2 X_2 (s)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform Nth time domain derivative property',
      code: '\\frac{{d^n x(t)}}{{dt^n }} \\Leftrightarrow s^n X(s)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform integral property',
      code: '\\int\\limits_0^t {x(\\tau )d} \\tau \\Leftrightarrow \\frac{1}{s}X(s)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform time domain shifting property',
      code: 'x(t - a)u(t - a) \\Leftrightarrow e^{ - as} X(s + a)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform time domain scaling property',
      code: 'x(at)u(t) \\Leftrightarrow \\frac{1}{a}X\\left( {\\frac{s}{a}} \\right)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform time varying coefficient (s domain differentiation) property',
      code: 'tx(t)u(t) \\Leftrightarrow \\frac{{ - dX(s)}}{{ds}}'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform time domain linear convolution (s domain multiplication) property', // eslint-disable-line
      code: '\\int\\limits_0^\\infty  {x_1 (\\tau )x_2 (t - \\tau )d\\tau }  \\Leftrightarrow X_1 (s)X_2 (s)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform final value theorem (valid if poles of sX(s) are in left half of s plane)', // eslint-disable-line
      code: 'x(\\infty ) = \\mathop {\\lim }\\limits_{s \\to 0} sX(s)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform initial value theorem',
      code: 'x(0^ +  ) = \\mathop {\\lim }\\limits_{s \\to \\infty } sX(s)'
    },
    {
      name: 'Signal Processing: Laplace transform: Laplace transform definition',
      code: 'X(s) = \\int\\limits_0^\\infty  {x(t)e^{ - st} dt}'
    },
    {
      name: 'Signal processing: Z-transform:  Z-transform of delta',
      code: '\\delta (n) \\Leftrightarrow 1'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform of shifted delta',
      code: '\\delta (n - m) \\Leftrightarrow z^{ - m} ,\\left| z \\right| > 1'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform of unit step function',
      code: 'u(n) \\Leftrightarrow \\frac{z}{{z - 1}} ,\\left| z \\right| > 1'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform involving the unit step function',
      code: 'nu(n) \\Leftrightarrow \\frac{z}{{\\left( {z - 1} \\right)^2 }},\\left| z \\right| > 1'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform involving the unit step function',
      code: 'n^2 u(n) \\Leftrightarrow \\frac{{z\\left( {z + 1} \\right)}}{{\\left( {z - 1} \\right)^3 }},\\left| z \\right| > 1' // eslint-disable-line
    },
    {
      name: 'Signal processing: Z-transform: Z-transform involving the unit step function and an exponential',
      code: 'a^n u(n) \\Leftrightarrow \\frac{z}{{\\left( {z - a} \\right)}},\\left| z \\right| > \\left| a \\right|'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform involving the unit step function and an exponential',
      code: 'na^n u(n) \\Leftrightarrow \\frac{{az}}{{\\left( {z - a} \\right)^2 }},\\left| z \\right| > \\left| a \\right|'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform involving the unit step function and an exponential',
      code: 'n^2 a^n u(n) \\Leftrightarrow \\frac{{az(z + a)}}{{\\left( {z - a} \\right)^3 }},\\left| z \\right| > \\left| a \\right|' // eslint-disable-line
    },
    {
      name: 'Signal processing: Z-transform: Z-transform involving the unit step function and an exponential',
      code: 'n^3 a^n u(n) \\Leftrightarrow \\frac{{az(z^2  + 4az + a^2 )}}{{\\left( {z - a} \\right)^4 }},\\left| z \\right| > \\left| a \\right|' // eslint-disable-line
    },
    {
      name: 'Signal processing: Z-transform: Z-transform time domain convolution (z domain multiplication) property',
      code: 'h(n) * x(n) \\Leftrightarrow H(z)X(z)'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform linearity property',
      code: 'a_1 x_1 (n) + a_2 x_2 (n) \\Leftrightarrow a_1 X_1 (z) + a_2 X_2 (z)'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform translation (time shift) property',
      code: 'x(n - m) \\Leftrightarrow z^{ - m} X(z)'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform multiplication by an exponential (z domain scaling) property',
      code: 'a^n x\\left( n \\right) \\Leftrightarrow X\\left( {\\frac{z}{a}} \\right)'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform multiplication by a ramp (z domain differentiation) property',
      code: 'nx\\left( n \\right) \\Leftrightarrow  - z\\frac{{dX(z)}}{{dz}}'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform time domain multiplication (z domain convolution) property',
      code: 'h(n)x(n) \\Leftrightarrow \\frac{1}{{2\\pi j}}\\oint_C {H\\left( v \\right)X\\left( {z/v} \\right)\\mathop v\\nolimits^{ - 1} dv}' // eslint-disable-line
    },
    {
      name: 'Signal processing: Z-transform: Z-transform initial value theorem',
      code: 'x\\left( {0^ -  } \\right) = \\mathop {\\lim }\\limits_{z \\to \\infty } X\\left( z \\right)'
    },
    {
      name: 'Signal processing: Z-transform: Z-transform final value theorem; valid only if polues of (z-1)X(z) are inside the unit circle', // eslint-disable-line
      code: 'x\\left( \\infty  \\right) = \\mathop {\\lim }\\limits_{z \\to 1} \\left( {z - 1} \\right)X\\left( z \\right)'
    },
    {
      name: 'Signal processing: Z-transform: Z transform definition',
      code: 'X(z) = \\sum\\limits_{n =  - \\infty }^\\infty  {x(n)z^{ - n} }'
    },
    {
      name: 'Statistics: binomial coefficient',
      code: '\\left( {\\begin{array}{*{20}c}\n   n  \\\\\n   k  \\\\\n\\end{array}} \\right) = \\frac{{n!}}{{k!\\left( {n - k} \\right)!}}' // eslint-disable-line
    },
    {
      name: 'Statistics: binomial equation',
      code: 'y = \\frac{{n!}}{{k!\\left( {n - k} \\right)!}}p^k q^{n - k}  = \\left( {\\begin{array}{*{20}c}\n   n  \\\\\n   k  \\\\\n\\end{array}} \\right)p^k q^{n - k}' // eslint-disable-line
    },
    {
      name: 'Statistics: standard normal distribution',
      code: 'y = \\frac{1}{{\\sqrt {2\\pi } }}e^{ - \\frac{{z^2 }}{2}}  = .3989e^{ - 5z^2 }'
    },
    {
      name: 'Statistics: Euler\'s constant',
      code: 'e = \\mathop {\\lim }\\limits_{n \\to \\infty } \\left( {1 + \\frac{1}{n}} \\right)^n'
    },
    {
      name: 'Statistics: Gaussian normal distribution',
      code: 'P(x) = \\frac{1}{{\\sigma \\sqrt {2\\pi } }}e^{{{ - \\left( {x - \\mu } \\right)^2 } \\mathord{\\left/ \n {\\vphantom {{ - \\left( {x - \\mu } \\right)^2 } {2\sigma ^2 }}} \\right. \n \\kern0pt} {2\\sigma ^2 }}}' // eslint-disable-line
    },
    {
      name: 'Statistics: Poisson distribution',
      code: 'P\\left( x \\right) = \\frac{{e^{ - \\lambda } \\lambda ^x }}{{x!}}'
    },
    {
      name: 'Statistics: gamma distribution',
      code: '\\Gamma \\left( a \\right) = \\int\\limits_0^\\infty  {s^{a - 1} } e^{ - s} ds'
    },
    {
      name: 'Statistics: gamma function',
      code: '\\Gamma \\left( x \\right) = \\int\\limits_0^\\infty  {s^{x - 1} e^{ - s} ds}'
    },
    {
      name: 'Statistics: Nth moment about point a',
      code: '\\mu _n \\left( a \\right) = \\sum {\\left( {x - a} \\right)^n P\\left( x \\right)}'
    },
    {
      name: 'Statistics: mean about zero',
      code: '\\mu  = \\mu _1  = \\sum {xP\\left( x \\right)}'
    },
    {
      name: 'Statistics: variance or second moment about the mean',
      code: '\\sigma ^2  = \\mu _2  = \\sum {\\left( {x - \\mu _1 } \\right)^2 P\\left( x \\right)}'
    },
    {
      name: 'Statistics: Fisher skewness',
      code: '\\gamma _1  = \\frac{{\\mu _3 }}{{\\mu _2 ^{{3 \\mathord{\\left/ \n {\\vphantom {3 2}} \\right.\n \\kern0pt} 2}} }} = \\frac{{\\mu _3 }}{{\\sigma ^3 }}' // eslint-disable-line
    },
    {
      name: 'Statistics: standard deviation',
      code: '\\sigma  = \\sqrt {\\mu _2 }'
    },
    {
      name: 'Statistics: biased sample variance',
      code: 's_N  = \\sqrt {\\frac{1}{N}\\sum\\limits_{i = 1}^N {\\left( {x_i  - \\bar x} \\right)^2 } }'
    },
    {
      name: 'Statistics: unbiased estimator of populatoin sample variance',
      code: 's_{N - 1}  = \\sqrt {\\frac{1}{{N - 1}}\\sum\\limits_{i = 1}^N {\\left( {x_i  - \\bar x} \\right)^2 } }'
    },
    {
      name: 'Statistics: standard error',
      code: '{\\mathop{\\rm var}} \\left( {\\bar x} \\right) = \\frac{{\\sigma ^2 }}{n}'
    },
    {
      name: 'Calculus: differentiation: derivative of a constant',
      code: '\\frac{d}{{dx}}C = 0'
    },
    {
      name: 'Calculus: differentiation: derivative of a variable to the first power',
      code: '\\frac{d}{{dx}}x = 1'
    },
    {
      name: 'Calculus: differentiation: derivative of a variable to the Nth power',
      code: '\\frac{d}{{dx}}x^n  = nx^{\\left( {n - 1} \\right)}'
    },
    {
      name: 'Calculus: differentiation: derivative of an exponential',
      code: '\\frac{d}{{dx}}e^{ax}  = ae^{ax}'
    },
    {
      name: 'Calculus: differentiation: derivative of an arbitrary base exponential',
      code: '\\frac{d}{{dx}}b^x  = b^x \\ln \\left( b \\right)'
    },
    {
      name: 'Calculus: differentiation: derivative of a natural logarithm',
      code: '\\frac{d}{{dx}}\\ln \\left( x \\right) = \\frac{1}{x}'
    },
    {
      name: 'Calculus: differentiation: derivative of sine',
      code: '\\frac{d}{{dx}}\\sin x = \\cos x'
    },
    {
      name: 'Calculus: differentiation: derivative of cosine',
      code: '\\frac{d}{{dx}}\\cos x =  - \\sin x'
    },
    {
      name: 'Calculus: differentiation: derivative of tangent',
      code: '\\frac{d}{{dx}}\\tan x = \\sec ^2 x'
    },
    {
      name: 'Calculus: differentiation: derivative of cotangent',
      code: '\\frac{d}{{dx}}\\cot x =  - \\csc ^2 x'
    },
    {
      name: 'Calculus: integration: integration by parts',
      code: '\\int {u\\frac{{dv}}{{dx}}} dx = uv - \\int {\\frac{{du}}{{dx}}} vdx'
    },
    {
      name: 'Calculus: integration: integral of powers not equal to -1',
      code: '\\int {x^n } dx = \\frac{{x^{n + 1} }}{{n + 1}},(n \\ne  - 1)'
    },
    {
      name: 'Calculus: integration: integral of reciprocal',
      code: '\\int {\\frac{1}{x}} dx = \\ln \\left| x \\right| + c'
    },
    {
      name: 'Calculus: integration: integral of cosine',
      code: '\\int {\\cos (ax)} dx = \\frac{1}{a}\\sin (ax) + c'
    },
    {
      name: 'Calculus: integration: integral of sine',
      code: '\\int {\\sin (ax)} dx =  - \\frac{1}{a}\\cos (ax) + c'
    },
    {
      name: 'Calculus: integration: integral of tangent',
      code: '\\int {\\tan (ax)} dx =  - \\frac{1}{a}\\ln \\left| {\\cos (ax)} \\right| + c'
    },
    {
      name: 'Calculus: integration: integral of cosecant',
      code: '\\int {\\csc (ax)} dx = \\frac{1}{a}\\ln \\left| {\\tan \\left( {\\frac{{ax}}{2}} \\right)} \\right| + c'
    },
    {
      name: 'Calculus: integration: integral of secant',
      code: '\\int {\\sec (ax)} dx = \\frac{1}{a}\\ln \\left| {\\tan \\left( {\\frac{{ax}}{2} + \\frac{\\pi }{4}} \\right)} \\right| + c' // eslint-disable-line
    },
    {
      name: 'Calculus: integration: fundamental theorem of integrals of derivatives',
      code: '\\int\\limits_a^b {\\frac{d}{{dx}}F\\left( x \\right)dx}  = F\\left( b \\right) - F\\left( a \\right)'
    },
    {
      name: 'Calculus: limits: limit of sine X over X as X approaches zero',
      code: '\\mathop {\\lim }\\limits_{x \\to 0} \\frac{{\\sin x}}{x} = 1'
    },
    {
      name: 'Calculus: limits: limit of tangent X over X as X approaches zero',
      code: '\\mathop {\\lim }\\limits_{x \\to 0} \\frac{{\\tan x}}{x} = 1'
    },
    {
      name: 'Calculus: limits: L\'Hopital\'s rule',
      code: '\\mathop {\\lim }\\limits_{x \\to c} \\frac{{f\\left( x \\right)}}{{g\\left( x \\right)}} = \\mathop {\\lim }\\limits_{x \\to c} \\frac{{f\'\\left( x \\right)}}{{g\'\\left( x \\right)}}' // eslint-disable-line
    },
    {
      name: 'Calculus: limits: limit of one over X to the Nth power',
      code: '\\mathop {\\lim }\\limits_{x \\to \\infty } \\frac{1}{{x^n }} = 0'
    },
    {
      name: 'Calculus: limits: limit of arctangent X as X approaches infinity',
      code: '\\mathop {\\lim }\\limits_{x \\to \\infty } \\tan ^{ - 1} \\left( x \\right) = \\frac{\\pi }{2}'
    },
    {
      name: 'Calculus: limits: limit of arctangent X as X approaches negative infinity',
      code: '\\mathop {\\lim }\\limits_{x \\to  - \\infty } \\tan ^{ - 1} \\left( x \\right) =  - \\frac{\\pi }{2}'
    },
    {
      name: 'Calculus: limits: limit of e to the X power as X approaches negative infinity',
      code: '\\mathop {\\lim }\\limits_{x \\to  - \\infty } e^x  = 0'
    },
    {
      name: 'Calculus: limits: L\'Hopital\'s rule',
      code: '\\lim_{x\\to 0}{\\frac{e^x-1}{2x}}\n \\overset{\\left[\\frac{0}{0}\\right]}{\\underset{\\mathrm{H}}{=}}\n \\lim_{x\\to 0}{\\frac{e^x}{2}}={\\frac{1}{2}}' // eslint-disable-line
    },
    {
      name: 'Calculus: series: cosine definition as an infinite series',
      code: '\\cos x = \\sum\\limits_{n = 0}^\\infty  {\\frac{{\\left( { - 1} \\right)^n x^{2n} }}{{\\left( {2n} \\right)!}}}'
    },
    {
      name: 'Calculus: series: sine definition as an infinite series',
      code: '\\sin x = \\sum\\limits_{n = 1}^\\infty  {\\frac{{\\left( { - 1} \\right)^{n - 1} x^{2n - 1} }}{{\\left( {2n - 1} \\right)!}}}' // eslint-disable-line
    },
    {
      name: 'Calculus: series: arithmetic series - sequential integers',
      code: '\\sum\\limits_{k = 1}^n {k = \\frac{{n\\left( {n + 1} \\right)}}{2}}'
    },
    {
      name: 'Calculus: series: arithmetic series - sequential odd integers',
      code: '\\sum\\limits_{k = 1}^n {2k - 1 = n^2 }'
    },
    {
      name: 'Calculus: series: arithmetic series - sequential squared integers',
      code: '\\sum\\limits_{k = 1}^n {k^2  = \\frac{{n\\left( {n + 1} \\right)\\left( {2n + 1} \\right)}}{6}}'
    },
    {
      name: 'Calculus: series: finite geometric series',
      code: '\\sum\\limits_{k = 1}^n {ar^{k - 1}  = \\frac{{a\\left( {1 - r^n } \\right)}}{{1 - r}}}'
    },
    {
      name: 'Calculus: series: infinite geometric series',
      code: '\\sum\\limits_{k = 1}^\\infty  {ar^{k - 1}  = \\frac{a}{{1 - r}}}'
    },
    {
      name: 'Algebra: polynomials: square of a first order polynomial',
      code: '\\left( {a + b} \\right)^2  = a^2  + 2ab + b^2 '
    },
    {
      name: 'Algebra: polynomials: polynomial FOIL operation',
      code: '\\left( {a + b} \\right)\\left( {c + d} \\right) = ac + ad + bc + bd'
    },
    {
      name: 'Algebra: polynomials: difference of squares factorization',
      code: 'a^2  - b^2  = \\left( {a + b} \\right)\\left( {a - b} \\right)'
    },
    {
      name: 'Algebra: polynomials: sum of cubes factorization',
      code: 'a^3  + b^3  = \\left( {a + b} \\right)\\left( {a^2  - ab + b^2 } \\right)'
    },
    {
      name: 'Algebra: polynomials: difference of cubes factorization',
      code: 'a^3  - b^3  = \\left( {a - b} \\right)\\left( {a^2  + ab + b^2 } \\right)'
    },
    {
      name: 'Algebra: polynomials: second order polynomial factorization',
      code: 'x^2  + x\\left( {a + b} \\right) + ab = \\left( {x + a} \\right)\\left( {x + b} \\right)'
    },
    {
      name: 'Algebra: polynomials: quadratic formula',
      code: '\\begin{array}{*{20}c}\n   {x = \\frac{{ - b \\pm \\sqrt {b^2  - 4ac} }}{{2a}}} & {{\\rm{when}}} & {ax^2  + bx + c = 0}  \\\\\n\\end{array}' // eslint-disable-line
    },
    {
      name: 'Algebra: powers: addition of exponents',
      code: 'x^a x^b  = x^{\\left( {a + b} \\right)} '
    },
    {
      name: 'Algebra: powers: distributive property of exponents',
      code: 'x^a y^a  = \\left( {xy} \\right)^a '
    },
    {
      name: 'Algebra: powers: power rule of exponents',
      code: '\\left( {x^a } \\right)^b  = x^{\\left( {ab} \\right)} '
    },
    {
      name: 'Algebra: powers: fractional exponent to fractional root relationship',
      code: 'x^{\\left( {\\frac{a}{b}} \\right)}  = \\sqrt[b]{{x^a }}'
    },
    {
      name: 'Algebra: powers: definition of square root',
      code: 'x^{\\left( {\\frac{1}{2}} \\right)}  = \\sqrt x '
    },
    {
      name: 'Algebra: powers: negative exponent definition',
      code: 'x^{ - a}  = \\frac{1}{{x^a }}'
    },
    {
      name: 'Algebra: powers: subtraction of exponents rule',
      code: 'x^{\\left( {a - b} \\right)}  = \\frac{{x^a }}{{x^b }}'
    },
    {
      name: 'Algebra: logarithms: definition of a logarithm',
      code: 'y = \\log _b \\left( x \\right){\\rm{ iff }}x = b^y '
    },
    {
      name: 'Algebra: logarithms: logarithm of one',
      code: '\\log _b \\left( 1 \\right) = 0'
    },
    {
      name: 'Algebra: logarithms: logarithmic identity property',
      code: '\\log _b \\left( b \\right) = 1'
    },
    {
      name: 'Algebra: logarithms: sum of logarithms property',
      code: '\\log _b \\left( {xy} \\right) = \\log _b \\left( x \\right) + \\log _b \\left( y \\right)'
    },
    {
      name: 'Algebra: logarithms: difference of logarithms property',
      code: '\\log _b \\left( {\\frac{x}{y}} \\right) = \\log _b \\left( x \\right) - \\log _b \\left( y \\right)'
    },
    {
      name: 'Algebra: logarithms: logarithm of an exponential',
      code: '\\log _b \\left( {x^n } \\right) = n\\log _b \\left( x \\right)'
    },
    {
      name: 'Algebra: logarithms: logarithm base conversion',
      code: '\\log _b \\left( x \\right) = \\log _b \\left( c \\right)\\log _c \\left( x \\right) = \\frac{{\\log _c \\left( x \\right)}}{{\\log _c \\left( b \\right)}}' // eslint-disable-line
    },
    {
      name: 'Algebra: surds: multiplication',
      code: 'a\\sqrt b  \\times c\\sqrt d  = ac\\sqrt {bd} '
    },
    {
      name: 'Algebra: surds: division',
      code: '\\frac{{a\\sqrt b }}{{c\\sqrt d }} = \\frac{a}{c}\\sqrt {\\frac{b}{d}} '
    },
    {
      name: 'Algebra: surds: addition and subtraction',
      code: 'a\\sqrt b  \\pm c\\sqrt b  = \\left( {a \\pm c} \\right)\\sqrt b'
    },
    {
      name: 'Trigonometry: arbitrary triangle - area of',
      code: 'A = \\frac{1}{2}ab\\sin C'
    },
    {
      name: 'Trigonometry: arbitrary triangle - law of sines',
      code: '\\frac{{\\sin A}}{a} = \\frac{{\\sin B}}{b} = \\frac{{\\sin C}}{c}'
    },
    {
      name: 'Trigonometry: arbitrary triangle - law of cosines',
      code: 'a^2  = b^2  + c^2  - 2bc\\cos A'
    },
    {
      name: 'Trigonometry: Pythagorean property - sine and cosine',
      code: '\\sin ^2 \\theta  + \\cos ^2 \\theta  = 1'
    },
    {
      name: 'Trigonometry: Pythagorean property - tangent and secant',
      code: '1 + \\tan ^2 \\theta  = \\sec ^2 \\theta'
    },
    {
      name: 'Trigonometry: Pythagorean property - cotangent and cosecant',
      code: '\\cot ^2 \\theta  + 1 = \\csc ^2 \\theta'
    },
    {
      name: 'Trigonometry: reciprocal property - tangent and cotangent',
      code: '\\cot \\theta  = \\frac{1}{{\\tan \\theta }}'
    },
    {
      name: 'Trigonometry: reciprocal property - sine and cosecant',
      code: '\\csc \\theta  = \\frac{1}{{\\sin \\theta }}'
    },
    {
      name: 'Trigonometry: reciprocal property - cosine and secant',
      code: '\\sec \\theta  = \\frac{1}{{\\cos \\theta }}'
    },
    {
      name: 'Trigonometry: quotient property - tangent, sine, and cosine',
      code: '\\tan \\theta  = \\frac{{\\sin \\theta }}{{\\cos \\theta }}'
    },
    {
      name: 'Trigonometry: quotient property - tangent, secant, and cosecant',
      code: '\\tan \\theta  = \\frac{{\\sec \\theta }}{{\\csc \\theta }}'
    },
    {
      name: 'Trigonometry: quotient property - cotangent, cosecant, and secant',
      code: '\\cot \\theta  = \\frac{{\\csc \\theta }}{{\\sec \\theta }}'
    },
    {
      name: 'Trigonometry: quotient property - cotangent, cosine, and sine',
      code: '\\cot \\theta  = \\frac{{\\cos \\theta }}{{\\sin \\theta }}'
    },
    {
      name: 'Trigonometry: double angle identity - sine',
      code: '\\sin 2\\theta  = 2\\sin \\theta \\cos \\theta'
    },
    {
      name: 'Trigonometry: double angle identity - cosine',
      code: '\\cos 2\\theta  = \\cos ^2 \\theta  - \\sin ^2 \\theta  = 2\\cos ^2 \\theta  - 1'
    },
    {
      name: 'Trigonometry: half angle identity - sine',
      code: '\\sin \\frac{\\theta }{2} = \\sqrt {\\frac{{1 - \\cos \\theta }}{2}}'
    },
    {
      name: 'Trigonometry: half angle identity - cosine',
      code: '\\cos \\frac{\\theta }{2} = \\sqrt {\\frac{{1 + \\cos \\theta }}{2}}'
    },
    {
      name: 'Trigonometry: sum and difference of angles identity - sine',
      code: '\\sin \\left( {\\theta _1  \\pm \\theta _2 } \\right) = \\sin \\theta _1 \\cos \\theta _2  \\pm \\cos \\theta _1 \\sin \\theta _2' // eslint-disable-line
    },
    {
      name: 'Trigonometry: sum and difference of angles identity - cosine',
      code: '\\cos \\left( {\\theta _1  \\pm \\theta _2 } \\right) = \\cos \\theta _1 \\cos \\theta _2  \\mp \\sin \\theta _1 \\sin \\theta _2' // eslint-disable-line
    },
    {
      name: 'Trigonometry: sum and difference of angles identity - tangent',
      code: '\\tan \\left( {\\theta _1  \\pm \\theta _2 } \\right) = \\frac{{\\tan \\theta _1  \\pm \\tan \\theta _2 }}{{1 \\mp \\tan \\theta _1 \\tan \\theta _2 }}' // eslint-disable-line
    },
    {
      name: 'Trigonometry: superposition of sine of angles',
      code: '\\sin \\theta _1  \\pm \\sin \\theta _2  = 2\\sin \\left( {\\frac{{\\theta _1  \\pm \\theta _2 }}{2}} \\right)\\cos \\left( {\\frac{{\\theta _1  \\mp \\theta _2 }}{2}} \\right)' // eslint-disable-line
    },
    {
      name: 'Trigonometry: addition of cosine of angles',
      code: '\\cos \\theta _1  + \\cos \\theta _2  = 2\\cos \\left( {\\frac{{\\theta _1  + \\theta _2 }}{2}} \\right)\\cos \\left( {\\frac{{\\theta _1  - \\theta _2 }}{2}} \\right)' // eslint-disable-line
    },
    {
      name: 'Trigonometry: subtraction of cosine of angles',
      code: '\\cos \\theta _1  - \\cos \\theta _2  =  - 2\\sin \\left( {\\frac{{\\theta _1  + \\theta _2 }}{2}} \\right)\\sin \\left( {\\frac{{\\theta _1  - \\theta _2 }}{2}} \\right)' // eslint-disable-line
    },
    {
      name: 'Geometry: coordinate systems: Cartesian to polar coordinates (2-D)',
      code: '\\begin{array}{*{20}c}\n   {x = r\\cos \\theta } & {r = \\sqrt {x^2  + y^2 } }  \\\\\n   {y = r\\sin \\theta } & {\\theta  = \\tan ^{ - 1} \\left( {\\frac{y}{x}} \\right)}  \\\\\n\\end{array}' // eslint-disable-line
    },
    {
      name: 'Geometry: coordinate systems: Cartesian to spherical coordinates (3-D)',
      code: '\\begin{array}{*{20}c}\n   {x = R\\sin \\theta \\cos \\phi } & {R = \\sqrt {x^2  + y^2  + z^2 } } & {}  \\\\\n   {y = R\\sin \\theta \\sin \\phi } & {\\phi  = \\tan ^{ - 1} \\left( {\\frac{y}{x}} \\right)} & {}  \\\\\n   {z = R\\cos \\theta } & {\\theta  = \\cos ^{ - 1} \\left( {\\frac{z}{{\\sqrt {x^2  + y^2  + z^2 } }}} \\right)} & {}  \\\\\n\\end{array}' // eslint-disable-line
    },
    {
      name: 'Geometry: coordinate systems: Cartesian to cylindrical coordinates (3-D)',
      code: '\\begin{array}{*{20}c}\n   {x = r\\cos \\theta } & {r = \\sqrt {x^2  + y^2 } } & {}  \\\\\n   {y = r\\sin \\theta } & {\\theta  = \\tan ^{ - 1} \\left( {\\frac{y}{x}} \\right)} & {}  \\\\\n   {z = z} & {z = z} & {}  \\\\\n\\end{array}' // eslint-disable-line
    },
    {
      name: 'Geometry: coordinate systems: cylindrical to spherical coordinates (3-D)',
      code: '\\begin{array}{*{20}c}\n   {r = R\\sin \\theta } & {R = \\sqrt {r^2  + z^2 } } & {}  \\\\\n   {z = R\\sin \\theta } & {\\phi  = \\theta } & {}  \\\\\n   {\\theta  = \\phi } & {\\theta  = \\tan ^{ - 1} \\left( {\\frac{r}{z}} \\right)} & {}  \\\\\n\\end{array}' // eslint-disable-line
    },
    {
      name: 'Geometry: curves and shapes: equation of a line',
      code: 'y = mx + b'
    },
    {
      name: 'Geometry: curves and shapes: equation of a circle',
      code: '\\left( {x - x_0 } \\right)^2  + \\left( {y - y_0 } \\right)^2  = R^2'
    },
    {
      name: 'Geometry: curves and shapes: equation of a sphere',
      code: '\\left( {x - x_0 } \\right)^2  + \\left( {y - y_0 } \\right)^2  + \\left( {z - z_0 } \\right)^2  = R^2'
    },
    {
      name: 'Geometry: curves and shapes: equation of an ellipsoid',
      code: '\\frac{{\\left( {x - x_0 } \\right)^2 }}{{a^2 }} + \\frac{{\\left( {y - y_0 } \\right)^2 }}{{b^2 }} + \\frac{{\\left( {z - z_0 } \\right)^2 }}{{c^2 }} = 1' // eslint-disable-line
    },
    {
      name: 'Geometry: curves and shapes: equation of an ellipse',
      code: '\\frac{{\\left( {x - x_0 } \\right)^2 }}{{a^2 }} + \\frac{{\\left( {y - y_0 } \\right)^2 }}{{b^2 }} = 1'
    },
    {
      name: 'Geometry: curves and shapes: distance between two points (2-D)',
      code: 'd = \\sqrt {\\left( {x_1  - x_2 } \\right)^2  + \\left( {y_1  - y_2 } \\right)^2 }'
    },
    {
      name: 'Geometry: curves and shapes: distance between two points (3-D)',
      code: 'd = \\sqrt {\\left( {x_1  - x_2 } \\right)^2  + \\left( {y_1  - y_2 } \\right)^2  + \\left( {z_1  - z_2 } \\right)^2 }' // eslint-disable-line
    },
    {
      name: 'Geometry: curves and shapes: eccentricity of an ellipse',
      code: '\\varepsilon  = \\frac{{\\sqrt {a^2  - b^2 } }}{a}'
    },
    {
      name: 'Geometry: curves and shapes: eccentricity of a hyperbola',
      code: '\\varepsilon  = \\frac{{\\sqrt {a^2  + b^2 } }}{a}'
    },
    {
      name: 'Geometry: curves and shapes: equation of a hyperbola',
      code: '\\frac{{\\left( {x - x_0 } \\right)^2 }}{{a^2 }} - \\frac{{\\left( {y - y_0 } \\right)^2 }}{{b^2 }} = 1'
    },
    {
      name: 'Physics: electricity and magnetism: Ampere\'s law',
      code: '\\oint_C {Bd\\ell  = \\mu _0 I_C }'
    },
    {
      name: 'Physics: electricity and magnetism: Yukawa potential',
      code: 'V = \\frac{{V_\\theta  e^{ - kr} }}{r}'
    },
    {
      name: 'Physics: electricity and magnetism: Ohm\'s law',
      code: 'V = IR = I\\left( {\\frac{L}{{\\sigma A}}} \\right) = I\\left( {\\frac{{\\rho L}}{A}} \\right)'
    },
    {
      name: 'Physics: electricity and magnetism: Maxwell\'s equations',
      code: '\\nabla\\cdot{\\bf D} = \\rho \\quad\\quad\n\\nabla\\cdot{\\bf B} = 0 \\quad\\quad\n\\nabla\\times{\\bf E} = - {{\\partial{\\bf B}}\\over{\\partial t}} \\quad\\quad\n\\nabla\\times{\\bf H} = {\\bf J} + {{\\partial{\\bf D}}\\over{\\partial t}}' // eslint-disable-line
    },
    {
      name: 'Physics: electricity and magnetism: Maxwell\'s equations',
      code: '\\Rot\\vec{E} =-\\frac{1}{c}\\parder{\\vec{B}}{t} \\quad\\quad\n\\Div\\vec{B} =0 \\quad\\quad\n\\Rot\\vec{B} =\\frac{1}{c}\\parder{\\vec{E}}{t}+\\frac{4\\pi}{c}\\,\\vec{j} \\quad\\quad\n\\Div\\vec{E} =4\\pi\\rho_{\\varepsilon}' // eslint-disable-line
    },
    {
      name: 'Physics: electricity and magnetism: Maxwell\'s equation - Faraday\'s law',
      code: '\\oint_C {E \\cdot d\\ell  =  - \\frac{d}{{dt}}} \\int_S {B_n dA}'
    },
    {
      name: 'Physics: electricity and magnetism: Maxwell\'s equation - Gauss\'s law',
      code: '\\oint_S {E_n dA = \\frac{1}{{\\varepsilon _0 }}} Q_{inside}'
    },
    {
      name: 'Physics: electricity and magnetism: self inductance of a solenoid',
      code: 'L = \\frac{{\\phi _m }}{I} = \\mu _0 n^2 A\\ell'
    },
    {
      name: 'Physics: electricity and magnetism: magnetic flux defined',
      code: '\\phi _m  = \\int_S {N{\\bf{B}} \\cdot {\\bf{\\hat n}}dA = } \\int_S {NB_n dA}'
    },
    {
      name: 'Physics: electricity and magnetism: electromotive force defined',
      code: '\\xi  = \\oint_C {E \\cdot d\\ell }'
    },
    {
      name: 'Physics: electricity and magnetism: resistance',
      code: 'R = \\frac{L}{{\\sigma A}} = \\frac{{\\rho L}}{A}'
    },
    {
      name: 'Physics: modern physics: black hole entropy as derived by Stephen Hawking',
      code: 'S = \\frac{{Akc^3 }}{{4\\hbar G}}'
    },
    {
      name: 'Physics: modern physics: Rydberg constant',
      code: 'R = \\frac{{m_e k^2 e^4 }}{{4\\pi c\\hbar ^3 }}'
    },
    {
      name: 'Physics: modern physics: Schwarzschild black hole radius',
      code: 'R = \\frac{{2GM}}{{c^2 }}'
    },
    {
      name: 'Physics: modern physics: Black hole temperature',
      code: 'T = \\frac{{\hbar c^3 }}{{8\\pi kGM}}'
    },
    {
      name: 'Physics: modern physics: time-independent, one-dimensional Schrödinger equation',
      code: '- \\frac{{\\hbar ^2 }}{{2m}}\\frac{{d^2 \\psi (x)}}{{dx^2 }} + U(x)\\psi (x) = E\\psi (x)'
    },
    {
      name: 'Physics: modern physics: time-dependent, one-dimensional Schrödinger equation',
      code: '- \\frac{{\\hbar ^2 }}{{2m}}\\frac{{\\partial ^2 \\psi (x,t)}}{{\\partial x^2 }} + U(x)\\psi (x,t) = i\\hbar \\frac{{\\partial \\psi (x,t)}}{{\\partial t}}' // eslint-disable-line
    },
    {
      name: 'Physics: modern physics: Bohr radius',
      code: 'a_0  = \\frac{{\\hbar ^2 }}{{m_e ke^2 }}'
    },
    {
      name: 'Physics: modern physics: radii of stable orbits in the Bohr model',
      code: 'r = n^2 \\frac{{\\hbar ^2 }}{{m_e kZe^2 }} = n^2 \\frac{{a_0 }}{Z}'
    },
    {
      name: 'Physics: modern physics: Planck\'s quantized energy equation',
      code: '\\Delta E = h\\nu'
    },
    {
      name: 'Physics: modern physics: Rydberg equation',
      code: '\\Delta E = R_H \\left( {\\frac{1}{{n_i ^2 }} - \\frac{1}{{n_f ^2 }}} \\right)'
    },
    {
      name: 'Physics: modern physics: relationship between energy and principal quantum number',
      code: 'E_n  =  - R_H \\left( {\\frac{1}{{n^2 }}} \\right) = \\frac{{ - 2.178 \\times 10^{ - 18} }}{{n^2 }}joule'
    },
    {
      name: 'Physics: modern physics: De Broglie wavelength',
      code: '\\lambda  = \\frac{h}{{m\\upsilon }}'
    },
    {
      name: 'Physics: modern physics: reaction quotient',
      code: '\\begin{array}{*{20}c}\n   {Q = \\frac{{\\left[ C \\right]^c \\left[ D \\right]^d }}{{\\left[ A \\right]^a \\left[ B \\right]^b }}}  \\\\\n   {\\begin{array}{*{20}c}\n   {where} & {aA + bB \\to cC + dD}  \\\\\n\\end{array}}  \\\\\n\\end{array}' // eslint-disable-line
    },
    {
      name: 'Physics: modern physics: cell voltage',
      code: 'E_{cell}  = E^\circ _{cell}  - \\frac{{RT}}{{n\\Im }}\\ln Q = E^\\circ _{cell}  - \\frac{{0.0592}}{n}\\log Q'
    },
    {
      name: 'Physics: modern physics: relativity',
      code: 'E_0 = mc^2 \\quad E = \\frac{mc^2}{\\sqrt{1-\\frac{v^2}{c^2}}}'
    },
    {
      name: 'Physics: oscillations and waves: superposition of standing waves on a string with both ends fixed',
      code: 'y(x,t) = \\sum\\limits_n {A_n \\cos (\\omega _n t + \\delta _n )\\sin (k_n x)}'
    },
    {
      name: 'Physics: oscillations and waves: standing-wave function',
      code: 'y(x,t) = A_n \\cos (\\omega _n t + \\delta _n )\\sin (k_n x)'
    },
    {
      name: 'Physics: oscillations and waves: energy transmitted by a harmonic wave',
      code: '\\Delta E = \\frac{1}{2}\\mu \\omega ^2 A^2 \\Delta x = \\frac{1}{2}\\mu \\omega ^2 A^2 \\upsilon \\Delta t'
    },
    {
      name: 'Physics: oscillations and waves: power transmitted by a harmonic wave',
      code: 'P = \\frac{{dE}}{{dt}} = \\frac{1}{2}\\mu \\omega ^2 A^2 \\upsilon'
    },
    {
      name: 'Physics: oscillations and waves: harmonic wave function',
      code: 'y(x,t) = A\\sin \\left[ {2\\pi \\left( {\\frac{x}{\\lambda } - \\frac{t}{T}} \\right)} \\right]'
    },
    {
      name: 'Physics: oscillations and waves: harmonic wave function',
      code: 'y(x,t) = A\\sin \\left[ {k(x - \\upsilon t)} \\right]'
    },
    {
      name: 'Physics: oscillations and waves: velocity at resonance frequency of a driven oscillator',
      code: '\\upsilon  =  + A\\omega \\cos \\left( {\\omega t} \\right) =  - A\\omega \\sin \\left( {\\omega t - \\frac{\\pi }{2}} \\right)' // eslint-disable-line
    },
    {
      name: 'Physics: oscillations and waves: amplitude of a driven oscillation',
      code: 'A = \\frac{{F_0 }}{{\\sqrt {m^2 \\left( {\\omega _0^2  - \\omega ^2 } \\right)^2  + b^2 \\omega ^2 } }}'
    },
    {
      name: 'Physics: oscillations and waves: displacement of a driven oscillator',
      code: 'x = A\\cos \\left( {\\omega t + \\delta } \\right)'
    },
    {
      name: 'Physics: general: kinetic energy',
      code: 'E_k  = \\frac{1}{2}mv^2'
    },
    {
      name: 'Physics: general: equation of linear motion',
      code: 'x\\left( t \\right) = x_o  + vt + \\frac{1}{2}at^2'
    },
    {
      name: 'Physics: general: viscous flow',
      code: 'F = \\eta \\frac{{\\upsilon A}}{z}'
    },
    {
      name: 'Physics: general: Stefan-Boltzmann law',
      code: 'P = e\\sigma AT^4'
    },
    {
      name: 'Physics: general: Van der Waals equation',
      code: '\\left( {P + \\frac{{an^2 }}{{V^2 }}} \\right)\\left( {V - bn} \\right) = nRT'
    },
    {
      name: 'Physics: general: combined Gas law',
      code: '\\frac{{P_1 V_1 }}{{n_1 T_1 }} = \\frac{{P_2 V_2 }}{{n_2 T_2 }}'
    },
    {
      name: 'Physics: general: Navier-Stokes equation',
      code: '{\\partial{\\bf u}\\over{\\partial t}} + ({\\bf u} \\cdot \\nabla) {\\bf u} = - {1\\over\\rho} \\nabla p + \\gamma\\nabla^2{\\bf u} + {1\\over\rho}{\\bf F}' // eslint-disable-line
    },
    {
      name: 'Polynomials: Chebyshev polynomial of the first kind arises as a solution to',
      code: '(1-x^2)\\,y\'\' - x\\,y\' + n^2\\,y = 0'
    },
    {
      name: 'Polynomials: Chebyshev polynomial of the second kind arises as a solution to',
      code: '(1-x^2)\\,y\'\' - 3x\\,y\' + n(n+2)\\,y = 0'
    },
    {
      name: 'Polynomials: Chebyshev polynomials of the first kind are defined by the recurrence relation',
      code: 'T_0(x) = 1 \\, T_1(x) = x \\, T_{n+1}(x) = 2xT_n(x) - T_{n-1}(x)'
    },
    {
      name: 'Polynomials: The Chebyshev polynomials of the second kind are defined by the recurrence relation',
      code: 'U_0(x) = 1 \\, U_1(x) = 2x \\, U_{n+1}(x) = 2xU_n(x) - U_{n-1}(x)'
    },
    {
      name: 'Polynomials: For integers (m,n), Chebyshev polynomials satisfy the orthogonality relations',
      code: '\\int_{-1}^1 U_n(x)U_m(x)\\sqrt{1-x^2}\\,dx =\\frac{\\pi}{2}\\delta_{m,n}'
    },
    {
      name: 'Polynomials: The \'probabilists\' Hermite polynomials are defined by',
      code: 'H_n(x)=(-1)^n e^{x^2/2}\\frac{d^n}{dx^n}e^{-x^2/2}'
    },
    {
      name: 'Polynomials: The \'physicists\' Hermite polynomials are defined by',
      code: 'H_n(x)=(-1)^n e^{x^2}\\frac{d^n}{dx^n}e^{-x^2}'
    },
    {
      name: 'Polynomials: The \'physicists\' Hermite polynomials satisfy the orthogonality relation',
      code: '\\int_{-\\infty}^\\infty H_n(x)H_m(x)\\,e^{-x^2}\\,dx ={n!2^n}{\\sqrt{\\pi}}\\delta_{nm}'
    },
    {
      name: 'Polynomials: Legendre polynomials are solutions to',
      code: '{\\frac{d}{dx}} \\left[ (1-x^2) {\\frac{d}{dx}} P(x) \\right] + n(n+1)P(x) = 0'
    },
    {
      name: 'Polynomials: Legendre polynomials satisfy the orthogonality relation',
      code: '\\int_{-1}^{1} P_m(x) P_n(x)\\,dx = {\\frac{2}{2n + 1}} \\delta_{mn}'
    },
    {
      name: 'Polynomials: Legendre polynomials may be expressed using Rodrigues\' formula',
      code: 'P_n(x) = (2^n n!)^{-1} {\\frac{d^n}{dx^n} } \\left[ (x^2 -1)^n \\right]'
    },
    {
      name: 'Polynomials: Associated Legendre functions of the first kind can be given in terms of the usual Legendre polynomials by', // eslint-disable-line
      code: 'P_\\ell^m(x)\\ =\\ (-1)^m(1-x^2)^{m/2}\\frac{d^m}{dx^m}P_\\ell(x)\\ =\\ \\frac{(-1)^m}{2^\\ell \\ell!} (1-x^2)^{m/2}\\frac{d^{\\ell+m}}{dx^{\\ell+m}}(x^2-1)^\\ell' // eslint-disable-line
    },
    {
      name: 'Polynomials: Associated Legendre functions of the first kind satisfy the orthogonality relation',
      code: '\\int_{-1}^{1} P_k ^{(m)} P_\\ell ^{(m)} dx  = \\frac{2 (\\ell+m)!}{(2\\ell+1)(\\ell-m)!}\\ \\delta _{k,\\ell},\\quad 0 \\le m \\le \\ell,\\quad \\delta _{k,\\ell}\\ is\\ Kronecker\\ delta' // eslint-disable-line
    },
    {
      name: 'Polynomials: Associated Legendre functions of the second kind can be given in terms of the usual Legendre polynomials by', // eslint-disable-line
      code: 'Q_\\ell^m(x) = (-1)^m(1-x^2)^{m/2}\\frac{d^m}{dx^m}Q_\\ell(x)'
    },
    {
      name: 'Polynomials: Laguerre polynomials are solutions of Laguerre\'s equation',
      code: '{x\\,y\'\' + (1 - x)\\,y\' + n\\,y = 0'
    },
    {
      name: 'Polynomials: Laguerre polynomials satisfy the orthogonality relation',
      code: '\\int_0^\\infty L_m(x) L_n(x) e^{-x}\\,dx = \\delta_{mn}'
    },
    {
      name: 'Polynomials: Laguerre polynomials may be defined by the Rodrigues\' formula',
      code: 'L_n(x)=\\frac{e^x}{n!}\\frac{d^n}{dx^n}\\left(e^{-x} x^n\\right)'
    },
    {
      name: 'Polynomials: The generalized (sometimes called the associated) Laguerre polynomials may be defined by the Rodrigues\' formula', // eslint-disable-line
      code: 'L_n^{(\\alpha)}(x) = {\\frac{x^{-\\alpha} e^x}{n!}}{\\frac{d^n}{dx^n}} \\left(e^{-x} x^{n+\\alpha}\\right)'
    },
    {
      name: 'Polynomials: Jacobi polynomials are obtained from hypergeometric series in cases where the series is in fact finite',
      code: 'P_n^{(\\alpha,\\beta)}(z) =\\frac{(\\alpha+1)_n}{n!} \\,_2F_1\\left(-n,1+\\alpha+\\beta+n;\\alpha+1;\\frac{1-z}{2}\\right),\\quad ()_n\\ is\\ Pochhammer\'s\\ symbol' // eslint-disable-line
    },
    {
      name: 'Polynomials: Explicit expression for the Jacobi polynomials',
      code: 'P_n^{(\\alpha,\\beta)} (z) = \\frac{\\Gamma (\\alpha+n+1)}{n!\\Gamma (\\alpha+\\beta+n+1)} \\sum_{m=0}^n {n\\choose m} \\frac{\\Gamma (\\alpha + \\beta + n + m + 1)}{\\Gamma (\\alpha + m + 1)} \\left(\\frac{z-1}{2}\\right)^m' // eslint-disable-line
    },
    {
      name: 'Polynomials: Ultraspherical or Gegenbauer polynomials are given in terms of the Jacobi polynomials',
      code: 'C_n^{(a)}(x)= \\frac{\\Gamma(a+1/2)}{\\Gamma(2a)}\\frac{\\Gamma(n+2a)}{\\Gamma(n+a+1/2)} P_n^{(a-1/2,a-1/2)}(x)'
    },
    {
      name: 'Polynomials: Gegenbauer polynomials satisfy the orthogonality relation',
      code: '\\int_{-1}^1(1-x^2)^{a-1/2}C_m^{(a)}(x)C_n^{(a)}(x)\\, dx =\\delta_{mn}2^{1-2a}\\pi \\frac{\\Gamma(n+2a)}{(n+a)\\Gamma^2(a)\\Gamma(n+1)}' // eslint-disable-line
    },
    {
      name: 'Polynomials: Gegenbauer polynomials are obtained from hypergeometric series in cases where the series is in fact finite', // eslint-disable-line
      code: 'C_n^{(a)}(z) =\\frac{(2a)^{\\underline{n}}}{n!} \\,_2F_1\\left(-n,2a+n;a+\\frac{1}{2};\\frac{1-z}{2}\\right),\\quad \\underline{n}\\ is\\ the\\ falling\\ factorial' // eslint-disable-line
    },
    {
      name: 'Polynomials: Pochhammer symbol is used in the theory of special functions to represent the rising (or upper) factorial', // eslint-disable-line
      code: '(x)_n=x(x+1)(x+2)\\cdots(x+n-1)=\\frac{(x+n-1)!}{(x-1)!}'
    },
    {
      name: 'Polynomials: On the other hand, the falling (or lower) factorial is',
      code: 'x^{\\underline{n}}=\\frac{x!}{(x-n)!}'
    },
    {
      name: 'Special functions: Gamma function is defined by',
      code: '\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t} dt'
    },
    {
      name: 'Special functions: Incomplete Gamma function is defined by',
      code: '\\Gamma(a, z) = \\int_z^\\infty t^{a-1}e^{-t} dt'
    },
    {
      name: 'Special functions: Digamma function is the logarithmic derivative of the Gamma function',
      code: '\\psi(x) = \\frac{d}{dx} \\log(\\Gamma(x)) = \\frac{\\Gamma\'(x)}{\\Gamma(x)}'
    },
    {
      name: 'Special functions: Beta function is defined by',
      code: 'B(p,q) = \\int_0^1 t^{p-1}(1-t)^{1-q} dt'
    },
    {
      name: 'Special functions: The order of Beta function inputs does not matter',
      code: 'B(p,q)=B(q,p)'
    },
    {
      name: 'Special functions: Beta function is defined in terms of Gamma function as',
      code: 'B(p,q) = \\Gamma(p)\\Gamma(q)/\\Gamma(p+q),\\ or\\quad B(p,q) =  \\exp[\\log\\Gamma(p)+\\log\\Gamma(q)-\\log\\Gamma(p+q)]' // eslint-disable-line
    },
    {
      name: 'Special functions: Beta function satisfies relation',
      code: 'B(p,q) = (-1)^q B(1-p-q, q)'
    },
    {
      name: 'Special functions: Airy functions (Ai and Bi) are solutions to the differential equation',
      code: 'y\'\' - xy = 0'
    },
    {
      name: 'Special functions: Airy function (Ai) initial conditions',
      code: 'Ai(0) = (\\Gamma(2/3)3^{2/3})^{-1},\\quad Ai\'(0) = -(\\Gamma(1/3)3^{1/3})^{-1}'
    },
    {
      name: 'Special functions: Airy function (Bi) initial conditions',
      code: 'Bi(0) = 3^{1/2}Ai(0),\\quad Bi\'(0) = -3^{1/2}Ai\'(0)'
    },
    {
      name: 'Special functions: The confluent hypergeometric function is defined to be the solution to',
      code: 'xy\'\' + (b-x)y\' - ay = 0'
    },
    {
      name: 'Special functions: The error function, defined for real values as',
      code: '\\text{erf}(x) = \\frac{2}{\\sqrt{\\pi}} \\int_0^x e^{-t^2} dt'
    },
    {
      name: 'Special functions: The generalized complex exponential integral',
      code: 'E_n(z) = \\int_1^{\\infty} \\frac{e^{-z t}}{t^n} \\; dt'
    },
    {
      name: 'Special functions: Bessel functions are canonical solutions y(x) of Bessel\'s differential equation',
      code: 'x^2 \\frac{d^2 y}{dx^2} + x \\frac{dy}{dx} + \\left(x^2 - \\nu^2\\right)y = 0'
    },
    {
      name: 'Special functions: Bessel function of the first kind denotes the unique solution of Bessel\'s equation which is non-singular at x = 0', // eslint-disable-line
      code: 'J_\\nu(x) = \\frac{x^n}{2^\\nu \\Gamma(\\nu + 1)} {}_0F_1(\\nu + 1, -\\frac{x^2}{4})'
    },
    {
      name: 'Special functions: Bessel function of the second kind is the second linearly independent solution to Bessel\s equation (which is singular at x=0)', // eslint-disable-line
      code: 'Y_\\nu(x) = \\frac{ J_\\nu(x) \\cos(\\pi \\nu) - J_{-\\nu}(x)}{\\sin(\\pi \\nu)}'
    },
    {
      name: 'Special functions: Bessel I function, or the modified Bessel Function of the first kind',
      code: 'I_\\nu(x) = i^{-\\nu} J_\\nu(ix)'
    },
    {
      name: 'Special functions: Bessel K function, or the modified Bessel function of the second kind',
      code: 'K_\\nu(x) = \\frac{\\pi}{2} \\cdot \\frac{I_{-\\nu}(x) - I_n(x)}{\\sin(\\pi \\nu)}'
    },
    {
      name: 'Special functions: The derivative of the Bessel function of the first kind with respect to x',
      code: '\\frac{d}{dx} J_n(x) = \\frac{1}{x^n} \\left(x^n J_{n-1}(x) - n x^{n-1} J_n(z) \\right)'
    },
    {
      name: 'Special functions: Hankel functions, also known as Bessel functions of the third kind',
      code: 'H_\\nu^{(1)}(x) = J_\\nu(x) + i Y_\\nu(x) \\qquad H_\\nu^{(2)}(x) = J_\\nu(x) - i Y_\\nu(x)'
    },
    {
      name: 'Special functions: Complete elliptic integral of the first kind',
      code: '\\int_0^{\\pi/2} \\frac{dx}{\\sqrt{1 - m\\sin(x)^2}}'
    },
    {
      name: 'Special functions: Incomplete elliptic integral of the first kind',
      code: '\\int_0^\\phi \\frac{dx}{\\sqrt{1 - m\\sin(x)^2}}'
    },
    {
      name: 'Special functions: Complete elliptic integral of the second kind',
      code: '\\int_0^{\\pi/2} \\sqrt{1 - m\\sin(x)^2}\\, dx'
    },
    {
      name: 'Special functions: Incomplete elliptic integral of the second kind',
      code: '\\int_0^u \\mathrm{dn}(x,m)^2\\, dx = \\int_0^\\tau {\\sqrt{1-m x^2}\\over\\sqrt{1-x^2}}\\, dx'
    },
    {
      name: 'Special functions: Incomplete elliptic integral of the third kind',
      code: '\\int_0^t \\frac{dx}{(1 - n \\sin(x)^2) \\sqrt{1 - m \\sin(x)^2}}'
    },
    {
      name: 'Misc: Hilbert transform',
      code: '\\hat{x}(t) = { 1 \\over \\pi } \\int_{-\\infty}^{\\infty} {x(k) \\over t-k } dk'
    },
    {
      name: 'Misc: inverse Hilbert transform',
      code: '\\hat{x}(t) = { 1 \\over \\pi } \\int_{-\\infty}^{\\infty} {x(k) \\over t-k } dk'
    }
  ];
