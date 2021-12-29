// This code is automatically generated. Do not edit!
/* eslint-disable max-len */

import { HierarchyTreeNode } from '../../../charts/hierarchy-tree/hierarchy-tree';

export const enum GicsRank {
  Sector = 'Sector',
  IndustryGroup = 'IndustryGroup',
  Industry = 'Industry',
  SubIndustry = 'SubIndustry'
}

export interface GicsNode extends HierarchyTreeNode {
  rank: GicsRank;
  value: number;
  name: string;
  definition?: string;
  children?: GicsNode[];
}

export interface GicsTaxonomy extends HierarchyTreeNode {
  children?: GicsNode[];
}

export interface GicsLevel {
  rank: GicsRank;
  value: number;
  name: string;
  definition?: string;
}

const sector10: GicsLevel = { value: 10, rank: GicsRank.Sector, name: 'Energy' };
const sector15: GicsLevel = { value: 15, rank: GicsRank.Sector, name: 'Materials' };
const sector20: GicsLevel = { value: 20, rank: GicsRank.Sector, name: 'Industrials' };
const sector25: GicsLevel = { value: 25, rank: GicsRank.Sector, name: 'Consumer Discretionary' };
const sector30: GicsLevel = { value: 30, rank: GicsRank.Sector, name: 'Consumer Staples' };
const sector35: GicsLevel = { value: 35, rank: GicsRank.Sector, name: 'Health Care' };
const sector40: GicsLevel = { value: 40, rank: GicsRank.Sector, name: 'Financials' };
const sector45: GicsLevel = { value: 45, rank: GicsRank.Sector, name: 'Information Technology' };
const sector50: GicsLevel = { value: 50, rank: GicsRank.Sector, name: 'Communication Service' };
const sector55: GicsLevel = { value: 55, rank: GicsRank.Sector, name: 'Utilities' };
const sector60: GicsLevel = { value: 60, rank: GicsRank.Sector, name: 'Real Estate' };

const industryGroup1010: GicsLevel = { value: 1010, rank: GicsRank.IndustryGroup, name: 'Energy' };
const industryGroup1510: GicsLevel = { value: 1510, rank: GicsRank.IndustryGroup, name: 'Materials' };
const industryGroup2010: GicsLevel = { value: 2010, rank: GicsRank.IndustryGroup, name: 'Capital Goods' };
const industryGroup2020: GicsLevel = { value: 2020, rank: GicsRank.IndustryGroup, name: 'Commercial & Professional Services' };
const industryGroup2030: GicsLevel = { value: 2030, rank: GicsRank.IndustryGroup, name: 'Transportation' };
const industryGroup2510: GicsLevel = { value: 2510, rank: GicsRank.IndustryGroup, name: 'Automobiles & Components' };
const industryGroup2520: GicsLevel = { value: 2520, rank: GicsRank.IndustryGroup, name: 'Consumer Durables & Apparel' };
const industryGroup2530: GicsLevel = { value: 2530, rank: GicsRank.IndustryGroup, name: 'Consumer Services' };
const industryGroup2550: GicsLevel = { value: 2550, rank: GicsRank.IndustryGroup, name: 'Retailing' };
const industryGroup3010: GicsLevel = { value: 3010, rank: GicsRank.IndustryGroup, name: 'Food & Staples Retailing' };
const industryGroup3020: GicsLevel = { value: 3020, rank: GicsRank.IndustryGroup, name: 'Food, Beverage & Tobacco' };
const industryGroup3030: GicsLevel = { value: 3030, rank: GicsRank.IndustryGroup, name: 'Household & Personal Products' };
const industryGroup3510: GicsLevel = { value: 3510, rank: GicsRank.IndustryGroup, name: 'Health CareEquipment & Services' };
const industryGroup3520: GicsLevel = { value: 3520, rank: GicsRank.IndustryGroup, name: 'Pharmaceuticals & Biotechnology & Life Sciences' };
const industryGroup4010: GicsLevel = { value: 4010, rank: GicsRank.IndustryGroup, name: 'Banks' };
const industryGroup4020: GicsLevel = { value: 4020, rank: GicsRank.IndustryGroup, name: 'Diversified Financials' };
const industryGroup4030: GicsLevel = { value: 4030, rank: GicsRank.IndustryGroup, name: 'Insurance' };
const industryGroup4510: GicsLevel = { value: 4510, rank: GicsRank.IndustryGroup, name: 'Software & Services' };
const industryGroup4520: GicsLevel = { value: 4520, rank: GicsRank.IndustryGroup, name: 'Technology Hardware & Equipment' };
const industryGroup4530: GicsLevel = { value: 4530, rank: GicsRank.IndustryGroup, name: 'Semiconductors & Semiconductor Equipment' };
const industryGroup5010: GicsLevel = { value: 5010, rank: GicsRank.IndustryGroup, name: 'Telecommunication Services' };
const industryGroup5020: GicsLevel = { value: 5020, rank: GicsRank.IndustryGroup, name: 'Media & Entertainment' };
const industryGroup5510: GicsLevel = { value: 5510, rank: GicsRank.IndustryGroup, name: 'Utilities' };
const industryGroup6010: GicsLevel = { value: 6010, rank: GicsRank.IndustryGroup, name: 'Real Estate' };

const industry101010: GicsLevel = { value: 101010, rank: GicsRank.Industry, name: 'Energy Equipment & Services' };
const industry101020: GicsLevel = { value: 101020, rank: GicsRank.Industry, name: 'Oil,Gas & Consumable Fuels' };
const industry151010: GicsLevel = { value: 151010, rank: GicsRank.Industry, name: 'Chemicals' };
const industry151020: GicsLevel = { value: 151020, rank: GicsRank.Industry, name: 'Construction Materials' };
const industry151030: GicsLevel = { value: 151030, rank: GicsRank.Industry, name: 'Containers & Packaging' };
const industry151040: GicsLevel = { value: 151040, rank: GicsRank.Industry, name: 'Metals & Mining' };
const industry151050: GicsLevel = { value: 151050, rank: GicsRank.Industry, name: 'Paper & Forest Products' };
const industry201010: GicsLevel = { value: 201010, rank: GicsRank.Industry, name: 'Aerospace & Defense' };
const industry201020: GicsLevel = { value: 201020, rank: GicsRank.Industry, name: 'Building Products' };
const industry201030: GicsLevel = { value: 201030, rank: GicsRank.Industry, name: 'Construction & Engineering' };
const industry201040: GicsLevel = { value: 201040, rank: GicsRank.Industry, name: 'Electrical Equipment' };
const industry201050: GicsLevel = { value: 201050, rank: GicsRank.Industry, name: 'Industrial Conglomerates' };
const industry201060: GicsLevel = { value: 201060, rank: GicsRank.Industry, name: 'Machinery' };
const industry201070: GicsLevel = { value: 201070, rank: GicsRank.Industry, name: 'Trading Companies & Distributors' };
const industry202010: GicsLevel = { value: 202010, rank: GicsRank.Industry, name: 'Commercial Services & Supplies' };
const industry202020: GicsLevel = { value: 202020, rank: GicsRank.Industry, name: 'Professional Services' };
const industry203010: GicsLevel = { value: 203010, rank: GicsRank.Industry, name: 'Air Freight & Logistics' };
const industry203020: GicsLevel = { value: 203020, rank: GicsRank.Industry, name: 'Airlines' };
const industry203030: GicsLevel = { value: 203030, rank: GicsRank.Industry, name: 'Marine' };
const industry203040: GicsLevel = { value: 203040, rank: GicsRank.Industry, name: 'Road & Rail' };
const industry203050: GicsLevel = { value: 203050, rank: GicsRank.Industry, name: 'Transportation Infrastructure' };
const industry251010: GicsLevel = { value: 251010, rank: GicsRank.Industry, name: 'Auto Components' };
const industry251020: GicsLevel = { value: 251020, rank: GicsRank.Industry, name: 'Automobiles' };
const industry252010: GicsLevel = { value: 252010, rank: GicsRank.Industry, name: 'HouseholdDurables' };
const industry252020: GicsLevel = { value: 252020, rank: GicsRank.Industry, name: 'LeisureProducts' };
const industry252030: GicsLevel = { value: 252030, rank: GicsRank.Industry, name: 'Textiles, Apparel & Luxury Goods' };
const industry253010: GicsLevel = { value: 253010, rank: GicsRank.Industry, name: 'Hotels, Restaurants & Leisure' };
const industry253020: GicsLevel = { value: 253020, rank: GicsRank.Industry, name: 'Diversified Consumer Services' };
const industry255010: GicsLevel = { value: 255010, rank: GicsRank.Industry, name: 'Distributors' };
const industry255020: GicsLevel = { value: 255020, rank: GicsRank.Industry, name: 'Internet & Direct Marketing Retail' };
const industry255030: GicsLevel = { value: 255030, rank: GicsRank.Industry, name: 'Multiline Retail' };
const industry255040: GicsLevel = { value: 255040, rank: GicsRank.Industry, name: 'Specialty Retail' };
const industry301010: GicsLevel = { value: 301010, rank: GicsRank.Industry, name: 'Food & Staples Retailing' };
const industry302010: GicsLevel = { value: 302010, rank: GicsRank.Industry, name: 'Beverages' };
const industry302020: GicsLevel = { value: 302020, rank: GicsRank.Industry, name: 'Food Products' };
const industry302030: GicsLevel = { value: 302030, rank: GicsRank.Industry, name: 'Tobacco' };
const industry303010: GicsLevel = { value: 303010, rank: GicsRank.Industry, name: 'Household Products' };
const industry303020: GicsLevel = { value: 303020, rank: GicsRank.Industry, name: 'Personal Products' };
const industry351010: GicsLevel = { value: 351010, rank: GicsRank.Industry, name: 'Health CareEquipment & Supplies' };
const industry351020: GicsLevel = { value: 351020, rank: GicsRank.Industry, name: 'Health CareProviders & Services' };
const industry351030: GicsLevel = { value: 351030, rank: GicsRank.Industry, name: 'Health CareTechnology' };
const industry352010: GicsLevel = { value: 352010, rank: GicsRank.Industry, name: 'Biotechnology' };
const industry352020: GicsLevel = { value: 352020, rank: GicsRank.Industry, name: 'Pharmaceuticals' };
const industry352030: GicsLevel = { value: 352030, rank: GicsRank.Industry, name: 'Life Sciences Tools & Services' };
const industry401010: GicsLevel = { value: 401010, rank: GicsRank.Industry, name: 'Banks' };
const industry401020: GicsLevel = { value: 401020, rank: GicsRank.Industry, name: 'Thrifts & Mortgage Finance' };
const industry402010: GicsLevel = { value: 402010, rank: GicsRank.Industry, name: 'Diversified Financial Services' };
const industry402020: GicsLevel = { value: 402020, rank: GicsRank.Industry, name: 'Consumer Finance' };
const industry402030: GicsLevel = { value: 402030, rank: GicsRank.Industry, name: 'Capital Markets' };
const industry402040: GicsLevel = { value: 402040, rank: GicsRank.Industry, name: 'Mortgage Real Estate Investment Trusts (REITs)' };
const industry403010: GicsLevel = { value: 403010, rank: GicsRank.Industry, name: 'Insurance' };
const industry451020: GicsLevel = { value: 451020, rank: GicsRank.Industry, name: 'IT Services' };
const industry451030: GicsLevel = { value: 451030, rank: GicsRank.Industry, name: 'Software' };
const industry452010: GicsLevel = { value: 452010, rank: GicsRank.Industry, name: 'Communications Equipment' };
const industry452020: GicsLevel = { value: 452020, rank: GicsRank.Industry, name: 'Technology Hardware,Storage & Peripherals' };
const industry452030: GicsLevel = { value: 452030, rank: GicsRank.Industry, name: 'Electronic Equipment, Instruments & Components' };
const industry453010: GicsLevel = { value: 453010, rank: GicsRank.Industry, name: 'Semiconductors & Semiconductor Equipment' };
const industry501010: GicsLevel = { value: 501010, rank: GicsRank.Industry, name: 'Diversified Telecommunication Services' };
const industry501020: GicsLevel = { value: 501020, rank: GicsRank.Industry, name: 'Wireless Telecommunication Services' };
const industry502010: GicsLevel = { value: 502010, rank: GicsRank.Industry, name: 'Media' };
const industry502020: GicsLevel = { value: 502020, rank: GicsRank.Industry, name: 'Entertainment' };
const industry502030: GicsLevel = { value: 502030, rank: GicsRank.Industry, name: 'Interactive Media & Services' };
const industry551010: GicsLevel = { value: 551010, rank: GicsRank.Industry, name: 'Electric Utilities' };
const industry551020: GicsLevel = { value: 551020, rank: GicsRank.Industry, name: 'Gas Utilities' };
const industry551030: GicsLevel = { value: 551030, rank: GicsRank.Industry, name: 'Multi-Utilities' };
const industry551040: GicsLevel = { value: 551040, rank: GicsRank.Industry, name: 'Water Utilities' };
const industry551050: GicsLevel = { value: 551050, rank: GicsRank.Industry, name: 'Independent Power & Renewable Electricity Producers' };
const industry601010: GicsLevel = { value: 601010, rank: GicsRank.Industry, name: 'Equity Real EstateInvestment Trusts (REITs)' };
const industry601020: GicsLevel = { value: 601020, rank: GicsRank.Industry, name: 'Real EstateManagement &Development' };

