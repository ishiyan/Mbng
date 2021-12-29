import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
/* eslint-disable max-len */

export interface Omxn40Constituent {
  ticker: string;
  isin: string;
  name: string;
  mic: string;
  country: string;
  description: string;
  icb: number;
  icbIndustry: string;
  icbSupersector: string;
  msSector: string;
  msIndustry: string;
  msStockStyle: string;
  currency: string;
  transactions: number;
  volume: number;
  turnover: number;
  marketCap: number;
  close: number;
  ratio: number;
}

export interface Omxn40HierarchyTreeNode extends HierarchyTreeNode {
  constituent?: Omxn40Constituent;
  name?: string;
  value?: number;
  children?: Omxn40HierarchyTreeNode[];
}

const ctySweden = 'Sverige';
const ctyDenmark = 'Danmark';
const ctyFinland = 'Suomi';
const ccySek = 'SEK';
const ccyDkk = 'DKK';
const ccyEur = 'EUR';
const micXsto = 'XSTO';
const micXcse = 'XCSE';
const micXhel = 'XHEL';
const rtoSek = 0.09738;
const rtoDkk = 0.134340;
const rtoEur = 1;
const msLargeBlend = 'Large-Blend';
const msLargeGrowth = 'Large-Growth';
const msLargeValue = 'Large-Value';
const msMidBlend = 'Mide-Blend';
const msMidGrowth = 'Mid-Growth';
const msMidValue = 'Mid-Value';

const abb: Omxn40Constituent = {
  ticker: 'ABB', isin: 'CH0012221716', mic: micXsto, name: 'ABB Ltd', country: ctySweden,
  description: 'ABB is a global supplier of electrical equipment and automation products.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Electrical Equipment & Parts', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 224.20, volume: 814811, turnover: 182397755, transactions: 3360, marketCap: 493.00
};

const ambu: Omxn40Constituent = {
  ticker: 'AMBU', isin: 'DK0060946788', mic: micXcse, name: 'Ambu B', country: ctyDenmark,
  description: 'Ambu A/S is a Denmark based company providing single-use flexible endoscopes and is dedicated to optimizing hospital workflows and improving patient care.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Healthcare', msIndustry: 'Medical Instruments & Supplies', msStockStyle: msMidGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 233.50, volume: 484628, turnover: 113140822, transactions: 3596, marketCap: 55.38
};

const assab: Omxn40Constituent = {
  ticker: 'ASSA B', isin: 'SE0007100581', mic: micXsto, name: 'ASSA ABLOY B', country: ctySweden,
  description: 'Assa Abloy has the worlds largest installed base of locks, protecting some of the most security-sensitive buildings, including the European Parliament in Brussels.',
  icb: 5510, icbIndustry: 'Industrials', icbSupersector: 'Construction & Materials', msSector: 'Industrials', msIndustry: 'Security & Protection Services', msStockStyle: msLargeGrowth,
  currency: ccySek, ratio: rtoSek, close: 196.45, volume: 2993741, turnover: 587457588, transactions: 4844, marketCap: 232.00
};

const atcoa: Omxn40Constituent = {
  ticker: 'ATCO A', isin: 'SE0011166610', mic: micXsto, name: 'Atlas Copco A', country: ctySweden,
  description: 'Atlas Copco is a 140-year-old Swedish company and a pioneer in air compression technology.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Specialty Industrial Machinery', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 407.80, volume: 1079771, turnover: 437828250, transactions: 8191, marketCap: 480.50
};

const atcob: Omxn40Constituent = {
  ticker: 'ATCO B', isin: 'SE0011166628', mic: micXsto, name: 'Atlas Copco B', country: ctySweden,
  description: 'Atlas Copco is a 140-year-old Swedish company and a pioneer in air compression technology.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Specialty Industrial Machinery', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 359.00, volume: 239838, turnover: 85665447, transactions: 2284, marketCap: 480.50
};

const azn: Omxn40Constituent = {
  ticker: 'AZN', isin: 'GB0009895292', mic: micXsto, name: 'AstraZeneca', country: ctySweden,
  description: 'A merger between Astra of Sweden and Zeneca Group of the United Kingdom formed AstraZeneca in 1999. The company sells branded drugs across several major therapeutic classes, including gastrointestinal, diabetes, cardiovascular, respiratory, cancer, and immunology.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Healthcare', msIndustry: 'Drug Manufacturers - General', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 991.40, volume: 379357, turnover: 378390707, transactions: 5651, marketCap: 1298.00
};

const carlb: Omxn40Constituent = {
  ticker: 'CARL B', isin: 'DK0010181759', mic: micXcse, name: 'Carlsberg B', country: ctyDenmark,
  description: 'Carlsberg A/S is the fourth- largest brewer in the world following the combination of Anheuser-Busch InBev and SABMiller, with major operations in Russia, Europe, and Asia.',
  icb: 4510, icbIndustry: 'Consumer Staples', icbSupersector: 'Food, Beverage & Tobacco', msSector: 'Consumer Defensive', msIndustry: 'Beverages - Brewers', msStockStyle: msLargeBlend,
  currency: ccyDkk, ratio: rtoDkk, close: 926.60, volume: 418576, turnover: 381553714, transactions: 7079, marketCap: 138.20
};

const chr: Omxn40Constituent = {
  ticker: 'CHR', isin: 'DK0060227585', mic: micXcse, name: 'Chr Hansen Holding', country: ctyDenmark,
  description: 'Founded in 1874 and relisted in 2010 after five years of private ownership, Chr. Hansen is a global bioscience company with 2,700 employees across 30 countries.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Basic Materials', msIndustry: 'Specialty Chemicals', msStockStyle: msMidGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 697.60, volume: 175962, turnover: 123197422, transactions: 2723, marketCap: 94.81
};

