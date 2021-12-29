import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
/* eslint-disable max-len */

export interface AexIndexConstituent {
  ticker: string;
  isin: string;
  name: string;
  description: string;
  issuerCountry: string;
  icb: number;
  weightPerc: number;
  transactions: number;
  volume: number;
  turnoverEur: number;
  close: number;
  returnEur: number;
  returnPerc: number;
  marketCapBn: number;
  sharesOutstanding: number;
}

export interface AexIndexHierarchyTreeNode extends HierarchyTreeNode {
  constituent?: AexIndexConstituent;
  name?: string;
  value?: number;
  children?: AexIndexHierarchyTreeNode[];
}

const abn: AexIndexConstituent = {
  ticker: 'ABN', isin: 'NL0011540547', name: 'ABN AMRO BANK N.V.', issuerCountry: 'Netherlands',
  description: 'ABN AMRO Bank N.V. is one of the leading Dutch banking groups.',
  icb: 30101010, weightPerc: 0.52, transactions: 6182, volume: 3483662, turnoverEur: 27612983,
  close: 8.082, returnEur: 0.284, returnPerc: 3.64, marketCapBn: 3.806, sharesOutstanding: 470940001
};

const adyen: AexIndexConstituent = {
  ticker: 'ADYEN', isin: 'NL0012969182', name: 'ADYEN', issuerCountry: 'Netherlands',
  description: 'Adyen N.V. offers a single integrated platform that facilitates payments for merchants across geographies.',
  icb: 50205015, weightPerc: 6.19, transactions: 10108, volume: 80216, turnoverEur: 111002413,
  close: 1379.50, returnEur: -19.00, returnPerc: -1.36, marketCapBn: 41.708, sharesOutstanding: 30233963
};

const agn: AexIndexConstituent = {
  ticker: 'AGN', isin: 'NL0000303709', name: 'AEGON', issuerCountry: 'Netherlands',
  description: 'Aegon N.V. is one of the world largest insurance groups.',
  icb: 30301010, weightPerc: 0.79, transactions: 6158, volume: 10760792, turnoverEur: 2917694,
  close: 2.754, returnEur: 0.057, returnPerc: 2.11, marketCapBn: 5.798, sharesOutstanding: 2105138885
};

const ad: AexIndexConstituent = {
  ticker: 'AD', isin: 'NL0011794037', name: 'AHOLD DEL', issuerCountry: 'Netherlands',
  description: 'Ahold Delhaize N.V. is one of the world leaders in retailing.',
  icb: 45201010, weightPerc: 4.60, transactions: 6469, volume: 2599460, turnoverEur: 63414524,
  close: 24.48, returnEur: 0.37, returnPerc: 1.53, marketCapBn: 26.946, sharesOutstanding: 1100724959
};

const akza: AexIndexConstituent = {
  ticker: 'AKZA', isin: 'NL0013267909', name: 'AKZO NOBEL', issuerCountry: 'Netherlands',
  description: 'Akzo Nobel N.V. group is an expert in the making paints and coatings, setting the standard in color and protection.',
  icb: 55201020, weightPerc: 2.82, transactions: 7823, volume: 647004, turnoverEur: 52380094,
  close: 80.8, returnEur: -1.12, returnPerc: -1.37, marketCapBn: 15.595, sharesOutstanding: 192962549
};

const mt: AexIndexConstituent = {
  ticker: 'MT', isin: 'LU1598757687', name: 'ARCELORMITTAL SA', issuerCountry: 'Luxembourg',
  description: 'ArcelorMittal is No. 1 worldwide for steelmaking.',
  icb: 55102010, weightPerc: 1.13, transactions: 13842, volume: 5735777, turnoverEur: 55453726,
  close: 9.90, returnEur: 0.308, returnPerc: 3.21, marketCapBn: 10.918, sharesOutstanding: 1102809772
};

const asm: AexIndexConstituent = {
  ticker: 'ASM', isin: 'NL0000334118', name: 'ASM INTERNATIONAL', issuerCountry: 'Netherlands',
  description: 'ASM International specializes in designing, producing, and selling equipment for use by semiconductor manufacturers.',
  icb: 10102020, weightPerc: 1.19, transactions: 7143, volume: 398758, turnoverEur: 58785644,
  close: 146.50, returnEur: 1.40, returnPerc: 0.96, marketCapBn: 7.515, sharesOutstanding: 51297394
};