const subIndustry10101010: GicsLevel = { value: 10101010, rank: GicsRank.SubIndustry, name: 'Oil & Gas Drilling', definition: 'Drilling contractors or owners of drilling rigs that contract their services for drilling wells.' };
const subIndustry10101020: GicsLevel = { value: 10101020, rank: GicsRank.SubIndustry, name: 'Oil & Gas Equipment & Services', definition: 'Manufacturers of equipment, including drilling rigs and equipment, and providers of supplies and services to companies involved in the drilling, evaluation and completion of oil and gas wells.' };
const subIndustry10102010: GicsLevel = { value: 10102010, rank: GicsRank.SubIndustry, name: 'Integrated Oil & Gas', definition: 'Integrated oil companies engaged in the exploration and production of oil and gas, as well as at least one other significant activity in either refining, marketing and transportation, or chemicals.' };
const subIndustry10102020: GicsLevel = { value: 10102020, rank: GicsRank.SubIndustry, name: 'Oil & Gas Exploration & Production', definition: 'Companies engaged in the exploration and production of oil and gas not classified elsewhere.' };
const subIndustry10102030: GicsLevel = { value: 10102030, rank: GicsRank.SubIndustry, name: 'Oil & Gas Refining & Marketing', definition: 'Companies engaged in the refining and marketing of oil, gas and/or refined products not classified in the Integrated Oil & Gas or Independent Power Producers & EnergyTraders sub-industries.' };
const subIndustry10102040: GicsLevel = { value: 10102040, rank: GicsRank.SubIndustry, name: 'Oil & Gas Storage & Transportation', definition: 'Companies engaged in the storage and/or transportation of oil, gas and/or refined products. Includes diversified midstream natural gas companies facing competitive markets, oil and refined product pipelines, coal slurry pipelines and oil & gas shipping companies.' };
const subIndustry10102050: GicsLevel = { value: 10102050, rank: GicsRank.SubIndustry, name: 'Coal & Consumable Fuels', definition: 'Companies primarily involved in the production and mining of coal, related products and other consumable fuels related to the generation of energy. Excludes companies primarily producing gases classified in the Industrial Gases sub-industry.' };
const subIndustry15101010: GicsLevel = { value: 15101010, rank: GicsRank.SubIndustry, name: 'Commodity Chemicals', definition: 'Companies that primarily produce industrial chemicals and basic chemicals. Including but not limited to plastics, synthetic fibers, films, commodity-based paints and pigments, explosives and petrochemicals. Excludes chemical companies classified in the Diversified Chemicals, Fertilizers & Agricultural Chemicals, Industrial Gases, or Specialty Chemicals sub-industries.' };
const subIndustry15101020: GicsLevel = { value: 15101020, rank: GicsRank.SubIndustry, name: 'Diversified Chemicals', definition: 'Manufacturers of a diversified range of chemical products not classified in the Industrial Gases, Commodity Chemicals, Specialty Chemicals or Fertilizers & Agricultural Chemicals sub-industries.' };
const subIndustry15101030: GicsLevel = { value: 15101030, rank: GicsRank.SubIndustry, name: 'Fertilizers & Agricultural Chemicals', definition: 'Producers of fertilizers, pesticides, potash or other agriculture-related chemicals not classified elsewhere.' };
const subIndustry15101040: GicsLevel = { value: 15101040, rank: GicsRank.SubIndustry, name: 'Industrial Gases', definition: 'Manufacturersofindustrial gases.' };
const subIndustry15101050: GicsLevel = { value: 15101050, rank: GicsRank.SubIndustry, name: 'Specialty Chemicals', definition: 'Companies that primarily produce high value-added chemicals used in the manufacture of a wide variety of products, including but not limited to fine chemicals, additives, advanced polymers, adhesives, sealants and specialty paints, pigments and coatings.' };
const subIndustry15102010: GicsLevel = { value: 15102010, rank: GicsRank.SubIndustry, name: 'Construction Materials', definition: 'Manufacturers of construction materials including sand, clay, gypsum, lime, aggregates, cement, concreteand bricks. Other finished or semi-finished building materials are classified in the Building Products sub-industry.' };
const subIndustry15103010: GicsLevel = { value: 15103010, rank: GicsRank.SubIndustry, name: 'Metal & Glass Containers', definition: 'Manufacturers of metal, glass or plastic containers. Includes cork sand caps.' };
const subIndustry15103020: GicsLevel = { value: 15103020, rank: GicsRank.SubIndustry, name: 'Paper Packaging', definition: 'Manufacturers of paper and cardboard containers and packaging.' };
const subIndustry15104010: GicsLevel = { value: 15104010, rank: GicsRank.SubIndustry, name: 'Aluminum', definition: 'Producers of aluminum and related products, including companies that mine or process bauxite and companies that recycle aluminum to produce finished or semi-finished products. Excludes companies that primarily produce aluminum building materials classified in the Building Products sub-industry.' };
const subIndustry15104020: GicsLevel = { value: 15104020, rank: GicsRank.SubIndustry, name: 'Diversified Metals & Mining', definition: 'Companies engaged in the diversified production or extraction of metals and minerals not classified elsewhere. Including, but not limited to, nonferrous metal mining (except bauxite) salt and boratemining, phosphaterock mining, and diversified mining operations. Excludes iron oremining, classified in the Steel sub-industry, bauxitemining, classified in the Aluminum sub-industry, and coal mining, classified in either the Steel or Coal & ConsumableFuels sub-industries.' };
const subIndustry15104025: GicsLevel = { value: 15104025, rank: GicsRank.SubIndustry, name: 'Copper', definition: 'Companies involved primarily in copper oremining.' };
const subIndustry15104030: GicsLevel = { value: 15104030, rank: GicsRank.SubIndustry, name: 'Gold', definition: 'Producers of gold and related products, including companies that mine or process gold and the South African finance houses which primarily invest in, but do not operate, goldmines.' };
const subIndustry15104040: GicsLevel = { value: 15104040, rank: GicsRank.SubIndustry, name: 'Precious Metals & Minerals', definition: 'Companies mining precious metals and minerals not classified in the Gold sub-industry. Includes companies primarily mining platinum.' };
const subIndustry15104045: GicsLevel = { value: 15104045, rank: GicsRank.SubIndustry, name: 'Silver', definition: 'Companies primarily mining silver. Excludes companies classified in the Gold or Precious Metals and Minerals sub-industries.' };
const subIndustry15104050: GicsLevel = { value: 15104050, rank: GicsRank.SubIndustry, name: 'Steel', definition: 'Producers of iron and steel and related products, including metallurgical (coking) coal mining used for steel production.' };
const subIndustry15105010: GicsLevel = { value: 15105010, rank: GicsRank.SubIndustry, name: 'Forest Products', definition: 'Manufacturers of timber and related wood products. Includes lumber for the building industry.' };
const subIndustry15105020: GicsLevel = { value: 15105020, rank: GicsRank.SubIndustry, name: 'Paper Products', definition: 'Manufacturers of all grades of paper. Excludes companies specializing in paper packaging classified in the Paper Packaging sub-industry.' };
const subIndustry20101010: GicsLevel = { value: 20101010, rank: GicsRank.SubIndustry, name: 'Aerospace & Defense', definition: 'Manufacturers of civil or military aerospace and defense equipment, parts or products. Includes defense electronics and space equipment.' };
const subIndustry20102010: GicsLevel = { value: 20102010, rank: GicsRank.SubIndustry, name: 'Building Products', definition: 'Manufacturers of building components and home improvement products and equipment. Excludes lumber and plywood classified under Forest Productsand cement and other materials classified in the Construction Materials sub-industry.' };
const subIndustry20103010: GicsLevel = { value: 20103010, rank: GicsRank.SubIndustry, name: 'Construction & Engineering', definition: 'Companies engaged in primarily non-residential construction. Includes civil engineering companies and large-scale contractors. Excludes companies classified in the Homebuilding sub-industry.' };
const subIndustry20104010: GicsLevel = { value: 20104010, rank: GicsRank.SubIndustry, name: 'Electrical Components & Equipment', definition: 'Companies that produce electric cables and wires, electrical components or equipment not classified in the Heavy Electrical Equipment sub-industry.' };
const subIndustry20104020: GicsLevel = { value: 20104020, rank: GicsRank.SubIndustry, name: 'Heavy Electrical Equipment', definition: 'Manufacturers of power-generating equipment and other heavy electrical equipment, including power turbines, heavy electrical machinery intended for fixed-use and large electrical systems. Excludes cables and wires, classified in the Electrical Components & Equipment sub-industry.' };
const subIndustry20105010: GicsLevel = { value: 20105010, rank: GicsRank.SubIndustry, name: 'Industrial Conglomerates', definition: 'Diversified industrial companies with business activities in three or more sectors, none of which contribute a majority of revenues. Stakes held are predominantly of a controlling nature, and stakeholders maintain an operational interest in the running of the subsidiaries.' };
const subIndustry20106010: GicsLevel = { value: 20106010, rank: GicsRank.SubIndustry, name: 'Construction Machinery & Heavy Trucks', definition: 'Manufacturers of heavy duty trucks, rolling machinery, earth-moving and construction equipment, and manufacturers of related parts. Includes non-military ship building.' };
const subIndustry20106015: GicsLevel = { value: 20106015, rank: GicsRank.SubIndustry, name: 'Agricultural & Farm Machinery', definition: 'Companies manufacturing agricultural machinery, farm machinery, and their related parts. Includes machinery used for the production of crops and agricultural live stock, agricultural tractors, planting and fertilizing machinery, fertilizer and chemical application equipment, and grain dryers and blowers.' };
const subIndustry20106020: GicsLevel = { value: 20106020, rank: GicsRank.SubIndustry, name: 'Industrial Machinery', definition: 'Manufacturers of industrial machinery and industrial components. Includes companies that manufacture presses, machine tools, compressors, pollution control equipment, elevators, escalators, insulators, pumps, roller bearings and other metal fabrications.' };
const subIndustry20107010: GicsLevel = { value: 20107010, rank: GicsRank.SubIndustry, name: 'Trading Companies & Distributors', definition: 'Trading companies and other distributors of industrial equipment and products.' };
const subIndustry20201010: GicsLevel = { value: 20201010, rank: GicsRank.SubIndustry, name: 'Commercial Printing', definition: 'Companies providing commercial printing services. Includes printers primarily serving the media industry.' };
const subIndustry20201050: GicsLevel = { value: 20201050, rank: GicsRank.SubIndustry, name: 'Environmental & Facilities Services', definition: 'Companies providing environmental and facilities maintenance services. Includes waste management, facilities management and pollution control services. Excludes large-scale water treatment systems classified in the Water Utilities sub-industry.' };
const subIndustry20201060: GicsLevel = { value: 20201060, rank: GicsRank.SubIndustry, name: 'Office Services & Supplies', definition: 'Providers of office services and manufacturers of office supplies and equipment not classified elsewhere.' };
const subIndustry20201070: GicsLevel = { value: 20201070, rank: GicsRank.SubIndustry, name: 'Diversified Support Services', definition: 'Companies primarily providing labor oriented support services to businesses and governments. Includes commercial cleaning services, dining & catering services, equipment repair services, industrial maintenance services, industrial auctioneers, storage & warehousing, transaction services, uniformrental services, and other business support services.' };
const subIndustry20201080: GicsLevel = { value: 20201080, rank: GicsRank.SubIndustry, name: 'Security & Alarm Services', definition: 'Companies providing security and protection services to business and governments. Includes companies providing services such as correctional facilities, security & alarm services, armored transportation & guarding. Excludes companies providing security software classified under the Systems Software sub-industry and home security services classified under the Specialized Consumer Services sub-industry. Also excludes companies manufacturing security system equipment classified under the Electronic Equipment & Instruments sub-industry.' };
const subIndustry20202010: GicsLevel = { value: 20202010, rank: GicsRank.SubIndustry, name: 'Human Resource & Employment Services', definition: 'Companies providing business support services relating to human capital management. Includes employment agencies, employee training, payroll & benefit support services, retirement support services and temporary agencies.' };
const subIndustry20202020: GicsLevel = { value: 20202020, rank: GicsRank.SubIndustry, name: 'Research & Consulting Services', definition: 'Companies primarily providing research and consulting services to businesses and governments not classified elsewhere. Includes companies involved in management consulting services, architectural design, business information or scientific research, marketing,and testing & certification services. Excludes companies providing information technology consulting services classified in the IT Consulting & Other Services sub-industry.' };
const subIndustry20301010: GicsLevel = { value: 20301010, rank: GicsRank.SubIndustry, name: 'Air Freight & Logistics', definition: 'Companies providing air freight transportation, courier and logistics services, including package and mail delivery and customs agents. Excludes those companies classified in the Airlines, Marine or Trucking sub-industries.' };
const subIndustry20302010: GicsLevel = { value: 20302010, rank: GicsRank.SubIndustry, name: 'Airlines', definition: 'Companies providing primarily passenger air transportation.' };
const subIndustry20303010: GicsLevel = { value: 20303010, rank: GicsRank.SubIndustry, name: 'Marine', definition: 'Companies providing goods or passenger maritime transportation. Excludes cruise ships classified in the Hotels, Resorts & Cruise Lines sub-industry.' };
const subIndustry20304010: GicsLevel = { value: 20304010, rank: GicsRank.SubIndustry, name: 'Railroads', definition: 'Companies providing primarily goods and passenger rail transportation.' };
const subIndustry20304020: GicsLevel = { value: 20304020, rank: GicsRank.SubIndustry, name: 'Trucking', definition: 'Companies providing primarily goods and passenger land transportation. Includes vehicle rental and taxi companies.' };
const subIndustry20305010: GicsLevel = { value: 20305010, rank: GicsRank.SubIndustry, name: 'Airport Services', definition: 'Operators of airports and companies providing related services.' };
const subIndustry20305020: GicsLevel = { value: 20305020, rank: GicsRank.SubIndustry, name: 'Highways & Railtracks', definition: 'Owners and operators of roads, tunnels and rail tracks.' };
const subIndustry20305030: GicsLevel = { value: 20305030, rank: GicsRank.SubIndustry, name: 'Marine Ports & Services', definition: 'Owners and operators of marine ports and related services.' };
const subIndustry25101010: GicsLevel = { value: 25101010, rank: GicsRank.SubIndustry, name: 'Auto Parts & Equipment', definition: 'Manufacturers of parts and accessories for automobiles and motorcycles. Excludes companies classified in the Tires & Rubber sub-industry.' };
const subIndustry25101020: GicsLevel = { value: 25101020, rank: GicsRank.SubIndustry, name: 'Tires & Rubber', definition: 'Manufacturers of tires and rubber.' };
const subIndustry25102010: GicsLevel = { value: 25102010, rank: GicsRank.SubIndustry, name: 'Automobile Manufacturers', definition: 'Companies that produce mainly passenger automobiles and light trucks. Excludes companies producing mainly motorcycles and three-wheelers classified in the Motorcycle Manufacturers sub-industry and heavy duty trucks classified in the Construction & Farm Machinery & Heavy Trucks sub-industry.' };
const subIndustry25102020: GicsLevel = { value: 25102020, rank: GicsRank.SubIndustry, name: 'Motorcycle Manufacturers', definition: 'Companies that produce motorcycles, scooters or three-wheelers. Excludes bicycles classified in the Leisure Products sub-industry.' };
const subIndustry25201010: GicsLevel = { value: 25201010, rank: GicsRank.SubIndustry, name: 'Consumer Electronics', definition: 'Manufacturers of consumer electronics products including TVs, home audio equipment, game consoles, digital cameras, and related products. Excludes personal home computer manufacturers classified in the Technology Hardware, Storage & Peripherals sub-industry, and electric household appliances classified in the Household Appliances sub-industry.' };
const subIndustry25201020: GicsLevel = { value: 25201020, rank: GicsRank.SubIndustry, name: 'Home Furnishings', definition: 'Manufacturers of soft home furnishings or furniture, including upholstery, carpets and wall-coverings.' };
const subIndustry25201030: GicsLevel = { value: 25201030, rank: GicsRank.SubIndustry, name: 'Homebuilding', definition: 'Residential construction companies. Includes manufacturers of prefabricated houses and semi-fixed manufactured homes.' };
const subIndustry25201040: GicsLevel = { value: 25201040, rank: GicsRank.SubIndustry, name: 'Household Appliances', definition: 'Manufacturers of electric household appliances and related products. Includes manufacturersofpower and hand tools, including garden improvement tools. Excludes TVs and other audio and video products classified in the Consumer Electronics sub-industry and personal computers classified in the Computer Hardware sub-industry.' };
const subIndustry25201050: GicsLevel = { value: 25201050, rank: GicsRank.SubIndustry, name: 'Housewares & Specialties', definition: 'Manufacturers of durable household products, including cutlery, cookware, glassware, crystal, silverware, utensils, kitchenwareand consumer specialties not classified elsewhere.' };
const subIndustry25202010: GicsLevel = { value: 25202010, rank: GicsRank.SubIndustry, name: 'Leisure Products', definition: 'Manufacturers of leisure products and equipment including sports equipment, bicycles and toys.' };
const subIndustry25203010: GicsLevel = { value: 25203010, rank: GicsRank.SubIndustry, name: 'Apparel, Accessories & Luxury Goods', definition: 'Manufacturers of apparel, accessories and luxury goods. Includes companies primarily producing designer handbags, wallets, luggage, jewelry and watches. Excludes shoes classified in the Footwear sub-industry.' };
const subIndustry25203020: GicsLevel = { value: 25203020, rank: GicsRank.SubIndustry, name: 'Footwear', definition: 'Manufacturers of footwear. Includes sport and leather shoes.' };
const subIndustry25203030: GicsLevel = { value: 25203030, rank: GicsRank.SubIndustry, name: 'Textiles', definition: 'Manufacturers of textile and related products not classified in the Apparel, Accessories & Luxury Goods, Footwear or Home Furnishings sub-industries.' };
const subIndustry25301010: GicsLevel = { value: 25301010, rank: GicsRank.SubIndustry, name: 'Casinos & Gaming', definition: 'Owners and operators of casinos and gaming facilities. Includes companies providing lottery and betting services.' };
const subIndustry25301020: GicsLevel = { value: 25301020, rank: GicsRank.SubIndustry, name: 'Hotels, Resorts & Cruise Lines', definition: 'Owners and operators of hotels, resorts and cruise ships. Includes travel agencies, tour operators and related services not classified elsewhere. Excludes casino-hotels classified in the Casinos & Gaming sub-industry.' };
const subIndustry25301030: GicsLevel = { value: 25301030, rank: GicsRank.SubIndustry, name: 'Leisure Facilities', definition: 'Owners and operators of leisure facilities, including sport and fitness centers, stadiums, golf courses and amusement parks not classified in the Movies & Entertainment sub-industry.' };
const subIndustry25301040: GicsLevel = { value: 25301040, rank: GicsRank.SubIndustry, name: 'Restaurants', definition: 'Owners and operators of restaurants, bars, pubs, fast-food or take-out facilities. Includes companies that provide food catering services.' };
const subIndustry25302010: GicsLevel = { value: 25302010, rank: GicsRank.SubIndustry, name: 'Education Services', definition: 'Companies providing education services, either online or through conventional teaching methods. Includes private universities, correspondence teaching, providers of educational seminars, educational materials and technical education. Excludes companies providing employee education programs classified in the Human Resources & Employment Services sub-industry.' };
const subIndustry25302020: GicsLevel = { value: 25302020, rank: GicsRank.SubIndustry, name: 'Specialized Consumer Services', definition: 'Companies providing consumer services not classified elsewhere. Includes residential services, home security, legal services, personal services, renovation & interior design services, consumer auctions and wedding & funeral services.' };
const subIndustry25501010: GicsLevel = { value: 25501010, rank: GicsRank.SubIndustry, name: 'Distributors', definition: 'Distributors and wholesalers of general merchandise not classified elsewhere. Includes vehicle distributors.' };
const subIndustry25502020: GicsLevel = { value: 25502020, rank: GicsRank.SubIndustry, name: 'Internet & Direct Marketing Retail', definition: 'Companies providing retail services primarily on the internet, through mail order, and TV home shopping retailers. Also includes companies providing online marketplaces for consumer products and services. ' };
const subIndustry25503010: GicsLevel = { value: 25503010, rank: GicsRank.SubIndustry, name: 'Department Stores', definition: 'Owners and operators of department stores.' };
const subIndustry25503020: GicsLevel = { value: 25503020, rank: GicsRank.SubIndustry, name: 'General Merchandise Stores', definition: 'Owners and operators of stores offering diversified general merchandise. Excludes hypermarkets and large-scale super centers classified in the Hypermarkets & Super Centers sub-industry.' };
const subIndustry25504010: GicsLevel = { value: 25504010, rank: GicsRank.SubIndustry, name: 'Apparel Retail', definition: 'Retailers specialized mainly in apparel and accessories.' };
const subIndustry25504020: GicsLevel = { value: 25504020, rank: GicsRank.SubIndustry, name: 'Computer & Electronics Retail', definition: 'Owners and operators of consumer electronics, computers, video and related products retail stores.' };
const subIndustry25504030: GicsLevel = { value: 25504030, rank: GicsRank.SubIndustry, name: 'Home Improvement Retail', definition: 'Owners and operators of home and garden improvement retail stores. Includes stores offering building materials and supplies.' };
const subIndustry25504040: GicsLevel = { value: 25504040, rank: GicsRank.SubIndustry, name: 'Specialty Stores', definition: 'Owners and operators of specialty retail stores not classified elsewhere. Includes jewelry stores, toy stores, office supply stores, health & vision care stores and book & entertainment stores.' };
const subIndustry25504050: GicsLevel = { value: 25504050, rank: GicsRank.SubIndustry, name: 'Automotive Retail', definition: 'Owners and operators of stores specializing in automotive retail. Includes auto dealers, gas stations, and retailers of auto accessories, motorcycles & parts, automotive glass and automotive equipment & parts.' };
const subIndustry25504060: GicsLevel = { value: 25504060, rank: GicsRank.SubIndustry, name: 'Homefurnishing Retail', definition: 'Owners and operators of furniture and home furnishings retail stores. Includes residential furniture, home furnishings, housewares, and interior design. Excludes home and garden improvement stores, classified in the Home Improvement Retail sub-industry.' };
const subIndustry30101010: GicsLevel = { value: 30101010, rank: GicsRank.SubIndustry, name: 'Drug Retail', definition: 'Owners and operators of primarily drug retail stores and pharmacies.' };
const subIndustry30101020: GicsLevel = { value: 30101020, rank: GicsRank.SubIndustry, name: 'Food Distributors', definition: 'Distributors of food products to other companies and not directly to the consumer.' };
const subIndustry30101030: GicsLevel = { value: 30101030, rank: GicsRank.SubIndustry, name: 'Food Retail', definition: 'Owners and operators of primarily food retail stores.' };
const subIndustry30101040: GicsLevel = { value: 30101040, rank: GicsRank.SubIndustry, name: 'Hypermarkets & Super Centers', definition: 'Owners and operators of hypermarkets and super centers selling food and a wide-range of consumer staple products. Excludes Food and Drug Retailers classified in the Food Retail and Drug Retail sub-industries, respectively.' };
const subIndustry30201010: GicsLevel = { value: 30201010, rank: GicsRank.SubIndustry, name: 'Brewers', definition: 'Producers of beer and malt liquors. Includes breweries not classified in the Restaurants sub-industry.' };
const subIndustry30201020: GicsLevel = { value: 30201020, rank: GicsRank.SubIndustry, name: 'Distillers & Vintners', definition: 'Distillers, vintners and producers of alcoholic beverages not classified in the Brewers sub-industry.' };
const subIndustry30201030: GicsLevel = { value: 30201030, rank: GicsRank.SubIndustry, name: 'Soft Drinks', definition: 'Producers of non-alcoholic beverages including mineral waters. Excludes producers of milk classified in the Packaged Foods sub-industry.' };
const subIndustry30202010: GicsLevel = { value: 30202010, rank: GicsRank.SubIndustry, name: 'Agricultural Products', definition: 'Producers of agricultural products. Includes crop growers, owners of plantations and companies that produce and process foods but do not packageand market them. Excludes companies classified in the Forest Products sub-industry and those that packageand market the food productsclassified in the Packaged Foods & Meats sub-industry.' };
const subIndustry30202030: GicsLevel = { value: 30202030, rank: GicsRank.SubIndustry, name: 'Packaged Foods & Meats', definition: 'Producers of packaged foods including dairy products, fruit juices, meats, poultry, fish and pet foods.' };
const subIndustry30203010: GicsLevel = { value: 30203010, rank: GicsRank.SubIndustry, name: 'Tobacco', definition: 'Manufacturers of cigarettes and other tobacco products.' };
const subIndustry30301010: GicsLevel = { value: 30301010, rank: GicsRank.SubIndustry, name: 'Household Products', definition: 'Producers of non-durable household products, including detergents, soaps, diapers and other tissue and household paper products not classified in the Paper Products sub-industry.' };
const subIndustry30302010: GicsLevel = { value: 30302010, rank: GicsRank.SubIndustry, name: 'Personal Products', definition: 'Manufacturers of personal and beauty care products, including cosmetics and perfumes.' };
const subIndustry35101010: GicsLevel = { value: 35101010, rank: GicsRank.SubIndustry, name: 'Health Care Equipment', definition: 'Manufacturers of health care equipment and devices. Includes medical instruments, drug delivery systems, cardiovascular & orthopedic devices, and diagnostic equipment.' };
const subIndustry35101020: GicsLevel = { value: 35101020, rank: GicsRank.SubIndustry, name: 'Health Care Supplies', definition: 'Manufacturers of health care supplies and medical products not classified elsewhere. Includes eyecare products, hospital supplies, and safety needle & syringe devices.' };
const subIndustry35102010: GicsLevel = { value: 35102010, rank: GicsRank.SubIndustry, name: 'Health Care Distributors', definition: 'Distributors and wholesalers of health care products not classified elsewhere.' };
const subIndustry35102015: GicsLevel = { value: 35102015, rank: GicsRank.SubIndustry, name: 'Health Care Services', definition: 'Providers of patient health care services not classified elsewhere. Includes dialysis centers, lab testing services, and pharmacy management services. Also includes companies providing business support services to health care providers, such as clerical support services, collection agency services, staffing services and outsourced sales & marketing services.' };
const subIndustry35102020: GicsLevel = { value: 35102020, rank: GicsRank.SubIndustry, name: 'Health Care Facilities', definition: 'Owners and operators of health care facilities, including hospitals, nursing homes, rehabilitation and retirement centers and animal hospitals.' };
const subIndustry35102030: GicsLevel = { value: 35102030, rank: GicsRank.SubIndustry, name: 'Managed Health Care', definition: 'Owners and operators of Health Maintenance Organizations (HMOs) and other managed plans.' };
const subIndustry35103010: GicsLevel = { value: 35103010, rank: GicsRank.SubIndustry, name: 'Health Care Technology', definition: 'Companies providing information technology services primarily to health care providers. Includes companies providing application, systems and/or data processing software, internet-based tools, and IT consulting services to doctors, hospitals or businesses operating primarily in the Health Care sector.' };
const subIndustry35201010: GicsLevel = { value: 35201010, rank: GicsRank.SubIndustry, name: 'Biotechnology', definition: 'Companies primarily engaged in the research, development, manufacturing and/or marketing of products based on genetic analysis and genetic engineering. Includes companies specializing in protein-based therapeutics to treat human diseases. Excludes companies manufacturing products using biotechnology but without a health care application.' };
const subIndustry35202010: GicsLevel = { value: 35202010, rank: GicsRank.SubIndustry, name: 'Pharmaceuticals', definition: 'Companies engaged in the research, development or production of pharmaceuticals. Includes veterinary drugs.' };
const subIndustry35203010: GicsLevel = { value: 35203010, rank: GicsRank.SubIndustry, name: 'Life Sciences Tools & Services', definition: 'Companies enabling the drug discovery, development and production continuum by providing analytical tools, instruments, consumables & supplies, clinical trial services and contract research services. Includes firms primarily servicing the pharmaceutical and biotechnology industries.' };
const subIndustry40101010: GicsLevel = { value: 40101010, rank: GicsRank.SubIndustry, name: 'Diversified Banks', definition: 'Large, geographically diverse banks with a national footprint whose revenues are derived primarily from conventional banking operations, have significant business activity in retail banking and small and medium corporate lending, and provide a diverse range of financial services. Excludes banks classified in the Regional Banks and Thrifts & Mortgage Finance sub-industries. Also excludes investment banks classified in the Investment Banking & Brokerage sub-industry.' };
const subIndustry40101015: GicsLevel = { value: 40101015, rank: GicsRank.SubIndustry, name: 'Regional Banks', definition: 'Commercial banks whose businesses are derived primarily from conventional banking operations and have significant business activity in retail banking and small and medium corporate lending. Regional banks tend to operate in limited geographic regions. Excludes companies in the Diversified Banks and Thrifts &Mortgage Banks sub-industries. Also excludes investment banks classified in the Investment Banking & Brokerage sub-industry.' };
const subIndustry40102010: GicsLevel = { value: 40102010, rank: GicsRank.SubIndustry, name: 'Thrifts & Mortgage Finance', definition: 'Financial institutions providing mortgage and mortgage related services. These include financial institutions whose assets are primarily mortgage related, savings & loans, mortgage lending institutions, building societies and companies providing insurance to mortgage banks.' };
const subIndustry40201020: GicsLevel = { value: 40201020, rank: GicsRank.SubIndustry, name: 'Other Diversified Financial Services', definition: 'Providers of a diverse range of financial services and/or with some interest in a wide range of financial services including banking, insurance and capital markets, but with no dominant business line. Excludes companies classified in the Regional Banks and Diversified Banks sub-industries.' };
const subIndustry40201030: GicsLevel = { value: 40201030, rank: GicsRank.SubIndustry, name: 'Multi-Sector Holdings', definition: 'A company with significantly diversified holdings across three or more sectors, none of which contribute a majority of profit and/or sales. Stakes held are predominantly of a non-controlling nature. Includes diversified financial companies where stakes held are of a controlling nature. Excludes other diversified companies classified in the Industrials Conglomerates sub-industry.' };
const subIndustry40201040: GicsLevel = { value: 40201040, rank: GicsRank.SubIndustry, name: 'Specialized Finance', definition: 'Providers of specialized financial services not classified elsewhere. Companies in this sub-industry derive a majority of revenue from one specialized line of business. Includes, but not limited to, commercial financing companies, central banks, leasing institutions, factoring services, and specialty boutiques. Excludes companies classified in the Financial Exchanges & Data sub-industry.' };
const subIndustry40202010: GicsLevel = { value: 40202010, rank: GicsRank.SubIndustry, name: 'Consumer Finance', definition: 'Providers of consumer finance services, including personal credit, credit cards, lease financing, travel-related money services and pawn shops. Excludes mortgage lenders classified in the Thrifts & Mortgage Finance sub-industry.' };
const subIndustry40203010: GicsLevel = { value: 40203010, rank: GicsRank.SubIndustry, name: 'Asset Management & Custody Banks', definition: 'Financial institutions primarily engaged in investment management and/or related custody and securities fee-based services. Includes companies operating mutual funds, closed-end funds and unit investment trusts. Excludes banks and other financial institutions primarily involved in commercial lending, investment banking, brokerageand other specialized financial activities.' };
const subIndustry40203020: GicsLevel = { value: 40203020, rank: GicsRank.SubIndustry, name: 'Investment Banking & Brokerage', definition: 'Financial institutions primarily engaged in investment banking and brokerage services, including equity and debt underwriting, mergers and acquisitions, securities lending and advisory services. Excludes banks and other financial institutions primarily involved in commercial lending, asset management and specialized financial activities.' };
const subIndustry40203030: GicsLevel = { value: 40203030, rank: GicsRank.SubIndustry, name: 'Diversified Capital Markets', definition: 'Financial institutions primarily engaged in diversified capital markets activities, including a significant presence in at least two of the following areas: large/major corporate lending, investment banking, brokerage and asset management. Excludes less diversified companies classified in the Asset Management & Custody Banks or Investment Banking & Brokerage sub-industries. Also excludes companies classified in the Banks or Insurance industry groups or the Consumer Finance sub-industry.' };
const subIndustry40203040: GicsLevel = { value: 40203040, rank: GicsRank.SubIndustry, name: 'Financial Exchanges & Data', definition: 'Financial exchanges for securities, commodities, derivatives and other financial instruments, and providers of financial decision support tools and products including ratings agencies.' };
const subIndustry40204010: GicsLevel = { value: 40204010, rank: GicsRank.SubIndustry, name: 'Mortgage REITs', definition: 'Companies or Trusts that service, originate, purchase and/or securitize residential and/or commercial mortgage loans. Includes trusts that invest in mortgage-backed securities and other mortgage related assets.' };
const subIndustry40301010: GicsLevel = { value: 40301010, rank: GicsRank.SubIndustry, name: 'Insurance Brokers', definition: 'Insurance and reinsurance brokerage firms.' };
const subIndustry40301020: GicsLevel = { value: 40301020, rank: GicsRank.SubIndustry, name: 'Life & Health Insurance', definition: 'Companies providing primarily life, disability, indemnity or supplemental health insurance. Excludes managed care companies classified in the Managed Health Care sub-industry.' };
const subIndustry40301030: GicsLevel = { value: 40301030, rank: GicsRank.SubIndustry, name: 'Multi-line Insurance', definition: 'Insurance companies with diversified interests in life, health and property and casualty insurance.' };
const subIndustry40301040: GicsLevel = { value: 40301040, rank: GicsRank.SubIndustry, name: 'Property & Casualty Insurance', definition: 'Companies providing primarily property and casualty insurance.' };
const subIndustry40301050: GicsLevel = { value: 40301050, rank: GicsRank.SubIndustry, name: 'Reinsurance', definition: 'Companies providing primarily reinsurance.' };
const subIndustry45102010: GicsLevel = { value: 45102010, rank: GicsRank.SubIndustry, name: 'IT Consulting & Other Services', definition: 'Providers of information technology and systems integration services not classified in the Data Processing & Outsourced Services or Internet Software & Services sub-industries. Includes information technology consulting and information management services.' };
const subIndustry45102020: GicsLevel = { value: 45102020, rank: GicsRank.SubIndustry, name: 'Data Processing & Outsourced Services', definition: 'Providers of commercial electronic data processing and/or business process outsourcing services. Includes companies that provide services for back-office automation.' };
const subIndustry45102030: GicsLevel = { value: 45102030, rank: GicsRank.SubIndustry, name: 'Internet Services & Infrastructure', definition: 'Companies providing services and infrastructure for the internet industry including data centers and cloud networking and storage infrastructure. Also includes companies providing web hosting services. Excludes companies classified in the Software Industry.' };
const subIndustry45103010: GicsLevel = { value: 45103010, rank: GicsRank.SubIndustry, name: 'Application Software', definition: 'Companies engaged in developing and producing software designed for specialized applications for the business or consumer market. Includes enterprise and technical software, as well as cloud-based software. Excludes companies classified in the Interactive Home Entertainment sub-industry. Also excludes companies producing systems or database management software classified in the Systems Software sub-industry.' };
const subIndustry45103020: GicsLevel = { value: 45103020, rank: GicsRank.SubIndustry, name: 'Systems Software', definition: 'Companies engaged in developing and producing systems and database management software.' };
const subIndustry45201020: GicsLevel = { value: 45201020, rank: GicsRank.SubIndustry, name: 'Communications Equipment', definition: 'Manufacturers of communication equipment and products, including LANs, WANs, routers, telephones, switchboards and exchanges. Excludes cellular phone manufacturers classified in the Technology Hardware, Storage & Peripherals sub-industry.' };
const subIndustry45202030: GicsLevel = { value: 45202030, rank: GicsRank.SubIndustry, name: 'Technology Hardware, Storage & Peripherals', definition: 'Manufacturers of cellular phones, personal computers, servers, electronic computer components and peripherals. Includes data storage components, motherboards, audio and video cards, monitors, keyboards, printers, and other peripherals. Excludes semiconductor sclassified in the Semiconductors sub-industry.' };
const subIndustry45203010: GicsLevel = { value: 45203010, rank: GicsRank.SubIndustry, name: 'Electronic Equipment & Instruments', definition: 'Manufacturers of electronic equipment and instruments including analytical, electronic test and measurement instruments.' };
const subIndustry45203015: GicsLevel = { value: 45203015, rank: GicsRank.SubIndustry, name: 'Electronic Components', definition: 'Manufacturers of electronic components. Includes electronic components, connection devices, electron tubes, electronic capacitors and resistors, electronic coil, printed circuit board, transformer and other inductors, signal processing technology/components and other electronic equipment not classified elsewhere.' };
const subIndustry45203020: GicsLevel = { value: 45203020, rank: GicsRank.SubIndustry, name: 'Electronic Manufacturing Services', definition: 'Producers of electronic equipment mainly for the OEM (Original Equipment Manufacturers) markets.' };
const subIndustry45203030: GicsLevel = { value: 45203030, rank: GicsRank.SubIndustry, name: 'Technology Distributors', definition: 'Distributors of technology hardware and equipment. Includes distributors of communications equipment, computers & peripherals, semiconductors, and electronic equipment and components.' };
const subIndustry45301010: GicsLevel = { value: 45301010, rank: GicsRank.SubIndustry, name: 'Semiconductor Equipment', definition: 'Manufacturers of semiconductor equipment.' };
const subIndustry45301020: GicsLevel = { value: 45301020, rank: GicsRank.SubIndustry, name: 'Semiconductors', definition: 'Manufacturers of semiconductors and related products.' };
const subIndustry50101010: GicsLevel = { value: 50101010, rank: GicsRank.SubIndustry, name: 'Alternative Carriers', definition: 'Providers of communications and high-density data transmission services primarily through a high bandwidth/fiber-optic cablenetwork.' };
const subIndustry50101020: GicsLevel = { value: 50101020, rank: GicsRank.SubIndustry, name: 'Integrated Telecommunication Services', definition: 'Operators of primarily fixed-line telecommunications networksand companies providing both wireless and fixed-line telecommunications services not classified elsewhere. Also includes internet service providers offering internet access to end users.' };
const subIndustry50102010: GicsLevel = { value: 50102010, rank: GicsRank.SubIndustry, name: 'Wireless Telecommunication Services', definition: 'Providers of primarily cellular or wireless telecommunication services.' };
const subIndustry50201010: GicsLevel = { value: 50201010, rank: GicsRank.SubIndustry, name: 'Advertising', definition: 'Companies providing advertising, marketing or public relations services.' };
const subIndustry50201020: GicsLevel = { value: 50201020, rank: GicsRank.SubIndustry, name: 'Broadcasting', definition: 'Owners and operators of television or radio broadcasting systems, including programming. Includes radio and television broadcasting, radio networks, and radio stations.' };
const subIndustry50201030: GicsLevel = { value: 50201030, rank: GicsRank.SubIndustry, name: 'Cable & Satellite', definition: 'Providers of cable or satellite television services. Includes cable networks and program distribution.' };
const subIndustry50201040: GicsLevel = { value: 50201040, rank: GicsRank.SubIndustry, name: 'Publishing', definition: 'Publishers of newspapers, magazines and books in print or electronic formats.' };
const subIndustry50202010: GicsLevel = { value: 50202010, rank: GicsRank.SubIndustry, name: 'Movies & Entertainment', definition: 'Companies that engage in producing and selling entertainment products and services, including companies engaged in the production, distribution and screening of movies and television shows, producers and distributors of music, entertainment theaters and sports teams. Also includes companies offering and/or producing entertainment content streamed online.' };
const subIndustry50202020: GicsLevel = { value: 50202020, rank: GicsRank.SubIndustry, name: 'Interactive Home Entertainment', definition: 'Producers of interactive gaming products, including mobile gaming applications. Also includes educational software used primarily in the home. Excludes online gambling companies classified in the Casinos & Gaming sub-industry.' };
const subIndustry50203010: GicsLevel = { value: 50203010, rank: GicsRank.SubIndustry, name: 'Interactive Media & Services', definition: 'Companies engaging in content and information creation or distribution through proprietary platforms, where revenues are derived primarily through pay-per-click advertisements. Includes search engines, social media and networking platforms, online classifieds, and online review companies. Excludes companies operating online marketplaces classified in Internet & Direct Marketing Retail.' };
const subIndustry55101010: GicsLevel = { value: 55101010, rank: GicsRank.SubIndustry, name: 'Electric Utilities', definition: 'Companies that produce or distribute electricity. Includesboth nuclear and non-nuclear facilities.' };
const subIndustry55102010: GicsLevel = { value: 55102010, rank: GicsRank.SubIndustry, name: 'Gas Utilities', definition: 'Companies whose main charter is to distribute and transmit natural and manufactured gas. Excludes companies primarily involved in gas exploration or production classified in Oil & Gas Exploration & Production sub-industry. Also excludes diversified midstream natural gas companies classified in the Oil & Gas Storage & Transportation sub-industry.' };
const subIndustry55103010: GicsLevel = { value: 55103010, rank: GicsRank.SubIndustry, name: 'Multi-Utilities', definition: 'Utility companies with significantly diversified activities in addition to core electric utility, gas utility and/or water utility operations.' };
const subIndustry55104010: GicsLevel = { value: 55104010, rank: GicsRank.SubIndustry, name: 'Water Utilities', definition: 'Companies that purchase and redistribute water to the end-consumer. Includes large-scale water treatment systems.' };
const subIndustry55105010: GicsLevel = { value: 55105010, rank: GicsRank.SubIndustry, name: 'Independent Power Producers & Energy Traders', definition: 'Companies that operate as Independent Power Producers (IPPs), Gas & Power Marketing & Trading Specialists and/or Integrated Energy Merchants. Excludes producers of electricity using renewable sources, such as solar power, hydropower, and wind power. Also excludes electric transmission companies and utility distribution companies classified in the Electric Utilities sub-industry.' };
const subIndustry55105020: GicsLevel = { value: 55105020, rank: GicsRank.SubIndustry, name: 'Renewable Electricity', definition: 'Companies that engage in generation and distribution of electricity using renewable sources, including, but not limited to, companies that produce electricity using biomass, geothermal energy, solar energy, hydropower, and wind power. Excludes companies manufacturing capital equipment used to generate electricity using renewable sources, such as manufacturers of solar power systems and installers of photovoltaic cells and companies involved in the provision of technology, components, and services mainly to this market.' };
const subIndustry60101010: GicsLevel = { value: 60101010, rank: GicsRank.SubIndustry, name: 'Diversified REITs', definition: 'Companies or trusts with significantly diversified operations across two or more property types.' };
const subIndustry60101020: GicsLevel = { value: 60101020, rank: GicsRank.SubIndustry, name: 'Industrial REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of industrial properties. Includes companies operating industrial warehouses and distribution properties.' };
const subIndustry60101030: GicsLevel = { value: 60101030, rank: GicsRank.SubIndustry, name: 'Hotel & Resort REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of hotel and resort properties.' };
const subIndustry60101040: GicsLevel = { value: 60101040, rank: GicsRank.SubIndustry, name: 'Office REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of office properties.' };
const subIndustry60101050: GicsLevel = { value: 60101050, rank: GicsRank.SubIndustry, name: 'Health Care REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of properties serving the health careindustry, including hospitals, nursing homes, and assisted living properties.' };
const subIndustry60101060: GicsLevel = { value: 60101060, rank: GicsRank.SubIndustry, name: 'Residential REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of residential properties including multi-family homes, apartments, manufactured homes and student housing properties.' };
const subIndustry60101070: GicsLevel = { value: 60101070, rank: GicsRank.SubIndustry, name: 'Retail REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of shopping malls, outlet malls, neighborhood and community shopping centers.' };
const subIndustry60101080: GicsLevel = { value: 60101080, rank: GicsRank.SubIndustry, name: 'Specialized REITs', definition: 'Companies or trusts engaged in the acquisition, development, ownership, leasing, management and operation of properties not classified elsewhere. Includes trusts that operate and invest in storage properties .It also includes REITs that do not generate a majority of their revenues and income from real estate rental and leasing operations.' };
const subIndustry60102010: GicsLevel = { value: 60102010, rank: GicsRank.SubIndustry, name: 'Diversified Real Estate Activities', definition: 'Companies engaged in a diverse spectrum of real estate activities including real estate development & sales, real estate management, or real estate services, but with no dominant business line.' };
const subIndustry60102020: GicsLevel = { value: 60102020, rank: GicsRank.SubIndustry, name: 'Real Estate Operating Companies', definition: 'Companies engaged in operating real estate properties for the purpose of leasing & management.' };
const subIndustry60102030: GicsLevel = { value: 60102030, rank: GicsRank.SubIndustry, name: 'Real Estate Development', definition: 'Companies that develop real estate and sell the properties after development. Excludes companies classified in the Homebuilding sub-industry.' };
const subIndustry60102040: GicsLevel = { value: 60102040, rank: GicsRank.SubIndustry, name: 'Real Estate Services', definition: 'Real estate service providers such as real estate agents, brokers & real estate appraisers.' };