const colob: Omxn40Constituent = {
  ticker: 'COLO B', isin: 'DK0060448595', mic: micXcse, name: 'Coloplast B', country: ctyDenmark,
  description: 'Coloplast is a leading global competitor in ostomy management and continence care.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Basic Materials', msIndustry: 'Specialty Chemicals', msStockStyle: msLargeGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 1053.50, volume: 124634, turnover: 131942471, transactions: 2794, marketCap: 229.10
};

const danske: Omxn40Constituent = {
  ticker: 'DANSKE', isin: 'DK0010274414', mic: micXcse, name: 'Danske Bank', country: ctyDenmark,
  description: 'Founded in 1871, Danske Bank headquarters are in Copenhagen, Denmark.',
  icb: 3010, icbIndustry: 'Financials', icbSupersector: 'Banks', msSector: 'Financial Services', msIndustry: 'Banks - Regional', msStockStyle: msMidValue,
  currency: ccyDkk, ratio: rtoDkk, close: 95.72, volume: 1597354, turnover: 151326878, transactions: 4220, marketCap: 89.91
};

const dsv: Omxn40Constituent = {
  ticker: 'DSV', isin: 'DK0060079531', mic: micXcse, name: 'DSV Panalpina', country: ctyDenmark,
  description: 'DSV A/S is a Danish listed transport and logistics company, offering transport services worldwide by road, air, sea, and train, with the bulk of its activities coming from its European trucking network and airfreight and sea freight forwarding businesses.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Integrated Freight & Logistics', msStockStyle: msLargeGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 835.80, volume: 264687, turnover: 221931827, transactions: 4459, marketCap: 198.20
};

const elisa: Omxn40Constituent = {
  ticker: 'ELISA', isin: 'FI0009007884', mic: micXhel, name: 'Elisa Oyj', country: ctyFinland,
  description: 'Elisa Oyj is a telecommunications company that operates in two segments, Consumer Customers and Corporate Customers.',
  icb: 1510, icbIndustry: 'Telecommunications', icbSupersector: 'Telecommunications', msSector: 'Communication Services', msIndustry: 'Telecom Services', msStockStyle: msMidBlend,
  currency: ccyEur, ratio: rtoEur, close: 55.24, volume: 396777, turnover: 21919270, transactions: 2510, marketCap: 8.55
};

const ericb: Omxn40Constituent = {
  ticker: 'ERIC B', isin: 'SE0000108656', mic: micXsto, name: 'Ericsson B', country: ctySweden,
  description: 'Ericsson is leading supplier within the telecommunications equipment sector.',
  icb: 1010, icbIndustry: 'Technology', icbSupersector: 'Technology', msSector: 'Technology', msIndustry: 'Communication Equipment', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 86.46, volume: 6100835, turnover: 528522109, transactions: 9728, marketCap: 349.40
};

const essityb: Omxn40Constituent = {
  ticker: 'ESSITY B', isin: 'SE0009922164', mic: micXsto, name: 'Essity B', country: ctySweden,
  description: 'Essity AB is a health and hygiene company spun out of Svenska Cellulosa in June 2017. The company operates in three segments: personal care, consumer tissue, and professional hygiene.',
  icb: 4020, icbIndustry: 'Consumer Discretionary', icbSupersector: 'Consumer Products & Services', msSector: 'Consumer Defensive', msIndustry: 'Household & Personal Products', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 295.50, volume: 1039938, turnover: 307372898, transactions: 5212, marketCap: 202.90
};

const fortum: Omxn40Constituent = {
  ticker: 'FORTUM', isin: 'FI0009007132', mic: micXhel, name: 'Fortum Oyj', country: ctyFinland,
  description: 'Fortum Oyj is a Finnish energy company that operates power plants, which use renewable energy sources (hydro, nuclear, and solar power) to sell electricity, heat, cooling, and power products and services.',
  icb: 6510, icbIndustry: 'Utilities', icbSupersector: 'Utilities', msSector: 'Utilities', msIndustry: 'Utilities - Renewable', msStockStyle: msLargeValue,
  currency: ccyEur, ratio: rtoEur, close: 17.34, volume: 1713693, turnover: 29512942, transactions: 4625, marketCap: 16.31
};

const gmab: Omxn40Constituent = {
  ticker: 'GMAB', isin: 'DK0010272202', mic: micXcse, name: 'Genmab', country: ctyDenmark,
  description: 'Genmab is a Copenhagen-based cancer drug developer, best known for its antibody technology platforms, DuoBody and HexaBody, and multiple myeloma drug Darzalex (daratumumab), which is partnered with Johnson & Johnson.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Healthcare', msIndustry: 'Biotechnology', msStockStyle: msLargeGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 2313.00, volume: 142987, turnover: 332319646, transactions: 5738, marketCap: 152.30
};

const gn: Omxn40Constituent = {
  ticker: 'GN', isin: 'DK0010272632', mic: micXcse, name: 'GN Store Nord', country: ctyDenmark,
  description: 'GN Store Nord is a Danish company offering medical and audio solutions.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Healthcare', msIndustry: 'Medical Devices', msStockStyle: msMidGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 375.50, volume: 170381, turnover: 64011000, transactions: 2296, marketCap: 50.23
};

const hexab: Omxn40Constituent = {
  ticker: 'HEXA B', isin: 'SE0000103699', mic: micXsto, name: 'Hexagon B', country: ctySweden,
  description: 'Hexagon AB provides information technology for industrial applications. It offers solutions in two segments: geospatial enterprise solutions and industrial enterprise solutions.',
  icb: 1010, icbIndustry: 'Technology', icbSupersector: 'Technology', msSector: 'Technology', msIndustry: 'Scientific & Technical Instruments', msStockStyle: msLargeGrowth,
  currency: ccySek, ratio: rtoSek, close: 550.40, volume: 414298, turnover: 228574693, transactions: 3369, marketCap: 214.20
};