const asml: AexIndexConstituent = {
  ticker: 'ASML', isin: 'NL0010273215', name: 'ASML HOLDING', issuerCountry: 'Netherlands',
  description: 'ASML Holding N.V. is one of the world leaders in the manufacturing of lithography equipment for the semiconductor industry.',
  icb: 10102020, weightPerc: 15.88, transactions: 21256, volume: 773504, turnoverEur: 269975982,
  close: 348.70, returnEur: 4.35, returnPerc: 1.26, marketCapBn: 148.428, sharesOutstanding: 425659704
};

const asrnl: AexIndexConstituent = {
  ticker: 'ASRNL', isin: 'NL0011872643', name: 'ASR NEDERLAND', issuerCountry: 'Netherlands',
  description: 'ASR Nederland is an insurance group organized around non-life and life insurance.',
  icb: 30302010, weightPerc: 0.65, transactions: 3490, volume: 436923, turnoverEur: 12490637,
  close: 29.06, returnEur: 1.11, returnPerc: 3.97, marketCapBn: 4.097, sharesOutstanding: 141000000
};

const dsm: AexIndexConstituent = {
  ticker: 'DSM', isin: 'NL0000009827', name: 'DSM KON', issuerCountry: 'Netherlands',
  description: 'Royal DSM specializes in the development of performance materials, and nutritional and pharmaceutical ingredients.',
  icb: 55201000, weightPerc: 3.92, transactions: 5228, volume: 40361, turnoverEur: 50973108,
  close: 126.65, returnEur: 1.40, returnPerc: 1.12, marketCapBn: 22.977, sharesOutstanding: 181425000
};

const glpg: AexIndexConstituent = {
  ticker: 'GLPG', isin: 'BE0003818359', name: 'GALAPAGOS', issuerCountry: 'Belgium',
  description: 'Galapagos researches and develops drugs based on novel targets discovered and validated in human primary cells.',
  icb: 20103010, weightPerc: 1.27, transactions: 8596, volume: 368296, turnoverEur: 64082391,
  close: 171.60, returnEur: -6.25, returnPerc: -3.51, marketCapBn: 11.198, sharesOutstanding: 65254562
};

const heia: AexIndexConstituent = {
  ticker: 'HEIA', isin: 'NL0000009165', name: 'HEINEKEN', issuerCountry: 'Netherlands',
  description: 'Heineken N.V. is a food group that specializes in beer brewing under the brands Heineken and Amstel.',
  icb: 45101010, weightPerc: 3.31, transactions: 8689, volume: 602824, turnoverEur: 50564409,
  close: 84.50, returnEur: 1.50, returnPerc: 1.81, marketCapBn: 48.672, sharesOutstanding: 576002613
};

const imcd: AexIndexConstituent = {
  ticker: 'IMCD', isin: 'NL0010801007', name: 'IMCD', issuerCountry: 'Netherlands',
  description: 'IMCD is one of the world leaders in the distribution of specialty chemicals and food ingredients.',
  icb: 55201020, weightPerc: 0.76, transactions: 2750, volume: 138162, turnoverEur: 11624796,
  close: 84.22, returnEur: -0.10, returnPerc: -0.12, marketCapBn: 4.429, sharesOutstanding: 52592254
};

const inga: AexIndexConstituent = {
  ticker: 'INGA', isin: 'NL0011821202', name: 'ING GROEP N.V.', issuerCountry: 'Netherlands',
  description: 'ING Groep N.V. is the leading financial services group in Benelux.',
  icb: 30101010, weightPerc: 4.18, transactions: 23461, volume: 22734777, turnoverEur: 141294064,
  close: 6.347, returnEur: 0.28, returnPerc: 4.62, marketCapBn: 24.757, sharesOutstanding: 3900609568
};

const tkwy: AexIndexConstituent = {
  ticker: 'TKWY', isin: 'NL0012015705', name: 'JUST EAT TAKEAWAY', issuerCountry: 'Netherlands',
  description: 'Just Eat Takeaway is the leading online food delivery marketplace in Continental Europe.',
  icb: 10101020, weightPerc: 2.09, transactions: 5633, volume: 323336, turnoverEur: 30489271,
  close: 94.08, returnEur: -0.52, returnPerc: -0.55, marketCapBn: 13.992, sharesOutstanding: 148719548
};

