import { Sample } from './sample';

export const symbolSamples: Sample[] =
  [
    {
      name: 'Small Greek letters',
      code: '\\alpha\\ \\beta\\ \\gamma\\ \\delta\\ \\epsilon\\ \\varepsilon\\ \\zeta\\ \\eta\\ \\theta\\ \\vartheta\n\\iota\\ \\kappa\\ \\varkappa\\ \\lambda\\ \\mu\\ \\nu\\ \\xi\\ \\omicron\\ \\pi\\ \\varpi\\ \\rho\\ \\varrho\n\\sigma\\ \\varsigma\\ \\tau\\ \\upsilon\\ \\phi\\ \\varphi\\ \\chi\\ \\psi\\ \\omega' // eslint-disable-line
    },
    {
      name: 'Capital Greek letters',
      code: 'A\\ B\\ \\Gamma\\ \\Delta\\ E\\ Z\\ H\\ \\Theta\\ I\\ K\\ \\Lambda\\ M\\ N\\ \\Xi\\ O\\ \\Pi\\ R\\ \\Sigma\\ T\\ \\Upsilon\\ \\Phi\\ X\\ \\Psi\\ \\Omega' // eslint-disable-line
    },
    {
      name: 'Greek letters 01',
      code: 'A\\ \\alpha \\quad\nB\\ \\beta \\quad\n\\Gamma\\ \\gamma \\quad\n\\Delta\\ \\delta \\quad\nE\\ \\epsilon\\ \\varepsilon \\quad\nZ\\ \\zeta \\quad\nH\\ \\eta \\quad\n\\Theta\\ \\theta\\ \\vartheta' // eslint-disable-line
    },
    {
      name: 'Greek letters 02',
      code: 'I\\ \\iota \\quad\nK\\ \\kappa\\ \\varkappa \\quad\n\\Lambda\\ \\lambda \\quad\nM\\ \\mu \\quad\nN\\ \\nu \\quad\n\\Xi\\ \\xi \\quad\nO\\ \\omicron \\quad\n\\Pi\\ \\pi\\ \\varpi \\quad\nP\\ \\rho\\ \\varrho' // eslint-disable-line
    },
    {
      name: 'Greek letters 03',
      code: '\\Sigma\\ \\sigma\\ \\varsigma \\quad\nT\\ \\tau \\quad\n\\Upsilon\\ \\upsilon \\quad\n\\Phi\\ \\phi\\ \\varphi \\quad\nX\\ \\chi \\quad\n\\Psi\\ \\psi \\quad\n\\Omega\\ \\omega \\quad' // eslint-disable-line
    },
    {
      name: 'Some extra symbols',
      code: '\\aleph\\ \\beth\\ \\gimel\\ \\daleth\\ \\varpi\\ \\varrho\\ \\varsigma\\ \\varphi\\ \\varepsilon\\ \\vartheta\\ \\varkappa\\ \\pi\\ \\rho\\ \\sigma\\ \\phi\\ \\epsilon\\ \\theta\\ \\kappa\\ \\digamma\\ \\Finv\\ \\varpropto' // eslint-disable-line
    },
    {
      name: 'Other symbols',
      code: '\\partial\\ \\eth\\ \\hbar\\ \\imath\\ \\jmath\\ \\ell\\ \\Re\\ \\Im\\ \\wp\\ \n\\nabla\\ \\Box\\ \\infty\\ \\aleph\\ \\beth\\ \\gimel' // eslint-disable-line
    },
    {
      name: '{minus, sim, approx, equal} with {colon, colomcolon}',
      code: '\\minuscolon\\ \\minuscoloncolon\\ \\simcolon\\ \\simcoloncolon\n\\approxcolon\\ \\approxcoloncolon\\ \\equalscolon\\ \\equalscoloncolon\n\\colonminus\\ \\coloncolonminus\\ \\colonequals\\ \\coloncolonequals\n\\colonsim\\ \\coloncolonsim\\ \\colonapprox\\ \\coloncolonapprox' // eslint-disable-line
    },
    {
      name: 'Binary operations 01',
      code: '\\pm\\ \\mp\\ \\times\\ \\div\\ \\ast\\ \\star\\ \\circ\\ \\cdot\\ +\\ \\cap\\ \\cup\\ \\uplus\\ \\sqcap\\ \\sqcup\\ \\vee\\ \\wedge\n\\setminus\\ \\wr\\ -\\ \\diamond\\ \\bigtriangleup\\ \\bigtriangledown\\ \\triangleleft\\ \\triangleright\n\\lhd\\ \\rhd\\ \\unlhd\\ \\unrhd\\ \\oplus\\ \\ominus\\ \\otimes\\ \\oslash\\ \\odot\\ \\bigcirc\\ \\dagger\\ \\ddagger\\ \\amalg' // eslint-disable-line
    },
    {
      name: 'Binary operations 02',
      code: '\\pm \\cap\\, \\cap \\diamond\\, \\diamond \\oplus\\, \\oplus\\,\n\\mp\\, \\mp \\cup\\, \\cup \\bigtriangleup\\, \\bigtriangleup \\ominus\\, \\ominus\\,\n\\times\\, \\times \\uplus\\, \\uplus \\bigtriangledown\\, \\bigtriangledown \\otimes\\, \\otimes' // eslint-disable-line
    },
    {
      name: 'Binary operations 03',
      code: '\\div\\, \\div \\sqcap\\, \\sqcap \\triangleleft\\, \\triangleleft \\oslash\\, \\oslash\\,\n\\ast\\, \\ast \\sqcup\\, \\sqcup \\triangleright\\, \\triangleright \\odot\\, \\odot' // eslint-disable-line
    },
    {
      name: 'Binary operations 04',
      code: '\\star\\, \\star \\vee\\, \\vee \\bigcirc\\, \\bigcirc \\circ\\, \\circ\\,\n\\dagger\\, \\dagger \\wedge\\, \\wedge \\bullet\\, \\bullet \\setminus\\, \\setminus\\,\n\\ddagger\\, \\ddagger \\cdot\\, \\cdot \\wr\\, \\wr \\amalg\\, \\amalg' // eslint-disable-line
    },
    {
      name: 'Binary operations 05 (AMS)',
      code: '\\dotplus\\ \\centerdot\\ \\intercal\\ \\ltimes\\ \\rtimes\\ \\divideontimes\\ \\Cup\\ \\doublecup\\ \\Cap\\ \\doublecap\\ \\smallsetminus\\ \\veebar\\ \\barwedge\\ \\doublebarwedge\\ \\boxplus\\ \\boxminus\\ \\boxtimes\\ \\boxdot\\ \\circleddash\\ \\circledcirc\\ \\circledast\\ \\leftthreetimes\\ \\rightthreetimes\\ \\curlyvee\\ \\curlywedge' // eslint-disable-line
    },
    {
      name: 'Operators',
      code: '+\\ \\oplus\\ \\bigoplus\\ \\pm\\ \\mp - \\ \\times\\ \\otimes\\ \\bigotimes\\ \\cdot\\ \\circ\\ \\bullet\\ \\bigodot\\ \\star\\ *\\ /\\ \\div\\ \\frac{1}{2}\\ \\nabla\\ \\partial x\\ \\dot x\\ \\ddot y' // eslint-disable-line
    },
    {
      name: 'Relation 01',
      code: '\\leq\\ \\geq\\ \\prec\\ \\succ\\ \\preceq\\ \\succeq\\ \\ll\\ \\gg\\ \\subset\\ \\supset\\ \\subseteq\\ \\supseteq\\ \\sqsubset\\ \\sqsupset\n\\sqsubseteq\\ \\sqsupseteq\\ \\in\\ \\ni\\ \\vdash\\ \\dashv\\ :\\ <\\ >\\ =\\ \\equiv\\ \\smile\\ \\frown\n\\parallel\\ \\mid\\ \\models\\ \\perp\\ \\propto\\ \\doteq\\ \\neq\\ \\cong\\ \\approx\\ \\asymp\\ \\simeq\\ \\sim\\ \\Join\\ \\bowtie' // eslint-disable-line
    },
    {
      name: 'Relation 02',
      code: '< >\\, > =\\, = \\parallel\\, \\parallel \\nparallel\\, \\nparallel\\,\n\\leq\\, \\leq \\geq\\, \\geq \\doteq\\, \\doteq \\asymp\\,\n\\ll\\, \\ll \\gg\\, \\gg \\equiv\\, \\equiv \\vdash\\, \\vdash \\dashv\\, \\dashv' // eslint-disable-line
    },
    {
      name: 'Relation 03',
      code: '\\subset\\, \\subset \\supset\\, \\supset \\approx\\, \\approx \\in\\, \\in \\ni\\, \\ni\\,\n\\subseteq\\, \\subseteq \\supseteq\\, \\supseteq \\cong\\, \\cong \\smile\\, \\smile \\frown\\, \\frown' // eslint-disable-line
    },
    {
      name: 'Relation 04',
      code: '\\nsubseteq\\, \\nsubseteq \\nsupseteq\\, \\nsupseteq \\simeq\\, \\simeq \\models\\, \\models \\notin\\, \\notin\\,\n\\sqsubset\\, \\sqsubset \\sqsupset\\, \\sqsupset \\sim\\, \\sim \\perp\\, \\perp \\mid\\, \\mid' // eslint-disable-line
    },
    {
      name: 'Relation 05',
      code: '\\sqsubseteq\\, \\sqsubseteq \\sqsupseteq\\, \\sqsupseteq \\propto\\, \\propto \\prec\\, \\prec \\succ\\, \\succ\\,\n\\preceq\\, \\preceq \\succeq\\, \\succeq \\neq\\, \\neq' // eslint-disable-line
    },
    {
      name: 'Punctuation',
      code: ',\\ ;\\ \\colon\\ \\ldotp\\ \\cdotp'
    },
    {
      name: 'Arrows 01',
      code: '\\leftarrow\\ \\rightarrow\\ \\Leftarrow\\ \\Rightarrow\\ \\leftrightarrow\\ \\Leftrightarrow\\ \\hookleftarrow\\ \\hookrightarrow\n\\longleftarrow\\ \\longrightarrow\\ \\Longleftarrow\\ \\Longrightarrow\\ \\longleftrightarrow\\ \\Longleftrightarrow' // eslint-disable-line
    },
    {
      name: 'Arrows 02',
      code: '\\leadsto\\ \\mapsto\\ \\longmapsto\\ \\leftharpoonup\\ \\rightharpoonup\\ \\leftharpoondown\\ \\rightharpoondown\\ \\rightleftharpoons\n\\uparrow\\ \\Uparrow\\ \\downarrow\\ \\Downarrow\\ \\updownarrow\\ \\Updownarrow\\ \\nearrow\\ \\searrow\\ \\swarrow\\ \\nwarrow' // eslint-disable-line
    },
    {
      name: 'Miscellaneous',
      code: '\\cdots\\ \\vdots\\ \\aleph\\ \\hbar\\ \\imath\\ \\jmath\\ \\ell\\ \\wp\\ \\Re\\ \\Im\\ \\mho\\ \\infty\n\\prime\\ \\emptyset\\ \\forall\\ \\exists\\ \\neg\\ \\nabla\\ \\partial\\ \\surd\\ \\top\\ \\bot\\ \\|\\ |\\ \\angle\\ \\backslash\n\\flat\\ \\natural\\ \\sharp\\ \\Box\\ \\Diamond\\ \\triangle\\ \\clubsuit\\ \\diamondsuit\\ \\heartsuit\\ \\spadesuit' // eslint-disable-line
    },
    {
      name: 'Dots',
      code: '\\ldots\\ \\ddots\\ \\cdots\\ \\dots\\ \\vdots\\ \\hdotsfor{9}'
    },
    {
      name: 'Variable-sized',
      code: '\\sum\\ \\prod\\ \\coprod\\ \\bigcap\\ \\bigcup\\ \\bigsqcup\\ \\bigvee\\ \\bigwedge\n\\bigodot\\ \\bigotimes\\ \\bigoplus\\ \\biguplus\\ \\int\\ \\oint' // eslint-disable-line
    },
    {
      name: 'Log-like functions',
      code: '\\min\\ \\max\\ \\ln\\ \\lg\\ \\log\\ \\exp\\ \\lim\\ \\limsup\\ \\gcd\\ \\inf\\ \\dim\\ \\det\\ \\deg\\ \\hom\\ \\ker\\ \\sup\\ \\Pr' // eslint-disable-line
    },
    {
      name: 'Trigonometric functions',
      code: '\\arg\\ \\sin\\ \\sinh\\ \\cos\\ \\cosh\\ \\sec\\ \\tan\\ \\tanh\\ \\cot\\ \\coth\\ \\csc\\ \\arcsin\\ \\arccos\\ \\arctan\\ \\arccot' // eslint-disable-line
    },
    {
      name: 'Delimiters 01',
      code: '(\\ )\\ [\\ ]\\ \\{\\ \\}\\ \\lfloor\\ \\rfloor\\ \\lceil\\ \\rceil\\ \\langle\\ \\rangle\\ |\\ \\|\\ /\\ \\backslash\n\\uparrow\\ \\Uparrow\\ \\downarrow\\ \\Downarrow\\ \\updownarrow\\ \\Updownarrow' // eslint-disable-line
    },
    {
      name: 'Delimiters 02',
      code: '| \\|\\, \\| /\\, / \\backslash\\, \\backslash\n\\{\\, \\{ \\}\\, \\} \\langle\\, \\langle \\rangle\\, \\rangle\n\\uparrow\\, \\uparrow \\Uparrow\\, \\Uparrow \\lceil\\, \\lceil \\rceil\\, \\rceil\n\\downarrow\\, \\downarrow \\Downarrow\\, \\Downarrow \\lfloor\\, \\lfloor \\rfloor\\, \\rfloor' // eslint-disable-line
    },
    {
      name: 'Large delimiters',
      code: '\\rmoustache\\ \\lmoustache\\ \\rgroup\\ \\lgroup\\ \\arrowvert\\ \\Arrowvert\\ \\bracevert'
    },
    {
      name: 'Math mode accents 01',
      code: '\\hat{a}\\ \\check{a}\\ \\acute{a}\\ \\grave{a}\\ \\bar{a}\\ \\vec{a}\\ \\dot{a}\\ \\ddot{a}\\ \\breve{a}\\ \\tilde{a}'
    },
    {
      name: 'Math mode accents 02',
      code: '\\hat{o}\\ \\widehat{oo}\\ \\check{o}\\ \\tilde{o}\\ \\widetilde{oo}\\ \\acute{o}\\ \n\\grave{o}\\ \\dot{o}\\ \\ddot{o}\\ \\breve{o}\\ \\bar{o}\\ \\vec{o}\\ \\hat{\\imath}\\ \n\\vec{\\jmath}\\ \\not{a}\\ \\mathring{a}\\ \\overrightarrow{AB}\\ \\overline{aaa}\\ \\underline{a}' // eslint-disable-line
    },
    {
      name: 'Sets',
      code: '\\in\\ \\ni\\ \\notin\\ \\varnothing\\ \\complement\n\\subset\\ \\subseteq\\ \\subsetneq\\ \\supset\\ \\supseteq\\ \\supsetneq\n\\cap\\ \\bigcap\\ \\cup\\ \\bigcup\\ \\ell\\ \\mho\\ \\Finv\\ \\Re\\ \\Im\\ \\wp' // eslint-disable-line
    },
    {
      name: 'Logic',
      code: '\\forall\\ \\exists\\ \\nexists\\ \\bar{A}\\ \\mid\\ \\wedge\\ \\svee\\ \\neg\\ \\to\\ \\gets\\ \\iff\n\\bigwedge\\ \\bigvee\\ \\diamond\\ \\lozenge\\ \\vdash\\ \\Vdash\\ \\vDash\\ \\Vvdash\\ \\models\\ \\dashv' // eslint-disable-line
    },
    {
      name: 'Set and logic notation 01',
      code: '\\exists \\rightarrow\\, \\rightarrow or \\to\\,\n\\nexists\\, \\nexists \\leftarrow\\, \\leftarrow or \\gets\\,\n\\forall\\, \\forall \\mapsto\\, \\mapsto\\,\n\\neg\\, \\neg \\implies\\, \\implies' // eslint-disable-line
    },
    {
      name: 'Set and logic notation 02',
      code: '\\subset\\, \\subset \\Rightarrow\\, \\Rightarrow (preferred\\ for\\ implication)\\,\n\\supset\\, \\supset \\leftrightarrow\\, \\leftrightarrow\\,\n\\in \\in \\iff\\, \\iff' // eslint-disable-line
    },
    {
      name: 'Set and logic notation 03',
      code: '\\notin\\, \\notin \\Leftrightarrow\\, \\Leftrightarrow (preferred\\ for\\ equivalence\\ (iff))\\,\n\\ni\\, \\ni \\top\\, \\top' // eslint-disable-line
    },
    {
      name: 'Set and logic notation 04',
      code: '\\land\\, \\land \\bot\\, \\bot\\,\n\\lor\\, \\lor \\emptyset\\, and\\, \\varnothing'
    },
    {
      name: 'Math alphabets',
      code: '\\mathrm{ABCdef}\\ \\mathit{ABCdef}\\ \\mathcal{ABCdef}\\ \\mathfrak{ABCdef}\\ \\mathbb{ABCdef}'
    },
    {
      name: 'Other constructions',
      code: '\\widetilde{abc}\\ \\widehat{abc}\\ \\overleftarrow{abc}\\ \\overrightarrow{abc}\\ \\overline{abc}\\ \\underline{abc}\\ \\underbrace{abc}\\ \\sqrt{abc}\\ \\sqrt[n]{abc}\\ f\'\\ \\frac{abc}{xyz}\\ \\overbrace{abc}' // eslint-disable-line
    },
    {
      name: 'Script style',
      code: '\\scriptstyle(3 - {3^{2y} - 4xz_1 \\over 2.1})'
    }
  ];