const hmb: Omxn40Constituent = {
  ticker: 'HM B', isin: 'SE0000106270', mic: micXsto, name: 'Hennes & Mauritz B', country: ctySweden,
  description: 'Hennes & Mauritz is a global multibrand fashion conglomerate that was founded in 1947.',
  icb: 4040, icbIndustry: 'Consumer Discretionary', icbSupersector: 'Retailers', msSector: 'Consumer Cyclical', msIndustry: 'Apparel Manufacturing', msStockStyle: msLargeValue,
  currency: ccySek, ratio: rtoSek, close: 137.65, volume: 4630061, turnover: 633231960, transactions: 12502, marketCap: 251.90
};

const inveb: Omxn40Constituent = {
  ticker: 'INVE B', isin: 'SE0000107419', mic: micXsto, name: 'Investor B', country: ctySweden,
  description: 'Investor AB is an industrial holding company with a long-term, active investment portfolio strategy. The company focuses on investing in companies that emphasize innovation and product development.',
  icb: 3020, icbIndustry: 'Financials', icbSupersector: 'Financial Services', msSector: 'Financial Services', msIndustry: 'Asset Management', msStockStyle: msLargeGrowth,
  currency: ccySek, ratio: rtoSek, close: 506.20, volume: 644887, turnover: 325692033, transactions: 6125, marketCap: 406.80
};

const knebv: Omxn40Constituent = {
  ticker: 'KNEBV', isin: 'FI0009013403', mic: micXhel, name: 'KONE Oyj', country: ctyFinland,
  description: 'Kone, whose name means machine in Finnish, is the worlds fourth-largest supplier of elevators and escalators.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Specialty Industrial Machinery', msStockStyle: msLargeGrowth,
  currency: ccyEur, ratio: rtoEur, close: 62.58, volume: 569253, turnover: 35538638, transactions: 4226, marketCap: 35.20
};

const ndase: Omxn40Constituent = {
  ticker: 'NDA SE', isin: 'FI4000297767', mic: micXsto, name: 'Nordea Bank Abp', country: ctySweden,
  description: 'Nordea is a universal Nordic bank which generates most of its income (63%) through vanilla lending products such as mortgages, household loans and corporate loans.',
  icb: 3010, icbIndustry: 'Financials', icbSupersector: 'Banks', msSector: 'Financial Services', msIndustry: 'Banks - Regional', msStockStyle: msLargeValue,
  currency: ccySek, ratio: rtoSek, close: 65.68, volume: 5463656, turnover: 356292550, transactions: 7476, marketCap: 288.80
};

const neste: Omxn40Constituent = {
  ticker: 'NESTE', isin: 'FI0009013296', mic: micXhel, name: 'Neste Oyj', country: ctyFinland,
  description: 'Neste Corp. offers renewable products and solutions and oil products to a host of global markets.',
  icb: 6010, icbIndustry: 'Energy', icbSupersector: 'Energy', msSector: 'Energy', msIndustry: 'Oil & Gas Refining & Marketing', msStockStyle: msLargeBlend,
  currency: ccyEur, ratio: rtoEur, close: 35.64, volume: 757157, turnover: 26816935, transactions: 4106, marketCap: 31.80
};

const nokia: Omxn40Constituent = {
  ticker: 'NOKIA', isin: 'FI0009000681', mic: micXhel, name: 'Nokia Oyj', country: ctyFinland,
  description: 'Nokia is a leading vendor in the telecommunications equipment industry.',
  icb: 1010, icbIndustry: 'Technology', icbSupersector: 'Technology', msSector: 'Technology', msIndustry: 'Communication Equipment', msStockStyle: msLargeValue,
  currency: ccyEur, ratio: rtoEur, close: 3.65, volume: 17370735, turnover: 63363679, transactions: 12244, marketCap: 21.41
};

const novob: Omxn40Constituent = {
  ticker: 'NOVO B', isin: 'DK0060534915', mic: micXcse, name: 'Novo Nordisk B', country: ctyDenmark,
  description: 'With almost 50% market share by volume of the global insulin market, Novo Nordisk is the leading provider of diabetes-care products in the world.',
  icb: 2010, icbIndustry: 'Health', icbSupersector: 'Health Care', msSector: 'Healthcare', msIndustry: 'Biotechnology', msStockStyle: msLargeGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 431.85, volume: 1956768, turnover: 845167403, transactions: 11981, marketCap: 1008.00
};

const orsted: Omxn40Constituent = {
  ticker: 'ORSTED', isin: 'DK0060094928', mic: micXcse, name: 'Ørsted', country: ctyDenmark,
  description: 'Danish company Orsted was named Dong Energy until the sale of all its oil and gas fields to Ineos in 2017, soon after the May 2016 initial public offering. Orsted is now focused on offshore wind farms.',
  icb: 6510, icbIndustry: 'Utilities', icbSupersector: 'Utilities', msSector: 'Utilities', msIndustry: 'Utilities - Renewable', msStockStyle: msLargeGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 852.20, volume: 315883, turnover: 267970352, transactions: 6610, marketCap: 384.50
};

const sampo: Omxn40Constituent = {
  ticker: 'SAMPO', isin: 'FI0009003305', mic: micXhel, name: 'Sampo Oyj A', country: ctyFinland,
  description: 'Sampo Oyj A is an insurance company that generates revenue through property and casualty insurance, life insurance, and banking services.',
  icb: 3030, icbIndustry: 'Financials', icbSupersector: 'Insurance', msSector: 'Financial Services', msIndustry: 'Insurance - Diversified', msStockStyle: msLargeValue,
  currency: ccyEur, ratio: rtoEur, close: 32.18, volume: 1115902, turnover: 35770949, transactions: 6665, marketCap: 18.45
};