const gicsMap: Map<number, GicsLevel[]> = new Map([
  [sector10.value, [sector10]],
  [sector15.value, [sector15]],
  [sector20.value, [sector20]],
  [sector25.value, [sector25]],
  [sector30.value, [sector30]],
  [sector35.value, [sector35]],
  [sector40.value, [sector40]],
  [sector45.value, [sector45]],
  [sector50.value, [sector50]],
  [sector55.value, [sector55]],
  [sector60.value, [sector60]],

  [industryGroup1010.value, [sector10, industryGroup1010]],
  [industryGroup1510.value, [sector15, industryGroup1510]],
  [industryGroup2010.value, [sector20, industryGroup2010]],
  [industryGroup2020.value, [sector20, industryGroup2020]],
  [industryGroup2030.value, [sector20, industryGroup2030]],
  [industryGroup2510.value, [sector25, industryGroup2510]],
  [industryGroup2520.value, [sector25, industryGroup2520]],
  [industryGroup2530.value, [sector25, industryGroup2530]],
  [industryGroup2550.value, [sector25, industryGroup2550]],
  [industryGroup3010.value, [sector30, industryGroup3010]],
  [industryGroup3020.value, [sector30, industryGroup3020]],
  [industryGroup3030.value, [sector30, industryGroup3030]],
  [industryGroup3510.value, [sector35, industryGroup3510]],
  [industryGroup3520.value, [sector35, industryGroup3520]],
  [industryGroup4010.value, [sector40, industryGroup4010]],
  [industryGroup4020.value, [sector40, industryGroup4020]],
  [industryGroup4030.value, [sector40, industryGroup4030]],
  [industryGroup4510.value, [sector45, industryGroup4510]],
  [industryGroup4520.value, [sector45, industryGroup4520]],
  [industryGroup4530.value, [sector45, industryGroup4530]],
  [industryGroup5010.value, [sector50, industryGroup5010]],
  [industryGroup5020.value, [sector50, industryGroup5020]],
  [industryGroup5510.value, [sector55, industryGroup5510]],
  [industryGroup6010.value, [sector60, industryGroup6010]],

  [industry101010.value, [sector10, industryGroup1010, industry101010]],
  [industry101020.value, [sector10, industryGroup1010, industry101020]],
  [industry151010.value, [sector15, industryGroup1510, industry151010]],
  [industry151020.value, [sector15, industryGroup1510, industry151020]],
  [industry151030.value, [sector15, industryGroup1510, industry151030]],
  [industry151040.value, [sector15, industryGroup1510, industry151040]],
  [industry151050.value, [sector15, industryGroup1510, industry151050]],
  [industry201010.value, [sector20, industryGroup2010, industry201010]],
  [industry201020.value, [sector20, industryGroup2010, industry201020]],
  [industry201030.value, [sector20, industryGroup2010, industry201030]],
  [industry201040.value, [sector20, industryGroup2010, industry201040]],
  [industry201050.value, [sector20, industryGroup2010, industry201050]],
  [industry201060.value, [sector20, industryGroup2010, industry201060]],
  [industry201070.value, [sector20, industryGroup2010, industry201070]],
  [industry202010.value, [sector20, industryGroup2020, industry202010]],
  [industry202020.value, [sector20, industryGroup2020, industry202020]],
  [industry203010.value, [sector20, industryGroup2030, industry203010]],
  [industry203020.value, [sector20, industryGroup2030, industry203020]],
  [industry203030.value, [sector20, industryGroup2030, industry203030]],
  [industry203040.value, [sector20, industryGroup2030, industry203040]],
  [industry203050.value, [sector20, industryGroup2030, industry203050]],
  [industry251010.value, [sector25, industryGroup2510, industry251010]],
  [industry251020.value, [sector25, industryGroup2510, industry251020]],
  [industry252010.value, [sector25, industryGroup2520, industry252010]],
  [industry252020.value, [sector25, industryGroup2520, industry252020]],
  [industry252030.value, [sector25, industryGroup2520, industry252030]],
  [industry253010.value, [sector25, industryGroup2530, industry253010]],
  [industry253020.value, [sector25, industryGroup2530, industry253020]],
  [industry255010.value, [sector25, industryGroup2550, industry255010]],
  [industry255020.value, [sector25, industryGroup2550, industry255020]],
  [industry255030.value, [sector25, industryGroup2550, industry255030]],
  [industry255040.value, [sector25, industryGroup2550, industry255040]],
  [industry301010.value, [sector30, industryGroup3010, industry301010]],
  [industry302010.value, [sector30, industryGroup3020, industry302010]],
  [industry302020.value, [sector30, industryGroup3020, industry302020]],
  [industry302030.value, [sector30, industryGroup3020, industry302030]],
  [industry303010.value, [sector30, industryGroup3030, industry303010]],
  [industry303020.value, [sector30, industryGroup3030, industry303020]],
  [industry351010.value, [sector35, industryGroup3510, industry351010]],
  [industry351020.value, [sector35, industryGroup3510, industry351020]],
  [industry351030.value, [sector35, industryGroup3510, industry351030]],
  [industry352010.value, [sector35, industryGroup3520, industry352010]],
  [industry352020.value, [sector35, industryGroup3520, industry352020]],
  [industry352030.value, [sector35, industryGroup3520, industry352030]],
  [industry401010.value, [sector40, industryGroup4010, industry401010]],
  [industry401020.value, [sector40, industryGroup4010, industry401020]],
  [industry402010.value, [sector40, industryGroup4020, industry402010]],
  [industry402020.value, [sector40, industryGroup4020, industry402020]],
  [industry402030.value, [sector40, industryGroup4020, industry402030]],
  [industry402040.value, [sector40, industryGroup4020, industry402040]],
  [industry403010.value, [sector40, industryGroup4030, industry403010]],
  [industry451020.value, [sector45, industryGroup4510, industry451020]],
  [industry451030.value, [sector45, industryGroup4510, industry451030]],
  [industry452010.value, [sector45, industryGroup4520, industry452010]],
  [industry452020.value, [sector45, industryGroup4520, industry452020]],
  [industry452030.value, [sector45, industryGroup4520, industry452030]],
  [industry453010.value, [sector45, industryGroup4530, industry453010]],
  [industry501010.value, [sector50, industryGroup5010, industry501010]],
  [industry501020.value, [sector50, industryGroup5010, industry501020]],
  [industry502010.value, [sector50, industryGroup5020, industry502010]],
  [industry502020.value, [sector50, industryGroup5020, industry502020]],
  [industry502030.value, [sector50, industryGroup5020, industry502030]],
  [industry551010.value, [sector55, industryGroup5510, industry551010]],
  [industry551020.value, [sector55, industryGroup5510, industry551020]],
  [industry551030.value, [sector55, industryGroup5510, industry551030]],
  [industry551040.value, [sector55, industryGroup5510, industry551040]],
  [industry551050.value, [sector55, industryGroup5510, industry551050]],
  [industry601010.value, [sector60, industryGroup6010, industry601010]],
  [industry601020.value, [sector60, industryGroup6010, industry601020]],

  [subIndustry10101010.value, [sector10, industryGroup1010, industry101010, subIndustry10101010]],
  [subIndustry10101020.value, [sector10, industryGroup1010, industry101010, subIndustry10101020]],
  [subIndustry10102010.value, [sector10, industryGroup1010, industry101020, subIndustry10102010]],
  [subIndustry10102020.value, [sector10, industryGroup1010, industry101020, subIndustry10102020]],
  [subIndustry10102030.value, [sector10, industryGroup1010, industry101020, subIndustry10102030]],
  [subIndustry10102040.value, [sector10, industryGroup1010, industry101020, subIndustry10102040]],
  [subIndustry10102050.value, [sector10, industryGroup1010, industry101020, subIndustry10102050]],
  [subIndustry15101010.value, [sector15, industryGroup1510, industry151010, subIndustry15101010]],
  [subIndustry15101020.value, [sector15, industryGroup1510, industry151010, subIndustry15101020]],
  [subIndustry15101030.value, [sector15, industryGroup1510, industry151010, subIndustry15101030]],
  [subIndustry15101040.value, [sector15, industryGroup1510, industry151010, subIndustry15101040]],
  [subIndustry15101050.value, [sector15, industryGroup1510, industry151010, subIndustry15101050]],
  [subIndustry15102010.value, [sector15, industryGroup1510, industry151020, subIndustry15102010]],
  [subIndustry15103010.value, [sector15, industryGroup1510, industry151030, subIndustry15103010]],
  [subIndustry15103020.value, [sector15, industryGroup1510, industry151030, subIndustry15103020]],
  [subIndustry15104010.value, [sector15, industryGroup1510, industry151040, subIndustry15104010]],
  [subIndustry15104020.value, [sector15, industryGroup1510, industry151040, subIndustry15104020]],
  [subIndustry15104025.value, [sector15, industryGroup1510, industry151040, subIndustry15104025]],
  [subIndustry15104030.value, [sector15, industryGroup1510, industry151040, subIndustry15104030]],
  [subIndustry15104040.value, [sector15, industryGroup1510, industry151040, subIndustry15104040]],
  [subIndustry15104045.value, [sector15, industryGroup1510, industry151040, subIndustry15104045]],
  [subIndustry15104050.value, [sector15, industryGroup1510, industry151040, subIndustry15104050]],
  [subIndustry15105010.value, [sector15, industryGroup1510, industry151050, subIndustry15105010]],
  [subIndustry15105020.value, [sector15, industryGroup1510, industry151050, subIndustry15105020]],
  [subIndustry20101010.value, [sector20, industryGroup2010, industry201010, subIndustry20101010]],
  [subIndustry20102010.value, [sector20, industryGroup2010, industry201020, subIndustry20102010]],
  [subIndustry20103010.value, [sector20, industryGroup2010, industry201030, subIndustry20103010]],
  [subIndustry20104010.value, [sector20, industryGroup2010, industry201040, subIndustry20104010]],
  [subIndustry20104020.value, [sector20, industryGroup2010, industry201040, subIndustry20104020]],
  [subIndustry20105010.value, [sector20, industryGroup2010, industry201050, subIndustry20105010]],
  [subIndustry20106010.value, [sector20, industryGroup2010, industry201060, subIndustry20106010]],
  [subIndustry20106015.value, [sector20, industryGroup2010, industry201060, subIndustry20106015]],
  [subIndustry20106020.value, [sector20, industryGroup2010, industry201060, subIndustry20106020]],
  [subIndustry20107010.value, [sector20, industryGroup2010, industry201070, subIndustry20107010]],
  [subIndustry20201010.value, [sector20, industryGroup2020, industry202010, subIndustry20201010]],
  [subIndustry20201050.value, [sector20, industryGroup2020, industry202010, subIndustry20201050]],
  [subIndustry20201060.value, [sector20, industryGroup2020, industry202010, subIndustry20201060]],
  [subIndustry20201070.value, [sector20, industryGroup2020, industry202010, subIndustry20201070]],
  [subIndustry20201080.value, [sector20, industryGroup2020, industry202010, subIndustry20201080]],
  [subIndustry20202010.value, [sector20, industryGroup2020, industry202020, subIndustry20202010]],
  [subIndustry20202020.value, [sector20, industryGroup2020, industry202020, subIndustry20202020]],
  [subIndustry20301010.value, [sector20, industryGroup2030, industry203010, subIndustry20301010]],
  [subIndustry20302010.value, [sector20, industryGroup2030, industry203020, subIndustry20302010]],
  [subIndustry20303010.value, [sector20, industryGroup2030, industry203030, subIndustry20303010]],
  [subIndustry20304010.value, [sector20, industryGroup2030, industry203040, subIndustry20304010]],
  [subIndustry20304020.value, [sector20, industryGroup2030, industry203040, subIndustry20304020]],
  [subIndustry20305010.value, [sector20, industryGroup2030, industry203050, subIndustry20305010]],
  [subIndustry20305020.value, [sector20, industryGroup2030, industry203050, subIndustry20305020]],
  [subIndustry20305030.value, [sector20, industryGroup2030, industry203050, subIndustry20305030]],
  [subIndustry25101010.value, [sector25, industryGroup2510, industry251010, subIndustry25101010]],
  [subIndustry25101020.value, [sector25, industryGroup2510, industry251010, subIndustry25101020]],
  [subIndustry25102010.value, [sector25, industryGroup2510, industry251020, subIndustry25102010]],
  [subIndustry25102020.value, [sector25, industryGroup2510, industry251020, subIndustry25102020]],
  [subIndustry25201010.value, [sector25, industryGroup2520, industry252010, subIndustry25201010]],
  [subIndustry25201020.value, [sector25, industryGroup2520, industry252010, subIndustry25201020]],
  [subIndustry25201030.value, [sector25, industryGroup2520, industry252010, subIndustry25201030]],
  [subIndustry25201040.value, [sector25, industryGroup2520, industry252010, subIndustry25201040]],
  [subIndustry25201050.value, [sector25, industryGroup2520, industry252010, subIndustry25201050]],
  [subIndustry25202010.value, [sector25, industryGroup2520, industry252020, subIndustry25202010]],
  [subIndustry25203010.value, [sector25, industryGroup2520, industry252030, subIndustry25203010]],
  [subIndustry25203020.value, [sector25, industryGroup2520, industry252030, subIndustry25203020]],
  [subIndustry25203030.value, [sector25, industryGroup2520, industry252030, subIndustry25203030]],
  [subIndustry25301010.value, [sector25, industryGroup2530, industry253010, subIndustry25301010]],
  [subIndustry25301020.value, [sector25, industryGroup2530, industry253010, subIndustry25301020]],
  [subIndustry25301030.value, [sector25, industryGroup2530, industry253010, subIndustry25301030]],
  [subIndustry25301040.value, [sector25, industryGroup2530, industry253010, subIndustry25301040]],
  [subIndustry25302010.value, [sector25, industryGroup2530, industry253020, subIndustry25302010]],
  [subIndustry25302020.value, [sector25, industryGroup2530, industry253020, subIndustry25302020]],
  [subIndustry25501010.value, [sector25, industryGroup2550, industry255010, subIndustry25501010]],
  [subIndustry25502020.value, [sector25, industryGroup2550, industry255020, subIndustry25502020]],
  [subIndustry25503010.value, [sector25, industryGroup2550, industry255030, subIndustry25503010]],
  [subIndustry25503020.value, [sector25, industryGroup2550, industry255030, subIndustry25503020]],
  [subIndustry25504010.value, [sector25, industryGroup2550, industry255040, subIndustry25504010]],
  [subIndustry25504020.value, [sector25, industryGroup2550, industry255040, subIndustry25504020]],
  [subIndustry25504030.value, [sector25, industryGroup2550, industry255040, subIndustry25504030]],
  [subIndustry25504040.value, [sector25, industryGroup2550, industry255040, subIndustry25504040]],
  [subIndustry25504050.value, [sector25, industryGroup2550, industry255040, subIndustry25504050]],
  [subIndustry25504060.value, [sector25, industryGroup2550, industry255040, subIndustry25504060]],
  [subIndustry30101010.value, [sector30, industryGroup3010, industry301010, subIndustry30101010]],
  [subIndustry30101020.value, [sector30, industryGroup3010, industry301010, subIndustry30101020]],
  [subIndustry30101030.value, [sector30, industryGroup3010, industry301010, subIndustry30101030]],
  [subIndustry30101040.value, [sector30, industryGroup3010, industry301010, subIndustry30101040]],
  [subIndustry30201010.value, [sector30, industryGroup3020, industry302010, subIndustry30201010]],
  [subIndustry30201020.value, [sector30, industryGroup3020, industry302010, subIndustry30201020]],
  [subIndustry30201030.value, [sector30, industryGroup3020, industry302010, subIndustry30201030]],
  [subIndustry30202010.value, [sector30, industryGroup3020, industry302020, subIndustry30202010]],
  [subIndustry30202030.value, [sector30, industryGroup3020, industry302020, subIndustry30202030]],
  [subIndustry30203010.value, [sector30, industryGroup3020, industry302030, subIndustry30203010]],
  [subIndustry30301010.value, [sector30, industryGroup3030, industry303010, subIndustry30301010]],
  [subIndustry30302010.value, [sector30, industryGroup3030, industry303020, subIndustry30302010]],
  [subIndustry35101010.value, [sector35, industryGroup3510, industry351010, subIndustry35101010]],
  [subIndustry35101020.value, [sector35, industryGroup3510, industry351010, subIndustry35101020]],
  [subIndustry35102010.value, [sector35, industryGroup3510, industry351020, subIndustry35102010]],
  [subIndustry35102015.value, [sector35, industryGroup3510, industry351020, subIndustry35102015]],
  [subIndustry35102020.value, [sector35, industryGroup3510, industry351020, subIndustry35102020]],
  [subIndustry35102030.value, [sector35, industryGroup3510, industry351020, subIndustry35102030]],
  [subIndustry35103010.value, [sector35, industryGroup3510, industry351030, subIndustry35103010]],
  [subIndustry35201010.value, [sector35, industryGroup3520, industry352010, subIndustry35201010]],
  [subIndustry35202010.value, [sector35, industryGroup3520, industry352020, subIndustry35202010]],
  [subIndustry35203010.value, [sector35, industryGroup3520, industry352030, subIndustry35203010]],
  [subIndustry40101010.value, [sector40, industryGroup4010, industry401010, subIndustry40101010]],
  [subIndustry40101015.value, [sector40, industryGroup4010, industry401010, subIndustry40101015]],
  [subIndustry40102010.value, [sector40, industryGroup4010, industry401020, subIndustry40102010]],
  [subIndustry40201020.value, [sector40, industryGroup4020, industry402010, subIndustry40201020]],
  [subIndustry40201030.value, [sector40, industryGroup4020, industry402010, subIndustry40201030]],
  [subIndustry40201040.value, [sector40, industryGroup4020, industry402010, subIndustry40201040]],
  [subIndustry40202010.value, [sector40, industryGroup4020, industry402020, subIndustry40202010]],
  [subIndustry40203010.value, [sector40, industryGroup4020, industry402030, subIndustry40203010]],
  [subIndustry40203020.value, [sector40, industryGroup4020, industry402030, subIndustry40203020]],
  [subIndustry40203030.value, [sector40, industryGroup4020, industry402030, subIndustry40203030]],
  [subIndustry40203040.value, [sector40, industryGroup4020, industry402030, subIndustry40203040]],
  [subIndustry40204010.value, [sector40, industryGroup4020, industry402040, subIndustry40204010]],
  [subIndustry40301010.value, [sector40, industryGroup4030, industry403010, subIndustry40301010]],
  [subIndustry40301020.value, [sector40, industryGroup4030, industry403010, subIndustry40301020]],
  [subIndustry40301030.value, [sector40, industryGroup4030, industry403010, subIndustry40301030]],
  [subIndustry40301040.value, [sector40, industryGroup4030, industry403010, subIndustry40301040]],
  [subIndustry40301050.value, [sector40, industryGroup4030, industry403010, subIndustry40301050]],
  [subIndustry45102010.value, [sector45, industryGroup4510, industry451020, subIndustry45102010]],
  [subIndustry45102020.value, [sector45, industryGroup4510, industry451020, subIndustry45102020]],
  [subIndustry45102030.value, [sector45, industryGroup4510, industry451020, subIndustry45102030]],
  [subIndustry45103010.value, [sector45, industryGroup4510, industry451030, subIndustry45103010]],
  [subIndustry45103020.value, [sector45, industryGroup4510, industry451030, subIndustry45103020]],
  [subIndustry45201020.value, [sector45, industryGroup4520, industry452010, subIndustry45201020]],
  [subIndustry45202030.value, [sector45, industryGroup4520, industry452020, subIndustry45202030]],
  [subIndustry45203010.value, [sector45, industryGroup4520, industry452030, subIndustry45203010]],
  [subIndustry45203015.value, [sector45, industryGroup4520, industry452030, subIndustry45203015]],
  [subIndustry45203020.value, [sector45, industryGroup4520, industry452030, subIndustry45203020]],
  [subIndustry45203030.value, [sector45, industryGroup4520, industry452030, subIndustry45203030]],
  [subIndustry45301010.value, [sector45, industryGroup4530, industry453010, subIndustry45301010]],
  [subIndustry45301020.value, [sector45, industryGroup4530, industry453010, subIndustry45301020]],
  [subIndustry50101010.value, [sector50, industryGroup5010, industry501010, subIndustry50101010]],
  [subIndustry50101020.value, [sector50, industryGroup5010, industry501010, subIndustry50101020]],
  [subIndustry50102010.value, [sector50, industryGroup5010, industry501020, subIndustry50102010]],
  [subIndustry50201010.value, [sector50, industryGroup5020, industry502010, subIndustry50201010]],
  [subIndustry50201020.value, [sector50, industryGroup5020, industry502010, subIndustry50201020]],
  [subIndustry50201030.value, [sector50, industryGroup5020, industry502010, subIndustry50201030]],
  [subIndustry50201040.value, [sector50, industryGroup5020, industry502010, subIndustry50201040]],
  [subIndustry50202010.value, [sector50, industryGroup5020, industry502020, subIndustry50202010]],
  [subIndustry50202020.value, [sector50, industryGroup5020, industry502020, subIndustry50202020]],
  [subIndustry50203010.value, [sector50, industryGroup5020, industry502030, subIndustry50203010]],
  [subIndustry55101010.value, [sector55, industryGroup5510, industry551010, subIndustry55101010]],
  [subIndustry55102010.value, [sector55, industryGroup5510, industry551020, subIndustry55102010]],
  [subIndustry55103010.value, [sector55, industryGroup5510, industry551030, subIndustry55103010]],
  [subIndustry55104010.value, [sector55, industryGroup5510, industry551040, subIndustry55104010]],
  [subIndustry55105010.value, [sector55, industryGroup5510, industry551050, subIndustry55105010]],
  [subIndustry55105020.value, [sector55, industryGroup5510, industry551050, subIndustry55105020]],
  [subIndustry60101010.value, [sector60, industryGroup6010, industry601010, subIndustry60101010]],
  [subIndustry60101020.value, [sector60, industryGroup6010, industry601010, subIndustry60101020]],
  [subIndustry60101030.value, [sector60, industryGroup6010, industry601010, subIndustry60101030]],
  [subIndustry60101040.value, [sector60, industryGroup6010, industry601010, subIndustry60101040]],
  [subIndustry60101050.value, [sector60, industryGroup6010, industry601010, subIndustry60101050]],
  [subIndustry60101060.value, [sector60, industryGroup6010, industry601010, subIndustry60101060]],
  [subIndustry60101070.value, [sector60, industryGroup6010, industry601010, subIndustry60101070]],
  [subIndustry60101080.value, [sector60, industryGroup6010, industry601010, subIndustry60101080]],
  [subIndustry60102010.value, [sector60, industryGroup6010, industry601020, subIndustry60102010]],
  [subIndustry60102020.value, [sector60, industryGroup6010, industry601020, subIndustry60102020]],
  [subIndustry60102030.value, [sector60, industryGroup6010, industry601020, subIndustry60102030]],
  [subIndustry60102040.value, [sector60, industryGroup6010, industry601020, subIndustry60102040]]
]);