const kpn: AexIndexConstituent = {
  ticker: 'KPN', isin: 'NL0000009082', name: 'KPN KON', issuerCountry: 'Netherlands',
  description: 'Royal KPN is a leading telecommunications and IT provider and market leader in the Netherlands.',
  icb: 15102015, weightPerc: 1.47, transactions: 2501, volume: 6885417, turnoverEur: 1636595,
  close: 2.381, returnEur: 0.013, returnPerc: 0.55, marketCapBn: 10.007, sharesOutstanding: 4202844404
};

const nn: AexIndexConstituent = {
  ticker: 'NN', isin: 'NL0010773842', name: 'NN GROUP', issuerCountry: 'Netherlands',
  description: 'NN Group N.V. is a life and non-life insurance and investment management group in the Netherlands.',
  icb: 30301010, weightPerc: 1.58, transactions: 5212, volume: 828706, turnoverEur: 26273075,
  close: 31.99, returnEur: 0.56, returnPerc: 1.78, marketCapBn: 10.245, sharesOutstanding: 320266563
};

const phia: AexIndexConstituent = {
  ticker: 'PHIA', isin: 'NL0000009538', name: 'PHILIPS KON', issuerCountry: 'Netherlands',
  description: 'Koninklijke Philips N.V. is a leading health technology company.',
  icb: 20102010, weightPerc: 6.53, transactions: 12752, volume: 1913467, turnoverEur: 79684992,
  close: 41.565, returnEur: -0.365, returnPerc: -0.87, marketCapBn: 37.868, sharesOutstanding: 911053001
};

const prx: AexIndexConstituent = {
  ticker: 'PRX', isin: 'NL0013654783', name: 'PROSUS', issuerCountry: 'Netherlands',
  description: 'Prosus N.V. is a holding company in the service of the global Internet consumer group (Naspers).',
  icb: 10101020, weightPerc: 6.08, transactions: 17199, volume: 1299235, turnoverEur: 112920654,
  close: 86.36, returnEur: -1.84, returnPerc: -2.09, marketCapBn: 140.305, sharesOutstanding: 1624652070
};

const rand: AexIndexConstituent = {
  ticker: 'RAND', isin: 'NL0000379121', name: 'RANDSTAD NV', issuerCountry: 'Netherlands',
  description: 'Randstad N.V. is the world No. 2 of human resources services.',
  icb: 50205025, weightPerc: 0.76, transactions: 5162, volume: 514939, turnoverEur: 20785838,
  close: 40.81, returnEur: 0.72, returnPerc: 1.80, marketCapBn: 7.481, sharesOutstanding: 183303552
};

const ren: AexIndexConstituent = {
  ticker: 'REN', isin: 'GB00B2B0DG97', name: 'RELX', issuerCountry: 'United Kingdom',
  description: 'RELX PLC is a global provider of information and analytics for professional and business customers across industries.',
  icb: 40301030, weightPerc: 7.23, transactions: 3559, volume: 1308897, turnoverEur: 26377180,
  close: 20.25, returnEur: 0.10, returnPerc: 0.50, marketCapBn: 41.625, sharesOutstanding: 2055549527
};

const rdsa: AexIndexConstituent = {
  ticker: 'RDSA', isin: 'GB00B03MLX29', name: 'ROYAL DUTCH SHELLA', issuerCountry: 'United Kingdom',
  description: 'Royal Dutch Shell PLC specializes in oil and natural gas production and distribution.',
  icb: 60101000, weightPerc: 11.40, transactions: 23816, volume: 12684846, turnoverEur: 177264942,
  close: 14.134, returnEur: 0.192, returnPerc: 1.38, marketCapBn: 64.976, sharesOutstanding: 4597136050
};

const urw: AexIndexConstituent = {
  ticker: 'URW', isin: 'FR0013326246', name: 'UNIBAIL-RODAMCO-WE', issuerCountry: 'France',
  description: 'Unibail-Rodamco-Westfield is a world leader in commercial real estate.',
  icb: 35102045, weightPerc: 1.20, transactions: 10689, volume: 886085, turnoverEur: 44900117,
  close: 51.36, returnEur: 1.24, returnPerc: 2.47, marketCapBn: 7.112, sharesOutstanding: 138472385
};