const sand: Omxn40Constituent = {
  ticker: 'SAND', isin: 'SE0000667891', mic: micXsto, name: 'Sandvik', country: ctySweden,
  description: 'Sandvik is a manufacturer of specialized tools and mining equipment used predominantly by global mining, engineering, and automotive customers.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Specialty Industrial Machinery', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 179.30, volume: 1565414, turnover: 280054295, transactions: 6309, marketCap: 216.20
};

const scab: Omxn40Constituent = {
  ticker: 'SCA B', isin: 'SE0000112724', mic: micXsto, name: 'Svenska Cellulosa B', country: ctySweden,
  description: 'Svenska Cellulosa AB is a Europe private forest owner with more than two million hectares of forest land.',
  icb: 5510, icbIndustry: 'Basic Materials', icbSupersector: 'Basic Resources', msSector: 'Basic Materials', msIndustry: 'Lumber & Wood Production', msStockStyle: msMidBlend,
  currency: ccySek, ratio: rtoSek, close: 111.20, volume: 1063212, turnover: 118298167, transactions: 2676, marketCap: 75.22
};

const seba: Omxn40Constituent = {
  ticker: 'SEB A', isin: 'SE0000148884', mic: micXsto, name: 'Skandinaviska Enskilda Banken A', country: ctySweden,
  description: 'Skandinaviska Enskilda Banken is a Swedish universal bank with a strong focus on the corporate lending sector. The bank operates in the Nordics, the Baltics, Germany, and the United Kingdom but derives the majority of its operating profits from Sweden.',
  icb: 3010, icbIndustry: 'Financials', icbSupersector: 'Banks', msSector: 'Financial Services', msIndustry: 'Banks - Regional', msStockStyle: msLargeValue,
  currency: ccySek, ratio: rtoSek, close: 86.04, volume: 3546835, turnover: 302673188, transactions: 6759, marketCap: 196.30
};

const shba: Omxn40Constituent = {
  ticker: 'SHB A', isin: 'SE0007100599', mic: micXsto, name: 'Sv Handelsbanken A', country: ctySweden,
  description: 'Handelsbanken is one of the largest Swedish banks with a significant exposure to the Swedish mortgage market, about 44% of total loans are tied to the Swedish real estate market.',
  icb: 3010, icbIndustry: 'Financials', icbSupersector: 'Banks', msSector: 'Financial Services', msIndustry: 'Banks - Diversified', msStockStyle: msLargeValue,
  currency: ccySek, ratio: rtoSek, close: 90.16, volume: 2266978, turnover: 203378382, transactions: 4821, marketCap: 176.00
};

const skfb: Omxn40Constituent = {
  ticker: 'SKF B', isin: 'SE0000108227', mic: micXsto, name: 'SKF B', country: ctySweden,
  description: 'SKF history goes back to the first major patents in ball bearings: In 1907, SKF was the first to patent the self-aligning ball bearing, which is easily recognisable today. Along with the Schaeffler Group, it is one of the top two global ball bearing suppliers, followed by Timken, NSK, NTN, and JTEK.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Tools & Accessories', msStockStyle: msMidBlend,
  currency: ccySek, ratio: rtoSek, close: 181.80, volume: 1101739, turnover: 199209887, transactions: 3890, marketCap: 77.58
};

const sterv: Omxn40Constituent = {
  ticker: 'STERV', isin: 'FI0009005961', mic: micXhel, name: 'Stora Enso Oyj R', country: ctyFinland,
  description: 'Stora Enso Oyj is a Finnish paper and biomaterials company. Its operations are organized into six divisions.',
  icb: 5510, icbIndustry: 'Basic Materials', icbSupersector: 'Basic Resources', msSector: 'Basic Materials', msIndustry: 'Paper & Paper Products', msStockStyle: msMidBlend,
  currency: ccyEur, ratio: rtoEur, close: 10.57, volume: 1834944, turnover: 19347617, transactions: 3009, marketCap: 8.94
};

const sweda: Omxn40Constituent = {
  ticker: 'SWED A', isin: 'SE0000242455', mic: micXsto, name: 'Swedbank A', country: ctySweden,
  description: 'Swedbank is one of the oldest banks in Sweden, where it derives the lion share of its income. The bank is the result of merging savings and union banks in Sweden in the aftermath of the financial crisis in the early 1990s in Sweden.',
  icb: 3010, icbIndustry: 'Financials', icbSupersector: 'Banks', msSector: 'Financial Services', msIndustry: 'Banks - Regional', msStockStyle: msMidValue,
  currency: ccySek, ratio: rtoSek, close: 133.38, volume: 3135815, turnover: 413843009, transactions: 9406, marketCap: 165.20
};

const swma: Omxn40Constituent = {
  ticker: 'SWMA', isin: 'SE0000310336', mic: micXsto, name: 'Swedish Match', country: ctySweden,
  description: 'Swedish Match AB is primarily a smokeless tobacco company. It does not sell cigarettes. Its products include snus, moist snuff, chewing tobacco, cigars, and lighters and matches.',
  icb: 4020, icbIndustry: 'Consumer Discretionary', icbSupersector: 'Consumer Products & Services', msSector: 'Consumer Defensive', msIndustry: 'Tobacco', msStockStyle: msMidGrowth,
  currency: ccySek, ratio: rtoSek, close: 648.00, volume: 388202, turnover: 252476071, transactions: 5753, marketCap: 109.50
};

