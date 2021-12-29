import { Sample } from './sample';

export const multilineFunctionalitySamples: Sample[] =
  [
    {
      name: 'Multiline Equations 01',
      code: '\\begin{array}{lcl} z & = & a \\\\\n f(x,y,z) & = & x + y + z \\end{array}'
    },
    {
      name: 'Multiline Equations 02',
      code: '\\begin{array}{rcr} z & = & a \\\\\n f(x,y,z) & = & x + y + z \\end{array}'
    },
    {
      name: 'Multiline Equations 03',
      code: '\\begin{array}{rcl} f: R^3 & \\to & R \\\\\n (x,y,z) & \\to & x + y + z \\\\\n f(x,y,z) & = & x + y + z \\end{array}'
    },
    {
      name: 'Multiline Equations 04',
      code: '\\begin{array} {lcl} f(x) & = & (a+b)^2 \\\\\n & = & a^2+2ab+b^2 \\end{array}'
    },
    {
      name: 'Arrays 01',
      code: '\\left( \\begin{array}{ccc}\na & b & c \\\\\nd & e & f \\\\\ng & h & i \\end{array} \\right)'
    },
    {
      name: 'Arrays 02',
      code: '|x| = \\left\\{ \\begin{array}{ll} x & \\mbox{ if $x \\geq 0$ };\\\\-x & \\mbox{ if $x < 0$ }.\\end{array} \\right.'
    },
    {
      name: 'Arrays 03',
      code: '\\chi(\\lambda) = \\left| \\begin{array}{ccc}\n\\lambda - a & -b & -c \\\\\n-d & \\lambda - e & -f \\\\\n-g & -h & \\lambda - i \\end{array} \\right|' // eslint-disable-line
    },
    {
      name: 'Arrays 04 controlling horizontal spacing',
      code: '\\left( \\begin{array}{c} n \\\\ r \\end{array} \\right) = \\frac{n!}{r!(n-r)!}'
    },
    {
      name: 'Arrays 05',
      code: 'F(x,y)=0\\ \\mbox{and}\\ \\left| \\begin{array}{ccc}\n          F\'\'_{xx} & F\'\'_{xy} &  F\'_x \\\\\n          F\'\'_{ yx } & F\'\'_{ yy } & F\'_y \\\\\n          F\'_x & F\'_y     & 0 \n          \\end{array}\\right| = 0' // eslint-disable-line
    },
    {
      name: 'Arrays 06',
      code: '|x| = \\left\\{ \\begin{array}{rl}\n        -x &\\mbox{ if $x<0$} \\\\\n         x &\\mbox{ otherwise}\n\\end{array} \\right.' // eslint-disable-line
    },
    {
      name: 'Arrays 07',
      code: '\\begin{eqnarray}\n    y &=& x^4 + 4     \\\\\n    &=& (x^2+2)^2 -4x^2 \\\\\n    &\\le&(x^2+2)^2\n\\end{eqnarray}'
    },
    {
      name: 'Arrays 08',
      code: '\\begin{eqnarray*}\n    e^x &\\approx& 1+x+x^2/2! + \\\\\n    && {}+x^3/3! + x^4/4! + \\\\\n    && + x^5/5!\n\\end{eqnarray*}' // eslint-disable-line
    },
    {
      name: 'Arrays 09',
      code: '\\begin{eqnarray*}\n    \\lefteqn{w+x+y+z = }\\\\\n    && a+b+c+d+e+\\\\\n    && {}+f+g+h+i\n\\end{eqnarray*}'
    },
    {
      name: 'Arrays 10',
      code: '\\begin{eqnarray*}\n    x&=&\\sin \\alpha = \\cos \\beta\\\\\n     &=&\\cos(\\pi-\\alpha) = \\sin(\\pi-\\beta)\n\\end{eqnarray*}' // eslint-disable-line
    },
    {
      name: 'Arrays 11',
      code: '{\\begin{eqnarray*}\n        x&=&\\sin \\alpha = \\cos \\beta\\\\\n        &=&\\cos(\\pi-\\alpha) = \\sin(\\pi-\\beta)\n    \\end{eqnarray*}\n}' // eslint-disable-line
    },
    {
      name: 'Arrays 12',
      code: '$$\\begin{array}{rclcl}\n        x&=&\\sin \\alpha &=& \\cos \\beta\\\\\n         &=&\\cos(\\pi-\\alpha) &=& \\sin(\\pi-\\beta)\n    \\end{array}\n$$' // eslint-disable-line
    },
    {
      name: 'Arrays 13',
      code: '\\Psi\' = \\frac{ d } { d \\phi } \\left(\\begin{ array }{ c }\n  \\phi_{ 2}  \\\\  \\phi_{ 3}  \\\\  1 - \\phi_{ 2} - \\phi_{ 1} ^ { 2} / 2\n\\end{ array } \\right) \\qquad\n\\Theta = \\left(\\begin{ array }{ ccc }\n  0 & 1 & 0 \\\\\n - \\theta_{ 1} \\psi_{ 1} - \\psi_{ 2} & 0 & \\psi_3 \\\\\n -\\phi_{ 1} & -1 & 0\n\\end{ array } \\right)' // eslint-disable-line
    },
    {
      name: 'Arrays 14',
      code: '\\begin{eqnarray}\n    \\int_0^{\\infty} e^{-x^2}\\,dx\n    & = &   e^{-\\left(\\int_0^{\\infty}x\\,dx\\right)^2}  \\\\\n    & = &   e^{-\\infty}\\ \\mbox{(bogus)} \\\\\n    & = &   0.38-1.7i\\ \\mbox{(not!)}\n\\end{eqnarray}' // eslint-disable-line
    },
    {
      name: 'Arrays 15',
      code: '\\begin{eqnarray*}\n  \\sum_{n=1}^k \\frac1n\n    & \\approx & \\ln k + \\gamma  \\\\\n    & = &       (\\ln 10)(\\log_{10}k) + \\gamma \\\\\n    & \\approx & 2.3026\\log_{10}k + 0.57772\n\\end{eqnarray*}' // eslint-disable-line
    },
    {
      name: 'Arrays 16',
      code: '\\begin{array}{rlc} n & n^2 & n^3 \\\\ 3 & 9 & 27 \\\\ 4 & 16 & 64 \\\\ 11 & 121 & 1331 \\end{array}'
    },
    {
      name: 'Arrays 17',
      code: '\\begin{array}{r|lc} n & n^2 & n^3 \\\\ \\hline 3 & 9 & 27 \\\\ 4 & 16 & 64 \\\\ 11 & 121 & 1331 \\end{array}'
    },
    {
      name: 'Arrays 18',
      code: '\\begin{eqnarray*}\n  e^x &=& \\sum_{n=0}^\\infty \\frac{x^n}{n!}\n  \\quad\\text{where }n!=\\prod_{i=1}^n i\\,,  \\\\\n  \\overline{U_\\alpha}\n  & = & \\bigcap_\\alpha U_\\alpha\n\\end{eqnarray*}' // eslint-disable-line
    },
    {
      name: 'Arrays 19',
      code: '\\begin{eqnarray}\n  u_\\alpha & = & \\epsilon^2 \\kappa_{xxx} \n  \\left( y-\\frac{1}{2}y^2 \\right)  \\\\\n  v & = & \\epsilon^3 \\kappa_{xxx} y\\,,  \\\\\n  p & = & \\epsilon \\kappa_{xx}\\,.\n\\end{eqnarray}' // eslint-disable-line
    },
    {
      name: 'Arrays 20',
      code: '\\begin{eqnarray}\n  \\omega_1 & = &\n  \\frac{\\partial w}{\\partial y}\n  -\\frac{\\partial v}{\\partial z}\\,, \\\\\n  \\omega_2 & = & \n  \\frac{\\partial u}{\\partial z}\n  -\\frac{\\partial w}{\\partial x}\\,, \\\\\n  \\omega_3 & = & \n  \\frac{\\partial v}{\\partial x}\n  -\\frac{\\partial u}{\\partial y}\\,.\n\\end{eqnarray}' // eslint-disable-line
    },
    {
      name: 'Case definitions 01',
      code: 'f(n) = \\begin{cases} n/2, & \\mbox{if } n\\mbox{ is even} \\\\\n 3n+1, & \\mbox{if } n\\mbox{ is odd} \\end{cases}'
    },
    {
      name: 'Case definitions 02',
      code: '|x|=\\begin{cases}\n    x & \\text{if }x\\geq 0\\,, \\\\\n    -x & \\text{if }x< 0\n  \\end{cases}'
    },
    {
      name: 'Simultaneous equations 01',
      code: '\\begin{cases} 3x + 5y + z \\\\ 7x - 2y + 4z \\\\ -6x + 3y + 2z \\end{cases}'
    },
    {
      name: 'Matrices 01',
      code: '\\left| \\begin{array}{cc} x_{11} & x_{12} \\\\ x_{21} & x_{22} \\end{array} \\right|'
    },
    {
      name: 'Matrices 02',
      code: '\\begin{array}{cc} A & B \\\\ C & D \\end{array}'
    },
    {
      name: 'Matrices 03',
      code: '\\begin{matrix} x & y \\\\ z & v \\end{matrix}'
    },
    {
      name: 'Matrices 04',
      code: '\\begin{vmatrix} x & y \\\\ z & v \\end{vmatrix}'
    },
    {
      name: 'Matrices 05',
      code: '\\begin{Vmatrix} x & y \\\\ z & v \\end{Vmatrix}'
    },
    {
      name: 'Matrices 06',
      code: '\\begin{bmatrix} x & y \\\\ z & v \\end{bmatrix}'
    },
    {
      name: 'Matrices 07',
      code: '\\begin{Bmatrix} x & y \\\\ z & v \\end{Bmatrix}'
    },
    {
      name: 'Matrices 08',
      code: '\\begin{pmatrix} x & y \\\\ z & v \\end{pmatrix}'
    },
    {
      name: 'Matrices 09',
      code: '\\begin{bmatrix} 0 & \\cdots & 0 \\\\ \\vdots & \\ddots & \\vdots \\\\ 0 & \\cdots & 0 \\end{bmatrix}'
    },
    {
      name: 'Matrices 10',
      code: '\\left[ \\begin{array}{c} x_1 \\\\ x_2 \\end{array} \\right] = \\begin{bmatrix} A & B \\\\ C & D \\end{bmatrix} \\times \\left[ \\begin{array}{c} y_1 \\\\ y_2 \\end{array} \\right]' // eslint-disable-line
    },
    {
      name: 'Matrices 11',
      code: '\\begin{bmatrix} xz & xw \\\\ yz & yw \\end{bmatrix} = \\left[ \\begin{array}{c} x \\\\ y \\end{array} \\right] \\times \\left[ \\begin{array}{cc} z & w \\end{array} \\right]' // eslint-disable-line
    },
    {
      name: 'Matrices 12',
      code: 'A_{m,n}=\\begin{pmatrix}a_{1,1} & a_{1,2} & \\cdots & a_{1,n} a_{2,1} & a_{2,2} & \\cdots\n & a_{2,n} \\vdots  & \\vdots  & \\ddots & \\vdots  \\\\ a_{m,1} & a_{m,2} & \\cdots & a_{m,n}\\end{pmatrix}' // eslint-disable-line
    },
    {
      name: 'Matrices 13',
      code: '\\bordermatrix{~ & x & y \\cr A & 1 & 0 \\cr B & 0 & 1 \\cr}'
    },
    {
      name: 'Matrices 14',
      code: '\\begin{pmatrix} 1 & 2 & 3 \\\\4 & 5 & 6 \\\\7 & 8 & 9 \\end{pmatrix}'
    },
    {
      name: 'Matrices 15',
      code: '\\begin{bmatrix} 1 & 2 & 3 \\\\4 & 5 & 6 \\\\7 & 8 & 9 \\end{bmatrix}'
    },
    {
      name: 'Matrices 16',
      code: '\\begin{Bmatrix} 1 & 2 & 3 \\\\4 & 5 & 6 \\\\7 & 8 & 9 \\end{Bmatrix}'
    },
    {
      name: 'Matrices 17',
      code: '\\begin{vmatrix} 1 & 2 & 3 \\\\4 & 5 & 6 \\\\7 & 8 & 9 \\end{vmatrix}'
    },
    {
      name: 'Matrices 18',
      code: '\\begin{Vmatrix} 1 & 2 & 3 \\\\4 & 5 & 6 \\\\7 & 8 & 9 \\end{Vmatrix}'
    },
    {
      name: 'Matrices 19',
      code: '\\begin{matrix} 1 & 2 & 3 \\\\4 & 5 & 6 \\\\7 & 8 & 9 \\end{matrix}'
    },
    {
      name: 'Matrices 20',
      code: '\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}'
    },
    {
      name: 'Matrices 21',
      code: '\\begin{bmatrix}\n    1 & x & 0 \\\\\n    0 & 1 & -1\n  \\end{bmatrix}\\begin{bmatrix}\n    1 \\\\ y \\\\ 1\n  \\end{bmatrix}\n  =\\begin{bmatrix}\n    1+xy \\\\ y-1\n\\end{bmatrix}' // eslint-disable-line
    },
    {
      name: 'Matrices 22',
      code: '\\begin{matrix}\n    -2 & 1 & 0 & 0 & \\cdots & 0  \\\\\n    1 & -2 & 1 & 0 & \\cdots & 0  \\\\\n    0 & 1 & -2 & 1 & \\cdots & 0  \\\\\n    0 & 0 & 1 & -2 & \\ddots & \\vdots \\\\\n    \\vdots & \\vdots & \\vdots & \\ddots \n    & \\ddots & 1  \\\\\n    0 & 0 & 0 & \\cdots & 1 & -2\n\\end{matrix}' // eslint-disable-line
    }
  ];