const una: AexIndexConstituent = {
  ticker: 'UNA', isin: 'NL0000388619', name: 'UNILEVER', issuerCountry: 'Netherlands',
  description: 'Unilever N.V. is one of the leading groups worldwide specializing in the manufacture and marketing of food and care products.',
  icb: 45201020, weightPerc: 11.13, transactions: 17268, volume: 4058531, turnoverEur: 187654728,
  close: 46.28, returnEur: -0.16, returnPerc: -0.34, marketCapBn: 67.602, sharesOutstanding: 1460714804
};

const wkl: AexIndexConstituent = {
  ticker: 'WKL', isin: 'NL0000395903', name: 'WOLTERS KLUWER', issuerCountry: 'Netherlands',
  description: 'Wolters Kluwer specializes in publishing books, works, reviews, press, softwares and digital contents.',
  icb: 40301030, weightPerc: 3.31, transactions: 4332, volume: 519967, turnoverEur: 36329735,
  close: 69.98, returnEur: 0.34, returnPerc: 0.49, marketCapBn: 19.106, sharesOutstanding: 273016153
};

export const aexIndexTickers: AexIndexHierarchyTreeNode = {
  name: 'AEX-index tickers',
  children: [
    { name: abn.ticker, constituent: abn },
    { name: adyen.ticker, constituent: adyen },
    { name: agn.ticker, constituent: agn },
    { name: ad.ticker, constituent: ad },
    { name: akza.ticker, constituent: akza },
    { name: mt.ticker, constituent: mt },
    { name: asm.ticker, constituent: asm },
    { name: asml.ticker, constituent: asml },
    { name: asrnl.ticker, constituent: asrnl },
    { name: dsm.ticker, constituent: dsm },
    { name: glpg.ticker, constituent: glpg },
    { name: heia.ticker, constituent: heia },
    { name: imcd.ticker, constituent: imcd },
    { name: inga.ticker, constituent: inga },
    { name: tkwy.ticker, constituent: tkwy },
    { name: kpn.ticker, constituent: kpn },
    { name: nn.ticker, constituent: nn },
    { name: phia.ticker, constituent: phia },
    { name: prx.ticker, constituent: prx },
    { name: rand.ticker, constituent: rand },
    { name: ren.ticker, constituent: ren },
    { name: rdsa.ticker, constituent: rdsa },
    { name: urw.ticker, constituent: urw },
    { name: una.ticker, constituent: una },
    { name: wkl.ticker, constituent: wkl }
  ]
};

export const aexIndexIssuerCountries: AexIndexHierarchyTreeNode = {
  name: 'AEX-index issuer countries',
  children: [
    { name: 'Belgium', children: [ { name: glpg.ticker, constituent: glpg } ]},
    { name: 'France', children: [ { name: urw.ticker, constituent: urw } ]},
    { name: 'Luxembourg', children: [ { name: mt.ticker, constituent: mt } ]},
    { name: 'Netherlands', children: [
      { name: abn.ticker, constituent: abn },
      { name: adyen.ticker, constituent: adyen },
      { name: agn.ticker, constituent: agn },
      { name: ad.ticker, constituent: ad },
      { name: akza.ticker, constituent: akza },
      { name: asm.ticker, constituent: asm },
      { name: asml.ticker, constituent: asml },
      { name: asrnl.ticker, constituent: asrnl },
      { name: dsm.ticker, constituent: dsm },
      { name: heia.ticker, constituent: heia },
      { name: imcd.ticker, constituent: imcd },
      { name: inga.ticker, constituent: inga },
      { name: tkwy.ticker, constituent: tkwy },
      { name: kpn.ticker, constituent: kpn },
      { name: nn.ticker, constituent: nn },
      { name: phia.ticker, constituent: phia },
      { name: prx.ticker, constituent: prx },
      { name: rand.ticker, constituent: rand },
      { name: una.ticker, constituent: una },
      { name: wkl.ticker, constituent: wkl }
    ]},
    { name: 'United Kingdom', children: [ { name: ren.ticker, constituent: ren }, { name: rdsa.ticker, constituent: rdsa } ]}
  ]
};