const tele2b: Omxn40Constituent = {
  ticker: 'TELE2 B', isin: 'SE0005190238', mic: micXsto, name: 'Tele2 B', country: ctySweden,
  description: 'Tele2 is a Swedish telecom operator, generating most of the business in its domestic country.',
  icb: 1510, icbIndustry: 'Telecommunications', icbSupersector: 'Telecommunications', msSector: 'Communication Services', msIndustry: 'Telecom Services', msStockStyle: msMidGrowth,
  currency: ccySek, ratio: rtoSek, close: 121.40, volume: 1970110, turnover: 238520222, transactions: 4124, marketCap: 89.98
};

const telia: Omxn40Constituent = {
  ticker: 'TELIA', isin: 'SE0000667925', mic: micXsto, name: 'Telia Company', country: ctySweden,
  description: 'Telia is the incumbent telecom operator in Sweden and one of the dominant players in Finland and Norway. Its home market, Sweden, represents more than 40% of its revenue.',
  icb: 1510, icbIndustry: 'Telecommunications', icbSupersector: 'Telecommunications', msSector: 'Communication Services', msIndustry: 'Telecom Services', msStockStyle: msLargeValue,
  currency: ccySek, ratio: rtoSek, close: 34.57, volume: 10852744, turnover: 374997659, transactions: 6557, marketCap: 146.40
};

const upm: Omxn40Constituent = {
  ticker: 'UPM', isin: 'FI0009005987', mic: micXhel, name: 'UPM-Kymmene Oyj', country: ctyFinland,
  description: 'UPM-Kymmene Oyj is a Finnish paper and biomaterials company. The company produces products related to the forestry industry including paper, pulp, and plywood.',
  icb: 5510, icbIndustry: 'Basic Materials', icbSupersector: 'Basic Resources', msSector: 'Basic Materials', msIndustry: 'Paper & Paper Products', msStockStyle: msLargeValue,
  currency: ccyEur, ratio: rtoEur, close: 24.08, volume: 1687372, turnover: 40664305, transactions: 5350, marketCap: 13.06
};

const volvb: Omxn40Constituent = {
  ticker: 'VOLV B', isin: 'SE0000115446', mic: micXsto, name: 'Volvo B', country: ctySweden,
  description: 'Volvo AB is the world second- largest manufacturer of heavy-duty trucks and largest manufacturer of heavy diesel engines.',
  icb: 5020, icbIndustry: 'Industrials', icbSupersector: 'Industrial Goods & Services', msSector: 'Industrials', msIndustry: 'Farm & Heavy Construction Machinery', msStockStyle: msLargeBlend,
  currency: ccySek, ratio: rtoSek, close: 153.30, volume: 3694986, turnover: 563918620, transactions: 8887, marketCap: 323.90
};

const vws: Omxn40Constituent = {
  ticker: 'VWS', isin: 'DK0010268606', mic: micXcse, name: 'Vestas Wind Systems', country: ctyDenmark,
  description: 'Vestas Wind Systems is one of the largest wind turbine manufacturers with 113 gigawatts or roughly 16% of installed wind global capacity and 96.3 GW under service.',
  icb: 6010, icbIndustry: 'Energy', icbSupersector: 'Energy', msSector: 'Industrials', msIndustry: 'Specialty Industrial Machinery', msStockStyle: msLargeGrowth,
  currency: ccyDkk, ratio: rtoDkk, close: 742.40, volume: 479856, turnover: 356321560, transactions: 6388, marketCap: 170.30
};

export const omxn40Tickers: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 tickers',
  children: [
    { name: abb.ticker, constituent: abb },
    { name: ambu.ticker, constituent: ambu },
    { name: assab.ticker, constituent: assab },
    { name: atcoa.ticker, constituent: atcoa },
    { name: atcob.ticker, constituent: atcob },
    { name: azn.ticker, constituent: azn },
    { name: carlb.ticker, constituent: carlb },
    { name: chr.ticker, constituent: chr },
    { name: colob.ticker, constituent: colob },
    { name: danske.ticker, constituent: danske },
    { name: dsv.ticker, constituent: dsv },
    { name: elisa.ticker, constituent: elisa },
    { name: ericb.ticker, constituent: ericb },
    { name: essityb.ticker, constituent: essityb },
    { name: fortum.ticker, constituent: fortum },
    { name: gmab.ticker, constituent: gmab },
    { name: gn.ticker, constituent: gn },
    { name: hexab.ticker, constituent: hexab },
    { name: hmb.ticker, constituent: hmb },
    { name: inveb.ticker, constituent: inveb },
    { name: knebv.ticker, constituent: knebv },
    { name: ndase.ticker, constituent: ndase },
    { name: neste.ticker, constituent: neste },
    { name: nokia.ticker, constituent: nokia },
    { name: novob.ticker, constituent: novob },
    { name: orsted.ticker, constituent: orsted },
    { name: sampo.ticker, constituent: sampo },
    { name: sand.ticker, constituent: sand },
    { name: scab.ticker, constituent: scab },
    { name: seba.ticker, constituent: seba },
    { name: shba.ticker, constituent: shba },
    { name: skfb.ticker, constituent: skfb },
    { name: sterv.ticker, constituent: sterv },
    { name: sweda.ticker, constituent: sweda },
    { name: swma.ticker, constituent: swma },
    { name: tele2b.ticker, constituent: tele2b },
    { name: telia.ticker, constituent: telia },
    { name: upm.ticker, constituent: upm },
    { name: volvb.ticker, constituent: volvb },
    { name: vws.ticker, constituent: vws }
  ]
};