/**
 * Returns an array of GICS levels leading to a given GICS numeric value
 */
export function gicsGet(value: number): GicsLevel[] {
  const array = gicsMap.get(value);
  return array ? (array as GicsLevel[]) : [];
}

/**
 * Returns a sector level leading to a given GICS numeric value
 */
export function gicsGetSector(value: number): GicsLevel | undefined {
  const array = gicsMap.get(value);
  return array && array.length > 0 ? array[0] : undefined;
}

/**
 * The Global Industry Classification Standard (GICS) taxonomy
 *
 * https://www.msci.com/gics
 */
export const gicsTaxonomy: GicsTaxonomy = {
  children: [
    {
      value: sector10.value, rank: sector10.rank, name: sector10.name, children: [
        {
          value: industryGroup1010.value, rank: industryGroup1010.rank, name: industryGroup1010.name, children: [
            {
              value: industry101010.value, rank: industry101010.rank, name: industry101010.name, children: [
                { value: subIndustry10101010.value, rank: GicsRank.SubIndustry, name: subIndustry10101010.name, definition: subIndustry10101010.definition },
                { value: subIndustry10101020.value, rank: GicsRank.SubIndustry, name: subIndustry10101020.name, definition: subIndustry10101020.definition }
              ]
            },
            {
              value: industry101020.value, rank: industry101020.rank, name: industry101020.name, children: [
                { value: subIndustry10102010.value, rank: GicsRank.SubIndustry, name: subIndustry10102010.name, definition: subIndustry10102010.definition },
                { value: subIndustry10102020.value, rank: GicsRank.SubIndustry, name: subIndustry10102020.name, definition: subIndustry10102020.definition },
                { value: subIndustry10102030.value, rank: GicsRank.SubIndustry, name: subIndustry10102030.name, definition: subIndustry10102030.definition },
                { value: subIndustry10102040.value, rank: GicsRank.SubIndustry, name: subIndustry10102040.name, definition: subIndustry10102040.definition },
                { value: subIndustry10102050.value, rank: GicsRank.SubIndustry, name: subIndustry10102050.name, definition: subIndustry10102050.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector15.value, rank: sector15.rank, name: sector15.name, children: [
        {
          value: industryGroup1510.value, rank: industryGroup1510.rank, name: industryGroup1510.name, children: [
            {
              value: industry151010.value, rank: industry151010.rank, name: industry151010.name, children: [
                { value: subIndustry15101010.value, rank: GicsRank.SubIndustry, name: subIndustry15101010.name, definition: subIndustry15101010.definition },
                { value: subIndustry15101020.value, rank: GicsRank.SubIndustry, name: subIndustry15101020.name, definition: subIndustry15101020.definition },
                { value: subIndustry15101030.value, rank: GicsRank.SubIndustry, name: subIndustry15101030.name, definition: subIndustry15101030.definition },
                { value: subIndustry15101040.value, rank: GicsRank.SubIndustry, name: subIndustry15101040.name, definition: subIndustry15101040.definition },
                { value: subIndustry15101050.value, rank: GicsRank.SubIndustry, name: subIndustry15101050.name, definition: subIndustry15101050.definition }
              ]
            },
            {
              value: industry151020.value, rank: industry151020.rank, name: industry151020.name, children: [
                { value: subIndustry15102010.value, rank: GicsRank.SubIndustry, name: subIndustry15102010.name, definition: subIndustry15102010.definition }
              ]
            },
            {
              value: industry151030.value, rank: industry151030.rank, name: industry151030.name, children: [
                { value: subIndustry15103010.value, rank: GicsRank.SubIndustry, name: subIndustry15103010.name, definition: subIndustry15103010.definition },
                { value: subIndustry15103020.value, rank: GicsRank.SubIndustry, name: subIndustry15103020.name, definition: subIndustry15103020.definition }
              ]
            },
            {
              value: industry151040.value, rank: industry151040.rank, name: industry151040.name, children: [
                { value: subIndustry15104010.value, rank: GicsRank.SubIndustry, name: subIndustry15104010.name, definition: subIndustry15104010.definition },
                { value: subIndustry15104020.value, rank: GicsRank.SubIndustry, name: subIndustry15104020.name, definition: subIndustry15104020.definition },
                { value: subIndustry15104025.value, rank: GicsRank.SubIndustry, name: subIndustry15104025.name, definition: subIndustry15104025.definition },
                { value: subIndustry15104030.value, rank: GicsRank.SubIndustry, name: subIndustry15104030.name, definition: subIndustry15104030.definition },
                { value: subIndustry15104040.value, rank: GicsRank.SubIndustry, name: subIndustry15104040.name, definition: subIndustry15104040.definition },
                { value: subIndustry15104045.value, rank: GicsRank.SubIndustry, name: subIndustry15104045.name, definition: subIndustry15104045.definition },
                { value: subIndustry15104050.value, rank: GicsRank.SubIndustry, name: subIndustry15104050.name, definition: subIndustry15104050.definition }
              ]
            },
            {
              value: industry151050.value, rank: industry151050.rank, name: industry151050.name, children: [
                { value: subIndustry15105010.value, rank: GicsRank.SubIndustry, name: subIndustry15105010.name, definition: subIndustry15105010.definition },
                { value: subIndustry15105020.value, rank: GicsRank.SubIndustry, name: subIndustry15105020.name, definition: subIndustry15105020.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector20.value, rank: sector20.rank, name: sector20.name, children: [
        {
          value: industryGroup2010.value, rank: industryGroup2010.rank, name: industryGroup2010.name, children: [
            {
              value: industry201010.value, rank: industry201010.rank, name: industry201010.name, children: [
                { value: subIndustry20101010.value, rank: GicsRank.SubIndustry, name: subIndustry20101010.name, definition: subIndustry20101010.definition }
              ]
            },
            {
              value: industry201020.value, rank: industry201020.rank, name: industry201020.name, children: [
                { value: subIndustry20102010.value, rank: GicsRank.SubIndustry, name: subIndustry20102010.name, definition: subIndustry20102010.definition }
              ]
            },
            {
              value: industry201030.value, rank: industry201030.rank, name: industry201030.name, children: [
                { value: subIndustry20103010.value, rank: GicsRank.SubIndustry, name: subIndustry20103010.name, definition: subIndustry20103010.definition }
              ]
            },
            {
              value: industry201040.value, rank: industry201040.rank, name: industry201040.name, children: [
                { value: subIndustry20104010.value, rank: GicsRank.SubIndustry, name: subIndustry20104010.name, definition: subIndustry20104010.definition },
                { value: subIndustry20104020.value, rank: GicsRank.SubIndustry, name: subIndustry20104020.name, definition: subIndustry20104020.definition }
              ]
            },
            {
              value: industry201050.value, rank: industry201050.rank, name: industry201050.name, children: [
                { value: subIndustry20105010.value, rank: GicsRank.SubIndustry, name: subIndustry20105010.name, definition: subIndustry20105010.definition }
              ]
            },
            {
              value: industry201060.value, rank: industry201060.rank, name: industry201060.name, children: [
                { value: subIndustry20106010.value, rank: GicsRank.SubIndustry, name: subIndustry20106010.name, definition: subIndustry20106010.definition },
                { value: subIndustry20106015.value, rank: GicsRank.SubIndustry, name: subIndustry20106015.name, definition: subIndustry20106015.definition },
                { value: subIndustry20106020.value, rank: GicsRank.SubIndustry, name: subIndustry20106020.name, definition: subIndustry20106020.definition }
              ]
            },
            {
              value: industry201070.value, rank: industry201070.rank, name: industry201070.name, children: [
                { value: subIndustry20107010.value, rank: GicsRank.SubIndustry, name: subIndustry20107010.name, definition: subIndustry20107010.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup2020.value, rank: industryGroup2020.rank, name: industryGroup2020.name, children: [
            {
              value: industry202010.value, rank: industry202010.rank, name: industry202010.name, children: [
                { value: subIndustry20201010.value, rank: GicsRank.SubIndustry, name: subIndustry20201010.name, definition: subIndustry20201010.definition },
                { value: subIndustry20201050.value, rank: GicsRank.SubIndustry, name: subIndustry20201050.name, definition: subIndustry20201050.definition },
                { value: subIndustry20201060.value, rank: GicsRank.SubIndustry, name: subIndustry20201060.name, definition: subIndustry20201060.definition },
                { value: subIndustry20201070.value, rank: GicsRank.SubIndustry, name: subIndustry20201070.name, definition: subIndustry20201070.definition },
                { value: subIndustry20201080.value, rank: GicsRank.SubIndustry, name: subIndustry20201080.name, definition: subIndustry20201080.definition }
              ]
            },
            {
              value: industry202020.value, rank: industry202020.rank, name: industry202020.name, children: [
                { value: subIndustry20202010.value, rank: GicsRank.SubIndustry, name: subIndustry20202010.name, definition: subIndustry20202010.definition },
                { value: subIndustry20202020.value, rank: GicsRank.SubIndustry, name: subIndustry20202020.name, definition: subIndustry20202020.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup2030.value, rank: industryGroup2030.rank, name: industryGroup2030.name, children: [
            {
              value: industry203010.value, rank: industry203010.rank, name: industry203010.name, children: [
                { value: subIndustry20301010.value, rank: GicsRank.SubIndustry, name: subIndustry20301010.name, definition: subIndustry20301010.definition }
              ]
            },
            {
              value: industry203020.value, rank: industry203020.rank, name: industry203020.name, children: [
                { value: subIndustry20302010.value, rank: GicsRank.SubIndustry, name: subIndustry20302010.name, definition: subIndustry20302010.definition }
              ]
            },
            {
              value: industry203030.value, rank: industry203030.rank, name: industry203030.name, children: [
                { value: subIndustry20303010.value, rank: GicsRank.SubIndustry, name: subIndustry20303010.name, definition: subIndustry20303010.definition }
              ]
            },
            {
              value: industry203040.value, rank: industry203040.rank, name: industry203040.name, children: [
                { value: subIndustry20304010.value, rank: GicsRank.SubIndustry, name: subIndustry20304010.name, definition: subIndustry20304010.definition },
                { value: subIndustry20304020.value, rank: GicsRank.SubIndustry, name: subIndustry20304020.name, definition: subIndustry20304020.definition }
              ]
            },
            {
              value: industry203050.value, rank: industry203050.rank, name: industry203050.name, children: [
                { value: subIndustry20305010.value, rank: GicsRank.SubIndustry, name: subIndustry20305010.name, definition: subIndustry20305010.definition },
                { value: subIndustry20305020.value, rank: GicsRank.SubIndustry, name: subIndustry20305020.name, definition: subIndustry20305020.definition },
                { value: subIndustry20305030.value, rank: GicsRank.SubIndustry, name: subIndustry20305030.name, definition: subIndustry20305030.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector25.value, rank: sector25.rank, name: sector25.name, children: [
        {
          value: industryGroup2510.value, rank: industryGroup2510.rank, name: industryGroup2510.name, children: [
            {
              value: industry251010.value, rank: industry251010.rank, name: industry251010.name, children: [
                { value: subIndustry25101010.value, rank: GicsRank.SubIndustry, name: subIndustry25101010.name, definition: subIndustry25101010.definition },
                { value: subIndustry25101020.value, rank: GicsRank.SubIndustry, name: subIndustry25101020.name, definition: subIndustry25101020.definition }
              ]
            },
            {
              value: industry251020.value, rank: industry251020.rank, name: industry251020.name, children: [
                { value: subIndustry25102010.value, rank: GicsRank.SubIndustry, name: subIndustry25102010.name, definition: subIndustry25102010.definition },
                { value: subIndustry25102020.value, rank: GicsRank.SubIndustry, name: subIndustry25102020.name, definition: subIndustry25102020.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup2520.value, rank: industryGroup2520.rank, name: industryGroup2520.name, children: [
            {
              value: industry252010.value, rank: industry252010.rank, name: industry252010.name, children: [
                { value: subIndustry25201010.value, rank: GicsRank.SubIndustry, name: subIndustry25201010.name, definition: subIndustry25201010.definition },
                { value: subIndustry25201020.value, rank: GicsRank.SubIndustry, name: subIndustry25201020.name, definition: subIndustry25201020.definition },
                { value: subIndustry25201030.value, rank: GicsRank.SubIndustry, name: subIndustry25201030.name, definition: subIndustry25201030.definition },
                { value: subIndustry25201040.value, rank: GicsRank.SubIndustry, name: subIndustry25201040.name, definition: subIndustry25201040.definition },
                { value: subIndustry25201050.value, rank: GicsRank.SubIndustry, name: subIndustry25201050.name, definition: subIndustry25201050.definition }
              ]
            },
            {
              value: industry252020.value, rank: industry252020.rank, name: industry252020.name, children: [
                { value: subIndustry25202010.value, rank: GicsRank.SubIndustry, name: subIndustry25202010.name, definition: subIndustry25202010.definition }
              ]
            },
            {
              value: industry252030.value, rank: industry252030.rank, name: industry252030.name, children: [
                { value: subIndustry25203010.value, rank: GicsRank.SubIndustry, name: subIndustry25203010.name, definition: subIndustry25203010.definition },
                { value: subIndustry25203020.value, rank: GicsRank.SubIndustry, name: subIndustry25203020.name, definition: subIndustry25203020.definition },
                { value: subIndustry25203030.value, rank: GicsRank.SubIndustry, name: subIndustry25203030.name, definition: subIndustry25203030.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup2530.value, rank: industryGroup2530.rank, name: industryGroup2530.name, children: [
            {
              value: industry253010.value, rank: industry253010.rank, name: industry253010.name, children: [
                { value: subIndustry25301010.value, rank: GicsRank.SubIndustry, name: subIndustry25301010.name, definition: subIndustry25301010.definition },
                { value: subIndustry25301020.value, rank: GicsRank.SubIndustry, name: subIndustry25301020.name, definition: subIndustry25301020.definition },
                { value: subIndustry25301030.value, rank: GicsRank.SubIndustry, name: subIndustry25301030.name, definition: subIndustry25301030.definition },
                { value: subIndustry25301040.value, rank: GicsRank.SubIndustry, name: subIndustry25301040.name, definition: subIndustry25301040.definition }
              ]
            },
            {
              value: industry253020.value, rank: industry253020.rank, name: industry253020.name, children: [
                { value: subIndustry25302010.value, rank: GicsRank.SubIndustry, name: subIndustry25302010.name, definition: subIndustry25302010.definition },
                { value: subIndustry25302020.value, rank: GicsRank.SubIndustry, name: subIndustry25302020.name, definition: subIndustry25302020.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup2550.value, rank: industryGroup2550.rank, name: industryGroup2550.name, children: [
            {
              value: industry255010.value, rank: industry255010.rank, name: industry255010.name, children: [
                { value: subIndustry25501010.value, rank: GicsRank.SubIndustry, name: subIndustry25501010.name, definition: subIndustry25501010.definition }
              ]
            },
            {
              value: industry255020.value, rank: industry255020.rank, name: industry255020.name, children: [
                { value: subIndustry25502020.value, rank: GicsRank.SubIndustry, name: subIndustry25502020.name, definition: subIndustry25502020.definition }
              ]
            },
            {
              value: industry255030.value, rank: industry255030.rank, name: industry255030.name, children: [
                { value: subIndustry25503010.value, rank: GicsRank.SubIndustry, name: subIndustry25503010.name, definition: subIndustry25503010.definition },
                { value: subIndustry25503020.value, rank: GicsRank.SubIndustry, name: subIndustry25503020.name, definition: subIndustry25503020.definition }
              ]
            },
            {
              value: industry255040.value, rank: industry255040.rank, name: industry255040.name, children: [
                { value: subIndustry25504010.value, rank: GicsRank.SubIndustry, name: subIndustry25504010.name, definition: subIndustry25504010.definition },
                { value: subIndustry25504020.value, rank: GicsRank.SubIndustry, name: subIndustry25504020.name, definition: subIndustry25504020.definition },
                { value: subIndustry25504030.value, rank: GicsRank.SubIndustry, name: subIndustry25504030.name, definition: subIndustry25504030.definition },
                { value: subIndustry25504040.value, rank: GicsRank.SubIndustry, name: subIndustry25504040.name, definition: subIndustry25504040.definition },
                { value: subIndustry25504050.value, rank: GicsRank.SubIndustry, name: subIndustry25504050.name, definition: subIndustry25504050.definition },
                { value: subIndustry25504060.value, rank: GicsRank.SubIndustry, name: subIndustry25504060.name, definition: subIndustry25504060.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector30.value, rank: sector30.rank, name: sector30.name, children: [
        {
          value: industryGroup3010.value, rank: industryGroup3010.rank, name: industryGroup3010.name, children: [
            {
              value: industry301010.value, rank: industry301010.rank, name: industry301010.name, children: [
                { value: subIndustry30101010.value, rank: GicsRank.SubIndustry, name: subIndustry30101010.name, definition: subIndustry30101010.definition },
                { value: subIndustry30101020.value, rank: GicsRank.SubIndustry, name: subIndustry30101020.name, definition: subIndustry30101020.definition },
                { value: subIndustry30101030.value, rank: GicsRank.SubIndustry, name: subIndustry30101030.name, definition: subIndustry30101030.definition },
                { value: subIndustry30101040.value, rank: GicsRank.SubIndustry, name: subIndustry30101040.name, definition: subIndustry30101040.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup3020.value, rank: industryGroup3020.rank, name: industryGroup3020.name, children: [
            {
              value: industry302010.value, rank: industry302010.rank, name: industry302010.name, children: [
                { value: subIndustry30201010.value, rank: GicsRank.SubIndustry, name: subIndustry30201010.name, definition: subIndustry30201010.definition },
                { value: subIndustry30201020.value, rank: GicsRank.SubIndustry, name: subIndustry30201020.name, definition: subIndustry30201020.definition },
                { value: subIndustry30201030.value, rank: GicsRank.SubIndustry, name: subIndustry30201030.name, definition: subIndustry30201030.definition }
              ]
            },
            {
              value: industry302020.value, rank: industry302020.rank, name: industry302020.name, children: [
                { value: subIndustry30202010.value, rank: GicsRank.SubIndustry, name: subIndustry30202010.name, definition: subIndustry30202010.definition },
                { value: subIndustry30202030.value, rank: GicsRank.SubIndustry, name: subIndustry30202030.name, definition: subIndustry30202030.definition }
              ]
            },
            {
              value: industry302030.value, rank: industry302030.rank, name: industry302030.name, children: [
                { value: subIndustry30203010.value, rank: GicsRank.SubIndustry, name: subIndustry30203010.name, definition: subIndustry30203010.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup3030.value, rank: industryGroup3030.rank, name: industryGroup3030.name, children: [
            {
              value: industry303010.value, rank: industry303010.rank, name: industry303010.name, children: [
                { value: subIndustry30301010.value, rank: GicsRank.SubIndustry, name: subIndustry30301010.name, definition: subIndustry30301010.definition }
              ]
            },
            {
              value: industry303020.value, rank: industry303020.rank, name: industry303020.name, children: [
                { value: subIndustry30302010.value, rank: GicsRank.SubIndustry, name: subIndustry30302010.name, definition: subIndustry30302010.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector35.value, rank: sector35.rank, name: sector35.name, children: [
        {
          value: industryGroup3510.value, rank: industryGroup3510.rank, name: industryGroup3510.name, children: [
            {
              value: industry351010.value, rank: industry351010.rank, name: industry351010.name, children: [
                { value: subIndustry35101010.value, rank: GicsRank.SubIndustry, name: subIndustry35101010.name, definition: subIndustry35101010.definition },
                { value: subIndustry35101020.value, rank: GicsRank.SubIndustry, name: subIndustry35101020.name, definition: subIndustry35101020.definition }
              ]
            },
            {
              value: industry351020.value, rank: industry351020.rank, name: industry351020.name, children: [
                { value: subIndustry35102010.value, rank: GicsRank.SubIndustry, name: subIndustry35102010.name, definition: subIndustry35102010.definition },
                { value: subIndustry35102015.value, rank: GicsRank.SubIndustry, name: subIndustry35102015.name, definition: subIndustry35102015.definition },
                { value: subIndustry35102020.value, rank: GicsRank.SubIndustry, name: subIndustry35102020.name, definition: subIndustry35102020.definition },
                { value: subIndustry35102030.value, rank: GicsRank.SubIndustry, name: subIndustry35102030.name, definition: subIndustry35102030.definition }
              ]
            },
            {
              value: industry351030.value, rank: industry351030.rank, name: industry351030.name, children: [
                { value: subIndustry35103010.value, rank: GicsRank.SubIndustry, name: subIndustry35103010.name, definition: subIndustry35103010.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup3520.value, rank: industryGroup3520.rank, name: industryGroup3520.name, children: [
            {
              value: industry352010.value, rank: industry352010.rank, name: industry352010.name, children: [
                { value: subIndustry35201010.value, rank: GicsRank.SubIndustry, name: subIndustry35201010.name, definition: subIndustry35201010.definition }
              ]
            },
            {
              value: industry352020.value, rank: industry352020.rank, name: industry352020.name, children: [
                { value: subIndustry35202010.value, rank: GicsRank.SubIndustry, name: subIndustry35202010.name, definition: subIndustry35202010.definition }
              ]
            },
            {
              value: industry352030.value, rank: industry352030.rank, name: industry352030.name, children: [
                { value: subIndustry35203010.value, rank: GicsRank.SubIndustry, name: subIndustry35203010.name, definition: subIndustry35203010.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector40.value, rank: sector40.rank, name: sector40.name, children: [
        {
          value: industryGroup4010.value, rank: industryGroup4010.rank, name: industryGroup4010.name, children: [
            {
              value: industry401010.value, rank: industry401010.rank, name: industry401010.name, children: [
                { value: subIndustry40101010.value, rank: GicsRank.SubIndustry, name: subIndustry40101010.name, definition: subIndustry40101010.definition },
                { value: subIndustry40101015.value, rank: GicsRank.SubIndustry, name: subIndustry40101015.name, definition: subIndustry40101015.definition }
              ]
            },
            {
              value: industry401020.value, rank: industry401020.rank, name: industry401020.name, children: [
                { value: subIndustry40102010.value, rank: GicsRank.SubIndustry, name: subIndustry40102010.name, definition: subIndustry40102010.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup4020.value, rank: industryGroup4020.rank, name: industryGroup4020.name, children: [
            {
              value: industry402010.value, rank: industry402010.rank, name: industry402010.name, children: [
                { value: subIndustry40201020.value, rank: GicsRank.SubIndustry, name: subIndustry40201020.name, definition: subIndustry40201020.definition },
                { value: subIndustry40201030.value, rank: GicsRank.SubIndustry, name: subIndustry40201030.name, definition: subIndustry40201030.definition },
                { value: subIndustry40201040.value, rank: GicsRank.SubIndustry, name: subIndustry40201040.name, definition: subIndustry40201040.definition }
              ]
            },
            {
              value: industry402020.value, rank: industry402020.rank, name: industry402020.name, children: [
                { value: subIndustry40202010.value, rank: GicsRank.SubIndustry, name: subIndustry40202010.name, definition: subIndustry40202010.definition }
              ]
            },
            {
              value: industry402030.value, rank: industry402030.rank, name: industry402030.name, children: [
                { value: subIndustry40203010.value, rank: GicsRank.SubIndustry, name: subIndustry40203010.name, definition: subIndustry40203010.definition },
                { value: subIndustry40203020.value, rank: GicsRank.SubIndustry, name: subIndustry40203020.name, definition: subIndustry40203020.definition },
                { value: subIndustry40203030.value, rank: GicsRank.SubIndustry, name: subIndustry40203030.name, definition: subIndustry40203030.definition },
                { value: subIndustry40203040.value, rank: GicsRank.SubIndustry, name: subIndustry40203040.name, definition: subIndustry40203040.definition }
              ]
            },
            {
              value: industry402040.value, rank: industry402040.rank, name: industry402040.name, children: [
                { value: subIndustry40204010.value, rank: GicsRank.SubIndustry, name: subIndustry40204010.name, definition: subIndustry40204010.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup4030.value, rank: industryGroup4030.rank, name: industryGroup4030.name, children: [
            {
              value: industry403010.value, rank: industry403010.rank, name: industry403010.name, children: [
                { value: subIndustry40301010.value, rank: GicsRank.SubIndustry, name: subIndustry40301010.name, definition: subIndustry40301010.definition },
                { value: subIndustry40301020.value, rank: GicsRank.SubIndustry, name: subIndustry40301020.name, definition: subIndustry40301020.definition },
                { value: subIndustry40301030.value, rank: GicsRank.SubIndustry, name: subIndustry40301030.name, definition: subIndustry40301030.definition },
                { value: subIndustry40301040.value, rank: GicsRank.SubIndustry, name: subIndustry40301040.name, definition: subIndustry40301040.definition },
                { value: subIndustry40301050.value, rank: GicsRank.SubIndustry, name: subIndustry40301050.name, definition: subIndustry40301050.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector45.value, rank: sector45.rank, name: sector45.name, children: [
        {
          value: industryGroup4510.value, rank: industryGroup4510.rank, name: industryGroup4510.name, children: [
            {
              value: industry451020.value, rank: industry451020.rank, name: industry451020.name, children: [
                { value: subIndustry45102010.value, rank: GicsRank.SubIndustry, name: subIndustry45102010.name, definition: subIndustry45102010.definition },
                { value: subIndustry45102020.value, rank: GicsRank.SubIndustry, name: subIndustry45102020.name, definition: subIndustry45102020.definition },
                { value: subIndustry45102030.value, rank: GicsRank.SubIndustry, name: subIndustry45102030.name, definition: subIndustry45102030.definition }
              ]
            },
            {
              value: industry451030.value, rank: industry451030.rank, name: industry451030.name, children: [
                { value: subIndustry45103010.value, rank: GicsRank.SubIndustry, name: subIndustry45103010.name, definition: subIndustry45103010.definition },
                { value: subIndustry45103020.value, rank: GicsRank.SubIndustry, name: subIndustry45103020.name, definition: subIndustry45103020.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup4520.value, rank: industryGroup4520.rank, name: industryGroup4520.name, children: [
            {
              value: industry452010.value, rank: industry452010.rank, name: industry452010.name, children: [
                { value: subIndustry45201020.value, rank: GicsRank.SubIndustry, name: subIndustry45201020.name, definition: subIndustry45201020.definition }
              ]
            },
            {
              value: industry452020.value, rank: industry452020.rank, name: industry452020.name, children: [
                { value: subIndustry45202030.value, rank: GicsRank.SubIndustry, name: subIndustry45202030.name, definition: subIndustry45202030.definition }
              ]
            },
            {
              value: industry452030.value, rank: industry452030.rank, name: industry452030.name, children: [
                { value: subIndustry45203010.value, rank: GicsRank.SubIndustry, name: subIndustry45203010.name, definition: subIndustry45203010.definition },
                { value: subIndustry45203015.value, rank: GicsRank.SubIndustry, name: subIndustry45203015.name, definition: subIndustry45203015.definition },
                { value: subIndustry45203020.value, rank: GicsRank.SubIndustry, name: subIndustry45203020.name, definition: subIndustry45203020.definition },
                { value: subIndustry45203030.value, rank: GicsRank.SubIndustry, name: subIndustry45203030.name, definition: subIndustry45203030.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup4530.value, rank: industryGroup4530.rank, name: industryGroup4530.name, children: [
            {
              value: industry453010.value, rank: industry453010.rank, name: industry453010.name, children: [
                { value: subIndustry45301010.value, rank: GicsRank.SubIndustry, name: subIndustry45301010.name, definition: subIndustry45301010.definition },
                { value: subIndustry45301020.value, rank: GicsRank.SubIndustry, name: subIndustry45301020.name, definition: subIndustry45301020.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector50.value, rank: sector50.rank, name: sector50.name, children: [
        {
          value: industryGroup5010.value, rank: industryGroup5010.rank, name: industryGroup5010.name, children: [
            {
              value: industry501010.value, rank: industry501010.rank, name: industry501010.name, children: [
                { value: subIndustry50101010.value, rank: GicsRank.SubIndustry, name: subIndustry50101010.name, definition: subIndustry50101010.definition },
                { value: subIndustry50101020.value, rank: GicsRank.SubIndustry, name: subIndustry50101020.name, definition: subIndustry50101020.definition }
              ]
            },
            {
              value: industry501020.value, rank: industry501020.rank, name: industry501020.name, children: [
                { value: subIndustry50102010.value, rank: GicsRank.SubIndustry, name: subIndustry50102010.name, definition: subIndustry50102010.definition }
              ]
            }
          ]
        },
        {
          value: industryGroup5020.value, rank: industryGroup5020.rank, name: industryGroup5020.name, children: [
            {
              value: industry502010.value, rank: industry502010.rank, name: industry502010.name, children: [
                { value: subIndustry50201010.value, rank: GicsRank.SubIndustry, name: subIndustry50201010.name, definition: subIndustry50201010.definition },
                { value: subIndustry50201020.value, rank: GicsRank.SubIndustry, name: subIndustry50201020.name, definition: subIndustry50201020.definition },
                { value: subIndustry50201030.value, rank: GicsRank.SubIndustry, name: subIndustry50201030.name, definition: subIndustry50201030.definition },
                { value: subIndustry50201040.value, rank: GicsRank.SubIndustry, name: subIndustry50201040.name, definition: subIndustry50201040.definition }
              ]
            },
            {
              value: industry502020.value, rank: industry502020.rank, name: industry502020.name, children: [
                { value: subIndustry50202010.value, rank: GicsRank.SubIndustry, name: subIndustry50202010.name, definition: subIndustry50202010.definition },
                { value: subIndustry50202020.value, rank: GicsRank.SubIndustry, name: subIndustry50202020.name, definition: subIndustry50202020.definition }
              ]
            },
            {
              value: industry502030.value, rank: industry502030.rank, name: industry502030.name, children: [
                { value: subIndustry50203010.value, rank: GicsRank.SubIndustry, name: subIndustry50203010.name, definition: subIndustry50203010.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector55.value, rank: sector55.rank, name: sector55.name, children: [
        {
          value: industryGroup5510.value, rank: industryGroup5510.rank, name: industryGroup5510.name, children: [
            {
              value: industry551010.value, rank: industry551010.rank, name: industry551010.name, children: [
                { value: subIndustry55101010.value, rank: GicsRank.SubIndustry, name: subIndustry55101010.name, definition: subIndustry55101010.definition }
              ]
            },
            {
              value: industry551020.value, rank: industry551020.rank, name: industry551020.name, children: [
                { value: subIndustry55102010.value, rank: GicsRank.SubIndustry, name: subIndustry55102010.name, definition: subIndustry55102010.definition }
              ]
            },
            {
              value: industry551030.value, rank: industry551030.rank, name: industry551030.name, children: [
                { value: subIndustry55103010.value, rank: GicsRank.SubIndustry, name: subIndustry55103010.name, definition: subIndustry55103010.definition }
              ]
            },
            {
              value: industry551040.value, rank: industry551040.rank, name: industry551040.name, children: [
                { value: subIndustry55104010.value, rank: GicsRank.SubIndustry, name: subIndustry55104010.name, definition: subIndustry55104010.definition }
              ]
            },
            {
              value: industry551050.value, rank: industry551050.rank, name: industry551050.name, children: [
                { value: subIndustry55105010.value, rank: GicsRank.SubIndustry, name: subIndustry55105010.name, definition: subIndustry55105010.definition },
                { value: subIndustry55105020.value, rank: GicsRank.SubIndustry, name: subIndustry55105020.name, definition: subIndustry55105020.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: sector60.value, rank: sector60.rank, name: sector60.name, children: [
        {
          value: industryGroup6010.value, rank: industryGroup6010.rank, name: industryGroup6010.name, children: [
            {
              value: industry601010.value, rank: industry601010.rank, name: industry601010.name, children: [
                { value: subIndustry60101010.value, rank: GicsRank.SubIndustry, name: subIndustry60101010.name, definition: subIndustry60101010.definition },
                { value: subIndustry60101020.value, rank: GicsRank.SubIndustry, name: subIndustry60101020.name, definition: subIndustry60101020.definition },
                { value: subIndustry60101030.value, rank: GicsRank.SubIndustry, name: subIndustry60101030.name, definition: subIndustry60101030.definition },
                { value: subIndustry60101040.value, rank: GicsRank.SubIndustry, name: subIndustry60101040.name, definition: subIndustry60101040.definition },
                { value: subIndustry60101050.value, rank: GicsRank.SubIndustry, name: subIndustry60101050.name, definition: subIndustry60101050.definition },
                { value: subIndustry60101060.value, rank: GicsRank.SubIndustry, name: subIndustry60101060.name, definition: subIndustry60101060.definition },
                { value: subIndustry60101070.value, rank: GicsRank.SubIndustry, name: subIndustry60101070.name, definition: subIndustry60101070.definition },
                { value: subIndustry60101080.value, rank: GicsRank.SubIndustry, name: subIndustry60101080.name, definition: subIndustry60101080.definition }
              ]
            },
            {
              value: industry601020.value, rank: industry601020.rank, name: industry601020.name, children: [
                { value: subIndustry60102010.value, rank: GicsRank.SubIndustry, name: subIndustry60102010.name, definition: subIndustry60102010.definition },
                { value: subIndustry60102020.value, rank: GicsRank.SubIndustry, name: subIndustry60102020.name, definition: subIndustry60102020.definition },
                { value: subIndustry60102030.value, rank: GicsRank.SubIndustry, name: subIndustry60102030.name, definition: subIndustry60102030.definition },
                { value: subIndustry60102040.value, rank: GicsRank.SubIndustry, name: subIndustry60102040.name, definition: subIndustry60102040.definition }
              ]
            }
          ]
        }
      ]
    }
  ]
};
