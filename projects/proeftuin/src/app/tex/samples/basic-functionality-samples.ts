import { Sample } from './sample';

export const basicFunctionalitySamples: Sample[] =
  [
    {
      name: 'Superscript and subscript 01',
      code: 'a_i \\quad b_{ij} \\quad C_{m,n} \\quad \\delta_{j+k}'
    },
    {
      name: 'Superscript and subscript 02',
      code: 'x^y \\quad a^{j2\\pi} \\quad x^2_3 \\quad C^k_{\\mu,\\nu}'
    },
    {
      name: 'Superscript and subscript 03',
      code: '{}_1^2 \\Psi_3^4'
    },
    {
      name: 'Overset and underset 01',
      code: '\\overset{\\alpha}{\\omega} \\underset{\\mu}{\\nu} \\overset{\\beta}{\\underset{\\Delta}{\\tau}} \\stackrel{\\zeta}{\\eta}' // eslint-disable-line
    },
    {
      name: 'Relation operators 01',
      code: '2x = 35/y - 1'
    },
    {
      name: 'Relation operators 02',
      code: '1/x y + 34 > 3.1^66/8'
    },
    {
      name: 'Relation operators 03',
      code: '45^y - xy/9.9 \\neq 12 + 14/x - 2'
    },
    {
      name: 'Relation operators 04',
      code: '2x < 3y < 4z + 5'
    },
    {
      name: 'Relation operators 05',
      code: 'xz/7 + 3^y * 46 \\propto x^12/55 \\asymp 34 - AB \\cot 5.9'
    },
    {
      name: 'Groups 01',
      code: '{2 + x/6}'
    },
    {
      name: 'Groups 02',
      code: '{5A/\\text{foo}}'
    },
    {
      name: 'Groups 03',
      code: 'xy - {7x + 23}'
    },
    {
      name: 'Groups 04',
      code: '92*{45 - 34}/2'
    },
    {
      name: 'Groups 05',
      code: '{45-0.1y^2}*3x'
    },
    {
      name: 'Groups 06',
      code: 'y^{23 - 45} - x^1.8'
    },
    {
      name: 'Groups 07',
      code: '3x^{-y/2} + y_{2z}'
    },
    {
      name: 'Groups 08',
      code: '6*{12/45x}!-x^3'
    },
    {
      name: 'Groups 09',
      code: '{A^2\text{bar} + 56/{y^x/-1} < y + 2} \\gg {BC - 7}^0'
    },
    {
      name: 'Groups 10 - throws exception',
      code: '3 - {3^{2y} - 4xz_1 \\over 2.1}'
    },
    {
      name: 'Accents in text mode',
      code: 'gar\\c con\\ \'{\\i{}}\\ i\\ t\\`o\\\'s\\.g\\^o\\ na\\\'\"{\\i} ve\\ na\\\"\"ive\\ Ha\\v cek\\ \r\\ Angstr\\\"\"om'
    },
    {
      name: 'Accents in math mode',
      code: '\\hat{x}\\ \\check{x}\\ \\tilde{a}\\ \\bar{\\ell}\\ \\dot{y}\\ \\ddot{y}\\ \\vec{z_1}\\ \\vec{z}_1'
    },
    {
      name: 'Accents - wide accents, under and overline',
      code: '\\hat{T} = \\widehat{T}, \\bar{T} = \\overline{T}, \\widetilde{xyz}, \\overline{\\overline{a}^2+\\underline{xy} +\\overline{\\overline{z}}}' // eslint-disable-line
    },
    {
      name: 'Powers and indices 01',
      code: 'k_{n+1} = n^2 + k_n^2 - k_{n-1}'
    },
    {
      name: 'Powers and indices 02',
      code: 'f(n) = n^5 + 4n^2 + 2 |_{n=17}'
    },
    {
      name: 'Fractions and binomials 01',
      code: '\\frac{n!}{k!(n-k)!} = \\binom{n}{k}'
    },
    {
      name: 'Fractions and binomials 02',
      code: '\\frac{n!}{k!(n-k)!} = {n \\choose k}'
    },
    {
      name: 'Fractions and binomials 03',
      code: '\\frac{\\frac{1}{x}+\\frac{1}{y}}{y-z}'
    },
    {
      name: 'Fractions and binomials 04',
      code: '{n! \\over k!(n-k)!} = {n \\choose k}'
    },
    {
      name: 'Continued fractions 01',
      code: 'x = a_0 + \\cfrac{1}{a_1+ \\cfrac{1}{a_2+ \\cfrac{1}{a_3 + \\cfrac{1}{a_4} } } }'
    },
    {
      name: 'Continued fractions 02',
      code: 'x=a_0 + \\frac{1}{a_1+ \\frac{1}{a_2+ \\frac{1}{a_3 + \\frac{1}{a_4} } } }'
    },
    {
      name: 'Continued fractions 03',
      code: ' x = a_0 + \\frac{1}{\\displaystyle a_1 + \\frac{1}{\\displaystyle a_2 + \\frac{1}{\\displaystyle a_3 + a_4}}}'
    },
    {
      name: 'Roots 01',
      code: '\\sqrt{\\frac{a}{b}}'
    },
    {
      name: 'Roots 02',
      code: '\\sqrt[n]{1+x+x^2+x^3+\\ldots}'
    },
    {
      name: 'Roots 03',
      code: '\\sqrt[a]{b}'
    },
    {
      name: 'Sums 01',
      code: '\\sum_{i=1}^{10} t_i'
    },
    {
      name: 'Sums 02',
      code: '\\sum \\prod \\coprod \\bigoplus \\bigotimes \\bigodot \\bigcup \\bigcap \\biguplus \\bigsqcup \\bigvee \\bigwedge'
    },
    {
      name: 'Sums 02 - throws exception',
      code: '\\sum_{\\substack{0<i<m \\\\ 0<j<n}}P(i,j)'
    },
    {
      name: 'Sums 03',
      code: '\\sum_{k=1}^N k^2 \\qquad \\sum \\limits_{k=1}^N k^2'
    },
    {
      name: 'Sums 04',
      code: '\\sum_{i=1}^n i^2 = \\frac{1}{6}n(n+1)(2n+1) '
    },
    {
      name: 'Sums 05',
      code: '\\sum\\limits_{i=1}^n i^2 = \\frac{1}{6}n(n+1)(2n+1) '
    },
    {
      name: 'Products 01',
      code: 'prod_{i=1}^N x_i \\qquad \\prod \\limits_{i=1}^N x_i'
    },
    {
      name: 'Coproducts 01',
      code: '\\coprod_{i=1}^N x_i \\qquad \\coprod \\limits_{i=1}^N x_i'
    },
    {
      name: 'Limits 01',
      code: '\\lim \\limits_{n \\to \\infty}x_n \\qquad \\lim _{n \\to \\infty}x_n'
    },
    {
      name: 'Integrals 01',
      code: '\\int_0^\\infty \\mathrm{e}^{-x}\\,\\mathrm{d}x'
    },
    {
      name: 'Integrals 02',
      code: '\\int \\oint \\iint \\iiint \\iiiint \\idotsint'
    },
    {
      name: 'Integrals 03',
      code: '\\int\\limits_a^b'
    },
    {
      name: 'Integrals 04',
      code: '\\int_{-N}^{N} e^x\\, dx \\qquad \\int \\limits_{-N}^{N} e^x\\, dx'
    },
    {
      name: 'Integrals 05',
      code: '\\iint_{D}^{W} \\, dx\\,dy \\qquad \\iiint_{E}^{V} \\, dx\\,dy\\,dz \\qquad \\iiiint_{F}^{U} \\, dx\\,dy\\,dz\\,dt'
    },
    {
      name: 'Integrals 06',
      code: '\\oint_{C} x^3\\, dx + 4y^2\\, dy'
    },
    {
      name: 'Automatic sizing 01',
      code: '\\left(\\frac{x^2}{y^3}\\right)'
    },
    {
      name: 'Automatic sizing 02',
      code: 'P\\left(A=2\\middle|\\frac{A^2}{B}>4\\right)'
    },
    {
      name: 'Automatic sizing 03',
      code: 'P(A=2|\\frac{A^2}{B}>4)'
    },
    {
      name: 'Automatic sizing 04',
      code: '\\left\\{\\frac{x^2}{y^3}\\right\\}'
    },
    {
      name: 'Automatic sizing 05',
      code: '\\left.\\frac{x^3}{3}\\right|_0^1'
    },
    {
      name: 'Manual sizing 01',
      code: '( \\big( \\Big( \\bigg( \\Bigg('
    },
    {
      name: 'Manual sizing 02',
      code: '\\frac{\\mathrm d}{\\mathrm d x} \\left( k g(x) \\right)'
    },
    {
      name: 'Manual sizing 03',
      code: '\\frac{\\mathrm d}{\\mathrm d x} \\big( k g(x) \\big)'
    },
    {
      name: 'Typesetting intervals 01',
      code: 'x \\in ]-1,1[, y \\in {]-1,1[}, z \\in {]{-1},1[}'
    },
    {
      name: 'Dots 01',
      code: '\\ldots\\ \\cdots\\ \\dots\\ \\vdots\\ \\ddots'
    },
    {
      name: 'Dots 02',
      code: '\\hdotsfor{9}'
    },
    {
      name: 'Dots 03',
      code: 'A_1,A_2,\\dotsc'
    },
    {
      name: 'Dots 04',
      code: 'A_1+\\dotsb+A_N'
    },
    {
      name: 'Dots 05',
      code: 'A_1 \\dotsm A_N'
    },
    {
      name: 'Dots 06',
      code: '\\int_a^b \\dotsi'
    },
    {
      name: 'Dots 07',
      code: 'A_1\\dotso A_N'
    },
    {
      name: 'Boxes 01 -- does not work',
      code: '\\fbox{\\text{A framed box}}\\qquad\n\\shadowbox{\\text{A shadowed box}}\\qquad\n\\doublebox{\\text{A double framed box}}\\qquad\n\\ovalbox{\\text{An oval framed box}}' // eslint-disable-line
    },
    {
      name: 'Braces 01',
      code: '\\left] 0,1 \\right[ + \\lceil x \\rfloor - \\langle x,y\\rangle'
    },
    {
      name: 'Braces 02',
      code: '\\underbrace{n(n-1)(n-2)\\dots(n-m+1)}_ {\\mbox{total of $m$ factors}}'
    },
    {
      name: 'Braces 03',
      code: '\\underbrace{a+\\overbrace{b+\\cdots}^{{}=t}+z} _{\\mathrm{total}}   a+{\\overbrace{b+\\cdots}}^{126}+z'
    },
    {
      name: 'Braces 04',
      code: '\\overbrace{a+\\underbrace{b+c}+d}'
    },
    {
      name: 'Braces 05',
      code: 'z = \\overbrace{\n   \\underbrace{x}_\\text{real} + i\n   \\underbrace{y}_\\text{imaginary}\n  }^\\text{complex number}'
    },
    {
      name: 'Braces 06 - incorrectly displayed',
      code: 'y = a + f(\\underbrace{b x}_{ \\ge 0 \\text{ by assumption}})\n  = a + f(\\underbrace{b x}_{ \\mathclap{\\ge 0 \\text{ by assumption}}})' // eslint-disable-line
    },
    {
      name: 'Brackets 01',
      code: '13 - (4 + x)'
    },
    {
      name: 'Brackets 02',
      code: '21 - (5x + 2) + 7'
    },
    {
      name: 'Brackets 03',
      code: '5/y + 97.4 - (2 - 7y)^2'
    },
    {
      name: 'Brackets 04',
      code: '34/(67 + 9)'
    },
    {
      name: 'Brackets 05',
      code: '87 + 4[13 - 15.39]'
    },
    {
      name: 'Brackets 06',
      code: '1.2x^{25y + 6*[7 - 50z/(2/3)]}'
    },
    {
      name: 'Brackets 07',
      code: 'y - 2 \\cdot 0.5/x'
    },
    {
      name: 'Brackets 08',
      code: '2^{(7 + 3)/5}'
    },
    {
      name: 'Brackets 09',
      code: '{2y + z/5}/(2[x/2 - 1])'
    },
    {
      name: 'Brackets 10',
      code: '1 + \\{67 \\cdot (2.14^6 - 5)/7\\}^3'
    },
    {
      name: 'Brackets 11',
      code: '5 \\cdot 4y + 7/(4+2x)'
    },
    {
      name: 'Brackets 12',
      code: '87^x/-321 + (x_3 > 2y) \\approx B^{-y + 7\\text{foo}/6}'
    },
    {
      name: 'Brackets 13',
      code: 'z = \\overbracket[3pt]{\n    \\underbracket{x}_{\\text{real}} +\n    \\underbracket[0.5pt][7pt]{iy}_{\\text{imaginary}}\n    }^{\\text{complex number}}' // eslint-disable-line
    },
    {
      name: 'Brackets, braces and delimiters 01',
      code: '( a )\\ [ b ]\\ \\{ c \\}\\ | d |\\ \\| e \\|\\ \\langle f \\rangle\\ \\lfloor g \\rfloor\\ \\lceil h \\rceil\\ \\ulcorner i \\urcorner' // eslint-disable-line
    },
    {
      name: 'Brackets, braces and delimiters 02',
      code: '(a)\\ [b]\\ |d|\\ \\|e\\|\\ \\langle{f}\\rangle\\ \\lfloor{g}\\rfloor\\ \\lceil{h}\\rceil'
    },
    {
      name: 'Brackets, braces and delimiters 03',
      code: '\\langle \\psi | …….\\langle \\psi | \\phi \\rangle '
    },
    {
      name: 'Brackets, braces and delimiters 04',
      code: '\\langle \\psi | \\, A^TBA \\, | \\phi \\rangle'
    },
    {
      name: 'Brackets, braces and delimiters 05',
      code: '\\left . \\frac{A}{B} \\right \\} \\to X'
    },
    {
      name: 'Brackets, braces and delimiters 06 - throws exception',
      code: '\\left [ \\frac{a}{b} \\right ] \\quad \\left \\lbrack \\frac{a}{b} \\right \\rbrack'
    },
    {
      name: 'Brackets, braces and delimiters 07 - throws exception',
      code: '\\left \\{ \\frac{a}{b} \\right \\} \\quad \\left \\lbrace \\frac{a}{b} \\right \\rbrace'
    },
    {
      name: 'Brackets, braces and delimiters 08 - throws exception',
      code: '\\left \\langle \\frac{a}{b} \\right \\rangle'
    },
    {
      name: 'Brackets, braces and delimiters 09 - throws exception',
      code: '\\left | \\frac{a}{b} \\right \\vert \\quad \\left \\Vert \\frac{c}{d} \\right \\|'
    },
    {
      name: 'Brackets, braces and delimiters 10 - throws exception',
      code: '\\left \\lfloor \\frac{a}{b} \\right \\rfloor \\quad \\left \\lceil \\frac{c}{d} \\right \\rceil'
    },
    {
      name: 'Brackets, braces and delimiters 11',
      code: '\\left / \\frac{a}{b} \\right \\backslash'
    },
    {
      name: 'Brackets, braces and delimiters 12',
      code: '( \\frac{a}{b} ) \\quad \\left ( \\frac{a}{b} \\right )'
    },
    {
      name: 'Brackets, braces and delimiters 13 - throws exception',
      code: '\\left \\uparrow \\frac{a}{b} \\right \\downarrow \\quad \\left \\Uparrow \\frac{a}{b} \\right \\Downarrow \\quad \\left \\updownarrow \\frac{a}{b} \\right \\Updownarrow' // eslint-disable-line
    },
    {
      name: 'Brackets, braces and delimiters 14 - throws exception',
      code: '\\left \\langle \\psi \\right |'
    },
    {
      name: 'Brackets, braces and delimiters 15',
      code: '\\left [ 0,1 \\right )\\ ( 0,1 )\\ [ 0,1 ]\\ ( 0,1 ]\\ [ 0,1 )'
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 01',
      code: '\\big( \\Big( \\bigg( \\Bigg( … \\Bigg] \\bigg] \\Big] \\big]'
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 02',
      code: '\\big\\{ \\Big\\{ \\bigg\\{ \\Bigg\\{ … \\Bigg\\rangle \\bigg\\rangle \\Big\\rangle \\big\\rangle'
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 03',
      code: '\\big\\| \\Big\\| \\bigg\\| \\Bigg\\| … \\Bigg| \\bigg| \\Big| \\big|'
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 04',
      code: '\\big\\lfloor \\Big\\lfloor \\bigg\\lfloor \\Bigg\\lfloor … \\Bigg\\rceil \\bigg\\rceil \\Big\\rceil \\big\\rceil'
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 05',
      code: '\\big\\uparrow \\Big\\uparrow \\bigg\\uparrow \\Bigg\\uparrow … \\Bigg\\Downarrow \\bigg\\Downarrow \\Big\\Downarrow \\big\\Downarrow' // eslint-disable-line
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 06',
      code: '\\big\\updownarrow \\Big\\updownarrow \\bigg\\updownarrow \\Bigg\\updownarrow … \\Bigg\\Updownarrow \\bigg\\Updownarrow'
    },
    {
      name: 'Parenthesizing big expressions, brackets, bars 07',
      code: '\\big / \\Big / \\bigg / \\Bigg / … \\Bigg\\backslash \\bigg\\backslash \\Big\\backslash \\big\\backslash'
    },
    {
      name: 'Bracketed functions 01',
      code: '\\frac{1}{7} \\quad \\binom{2}{10} \\quad \\sqrt{25} \\quad \\sqrt[3]{64}'
    },
    {
      name: 'Bracketed functions 02',
      code: '\\frac{2 - 5^6.5/x}{2*(10 - 5/3)}'
    },
    {
      name: 'Bracketed functions 03',
      code: '\\binom{2^{6-[7 \\cdot 2]}}{y/-89}'
    },
    {
      name: 'Bracketed functions 04',
      code: '\\sqrt[(2*7)!/y^3]{x_4*2z - 29}'
    },
    {
      name: 'Spaces and text in formulas 01',
      code: '\\sqrt{2} \\sin x$, $\\sqrt{2}\\,\\sin x'
    },
    {
      name: 'Spaces and text in formulas 02',
      code: '\\int \\!\\! \\int f(x,y)\\,\\mathrm{d}x\\mathrm{d}y'
    },
    {
      name: 'Spaces and text in formulas 03',
      code: '\\mathop{\\int \\!\\!\\! \\int}_{\\mathbf{x} \\in \\mathbf{R}^2} \\! \\langle \\mathbf{x},\\mathbf{y}\rangle \\,d\\mathbf{x}' // eslint-disable-line
    },
    {
      name: 'Spaces and text in formulas 04',
      code: ' x_1 = a+b \\mbox{ and } x_2=a-b '
    },
    {
      name: 'Big operators 01',
      code: '\\sum 4^{2x - y^2}/34'
    },
    {
      name: 'Big operators 02',
      code: '\\prod 24x - 2/[xy^z - 64\\log 25.12]'
    },
    {
      name: 'Big operators 03',
      code: '\\int 92/y + \\gcd{[4.09^2 C] \\cdot y^z*5}'
    },
    {
      name: 'Big operators 04 -- not implemented \\lcm',
      code: '\\sum_23 54+(\\lcm 5x)^2/2y'
    },
    {
      name: 'Big operators 05',
      code: '\\prod^{19/y} 78z/{2x^4 - 11} + 6'
    },
    {
      name: 'Big operators 06',
      code: '\\oint^21_{y^{2x}} 5*32(\\arg 7.13/4)'
    },
    {
      name: 'Big operators 07',
      code: '23/(2x + 1 \\cdot 5^2 + {\\sum 1/x^5})*44'
    },
    {
      name: 'Big operators 08',
      code: '(34\\pi/2 + 2{\\int_5^14 6x-2y^7})^3'
    },
    {
      name: 'Big operators 09',
      code: '4\\lim {5x}*{\\oint_A (2^6y + 7)/10 - 2}'
    },
    {
      name: 'Functions 01',
      code: 'x=\\frac{1+y}{1+2z^2}'
    },
    {
      name: 'Functions 02',
      code: '\\log 2.15 \\quad \\log {2^x + (7 - y)/5} \\quad \\log_e {4! - 6*42/y}'
    },
    {
      name: 'Functions 03',
      code: '2\\arg {8^x - 2y/7} + y^{2/7}'
    },
    {
      name: 'Functions 04',
      code: '\\tan^2{7\\pi*x \\mp 22}'
    },
    {
      name: 'Functions 05',
      code: '6^y - 4(\\arccos {\\pi/2 + \\theta})'
    },
    {
      name: 'Functions 06',
      code: '\\sinh \\arg {2^{4y} - [5/x + 77]}'
    },
    {
      name: 'Functions 07',
      code: 'y_{i+1} = x_{i}^{2n} - \\sqrt{5}x_{i}^{n} + 1'
    },
    {
      name: 'Functions 08',
      code: 'x_{i+1}\\ =\\ N^{i+1}(x_{0})\\ =\\ N(x_{i})\\ =\\ x_{i} - \\frac{f(x_{i})}{f\'(x_{i})}'
    },
    {
      name: 'Functions 09',
      code: '\\frac{\\partial u}{\\partial t} + \\nabla^{4}u + \\nabla^{2}u + \\frac12    |\\nabla u|^{2}\\ =\\ c^2'
    },
    {
      name: 'Functions 10',
      code: '\\lim_{n \\rightarrow \\infty}x_{n} \\geq \\pi'
    },
    {
      name: 'Functions 11',
      code: '\\sum_{n=1}^k \\frac1n\\ \\approx\\ \\ln k + \\gamma\\ = \\ (\\ln 10)(\\log_{10}k) + \\gamma\\ \\approx\\ 2.3026\\log_{10}k + 0.57772' // eslint-disable-line
    },
    {
      name: 'Functions 12 Airy and Bessel functions',
      code: 'Ai(z) = \\frac13\\sqrt{z}\\left[\n I_{-1/3}(\\zeta) -I_{1/3}(\\zeta) \\right]\n = \\pi^{-1}\\sqrt{z/3}K_{1/3}(\\zeta)'
    },
    {
      name: 'Functions 13 Airy and Bessel functions',
      code: 'Ai(-z) = \\frac13\\sqrt{z}\n \\left[ J_{1/3}(\\zeta) + J_{-1/3}(\\zeta) \\right]\n = \\frac12 \\sqrt{z/3} \\left[\n e^{\\pi i/6} H_{1/3}^{(1)}(\\zeta)\n + e^{-\\pi i/6}H_{1/3}^{(2)}(\\zeta) \\right]' // eslint-disable-line
    },
    {
      name: 'Functions 14',
      code: '\\tilde f(\\omega)=\\frac{1}{2\\pi}\\int_{-\\infty}^\\infty f(x) e^{-i\\omega x}\\,dx'
    },
    {
      name: 'Functions 15',
      code: '\\tilde f(\\omega)=\\frac{1}{2\\pi}\\int_{-\\infty}^\\infty f(x) e^{-i\\omega x}\\,dx'
    },
    {
      name: 'Functions 16',
      code: 'Ai(x)=\\int\\exp(s^3+isx)\\,ds'
    },
    {
      name: 'Functions 17',
      code: '\\exp(i\\theta)=\\cos\\theta +i\\sin\\theta\\,,\\quad\\sinh(\\log x)=\\frac{1}{2} \\left( x-\\frac{1}{x} \\right)'
    },
    {
      name: 'Functions 18',
      code: '\\lim_{q\\to\\infty}\\|f(x)\\|_q =\\max_{x}|f(x)|'
    },
    {
      name: 'Functions 19',
      code: 'e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}\\quad\\text{where }n!=\\prod_{i=1}^n i\\,,\\ \\overline{U_\\alpha} = \\bigcap_\\alpha U_\\alpha' // eslint-disable-line
    },
    {
      name: 'Functions 20',
      code: '1/(1-x)=\\sum_{n=0}^\\infty x^n'
    },
    {
      name: 'Functions 21',
      code: '\\left(a+b\\right)\\left[1-\\frac{b}{a+b} \\right]=a'
    },
    {
      name: 'Functions 22',
      code: '\\left(a+b\\right)\\left[1-\\frac{b}{a+b} \\right]=a'
    },
    {
      name: 'Functions 23',
      code: '\\sqrt{|xy|}\\leq\\left|\\frac{x+y}{2} \\right|'
    },
    {
      name: 'Functions 24',
      code: '\\int_a^bu\\frac{d^2v}{dx^2}\\,dx =\\left.u\\frac{dv}{dx}\\right|_a^b -\\int_a^b\\frac{du}{dx}\\frac{dv}{dx} \\,dx'
    },
    {
      name: 'Functions 25',
      code: '\\iint xy^2\\,dx\\,dy =\\frac{1}{6}x^2y^3'
    },
    {
      name: 'Functions 26',
      code: 'u=\\frac{-y}{x^2+y^2}\\,,\\quad v=\\frac{x}{x^2+y^2} \\quad \\text{and}\\quad w=0'
    },
    {
      name: 'Spacing in formulas 01',
      code: '\\forall x,y \\, \\exists z \\quad\n\\forall x,y \\: \\exists z \\quad\n\\forall x,y \\; \\exists z \\quad\n\\forall x,y \\! \\exists z ' // eslint-disable-line
    },
    {
      name: 'Spacing in formulas 02',
      code: '\\sum_i \\; \\sum_j x_{i,j} \\qquad\n\\sum_i \\: \\sum_j x_{i,j} \\qquad\n\\sum_i \\! \\sum_j x_{i,j}'
    },
    {
      name: 'Spacing in formulas 03',
      code: '\\sum_i x_i q\\quad \\sum_j y_j \\qquad\\qquad\n\\sum_i x_i \\qquad \\sum_j y_j'
    },
    {
      name: 'Sets 01',
      code: '\\Omega \\smallsetminus \\omega \\quad {\\cal A} \\setminus {\\cal B}'
    },
    {
      name: 'Logic 01',
      code: '\\forall p,q \\, \\exists q \\mid \\bar{q} \\to p'
    },
    {
      name: 'Logic 02',
      code: '\\bigwedge _{x \\in A} \\quad \\bigwedge \\limits _{x \\notin A}'
    },
    {
      name: 'Logic 03',
      code: '\\bar{A \\vee B} = \\bar{A} \\wedge \\bar{B}'
    },
    {
      name: 'Logic 04',
      code: 'A \\iff B = A \\to B \\wedge A \\gets B'
    },
    {
      name: 'Logic 05',
      code: '\\bigcap \\limits _{i=1}^n \\bigcup \\limits _{j=1}^n {\\cal B}_{i,j}'
    },
    {
      name: 'Logic 06 - error: tthat',
      code: '\\forall x \\in {\\cal O}\\ \\exists \\delta\\ \\mbox{such that}\\ \n |y-x|<\\delta \\Rightarrow y \\in {\\cal O}'
    },
    {
      name: 'Logic 07',
      code: '\\forall x \\in {\\cal O}\\ \\exists \\delta\\ :\\ \n |y-x|<\\delta \\Rightarrow y \\in {\\cal O}'
    },
    {
      name: 'Font styles 01',
      code: '{\\rm Roman} \\quad {\\bf Bold} \\quad {\\it Italic} \\quad {\\sf Sans Serif} \\quad {\\cal A B C d e f}'
    },
    {
      name: 'Font styles 02',
      code: '{\\frak A}\\ {\\frak B}\\ {\\frak C}\\ {\\frak d}\\ {\\frak e}\\ {\\frak f}'
    },
    {
      name: 'Font styles 03 - not implemented {\\sl}',
      code: '{\\sl Slanted}'
    },
    {
      name: 'Font styles 04 - bug {\\sc}',
      code: '{\\sc allcaps}'
    },
    {
      name: 'Text 01',
      code: '\\text{foobar}'
    },
    {
      name: 'Text 02',
      code: '5.43/\\text{foo}*2yC'
    },
    {
      name: 'Text 03',
      code: '1 - 3*\\text{bar}'
    },
    {
      name: 'Text 04',
      code: '\\text{foo}^10*{\\text{bar} - 56}'
    },
    {
      name: 'Text 05',
      code: 'A\\text{foo}_1 - 23y'
    },
    {
      name: 'Color 01',
      code: '\\textcolor{red}{\\mathfrak{A}rea}A=\\pi r^2'
    },
    {
      name: 'Color 02',
      code: 'k={\\textcolor{red}x}{\\textcolor{green}-}{\\textcolor{blue}2}'
    },
    {
      name: 'Very basic 01',
      code: '123 \\quad -321 \\quad 1.23 \\quad \\infty \\quad 12 + 34 \\quad 34 - 12 \\quad 12 * 34 \\quad 34 / 12 \\quad 12 \\pm 34 \\quad 34 \\mp 12' // eslint-disable-line
    },
    {
      name: 'Very basic 02',
      code: '27 - 5 + 14 \\quad 9 - 3 - 2.57 \\quad 45 + -11/45'
    },
    {
      name: 'Very basic 03',
      code: '2^13 \\quad 2_31 \\quad 3! \\quad 2*6! - 56 \\quad x + 3/4 \\quad A^7 - 3x'
    },
    {
      name: 'Very basic 04',
      code: 'xy*48 - 3zB \\quad 4^x + -11 \\quad x - 2y/32.7 + z^2 \\quad yz + 5/2x - z_10'
    },
    {
      name: 'Very basic 05',
      code: '2xy - 5y!*23 \\quad 82 \\cdot 45 \\quad 71/(21 \\cdot 31 - 2)'
    },
    {
      name: 'Very basic 06',
      code: '12x \\bmod 14.4/y \\quad 15x^2 + y \\over {12 \\quad 8B \\over 2^7 * 5x}'
    },
    {
      name: 'Very basic 07',
      code: 'x^y \\quad x_y \\quad \\sqrt[n]{25} \\quad ab'
    }
  ];