export const omxn40Currencies: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 currencies',
  children: [
    { name: ccyDkk, children: [
      { name: ambu.ticker, constituent: ambu },
      { name: carlb.ticker, constituent: carlb },
      { name: chr.ticker, constituent: chr },
      { name: colob.ticker, constituent: colob },
      { name: danske.ticker, constituent: danske },
      { name: dsv.ticker, constituent: dsv },
      { name: gmab.ticker, constituent: gmab },
      { name: gn.ticker, constituent: gn },
      { name: novob.ticker, constituent: novob },
      { name: orsted.ticker, constituent: orsted },
      { name: vws.ticker, constituent: vws }
    ]},
    { name: ccyEur, children: [
      { name: elisa.ticker, constituent: elisa },
      { name: fortum.ticker, constituent: fortum },
      { name: knebv.ticker, constituent: knebv },
      { name: neste.ticker, constituent: neste },
      { name: nokia.ticker, constituent: nokia },
      { name: sampo.ticker, constituent: sampo },
      { name: sterv.ticker, constituent: sterv },
      { name: upm.ticker, constituent: upm }
    ]},
    { name: ccySek, children: [
      { name: abb.ticker, constituent: abb },
      { name: assab.ticker, constituent: assab },
      { name: atcoa.ticker, constituent: atcoa },
      { name: atcob.ticker, constituent: atcob },
      { name: azn.ticker, constituent: azn },
      { name: ericb.ticker, constituent: ericb },
      { name: essityb.ticker, constituent: essityb },
      { name: hexab.ticker, constituent: hexab },
      { name: hmb.ticker, constituent: hmb },
      { name: inveb.ticker, constituent: inveb },
      { name: ndase.ticker, constituent: ndase },
      { name: sand.ticker, constituent: sand },
      { name: scab.ticker, constituent: scab },
      { name: seba.ticker, constituent: seba },
      { name: shba.ticker, constituent: shba },
      { name: skfb.ticker, constituent: skfb },
      { name: sweda.ticker, constituent: sweda },
      { name: swma.ticker, constituent: swma },
      { name: tele2b.ticker, constituent: tele2b },
      { name: telia.ticker, constituent: telia },
      { name: volvb.ticker, constituent: volvb }
    ]}
  ]
};

export const omxn40Icb: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 ICB',
  children: [
    { name: 'Industrials', children: [
      { name: 'Industrial Goods & Services', children: [
        { name: abb.ticker, constituent: abb },
        { name: atcoa.ticker, constituent: atcoa },
        { name: atcob.ticker, constituent: atcob },
        { name: dsv.ticker, constituent: dsv },
        { name: knebv.ticker, constituent: knebv },
        { name: sand.ticker, constituent: sand },
        { name: skfb.ticker, constituent: skfb },
        { name: volvb.ticker, constituent: volvb }
      ]},
      { name: 'Construction & Materials', children: [
        { name: assab.ticker, constituent: assab }
      ]}
    ]},
    { name: 'Health', children: [
      { name: 'Health Care', children: [
        { name: ambu.ticker, constituent: ambu },
        { name: azn.ticker, constituent: azn },
        { name: chr.ticker, constituent: chr },
        { name: colob.ticker, constituent: colob },
        { name: gmab.ticker, constituent: gmab },
        { name: gn.ticker, constituent: gn },
        { name: novob.ticker, constituent: novob }
      ]}
    ]},
    { name: 'Financials', children: [
      { name: 'Banks', children: [
        { name: danske.ticker, constituent: danske },
        { name: ndase.ticker, constituent: ndase },
        { name: seba.ticker, constituent: seba },
        { name: shba.ticker, constituent: shba },
        { name: sweda.ticker, constituent: sweda }
      ]},
      { name: 'Financial Services', children: [
        { name: inveb.ticker, constituent: inveb }
      ]},
      { name: 'Insurance', children: [
        { name: sampo.ticker, constituent: sampo }
      ]}
    ]},
    { name: 'Consumer Discretionary', children: [
      { name: 'Consumer Products and Services', children: [
        { name: essityb.ticker, constituent: essityb },
        { name: swma.ticker, constituent: swma }
      ]},
      { name: 'Retailers', children: [
        { name: hmb.ticker, constituent: hmb }
      ]}
    ]},
    { name: 'Consumer Staples', children: [
      { name: 'Food, Beverage and Tobacco', children: [
        { name: carlb.ticker, constituent: carlb }
      ]}
    ]},
    { name: 'Telecommunications', children: [
      { name: 'Telecommunications', children: [
        { name: elisa.ticker, constituent: elisa },
        { name: tele2b.ticker, constituent: tele2b },
        { name: telia.ticker, constituent: telia }
      ]}
    ]},
    { name: 'Technology', children: [
      { name: 'Technology', children: [
        { name: ericb.ticker, constituent: ericb },
        { name: hexab.ticker, constituent: hexab },
        { name: nokia.ticker, constituent: nokia }
      ]}
    ]},
    { name: 'Energy', children: [
      { name: 'Energy', children: [
        { name: neste.ticker, constituent: neste },
        { name: vws.ticker, constituent: vws }
      ]}
    ]},
    { name: 'Utilities', children: [
      { name: 'Utilities', children: [
        { name: fortum.ticker, constituent: fortum },
        { name: orsted.ticker, constituent: orsted }
      ]}
    ]},
    { name: 'Basic Materials', children: [
      { name: 'Basic Resources', children: [
        { name: scab.ticker, constituent: scab },
        { name: sterv.ticker, constituent: sterv },
        { name: upm.ticker, constituent: upm }
      ]}
    ]},
  ]
};

