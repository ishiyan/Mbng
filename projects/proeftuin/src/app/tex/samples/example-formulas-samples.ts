import { Sample } from './sample';

export const exampleFormulasSamples: Sample[] =
  [
    {
      name: '01',
      code: '\\int_0^{\\infty}{x^{2n}e^{-ax^2}dx}=\\frac{2n-1}{2a}\\int_0^{\\infty}{x^{2(n-1)}e^{-ax^2}dx}=\\frac{(2n-1)!!}{2^{n+1}}\\sqrt{\\frac{\\pi}{a^{2n+1}}}' // eslint-disable-line
    },
    {
      name: '02',
      code: '\\int_0^\\infty e^{-x^2} dx=\\frac{\\sqrt{\\pi}}{2}'
    },
    {
      name: '03',
      code: '\\frac{1}{1+\\frac{1}{2+\\frac{1}{3+x}}} + \\frac{1}{1+\\frac{1}{2+\\frac{1}{3+x}}}'
    },
    {
      name: '04',
      code: '\\int \\!\\! \\int f(x,y)\\,\\mathrm{d}x\\mathrm{d}y'
    },
    {
      name: '05',
      code: '\\mathop{\\int \\!\\!\\! \\int}_{\\mathbf{x} \\in \\mathbf{R}^2} \\! \\langle \\mathbf{x},\\mathbf{y}\\rangle \\,d\\mathbf{x}' // eslint-disable-line
    },
    {
      name: '06',
      code: '\\int_a^b{f(x)dx}=(b-a)\\sum_{n=1}^{\\infty}{\\sum_{m=1}^{2^n-1}{({-1})^{m+1}}}2^{-n}f(a+m({b-a})2^{-n})'
    },
    {
      name: '07',
      code: 'L=\\int_a^b\\sqrt[4]{|\\sum_{i,j=1}^ng_{ij}(\\gamma(t))(\\frac{d}{dt}x^i\\circ\\gamma(t))(\\frac{d}{dt}x^j\\circ\\gamma(t))|}dt' // eslint-disable-line
    },
    {
      name: '08',
      code: '\\frac{n!}{k!(n-k)!} = \\binom{n}{k}'
    },
    {
      name: '09',
      code: '\\forall x \\in X \\ \\exists y \\leq \\epsilon'
    },
    {
      name: '10',
      code: '\\forall p,q \\ \\exists q \\mid \\bar{q} \\to p'
    },
    {
      name: '11',
      code: '\\bigcap \\limits _{i=1}^n \\bigcup \\limits _{j=1}^n {\\cal B}_{i,j}'
    },
    {
      name: '12 L\'Hôpital\'s rule',
      code: '\\lim_{x\\to 0}{\\frac{e^x-1}{2x}} \\overset{\\left[\\frac{0}{0}\\right]}{\\underset{\\mathrm{H}}{=}} \\lim_{x\\to 0}{\\frac{e^x}{2}}={\\frac{1}{2}}' // eslint-disable-line
    },
    {
      name: '13 Navier-Stokes equation',
      code: '{\\partial{\\bf u}\\over{\\partial t}} + ({\\bf u} \\cdot \\nabla) {\\bf u} = - {1\\over\\rho} \\nabla p + \\gamma\\nabla^2{\\bf u} + {1\\over\\rho}{\\bf F}' // eslint-disable-line
    },
    {
      name: '14 time-dependent one-dimensional Schrödinger equation',
      code: '- \\frac{{\\hbar ^2 }}{{2m}}\\frac{{\\partial ^2 \\psi (x,t)}}{{\\partial x^2 }} + U(x)\\psi (x,t) = i\\hbar \\frac{{\\partial \\psi (x,t)}}{{\\partial t}}' // eslint-disable-line
    },
    {
      name: '15 Maxwell\'s equations',
      code: '\\nabla\\cdot{\\bf D} = \\rho \\quad\\quad\n\\nabla\\cdot{\\bf B} = 0 \\quad\\quad\n\\nabla\\times{\\bf E} = - {{\\partial{\\bf B}}\\over{\\partial t}} \\quad\\quad\n\\nabla\\times{\\bf H} = {\\bf J} + {{\\partial{\\bf D}}\\over{\\partial t}}' // eslint-disable-line
    },
    {
      name: '16',
      code: '\\overset{\\alpha}{\\omega} \\underset{\\mu}{\\nu} \\overset{\\beta}{\\underset{\\Delta}{\\tau}} \\stackrel{\\zeta}{\\eta}' // eslint-disable-line
    },
    {
      name: '17',
      code: '\\| \\vec{u} + \\vec{v} \\| = \\| \\frac{u + v}{u-v} \\|'
    },
    {
      name: '18',
      code: '\\langle q | f ( \\hat{q} ) = f (q) \\langle q |'
    },
    {
      name: '19',
      code: '(\\frac {x^{a^m}}{y^{b^n}} ) \\qquad \\left ( \\frac {x^{a^m}}{y^{b^n}} \\right )'
    },
    {
      name: '20',
      code: 'z = \\overbrace{\n   \\underbrace{x}_\\text{real} + i\n   \\underbrace{y}_\\text{imaginary}\n  }^\\text{complex number}'
    },
    {
      name: '21',
      code: 'y = a + f(\\underbrace{b x}_{ \\ge 0 \\text{ by assumption}})\n  = a + f(\\underbrace{b x}_{ \\mathclap{\\ge 0 \\text{ by assumption}}})' // eslint-disable-line
    },
    {
      name: '22',
      code: 'A \\xleftarrow{n+\\mu-1} B \\xrightarrow[T]{n\\pm i-1} C'
    },
    {
      name: '23',
      code: '\\nabla \\phi (x,y) = \\frac{\\partial \\phi}{\\partial x} + \\frac{\\partial \\phi}{\\partial y}'
    },
    {
      name: '24',
      code: '\\nabla^2 \\phi (x,y) = \\frac{\\partial^2 \\phi}{\\partial x^2} + \\frac{\\partial^2 \\phi}{\\partial y^2}'
    },
    {
      name: '25',
      code: '\\frac{\\partial^2 \\phi}{\\partial x \\partial y} = \\frac{\\partial^2 \\phi}{\\partial y \\partial x}'
    },
    {
      name: '26',
      code: '\\oint_C \\nabla \\phi \\cdot dl = \\iint_S rot \\, E \\cdot dS\\qquad\n\\oint_C \\triangledown \\phi \\cdot dl = \\iint_S {\\bf rot} \\, {\\sf E} \\cdot dS' // eslint-disable-line
    },
    {
      name: '27',
      code: '\\langle \\psi | …….\\langle \\psi | \\phi \\rangle'
    },
    {
      name: '28',
      code: '\\langle \\psi | \\, A^TBA \\, | \\phi \\rangle'
    },
    {
      name: '29',
      code: '\\left . \\frac{A}{B} \\right \\} \\to X'
    },
    {
      name: '30',
      code: 'x = a_0 + \\frac{1}{\\displaystyle a_1 + \\frac{1}{\\displaystyle a_2 + \\frac{1}{\\displaystyle a_3 + a_4}}}'
    },
    {
      name: '31',
      code: '{n+1\\choose k} = {n\\choose k} + {n \\choose k-1}'
    },
    {
      name: '32',
      code: '\\int_1^2 \\{x^2 + 1\\} dx = \\left[ \\frac{x^3}{3} + x \\right]_1^2'
    },
    {
      name: '33',
      code: '\\sum_{i=1}^n i^2 = \\frac{1}{6}n(n+1)(2n+1) '
    },
    {
      name: '34',
      code: '\\forall x \\in {\\cal O}\\ \\exists \\delta\\ :\\ \n |y-x|<\\delta \\Rightarrow y \\in {\\cal O}'
    },
    {
      name: '35',
      code: '\\frac{\\partial u}{\\partial t} + \\nabla^{4}u + \\nabla^{2}u + \\frac12    |\\nabla u|^{2}\\ =\\ c^2'
    },
    {
      name: '36',
      code: '\\lim_{n \\rightarrow \\infty}x_{n} \\geq \\pi'
    },
    {
      name: '37',
      code: '\\sum_{n=1}^k \\frac1n\\ \\approx\\ \\ln k + \\gamma\\ = \\ (\\ln 10)(\\log_{10}k) + \\gamma\\ \\approx\\ 2.3026\\log_{10}k + 0.57772' // eslint-disable-line
    },
    {
      name: '38 Airy and Bessel functions',
      code: 'Ai(z) = \\frac13\\sqrt{z}\\left[\n I_{-1/3}(\\zeta) -I_{1/3}(\\zeta) \\right]\n = \\pi^{-1}\\sqrt{z/3}K_{1/3}(\\zeta)'
    },
    {
      name: '39 Airy and Bessel functions',
      code: 'Ai(-z) = \\frac13\\sqrt{z}\n \\left[ J_{1/3}(\\zeta) + J_{-1/3}(\\zeta) \\right]\n = \\frac12 \\sqrt{z/3} \\left[\n e^{\\pi i/6} H_{1/3}^{(1)}(\\zeta)\n + e^{-\\pi i/6}H_{1/3}^{(2)}(\\zeta) \\right]' // eslint-disable-line
    },
    {
      name: '40',
      code: '\\tilde f(\\omega)=\\frac{1}{2\\pi}\\int_{-\\infty}^\\infty f(x) e^{-i\\omega x}\\,dx'
    },
    {
      name: '41',
      code: '\\lim_{q\\to\\infty}\\|f(x)\\|_q =\\max_{x}|f(x)|'
    },
    {
      name: '42',
      code: 'e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}\\quad\\text{where }n!=\\prod_{i=1}^n i\\,,\\ \\overline{U_\\alpha} = \\bigcap_\\alpha U_\\alpha' // eslint-disable-line
    },
    {
      name: '43',
      code: '1/(1-x)=\\sum_{n=0}^\\infty x^n'
    },
    {
      name: '44',
      code: '\\int_a^bu\\frac{d^2v}{dx^2}\\,dx =\\left.u\\frac{dv}{dx}\\right|_a^b -\\int_a^b\\frac{du}{dx}\\frac{dv}{dx} \\,dx'
    }
  ];