export const aexIndexIcb: AexIndexHierarchyTreeNode = {
  name: 'AEX-index ICB',
  children: [
    { name: 'Technology', children: [
      { name: 'Technology', children: [
        { name: 'Software and Computer Services', children: [
          { name: 'Consumer Digital Services', children: [
            { name: tkwy.ticker, constituent: tkwy }, { name: prx.ticker, constituent: prx }
          ]}
        ]},
        { name: 'Technology Hardware and Equipment', children: [
          { name: 'Production Technology Equipment', children: [
            { name: asm.ticker, constituent: asm }, { name: asml.ticker, constituent: asml }
          ]}
        ]}
      ]}
    ]},
    { name: 'Telecommunications', children: [
      { name: 'Telecommunications', children: [
        { name: 'Telecommunications Service Providers', children: [
          { name: 'Telecommunications Services', children: [
            { name: kpn.ticker, constituent: kpn }
          ]}
        ]}
      ]}
    ]},
    { name: 'Health Care', children: [
      { name: 'Health Care', children: [
        { name: 'Medical Equipment and Services', children: [
          { name: 'Medical Equipment', children: [
            { name: phia.ticker, constituent: phia }
          ]}
        ]},
        { name: 'Pharmaceuticals and Biotechnology', children: [
          { name: 'Biotechnology', children: [
            { name: glpg.ticker, constituent: glpg }
          ]}
        ]}
      ]}
    ]},
    { name: 'Financials', children: [
      { name: 'Banks', children: [
        { name: 'Banks', children: [
          { name: 'Banks', children: [
            { name: abn.ticker, constituent: abn }, { name: inga.ticker, constituent: inga }
          ]}
        ]}
      ]},
      { name: 'Insurance', children: [
        { name: 'Life Insurance', children: [
          { name: 'Life Insurance', children: [
            { name: agn.ticker, constituent: agn }, { name: nn.ticker, constituent: nn }
          ]}
        ]},
        { name: 'Nonlife Insurance', children: [
          { name: 'Full Line Insurance', children: [
            { name: asrnl.ticker, constituent: asrnl }
          ]}
        ]}
      ]}
    ]},
    { name: 'Real Estate', children: [
      { name: 'Real Estate', children: [
        { name: 'Real Estate Investment Trusts', children: [
          { name: 'Retail REITs', children: [
            { name: urw.ticker, constituent: urw }
          ]}
        ]}
      ]}
    ]},
    { name: 'Consumer Discretionary  Media', children: [
      { name: 'Media', children: [
        { name: 'Media', children: [
          { name: 'Publishing', children: [
            { name: ren.ticker, constituent: ren }, { name: wkl.ticker, constituent: wkl }
          ]}
        ]}
      ]}
    ]},
    { name: 'Consumer Staples', children: [
      { name: 'Food, Beverage and Tobacco', children: [
        { name: 'Beverages', children: [
          { name: 'Brewers', children: [
            { name: heia.ticker, constituent: heia }
          ]}
        ]}
      ]},
      { name: 'Personal Care, Drug and Grocery Stores', children: [
        { name: 'Personal Care, Drug and Grocery Stores', children: [
          { name: 'Food Retailers and Wholesalers', children: [
            { name: ad.ticker, constituent: ad }
          ]},
          { name: 'Personal Products', children: [
            { name: una.ticker, constituent: una }
          ]}
        ]}
      ]}
    ]},
    { name: 'Industrials', children: [
      { name: 'Industrial Goods and Services', children: [
        { name: 'Industrial Support Services', children: [
          { name: 'Transaction Processing Services', children: [
            { name: adyen.ticker, constituent: adyen }
          ]},
          { name: 'Business Training and Employment Agencies', children: [
            { name: rand.ticker, constituent: rand }
          ]}
        ]}
      ]}
    ]},
    { name: 'Basic Materials', children: [
      { name: 'Basic Materials', children: [
        { name: 'Industrial Metals and Mining', children: [
          { name: 'Iron and Steel', children: [
            { name: mt.ticker, constituent: mt }
          ]}
        ]}
      ]},
      { name: 'Chemicals', children: [
        { name: 'Chemicals', children: [
          { name: 'Chemicals: Diversified', children: [
            { name: dsm.ticker, constituent: dsm }
          ]},
          { name: 'Specialty Chemicals', children: [
            { name: akza.ticker, constituent: akza }, { name: imcd.ticker, constituent: imcd }
          ]}
        ]}
      ]}
    ]},
    { name: 'Energy', children: [
      { name: 'Energy', children: [
        { name: 'Oil, Gas and Coal', children: [
          { name: 'Integrated Oil and Gas', children: [
            { name: rdsa.ticker, constituent: rdsa }
          ]}
        ]}
      ]}
    ]}
  ]
};