export const omxn40Ms: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 Morningstar',
  children: [
    { name: 'Industrials', children: [
      { name: 'Specialty Industrial Machinery', children: [
        { name: atcoa.ticker, constituent: atcoa },
        { name: knebv.ticker, constituent: knebv },
        { name: sand.ticker, constituent: sand },
        { name: atcob.ticker, constituent: atcob },
        { name: vws.ticker, constituent: vws }
      ]},
      { name: 'Electrical Equipment & Parts', children: [
        { name: abb.ticker, constituent: abb }
      ]},
      { name: 'Security & Protection Services', children: [
        { name: assab.ticker, constituent: assab }
      ]},
      { name: 'Integrated Freight & Logistics', children: [
        { name: dsv.ticker, constituent: dsv }
      ]},
      { name: 'ools & Accessories', children: [
        { name: skfb.ticker, constituent: skfb }
      ]},
      { name: 'Farm & Heavy Construction Machinery', children: [
        { name: volvb.ticker, constituent: volvb }
      ]}
    ]},
    { name: 'Healthcare', children: [
      { name: 'Medical Instruments & Supplies', children: [
        { name: ambu.ticker, constituent: ambu },
        { name: colob.ticker, constituent: colob }
      ]},
      { name: 'Biotechnology', children: [
        { name: azn.ticker, constituent: azn },
        { name: novob.ticker, constituent: novob }
      ]},
      { name: 'Drug Manufacturers - General', children: [
        { name: gmab.ticker, constituent: gmab }
      ]},
      { name: 'Medical Devices', children: [
        { name: gn.ticker, constituent: gn }
      ]}
    ]},
    { name: 'Financial Services', children: [
      { name: 'Banks - Diversified', children: [
        { name: shba.ticker, constituent: shba }
      ]},
      { name: 'Banks - Regional', children: [
        { name: danske.ticker, constituent: danske },
        { name: ndase.ticker, constituent: ndase },
        { name: seba.ticker, constituent: seba },
        { name: sweda.ticker, constituent: sweda }
      ]},
      { name: 'Insurance - Diversified', children: [
        { name: sampo.ticker, constituent: sampo }
      ]},
      { name: 'Asset Management', children: [
        { name: inveb.ticker, constituent: inveb }
      ]}
    ]},
    { name: 'Consumer Cyclical', children: [
      { name: 'Apparel Manufacturing', children: [
        { name: hmb.ticker, constituent: hmb }
      ]}
    ]},
    { name: 'Consumer Defensive', children: [
      { name: 'Beverages - Brewers', children: [
        { name: carlb.ticker, constituent: carlb }
      ]},
      { name: 'Household & Personal Products', children: [
        { name: essityb.ticker, constituent: essityb }
      ]},
      { name: 'Tobacco', children: [
        { name: swma.ticker, constituent: swma }
      ]}
    ]},
    { name: 'Basic Materials', children: [
      { name: 'Specialty Chemicals', children: [
        { name: chr.ticker, constituent: chr }
      ]},
      { name: 'Lumber & Wood Production', children: [
        { name: scab.ticker, constituent: scab }
      ]},
      { name: 'Paper & Paper Products', children: [
        { name: sterv.ticker, constituent: sterv },
        { name: upm.ticker, constituent: upm }
      ]}
    ]},
    { name: 'Communication Services', children: [
      { name: 'Telecom Services', children: [
        { name: elisa.ticker, constituent: elisa },
        { name: tele2b.ticker, constituent: tele2b },
        { name: telia.ticker, constituent: telia }
      ]}
    ]},
    { name: 'Technology', children: [
      { name: 'Communication Equipment', children: [
        { name: ericb.ticker, constituent: ericb },
        { name: nokia.ticker, constituent: nokia }
      ]},
      { name: 'Scientific & Technical Instruments', children: [
        { name: hexab.ticker, constituent: hexab }
      ]}
    ]},
    { name: 'Utilities', children: [
      { name: 'Utilities - Renewable', children: [
        { name: fortum.ticker, constituent: fortum },
        { name: orsted.ticker, constituent: orsted }
      ]}
    ]},
    { name: 'Energy', children: [
      { name: 'Oil & Gas Refining & Marketing', children: [
        { name: neste.ticker, constituent: neste }
      ]}
    ]}
  ]
};

export const omxn40MsStyle: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 Morningstar stock style',
  children: [
    { name: msLargeBlend, children: [
      { name: abb.ticker, constituent: abb },
      { name: atcoa.ticker, constituent: atcoa },
      { name: atcob.ticker, constituent: atcob },
      { name: azn.ticker, constituent: azn },
      { name: carlb.ticker, constituent: carlb },
      { name: ericb.ticker, constituent: ericb },
      { name: essityb.ticker, constituent: essityb },
      { name: neste.ticker, constituent: neste },
      { name: sand.ticker, constituent: sand },
      { name: volvb.ticker, constituent: volvb }
    ]},
    { name: msLargeGrowth, children: [
      { name: assab.ticker, constituent: assab },
      { name: colob.ticker, constituent: colob },
      { name: dsv.ticker, constituent: dsv },
      { name: gmab.ticker, constituent: gmab },
      { name: hexab.ticker, constituent: hexab },
      { name: inveb.ticker, constituent: inveb },
      { name: knebv.ticker, constituent: knebv },
      { name: novob.ticker, constituent: novob },
      { name: orsted.ticker, constituent: orsted },
      { name: vws.ticker, constituent: vws }
    ]},
    { name: msLargeValue, children: [
      { name: fortum.ticker, constituent: fortum },
      { name: hmb.ticker, constituent: hmb },
      { name: ndase.ticker, constituent: ndase },
      { name: nokia.ticker, constituent: nokia },
      { name: sampo.ticker, constituent: sampo },
      { name: seba.ticker, constituent: seba },
      { name: shba.ticker, constituent: shba },
      { name: telia.ticker, constituent: telia },
      { name: upm.ticker, constituent: upm }
    ]},
    { name: msMidBlend, children: [
      { name: elisa.ticker, constituent: elisa },
      { name: scab.ticker, constituent: scab },
      { name: skfb.ticker, constituent: skfb },
      { name: sterv.ticker, constituent: sterv }
    ]},
    { name: msMidGrowth, children: [
      { name: ambu.ticker, constituent: ambu },
      { name: chr.ticker, constituent: chr },
      { name: gn.ticker, constituent: gn },
      { name: swma.ticker, constituent: swma },
      { name: tele2b.ticker, constituent: tele2b }
    ]},
    { name: msMidValue, children: [
      { name: danske.ticker, constituent: danske },
      { name: sweda.ticker, constituent: sweda }
    ]}
  ]
};

export const omxn40MsStyleCapValueGrowth: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 Morningstar stock style',
  children: [
    { name: 'Large Cap', children: [
        { name: 'Growth', children: [
          { name: assab.ticker, constituent: assab },
          { name: colob.ticker, constituent: colob },
          { name: dsv.ticker, constituent: dsv },
          { name: gmab.ticker, constituent: gmab },
          { name: hexab.ticker, constituent: hexab },
          { name: inveb.ticker, constituent: inveb },
          { name: knebv.ticker, constituent: knebv },
          { name: novob.ticker, constituent: novob },
          { name: orsted.ticker, constituent: orsted },
          { name: vws.ticker, constituent: vws }
        ]},
        { name: 'Blend', children: [
          { name: abb.ticker, constituent: abb },
          { name: atcoa.ticker, constituent: atcoa },
          { name: atcob.ticker, constituent: atcob },
          { name: azn.ticker, constituent: azn },
          { name: carlb.ticker, constituent: carlb },
          { name: ericb.ticker, constituent: ericb },
          { name: essityb.ticker, constituent: essityb },
          { name: neste.ticker, constituent: neste },
          { name: sand.ticker, constituent: sand },
          { name: volvb.ticker, constituent: volvb }
        ]},
        { name: 'Value', children: [
          { name: fortum.ticker, constituent: fortum },
          { name: hmb.ticker, constituent: hmb },
          { name: ndase.ticker, constituent: ndase },
          { name: nokia.ticker, constituent: nokia },
          { name: sampo.ticker, constituent: sampo },
          { name: seba.ticker, constituent: seba },
          { name: shba.ticker, constituent: shba },
          { name: telia.ticker, constituent: telia },
          { name: upm.ticker, constituent: upm }
        ]}
    ]},
    { name: 'Mid Cap', children: [
        { name: 'Growth', children: [
          { name: ambu.ticker, constituent: ambu },
          { name: chr.ticker, constituent: chr },
          { name: gn.ticker, constituent: gn },
          { name: swma.ticker, constituent: swma },
          { name: tele2b.ticker, constituent: tele2b }
        ]},
        { name: 'Blend', children: [
          { name: elisa.ticker, constituent: elisa },
          { name: scab.ticker, constituent: scab },
          { name: skfb.ticker, constituent: skfb },
          { name: sterv.ticker, constituent: sterv }
        ]},
        { name: 'Value', children: [
          { name: danske.ticker, constituent: danske },
          { name: sweda.ticker, constituent: sweda }
        ]}
    ]}
  ]
};

export const omxn40MsStyleValueGrowthCap: Omxn40HierarchyTreeNode = {
  name: 'OMXN40 Morningstar stock style',
  children: [
    { name: 'Growth', children: [
        { name: 'Large Cap', children: [
          { name: assab.ticker, constituent: assab },
          { name: colob.ticker, constituent: colob },
          { name: dsv.ticker, constituent: dsv },
          { name: gmab.ticker, constituent: gmab },
          { name: hexab.ticker, constituent: hexab },
          { name: inveb.ticker, constituent: inveb },
          { name: knebv.ticker, constituent: knebv },
          { name: novob.ticker, constituent: novob },
          { name: orsted.ticker, constituent: orsted },
          { name: vws.ticker, constituent: vws }
        ]},
        { name: 'Mid Cap', children: [
          { name: ambu.ticker, constituent: ambu },
          { name: chr.ticker, constituent: chr },
          { name: gn.ticker, constituent: gn },
          { name: swma.ticker, constituent: swma },
          { name: tele2b.ticker, constituent: tele2b }
        ]}
    ]},
    { name: 'Blend', children: [
        { name: 'Large Cap', children: [
          { name: abb.ticker, constituent: abb },
          { name: atcoa.ticker, constituent: atcoa },
          { name: atcob.ticker, constituent: atcob },
          { name: azn.ticker, constituent: azn },
          { name: carlb.ticker, constituent: carlb },
          { name: ericb.ticker, constituent: ericb },
          { name: essityb.ticker, constituent: essityb },
          { name: neste.ticker, constituent: neste },
          { name: sand.ticker, constituent: sand },
          { name: volvb.ticker, constituent: volvb }
        ]},
        { name: 'Mid Cap', children: [
          { name: elisa.ticker, constituent: elisa },
          { name: scab.ticker, constituent: scab },
          { name: skfb.ticker, constituent: skfb },
          { name: sterv.ticker, constituent: sterv }
        ]}
    ]},
    { name: 'Value', children: [
        { name: 'Large Cap', children: [
          { name: fortum.ticker, constituent: fortum },
          { name: hmb.ticker, constituent: hmb },
          { name: ndase.ticker, constituent: ndase },
          { name: nokia.ticker, constituent: nokia },
          { name: sampo.ticker, constituent: sampo },
          { name: seba.ticker, constituent: seba },
          { name: shba.ticker, constituent: shba },
          { name: telia.ticker, constituent: telia },
          { name: upm.ticker, constituent: upm }
        ]},
        { name: 'Mid Cap', children: [
          { name: danske.ticker, constituent: danske },
          { name: sweda.ticker, constituent: sweda }
        ]}
    ]}
  ]
};
