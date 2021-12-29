// This code is automatically generated. Do not edit!
/* eslint-disable max-len */

import { HierarchyTreeNode } from '../../../charts/hierarchy-tree/hierarchy-tree';

export const enum IcbRank {
  Industry = 'Industry',
  Supersector = 'Supersector',
  Sector = 'Sector',
  Subsector = 'Subsector'
}

export interface IcbNode extends HierarchyTreeNode {
  rank: IcbRank;
  value: number;
  name: string;
  definition?: string;
  children?: IcbNode[];
}

export interface IcbTaxonomy extends HierarchyTreeNode {
  children?: IcbNode[];
}

export interface IcbLevel {
  rank: IcbRank;
  value: number;
  name: string;
  definition?: string;
}

const industry10: IcbLevel = { value: 10, rank: IcbRank.Industry, name: 'Technology', definition: 'Companies that are primarily engaged in the advancement of the information technology and electronics industries. It includes companies developing integrated computer systems and services, application software not specific to industry market segments, digital platform providers that generate revenue from advertising contents, and derive subscription fees from an advertiser. Also included are companies that develop next generation electronics and related components. Disruptors leveraging �new� technology will not generally constitute their placement in the Technology Industry. Rather, individual company technology applications and services will be reviewed as to the markets they serve. Examples include: companies that provide health care, technology equipment, electronic entertainment (video games), e-retailers, and transaction processing service companies.' };
const industry15: IcbLevel = { value: 15, rank: IcbRank.Industry, name: 'Telecommunications', definition: 'Contains companies that own and operate telecommunication infrastructures to provide content delivery services. Also included are manufacturers of telecommunication equipment and components.' };
const industry20: IcbLevel = { value: 20, rank: IcbRank.Industry, name: 'Health Care', definition: 'Consists of companies that manufacture health care equipment and supplies or that provide health care-related services such as lab services, in-home medical care and operate health care facilities. Also included are companies involved in research, development and production of pharmaceuticals and biotechnology products, and medical cannabis producers.' };
const industry30: IcbLevel = { value: 30, rank: IcbRank.Industry, name: 'Financials', definition: 'Consists of companies engaged in savings, loans, security investment and related activities such as financial data and information providers. Other examples include mortgage/consumer/corporate financing, investment banking and brokerage, asset management and custody, insurance, and Mortgage REITs.' };
const industry35: IcbLevel = { value: 35, rank: IcbRank.Industry, name: 'Real Estate', definition: 'Consists of companies engaged in real estate investment, development, and other real estate related services. Also includes Equity REITs. Mortgage REITs are classified under Financials Industry.' };
const industry40: IcbLevel = { value: 40, rank: IcbRank.Industry, name: 'Consumer Discretionary', definition: 'Contains companies that provide products and services directly to the consumers, and their purchasing habits are non-cyclical in nature (discretionary). Includes companies that manufacture and distribute Household durable goods, apparel, home electronic devices, leisure equipment, and automotive and related parts. The services segment includes hotels, restaurants, retail/e-retail, passenger transportation, and other leisure facilities. Also includes media companies that engage in entertainment content creation and traditional advertisement. Excludes web-portal/hosts that generate revenue through advertisement, which are classified under Technology � Consumer Digital Services.' };
const industry45: IcbLevel = { value: 45, rank: IcbRank.Industry, name: 'Consumer Staples', definition: 'Contains companies that provide products and services directly to the consumers, and their purchasing habits are cyclical in nature (staples). Includes companies that manufacture, distribute, and/or retail food, beverages, and other non-durable household goods. It also includes drug-retailing companies as well as agriculture, fishing, ranching and milling companies.' };
const industry50: IcbLevel = { value: 50, rank: IcbRank.Industry, name: 'Industrials', definition: 'Consists of companies engaged in manufacturing and distribution of capital goods and provider of business support services. Includes aerospace, weapons/defense, commercial vehicles, construction materials, industrial machinery and equipment manufacturers. The service segment includes commercial transportation services, business support, maintenance and security services, international trade, transaction processing, and diversified logistic support services.' };
const industry55: IcbLevel = { value: 55, rank: IcbRank.Industry, name: 'Basic Materials', definition: 'Consists of companies that extract or process raw materials, and manufacturers of semi-finished goods such as chemicals, textile, paper, forest products and related packaging products. Metals and minerals miners, metal alloy producers, and metal fabricators are also included.' };
const industry60: IcbLevel = { value: 60, rank: IcbRank.Industry, name: 'Energy', definition: 'Contains of companies that engage in energy extraction, process, and production activities and produce related energy equipment. Includes both renewable and non-renewable energy companies. Companies that primarily engages in distribution of energy are classified in Utilities Industry.' };
const industry65: IcbLevel = { value: 65, rank: IcbRank.Industry, name: 'Utilities', definition: 'Contains companies that distributes electric, gas, and water. Most companies in this industry are heavily affected by government regulation. Also includes companies that provide waste, recycle, and related environmental services.' };

const supersector1010: IcbLevel = { value: 1010, rank: IcbRank.Supersector, name: 'Technology' };
const supersector1510: IcbLevel = { value: 1510, rank: IcbRank.Supersector, name: 'Telecommunications' };
const supersector2010: IcbLevel = { value: 2010, rank: IcbRank.Supersector, name: 'Health Care' };
const supersector3010: IcbLevel = { value: 3010, rank: IcbRank.Supersector, name: 'Banks' };
const supersector3020: IcbLevel = { value: 3020, rank: IcbRank.Supersector, name: 'Financial Services' };
const supersector3030: IcbLevel = { value: 3030, rank: IcbRank.Supersector, name: 'Insurance' };
const supersector3510: IcbLevel = { value: 3510, rank: IcbRank.Supersector, name: 'Real Estate' };
const supersector4010: IcbLevel = { value: 4010, rank: IcbRank.Supersector, name: 'Automobiles and Parts' };
const supersector4020: IcbLevel = { value: 4020, rank: IcbRank.Supersector, name: 'Consumer Products and Services' };
const supersector4030: IcbLevel = { value: 4030, rank: IcbRank.Supersector, name: 'Media' };
const supersector4040: IcbLevel = { value: 4040, rank: IcbRank.Supersector, name: 'Retailers' };
const supersector4050: IcbLevel = { value: 4050, rank: IcbRank.Supersector, name: 'Travel and Leisure' };
const supersector4510: IcbLevel = { value: 4510, rank: IcbRank.Supersector, name: 'Food, Beverage and Tobacco' };
const supersector4520: IcbLevel = { value: 4520, rank: IcbRank.Supersector, name: 'Personal Care, Drug and Grocery Stores' };
const supersector5010: IcbLevel = { value: 5010, rank: IcbRank.Supersector, name: 'Construction and Materials' };
const supersector5020: IcbLevel = { value: 5020, rank: IcbRank.Supersector, name: 'Industrial Goods and Services' };
const supersector5510: IcbLevel = { value: 5510, rank: IcbRank.Supersector, name: 'Basic Resources' };
const supersector5520: IcbLevel = { value: 5520, rank: IcbRank.Supersector, name: 'Chemicals' };
const supersector6010: IcbLevel = { value: 6010, rank: IcbRank.Supersector, name: 'Energy' };
const supersector6510: IcbLevel = { value: 6510, rank: IcbRank.Supersector, name: 'Utilities' };

const sector101010: IcbLevel = { value: 101010, rank: IcbRank.Sector, name: 'Software and Computer Services' };
const sector101020: IcbLevel = { value: 101020, rank: IcbRank.Sector, name: 'Technology Hardware and Equipment' };
const sector151010: IcbLevel = { value: 151010, rank: IcbRank.Sector, name: 'Telecommunications Equipment' };
const sector151020: IcbLevel = { value: 151020, rank: IcbRank.Sector, name: 'Telecommunications Service Providers' };
const sector201010: IcbLevel = { value: 201010, rank: IcbRank.Sector, name: 'Health Care Providers' };
const sector201020: IcbLevel = { value: 201020, rank: IcbRank.Sector, name: 'Medical Equipment and Services' };
const sector201030: IcbLevel = { value: 201030, rank: IcbRank.Sector, name: 'Pharmaceuticals and Biotechnology' };
const sector301010: IcbLevel = { value: 301010, rank: IcbRank.Sector, name: 'Banks' };
const sector302010: IcbLevel = { value: 302010, rank: IcbRank.Sector, name: 'Finance and Credit Services' };
const sector302020: IcbLevel = { value: 302020, rank: IcbRank.Sector, name: 'Investment Banking and Brokerage Services' };
const sector302030: IcbLevel = { value: 302030, rank: IcbRank.Sector, name: 'Mortgage Real Estate Investment Trusts' };
const sector302040: IcbLevel = { value: 302040, rank: IcbRank.Sector, name: 'Closed End Investments' };
const sector302050: IcbLevel = { value: 302050, rank: IcbRank.Sector, name: 'Open End and Miscellaneous Investment Vehicles' };
const sector303010: IcbLevel = { value: 303010, rank: IcbRank.Sector, name: 'Life Insurance' };
const sector303020: IcbLevel = { value: 303020, rank: IcbRank.Sector, name: 'Nonlife Insurance' };
const sector351010: IcbLevel = { value: 351010, rank: IcbRank.Sector, name: 'Real Estate Investment and Services Development' };
const sector351020: IcbLevel = { value: 351020, rank: IcbRank.Sector, name: 'Real Estate Investment Trusts' };
const sector401010: IcbLevel = { value: 401010, rank: IcbRank.Sector, name: 'Automobiles and Parts' };
const sector402010: IcbLevel = { value: 402010, rank: IcbRank.Sector, name: 'Consumer Services' };
const sector402020: IcbLevel = { value: 402020, rank: IcbRank.Sector, name: 'Household Goods and Home Construction' };
const sector402030: IcbLevel = { value: 402030, rank: IcbRank.Sector, name: 'Leisure Goods' };
const sector402040: IcbLevel = { value: 402040, rank: IcbRank.Sector, name: 'Personal Goods' };
const sector403010: IcbLevel = { value: 403010, rank: IcbRank.Sector, name: 'Media' };
const sector404010: IcbLevel = { value: 404010, rank: IcbRank.Sector, name: 'Retailers' };
const sector405010: IcbLevel = { value: 405010, rank: IcbRank.Sector, name: 'Travel and Leisure' };
const sector451010: IcbLevel = { value: 451010, rank: IcbRank.Sector, name: 'Beverages' };
const sector451020: IcbLevel = { value: 451020, rank: IcbRank.Sector, name: 'Food Producers' };
const sector451030: IcbLevel = { value: 451030, rank: IcbRank.Sector, name: 'Tobacco' };
const sector452010: IcbLevel = { value: 452010, rank: IcbRank.Sector, name: 'Personal Care, Drug and Grocery Stores' };
const sector501010: IcbLevel = { value: 501010, rank: IcbRank.Sector, name: 'Construction and Materials' };
const sector502010: IcbLevel = { value: 502010, rank: IcbRank.Sector, name: 'Aerospace and Defense' };
const sector502020: IcbLevel = { value: 502020, rank: IcbRank.Sector, name: 'Electronic and Electrical Equipment' };
const sector502030: IcbLevel = { value: 502030, rank: IcbRank.Sector, name: 'General Industrials' };
const sector502040: IcbLevel = { value: 502040, rank: IcbRank.Sector, name: 'Industrial Engineering' };
const sector502050: IcbLevel = { value: 502050, rank: IcbRank.Sector, name: 'Industrial & Support Services' };
const sector502060: IcbLevel = { value: 502060, rank: IcbRank.Sector, name: 'Industrial Transportation' };
const sector551010: IcbLevel = { value: 551010, rank: IcbRank.Sector, name: 'Industrial Materials' };
const sector551020: IcbLevel = { value: 551020, rank: IcbRank.Sector, name: 'Industrial Metals and Mining' };
const sector551030: IcbLevel = { value: 551030, rank: IcbRank.Sector, name: 'Precious Metals and Mining' };
const sector552010: IcbLevel = { value: 552010, rank: IcbRank.Sector, name: 'Chemicals' };
const sector601010: IcbLevel = { value: 601010, rank: IcbRank.Sector, name: 'Oil, Gas and Coal' };
const sector601020: IcbLevel = { value: 601020, rank: IcbRank.Sector, name: 'Alternative Energy' };
const sector651010: IcbLevel = { value: 651010, rank: IcbRank.Sector, name: 'Electricity' };
const sector651020: IcbLevel = { value: 651020, rank: IcbRank.Sector, name: 'Gas, Water and Multi-utilities' };
const sector651030: IcbLevel = { value: 651030, rank: IcbRank.Sector, name: 'Waste and Disposal Services' };

const subsector10101010: IcbLevel = { value: 10101010, rank: IcbRank.Subsector, name: 'Computer Services', definition: 'Companies that provide consulting or integration services to other businesses relating to information technology. Includes providers of computer-system design, systems integration, network and systems operations, cloud computing, distributed ledger technology (DLT) consulting and integration, data management and storage, repair services and technical support.' };
const subsector10101015: IcbLevel = { value: 10101015, rank: IcbRank.Subsector, name: 'Software', definition: 'Publishers and distributors of computer software for home or corporate use. Excludes computer game producers, which are classified under Toys Subsector.' };
const subsector10101020: IcbLevel = { value: 10101020, rank: IcbRank.Subsector, name: 'Consumer Digital Services', definition: 'Companies involved in digital platforms that primarily generate revenue from advertising, content delivery and other virtual products for consumers. To a lesser extent they generate subscription fee revenue through related services offered by the platform and/or by the advertisers to utilize data content and customer insight.' };
const subsector10102010: IcbLevel = { value: 10102010, rank: IcbRank.Subsector, name: 'Semiconductors', definition: 'Producers and distributors of semiconductors and other integrated chips, including other products related to the semiconductor industry, such as semiconductor capital equipment and motherboards. Excludes makers of printed circuit boards, which are classified under Electronic Components Subsector.' };
const subsector10102015: IcbLevel = { value: 10102015, rank: IcbRank.Subsector, name: 'Electronic Components', definition: 'Companies involved in the application of high-technology parts to finished products, including printed circuit boards. Excludes communications-related equipment, which are classified under Telecommunications Equipment Subsector.' };
const subsector10102020: IcbLevel = { value: 10102020, rank: IcbRank.Subsector, name: 'Production Technology Equipment', definition: 'Manufactures of tools and/or devices that are used in the creation of semiconductors, lasers, photonics, wafers, and other hightechnology components.' };
const subsector10102030: IcbLevel = { value: 10102030, rank: IcbRank.Subsector, name: 'Computer Hardware', definition: 'Manufacturers and distributors of computers, servers, mainframes, workstations and other computer hardware and subsystems, such as mass-storage drives, mice, keyboards and printers. Companies in this group can provide diverse applications for consumer and commercial use. Including companies providing computing hardware for cryptocurrency mining.' };
const subsector10102035: IcbLevel = { value: 10102035, rank: IcbRank.Subsector, name: 'Electronic Office Equipment', definition: 'Manufacturers and distributors of electronic office equipment, including photocopiers and fax machines.' };
const subsector15101010: IcbLevel = { value: 15101010, rank: IcbRank.Subsector, name: 'Telecommunications Equipment', definition: 'Makers and distributors of high-technology communication products, including satellites, mobile telephones, fibers optics, switching devices, local and wide-area networks, teleconferencing equipment and connectivity devices for computers, including hubs and routers.' };
const subsector15102010: IcbLevel = { value: 15102010, rank: IcbRank.Subsector, name: 'Cable Television Services', definition: 'Companies that distribute media content through cable and wireless networks, accessed through computers or televisions.' };
const subsector15102015: IcbLevel = { value: 15102015, rank: IcbRank.Subsector, name: 'Telecommunications Services', definition: 'Providers of mobile and fixed-line telephone services, including cellular, satellite and paging services. Includes wireless tower companies that own, operate and lease mobile site towers to multiple wireless service providers. Includes companies that primarily provides telephone services through the internet. Excludes companies whose primary business is internet access.' };
const subsector20101010: IcbLevel = { value: 20101010, rank: IcbRank.Subsector, name: 'Health Care Facilities', definition: 'Owners and operators of primary healthcare property, community hospitals, retirement homes, nursing homes, and related medical businesses.' };
const subsector20101020: IcbLevel = { value: 20101020, rank: IcbRank.Subsector, name: 'Health Care Management Services', definition: 'Companies that offers managed health care benefits and services (e.g., Health Management Organizations (HMO)) including state sponsored programs.' };
const subsector20101025: IcbLevel = { value: 20101025, rank: IcbRank.Subsector, name: 'Health Care Services', definition: 'Companies that provide various specialized disease management services to physicians, health plans, and hospitals. Primary business lines in this category can also include general consultation services, paramedical services, operation of health portals and distribution of health food products.' };
const subsector20101030: IcbLevel = { value: 20101030, rank: IcbRank.Subsector, name: 'Health Care: Misc.', definition: 'Includes Healthcare companies that are not classified in the Healthcare Facilities, Healthcare Management Services or Healthcare Services Subsectors.' };
const subsector20102010: IcbLevel = { value: 20102010, rank: IcbRank.Subsector, name: 'Medical Equipment', definition: 'Manufacturers and distributors of medical devices such as MRI scanners, prosthetics, pacemakers, X-ray machines and other non-disposable medical devices.' };
const subsector20102015: IcbLevel = { value: 20102015, rank: IcbRank.Subsector, name: 'Medical Supplies', definition: 'Manufacturers and distributors of medical supplies used by health care providers and the general public. Includes makers of contact lenses, eyeglass lenses, bandages and other disposable medical supplies.' };
const subsector20102020: IcbLevel = { value: 20102020, rank: IcbRank.Subsector, name: 'Medical Services', definition: 'Companies that operate and manage medical labs and testing services.' };
const subsector20103010: IcbLevel = { value: 20103010, rank: IcbRank.Subsector, name: 'Biotechnology', definition: 'Companies engaged in research into and development of biological substances for the purposes of drug discovery and diagnostic development, and which derive the majority of their revenue from either the sale or licensing of these drugs and diagnostic tools.' };
const subsector20103015: IcbLevel = { value: 20103015, rank: IcbRank.Subsector, name: 'Pharmaceuticals', definition: 'Manufacturers of prescription or over-thecounter drugs, such as aspirin, cold remedies and birth control pills. Includes vaccine producers but excludes vitamin producers, which are classified under Food Products Subsector.' };
const subsector20103020: IcbLevel = { value: 20103020, rank: IcbRank.Subsector, name: 'Cannabis Producers', definition: 'Companies that engage in cannabis cultivation, cannabis distribution including dispensaries, the processing and distribution of cannabis plants, and the creation of cannabis derivative products. Companies that primarily engage in the research, development and manufacturing of cannabis (THC/CBD) based drugs are classified in the Biotechnology or the Pharmaceuticals Subsector.' };
const subsector30101010: IcbLevel = { value: 30101010, rank: IcbRank.Subsector, name: 'Banks', definition: 'Banks providing a broad range of financial services, including retail banking, loans and money transmissions.' };
const subsector30201020: IcbLevel = { value: 30201020, rank: IcbRank.Subsector, name: 'Consumer Lending', definition: 'Companies that provide financial services to consumers including payday loans, student loans, automobile loans, etc.' };
const subsector30201025: IcbLevel = { value: 30201025, rank: IcbRank.Subsector, name: 'Mortgage Finance', definition: 'Companies that provide mortgages, mortgage insurance and other related services.' };
const subsector30201030: IcbLevel = { value: 30201030, rank: IcbRank.Subsector, name: 'Financial Data Providers', definition: 'Companies provide financial decision support tools for investment institutions. Including financial database operators and index data providers.' };
const subsector30202000: IcbLevel = { value: 30202000, rank: IcbRank.Subsector, name: 'Diversified Financial Services', definition: 'Companies providing a diversified range of services such as investment banking, trading, and asset management. Diversified Investment Holding companies engaged in acquiring equity stake of listed securities are also classified in this group.' };
const subsector30202010: IcbLevel = { value: 30202010, rank: IcbRank.Subsector, name: 'Asset Managers and Custodians', definition: 'Companies that provide custodial, trustee and other related fiduciary services. i.e. mutual fund and private investment management. Also includes companies engaged in private equity and venture capital.' };
const subsector30202015: IcbLevel = { value: 30202015, rank: IcbRank.Subsector, name: 'Investment Services', definition: 'Companies that provide trading and brokerage services for financial assets such as equities, commodities, debts, currency, cryptocurrency. Also includes the operators of stock, currency, and other financial market exchanges.' };
const subsector30203000: IcbLevel = { value: 30203000, rank: IcbRank.Subsector, name: 'Mortgage REITs: Diversified', definition: 'Mortgage REITs that invest in a combination of segments with no specific dominance over one or the other.' };
const subsector30203010: IcbLevel = { value: 30203010, rank: IcbRank.Subsector, name: 'Mortgage REITs: Commercial', definition: 'REITs primarily involved in lending money to commercial real estate owners and operators directly or indirectly through the purchase of mortgages, mortgage backed securities and other mortgage related assets.' };
const subsector30203020: IcbLevel = { value: 30203020, rank: IcbRank.Subsector, name: 'Mortgage REITs: Residential', definition: 'REITs primarily involved in lending money to residential real estate owners and operators directly or indirectly through the purchase of mortgages, mortgage backed securities and other mortgage related assets.' };
const subsector30204000: IcbLevel = { value: 30204000, rank: IcbRank.Subsector, name: 'Closed End Investments', definition: 'Corporate closed-ended investment entities identified under distinguishing legislation, such as investment trusts and venture capital trusts.' };
const subsector30205000: IcbLevel = { value: 30205000, rank: IcbRank.Subsector, name: 'Open End and Miscellaneous Investment Vehicles', definition: 'Cash shells, Special Purpose Acquisition Company (SPACs), Non-corporate, openended investment instruments such as open-ended investment companies and funds, unit trusts, ETFs and currency funds and split capital trusts.' };
const subsector30301010: IcbLevel = { value: 30301010, rank: IcbRank.Subsector, name: 'Life Insurance', definition: 'Companies engaged principally in life and health insurance.' };
const subsector30302010: IcbLevel = { value: 30302010, rank: IcbRank.Subsector, name: 'Full Line Insurance', definition: 'Companies that provide a wide range of insurance products such as a combination of life, property/casualty, and specialty insurance.' };
const subsector30302015: IcbLevel = { value: 30302015, rank: IcbRank.Subsector, name: 'Insurance Brokers', definition: 'Insurance brokers and agents.' };
const subsector30302020: IcbLevel = { value: 30302020, rank: IcbRank.Subsector, name: 'Reinsurance', definition: 'Companies engaged principally in reinsurance.' };
const subsector30302025: IcbLevel = { value: 30302025, rank: IcbRank.Subsector, name: 'Property and Casualty Insurance', definition: 'Companies engaged principally in accident, fire, automotive, marine, malpractice and other classes of nonlife insurance.' };
const subsector35101010: IcbLevel = { value: 35101010, rank: IcbRank.Subsector, name: 'Real Estate Holding and Development', definition: 'Companies that invest directly or indirectly in a variety of types of properties without a concentration on any single type. ' };
const subsector35101015: IcbLevel = { value: 35101015, rank: IcbRank.Subsector, name: 'Real Estate Services', definition: 'Companies that provide services to real estate companies but do not own the properties themselves. Includes agencies, brokers, leasing companies, management companies and advisory services.' };
const subsector35102000: IcbLevel = { value: 35102000, rank: IcbRank.Subsector, name: 'Diversified REITs', definition: 'REITs that invest in a combination of other defined REIT categories.' };
const subsector35102010: IcbLevel = { value: 35102010, rank: IcbRank.Subsector, name: 'Health Care REITs', definition: 'REITs that primarily invest in health care facilities including hospitals, nursing homes and assisted living properties.' };
const subsector35102015: IcbLevel = { value: 35102015, rank: IcbRank.Subsector, name: 'Hotel and Lodging REITs', definition: 'REITs that primarily invest in hotels, motels, resorts or other lodging properties.' };
const subsector35102020: IcbLevel = { value: 35102020, rank: IcbRank.Subsector, name: 'Industrial REITs', definition: 'REITs that primarily invest in industrial properties including industrial warehouses and distribution properties.' };
const subsector35102025: IcbLevel = { value: 35102025, rank: IcbRank.Subsector, name: 'Infrastructure REITs', definition: 'REITs that primarily invest in infrastructure assets including roads, bridges, tunnels, airports, power generation, fuels, pipelines, water and waste management, and communication assets.' };
const subsector35102030: IcbLevel = { value: 35102030, rank: IcbRank.Subsector, name: 'Office REITs', definition: 'REITs that primarily invest in office properties.' };
const subsector35102040: IcbLevel = { value: 35102040, rank: IcbRank.Subsector, name: 'Residential REITs', definition: 'REITs that primarily invest in residential properties including manufactured homes, multifamily homes, apartments, and student housing properties.' };
const subsector35102045: IcbLevel = { value: 35102045, rank: IcbRank.Subsector, name: 'Retail REITs', definition: 'REITs that primarily invest in retail properties including malls, shopping centers, neighborhood and community shopping centers, strip malls, free standing stores, and factory outlets.' };
const subsector35102050: IcbLevel = { value: 35102050, rank: IcbRank.Subsector, name: 'Storage REITs', definition: 'REITs that primarily invest in public selfstorage properties.' };
const subsector35102060: IcbLevel = { value: 35102060, rank: IcbRank.Subsector, name: 'Timber REITs', definition: 'REITs that primarily invest in timberland and timber-related products and activities.' };
const subsector35102070: IcbLevel = { value: 35102070, rank: IcbRank.Subsector, name: 'Other Specialty REITs', definition: 'REITs that primarily invest in any single type of facility or property not specifically defined within another REITs industry.' };
const subsector40101010: IcbLevel = { value: 40101010, rank: IcbRank.Subsector, name: 'Auto Services', definition: 'Companies that provide assistance to individual vehicle owners.' };
const subsector40101015: IcbLevel = { value: 40101015, rank: IcbRank.Subsector, name: 'Tires', definition: 'Manufacturers, distributors and retreaders of automobile, truck and motorcycle tires.' };
const subsector40101020: IcbLevel = { value: 40101020, rank: IcbRank.Subsector, name: 'Automobiles', definition: 'Makers of passenger vehicles, including cars, sport utility vehicles (SUVs) and light trucks. Excludes makers of heavy trucks and makers of recreational vehicles (RVs and ATVs).' };
const subsector40101025: IcbLevel = { value: 40101025, rank: IcbRank.Subsector, name: 'Auto Parts', definition: 'Manufacturers and distributors of new and replacement parts for motorcycles and automobiles, such as engines, carburetors and batteries. Excludes producers of tires, which are classified under Tires Subsector.' };
const subsector40201010: IcbLevel = { value: 40201010, rank: IcbRank.Subsector, name: 'Education Services', definition: 'Companies that own and manage higher education systems, post-secondary degree programs or other educational services.' };
const subsector40201020: IcbLevel = { value: 40201020, rank: IcbRank.Subsector, name: 'Funeral Parlors and Cemetery', definition: 'Companies that own and operate funeral homes, cemeteries, crematoriums and/or provide other funeral services.' };
const subsector40201030: IcbLevel = { value: 40201030, rank: IcbRank.Subsector, name: 'Printing and Copying Services', definition: 'Companies specializing in printing, copying and/or similar solutions for individuals and small businesses.' };
const subsector40201040: IcbLevel = { value: 40201040, rank: IcbRank.Subsector, name: 'Rental and Leasing Services: Consumer', definition: 'Companies that lease automobiles, appliances, electronics or furniture to consumers.' };
const subsector40201050: IcbLevel = { value: 40201050, rank: IcbRank.Subsector, name: 'Storage Facilities', definition: 'Companies that own and operate storage facilities (does not include companies structured as REITs.' };
const subsector40201060: IcbLevel = { value: 40201060, rank: IcbRank.Subsector, name: 'Vending and Catering Service', definition: 'Companies that provide catering and food service and/or food ingredients to individuals or institutions.' };
const subsector40201070: IcbLevel = { value: 40201070, rank: IcbRank.Subsector, name: 'Consumer Services: Misc.', definition: 'Consumer Services companies that are not categorized in the Education Services, Funeral Parlors and Cemeteries, Printing and Copying Services, Rental and Leasing Services, Storage Facilities or Vending and Catering Services categories.' };
const subsector40202010: IcbLevel = { value: 40202010, rank: IcbRank.Subsector, name: 'Home Construction', definition: 'Constructors of residential homes, including manufacturers of mobile and prefabricated homes intended for use in one place.' };
const subsector40202015: IcbLevel = { value: 40202015, rank: IcbRank.Subsector, name: 'Household Furnishings', definition: 'Manufacturers and distributors of furniture, including chairs, tables, desks, and office furniture.' };
const subsector40202020: IcbLevel = { value: 40202020, rank: IcbRank.Subsector, name: 'Household Appliance', definition: 'Companies that manufacture and market household electrical appliances.' };
const subsector40202025: IcbLevel = { value: 40202025, rank: IcbRank.Subsector, name: 'Household Equipment and Products', definition: 'Companies that manufacture and supply various household products. Includes manufacturers of gardening tools, kitchen utensils, dishes and other home related products.' };
const subsector40203010: IcbLevel = { value: 40203010, rank: IcbRank.Subsector, name: 'Consumer Electronics', definition: 'Companies involved in the application of technology and electronics to the consumer discretionary sector.' };
const subsector40203040: IcbLevel = { value: 40203040, rank: IcbRank.Subsector, name: 'Electronic Entertainment', definition: 'Companies that design, manufacture and market video game software and related elements. Also includes non-consumer entertainment technology, e.g. Dolby.' };
const subsector40203045: IcbLevel = { value: 40203045, rank: IcbRank.Subsector, name: 'Toys', definition: 'Manufacturers and distributors of toys, including such toys and games as playing cards, board games, stuffed animals and dolls.' };
const subsector40203050: IcbLevel = { value: 40203050, rank: IcbRank.Subsector, name: 'Recreational Products', definition: 'Manufacturers and distributors of recreational equipment not classified in other "Leisure Goods" categories, including Musical Instruments.' };
const subsector40203055: IcbLevel = { value: 40203055, rank: IcbRank.Subsector, name: 'Recreational Vehicles and Boats', definition: 'Companies that design, manufacture and market recreation vehicles (RVs), motorcycles or passenger boats.' };
const subsector40203060: IcbLevel = { value: 40203060, rank: IcbRank.Subsector, name: 'Photography', definition: 'Companies that produce and/or market professional and/or personal imaging products including digital cameras and film cameras.' };
const subsector40204020: IcbLevel = { value: 40204020, rank: IcbRank.Subsector, name: 'Clothing and Accessories', definition: 'Manufacturers and distributors of all types of clothing and accessories. Includes sportswear, sunglasses, eyeglass frames, leather clothing and goods, and processors of hides and skins. Excludes jewelry, which is categorized under Luxury Items.' };
const subsector40204025: IcbLevel = { value: 40204025, rank: IcbRank.Subsector, name: 'Footwear', definition: 'Manufacturers and distributors of shoes, boots, sandals, sneakers and other types of footwear.' };
const subsector40204030: IcbLevel = { value: 40204030, rank: IcbRank.Subsector, name: 'Luxury Items', definition: 'Companies that manufacture and market jewelry, watches and gemstones.' };
const subsector40204035: IcbLevel = { value: 40204035, rank: IcbRank.Subsector, name: 'Cosmetics', definition: 'Companies that produce and market make-up and fragrance products (perfume). Excludes personal care products, which are classified under Consumer Staples Industry.' };
const subsector40301010: IcbLevel = { value: 40301010, rank: IcbRank.Subsector, name: 'Entertainment', definition: 'Companies that provide various media services including feature films, music and television shows and stations.' };
const subsector40301020: IcbLevel = { value: 40301020, rank: IcbRank.Subsector, name: 'Media Agencies', definition: 'Companies that provide a wide range of marketing and public relations services such as promoting advertising space in telephone and professional directories, analyzing market research and other various marketing activities. Excluding website design/publishing, which are classified under the Consumer Digital Services Subsector.' };
const subsector40301030: IcbLevel = { value: 40301030, rank: IcbRank.Subsector, name: 'Publishing', definition: 'Companies that provide advertising and publishing services to customers in industrial, commercial, and design markets. This includes companies that publish books, magazines, comics, encyclopedias, financial reports, journals and/or newspapers.' };
const subsector40301035: IcbLevel = { value: 40301035, rank: IcbRank.Subsector, name: 'Radio and TV Broadcasters', definition: 'Companies with principal activities that include operating commercial TV stations and/or radio broadcasting.' };
const subsector40401010: IcbLevel = { value: 40401010, rank: IcbRank.Subsector, name: 'Diversified Retailers', definition: 'Retail outlets and wholesalers offering a wide variety of products including both hard goods and soft goods.' };
const subsector40401020: IcbLevel = { value: 40401020, rank: IcbRank.Subsector, name: 'Apparel Retailers', definition: 'Retailers and wholesalers specializing mainly in clothing, shoes, jewelry, sunglasses and other accessories.' };
const subsector40401025: IcbLevel = { value: 40401025, rank: IcbRank.Subsector, name: 'Home Improvement Retailers', definition: 'Retailers and wholesalers concentrating on the sale of home improvement products, including garden equipment, carpets, wallpaper, paint, home furniture, blinds and curtains, and building materials.' };
const subsector40401030: IcbLevel = { value: 40401030, rank: IcbRank.Subsector, name: 'Specialty Retailers', definition: 'Retailers and wholesalers concentrating on a single class of goods, such as electronics, books, automotive parts or closeouts. Includes automobile dealerships, video rental stores, dollar stores, duty-free shops and automotive fuel stations not owned by oil companies. Excludes Apparel and Home Improvement Retailers.' };
const subsector40501010: IcbLevel = { value: 40501010, rank: IcbRank.Subsector, name: 'Airlines', definition: 'Companies providing primarily passenger air transport. Excludes airports, which are classified under Transportation Services Sector.' };
const subsector40501015: IcbLevel = { value: 40501015, rank: IcbRank.Subsector, name: 'Travel and Tourism', definition: 'Companies providing travel and tourism related services, including travel agents, online travel reservation services, and companies that provide passenger transportation for leisure are included, such as tour buses, leisure cruisers and railways, and taxis. Excludes mass public transportation services which are classified under Industrial Transportation Sector.' };
const subsector40501020: IcbLevel = { value: 40501020, rank: IcbRank.Subsector, name: 'Casino and Gambling', definition: 'Providers of gambling and casino facilities. Includes online casinos, racetracks and the manufacturers of pachinko machines and casino and lottery equipment.' };
const subsector40501025: IcbLevel = { value: 40501025, rank: IcbRank.Subsector, name: 'Hotels and Motels', definition: 'Operators and managers of hotels, motels, lodges, resorts, spas and campgrounds.' };
const subsector40501030: IcbLevel = { value: 40501030, rank: IcbRank.Subsector, name: 'Recreational Services', definition: 'Providers of leisure facilities and services, including fitness centers, amusement parks, concerts and sports/e-sports event promotion. Also includes companies that own and manage professional sports teams.' };
const subsector40501040: IcbLevel = { value: 40501040, rank: IcbRank.Subsector, name: 'Restaurants and Bars', definition: 'Operators of restaurants, fast-food facilities, coffee shops and bars. Includes integrated brewery companies. Excludes catering companies, which are classified under Vending and Catering Service Subsector.' };
const subsector45101010: IcbLevel = { value: 45101010, rank: IcbRank.Subsector, name: 'Brewers', definition: 'Manufacturers and shippers of cider or malt products such as beer, ale and stout.' };
const subsector45101015: IcbLevel = { value: 45101015, rank: IcbRank.Subsector, name: 'Distillers and Vintners', definition: 'Producers, distillers, vintners, blenders and shippers of wine and spirits such as whisky, brandy, rum, gin or liqueurs.' };
const subsector45101020: IcbLevel = { value: 45101020, rank: IcbRank.Subsector, name: 'Soft Drinks', definition: 'Manufacturers, bottlers and distributors of non-alcoholic beverages, such as soda, fruit juices, tea, coffee and bottled water.' };
const subsector45102010: IcbLevel = { value: 45102010, rank: IcbRank.Subsector, name: 'Farming, Fishing, Ranching and Plantations', definition: 'Companies that grow crops or raise livestock, operate fisheries or own nontobacco plantations. Includes manufacturers of livestock feeds and seeds and other agricultural products.' };
const subsector45102020: IcbLevel = { value: 45102020, rank: IcbRank.Subsector, name: 'Food Products', definition: 'Food producers, including meatpacking, snacks, fruits, vegetables, dairy products and frozen seafood. Includes producers of pet food and manufacturers of dietary supplements, vitamins and related items. Excludes producers of fruit juices, tea, coffee, bottled water and other nonalcoholic beverages, which are classified under Soft Drinks Subsector.' };
const subsector45102030: IcbLevel = { value: 45102030, rank: IcbRank.Subsector, name: 'Fruit and Grain Processing', definition: 'Companies involved in the value-adding process of various "raw" or "unprocessed" agricultural products. May also produce and market such products.' };
const subsector45102035: IcbLevel = { value: 45102035, rank: IcbRank.Subsector, name: 'Sugar', definition: 'Companies that grow, refine, process and distribute sugar.' };
const subsector45103010: IcbLevel = { value: 45103010, rank: IcbRank.Subsector, name: 'Tobacco', definition: 'Manufacturers and distributors of cigarettes, cigars and other tobacco products. Includes tobacco plantations.' };
const subsector45201010: IcbLevel = { value: 45201010, rank: IcbRank.Subsector, name: 'Food Retailers and Wholesalers', definition: 'Supermarkets, food-oriented convenience stores and other food retailers and distributors. Includes retailers of dietary supplements and vitamins.' };
const subsector45201015: IcbLevel = { value: 45201015, rank: IcbRank.Subsector, name: 'Drug Retailers', definition: 'Operators of pharmacies, including wholesalers and distributors catering to these businesses.' };
const subsector45201020: IcbLevel = { value: 45201020, rank: IcbRank.Subsector, name: 'Personal Products', definition: 'Makers and distributors of toiletries and personal-care and hygiene products, including deodorants, soaps, toothpaste, perfumes, diapers, shampoos, razors, condoms and feminine-hygiene products. Excludes makers of hormonal (oral or injection) and implants (intrauterine devices) and contraceptives, which are classified under the Pharmaceuticals Subsector.' };
const subsector45201030: IcbLevel = { value: 45201030, rank: IcbRank.Subsector, name: 'Nondurable Househ old Products', definition: 'Producers and distributors of pens, paper goods, batteries, light bulbs, tissues, toilet paper and cleaning products such as soaps and polishes.' };
const subsector45201040: IcbLevel = { value: 45201040, rank: IcbRank.Subsector, name: 'Miscellaneous Consumer Staple Goods', definition: 'Includes Consumer Staples companies that are not classified in any other Consumer Staples industry.' };
const subsector50101010: IcbLevel = { value: 50101010, rank: IcbRank.Subsector, name: 'Construction', definition: 'Companies that provide construction and infrastructure development services to private and/or public-sector clients.' };
const subsector50101015: IcbLevel = { value: 50101015, rank: IcbRank.Subsector, name: 'Engineering and Contracting Services', definition: 'Companies that provide capital project planning and solutions. Includes engineering contracts, infrastructure development, bid preparation, interior enhancement designs and architects.' };
const subsector50101020: IcbLevel = { value: 50101020, rank: IcbRank.Subsector, name: 'Building, Roofing/Wallboard and Plumbing', definition: 'Companies that design, manufacture, market and/or install non-climate control systems and related products such as siding, windows and water pipes.' };
const subsector50101025: IcbLevel = { value: 50101025, rank: IcbRank.Subsector, name: 'Building: Climate Control', definition: 'Companies that design, manufacture, market and/or install air conditioning, heating and/or refrigeration systems.' };
const subsector50101030: IcbLevel = { value: 50101030, rank: IcbRank.Subsector, name: 'Cement', definition: 'Companies primarily engaged in manufacturing and distributing cement and cement-derived products.' };
const subsector50101035: IcbLevel = { value: 50101035, rank: IcbRank.Subsector, name: 'Building Materials: Other', definition: 'Companies that provide materials to the building and construction industry, excluding air-conditioning, cement, heating, plumbing, roofing, and wall boards.' };
const subsector50201010: IcbLevel = { value: 50201010, rank: IcbRank.Subsector, name: 'Aerospace', definition: 'Manufacturers, assemblers and distributors of aircraft and aircraft parts primarily used in commercial or private air transport. Excludes manufacturers of communications satellites, which are classified under Telecommunications Equipment Subsector.' };
const subsector50201020: IcbLevel = { value: 50201020, rank: IcbRank.Subsector, name: 'Defense', definition: 'Producers of components and equipment for the defense industry, including military aircraft, radar equipment and weapons.' };
const subsector50202010: IcbLevel = { value: 50202010, rank: IcbRank.Subsector, name: 'Electrical Components', definition: 'Makers and distributors of electrical parts for finished products such as radios, televisions and other consumer electronics. Includes makers of cables, wires, ceramics, transistors, and electric adapters.' };
const subsector50202020: IcbLevel = { value: 50202020, rank: IcbRank.Subsector, name: 'Electronic Equipment: Control and Filter', definition: 'Companies primarily involved in providing mechanical and electronic security and/or filtration systems.' };
const subsector50202025: IcbLevel = { value: 50202025, rank: IcbRank.Subsector, name: 'Electronic Equipment: Gauges and Meters', definition: 'Companies that design, manufacture and market products used to measure electric, gas, water and other data for use in a variety of industries.' };
const subsector50202030: IcbLevel = { value: 50202030, rank: IcbRank.Subsector, name: 'Electronic Equipment: Pollution Control', definition: 'Companies primarily engaged in the production of pollution control equipment for purification of air and liquids. Also included are companies that provide services such as decontamination, solvent disposal management, used oil collection, vacuum truck services and recycling.' };
const subsector50202040: IcbLevel = { value: 50202040, rank: IcbRank.Subsector, name: 'Electronic Equipment: Other', definition: 'Companies that specialize in the development and production of electrical devices/components marketed to business clients.' };
const subsector50203000: IcbLevel = { value: 50203000, rank: IcbRank.Subsector, name: 'Diversified Industrials', definition: 'Companies engaged in three or more industrial business activities, none of which is the dominant business line.' };
const subsector50203010: IcbLevel = { value: 50203010, rank: IcbRank.Subsector, name: 'Paints and Coatings', definition: 'Companies that manufacture and distribute paint, material coatings, and resins.' };
const subsector50203015: IcbLevel = { value: 50203015, rank: IcbRank.Subsector, name: 'Plastics', definition: 'Companies that manufacture and market plastic products or chemicals used to make plastic.' };
const subsector50203020: IcbLevel = { value: 50203020, rank: IcbRank.Subsector, name: 'Glass', definition: 'Companies that manufacture various structural glasses such as float glass, architectural glass, delicacy glass, automotive glass, and other glass products. Excludes glass containers/bottles prepared for other markets.' };
const subsector50203030: IcbLevel = { value: 50203030, rank: IcbRank.Subsector, name: 'Containers and Packaging', definition: 'Companies that may produces a wide range of packaging products and packaging related materials, including cartons, plastic bottles, jars, glass bottles, aluminum cans, dispensing pumps, aerosol valves, etc.' };
const subsector50204000: IcbLevel = { value: 50204000, rank: IcbRank.Subsector, name: 'Machinery: Industrial', definition: 'Companies that design, develop, manufacture, sell, and support general industrial machines and parts. This excludes all the other machinery Subsectors specified.' };
const subsector50204010: IcbLevel = { value: 50204010, rank: IcbRank.Subsector, name: 'Machinery: Agricultural', definition: 'Manufacturers and distributers of a range of farming equipment for irrigation, harvesting, plowing and other processes.' };
const subsector50204020: IcbLevel = { value: 50204020, rank: IcbRank.Subsector, name: 'Machinery: Construction and Handling', definition: 'Companies that design, manufacture and market large-size industrial equipment for construction and ports.' };
const subsector50204030: IcbLevel = { value: 50204030, rank: IcbRank.Subsector, name: 'Machinery: Engines', definition: 'Companies that manufacture and distribute energy output devices and component parts, including diesel engines and gas engines.' };
const subsector50204040: IcbLevel = { value: 50204040, rank: IcbRank.Subsector, name: 'Machinery: Tools', definition: 'Companies that manufactures and market value-adding equipment for various heavy industries.' };
const subsector50204050: IcbLevel = { value: 50204050, rank: IcbRank.Subsector, name: 'Machinery: Specialty', definition: 'Companies that design, manufacture and market a specific type or group of industrial machines and parts. This excludes all the other Machinery industries categorized in the Machinery Subsector.' };
const subsector50205010: IcbLevel = { value: 50205010, rank: IcbRank.Subsector, name: 'Industrial Suppliers', definition: 'Distributors and wholesalers of diversified products and equipment primarily used in the commercial and industrial sectors. Includes builder�s merchants and companies providing Maintenance/Repair services.' };
const subsector50205015: IcbLevel = { value: 50205015, rank: IcbRank.Subsector, name: 'Transaction Processing Services', definition: 'Providers of computerized transaction processing services. Includes companies that engages in any aspects of global payment services such as routing of payment information and related data services that facilitate the authorization, clearing, and settlement of transactions. Includes card network operators, issuer and acquirer processors.' };
const subsector50205020: IcbLevel = { value: 50205020, rank: IcbRank.Subsector, name: 'Professional Business Support Services', definition: 'Companies that provide outsourced business operation services. This includes consulting services, corporate taxes, and business decision tools such as credit monitoring and KYC database service. Credit Agencies and Rating firms are classified under the Financial Data Providers Subsector.' };
const subsector50205025: IcbLevel = { value: 50205025, rank: IcbRank.Subsector, name: 'Business Training and Employment Agencies', definition: 'Providers of business or management training courses and employment services.' };
const subsector50205030: IcbLevel = { value: 50205030, rank: IcbRank.Subsector, name: 'Forms and Bulk Printing Services', definition: 'Companies that provide printed business products including forms, checks, labels and IDs.' };
const subsector50205040: IcbLevel = { value: 50205040, rank: IcbRank.Subsector, name: 'Security Services', definition: 'Companies that provide security services, install, service and monitor alarm and security systems.' };
const subsector50206010: IcbLevel = { value: 50206010, rank: IcbRank.Subsector, name: 'Trucking', definition: 'Companies that provide commercial trucking or mass public bus services. Excludes road and tunnel operators, which are classified under Transportation Services Subsector.' };
const subsector50206015: IcbLevel = { value: 50206015, rank: IcbRank.Subsector, name: 'Commercial Vehicles and Parts', definition: 'Companies that design, develop, manufacture, and distribute light, medium and heavy-duty trucks and vans. Also includes related aftermarket distribution of parts.' };
const subsector50206020: IcbLevel = { value: 50206020, rank: IcbRank.Subsector, name: 'Railroads', definition: 'Companies that operate railway systems for transporting goods and mass public rail services.' };
const subsector50206025: IcbLevel = { value: 50206025, rank: IcbRank.Subsector, name: 'Railroad Equipment', definition: 'Companies that manufacture, supply and distribute railroad supplies.' };
const subsector50206030: IcbLevel = { value: 50206030, rank: IcbRank.Subsector, name: 'Marine Transportation', definition: 'Providers of on-water transportation for commercial markets, such as container shipping. Excludes ports, which are classified under Transportation Services, and shipbuilders.' };
const subsector50206040: IcbLevel = { value: 50206040, rank: IcbRank.Subsector, name: 'Delivery Services', definition: 'Operators of mail and package delivery services for commercial and consumer use. Includes courier and logistic services primarily involving air transportation.' };
const subsector50206050: IcbLevel = { value: 50206050, rank: IcbRank.Subsector, name: 'Commercial Vehicle-Equipment Leasing', definition: 'Companies that rents and lease operational equipment to commercial clients, such as: rails, tankers, freight cars, related equipment plus aviation assets (jets and airplanes).' };
const subsector50206060: IcbLevel = { value: 50206060, rank: IcbRank.Subsector, name: 'Transportation Services', definition: 'Companies providing services to the Industrial Transportation sector, including companies that manage airports, train depots, roads, bridges, tunnels, ports, and providers of logistic services to shippers of goods. Includes companies that provide aircraft and vehicle maintenance services.' };
const subsector55101000: IcbLevel = { value: 55101000, rank: IcbRank.Subsector, name: 'Diversified Materials', definition: 'Companies involved in manufacturing a diversified range of materials (e.g., bauxite, abrasive materials and composite material).' };
const subsector55101010: IcbLevel = { value: 55101010, rank: IcbRank.Subsector, name: 'Forestry', definition: 'Owners and operators of timber tracts, forest tree nurseries and sawmills. Excludes providers of finished wood products such as wooden beams, which are classified under Building Materials. Also excludes timber REITs, which are classified under Real Estate Industry.' };
const subsector55101015: IcbLevel = { value: 55101015, rank: IcbRank.Subsector, name: 'Paper', definition: 'Companies that manufacture and market paper products including office paper, cardboard, tissue paper, newsprint, commercial pulp, etc.' };
const subsector55101020: IcbLevel = { value: 55101020, rank: IcbRank.Subsector, name: 'Textile Products', definition: 'Companies that produce and distribute various textile products such as cotton yarns, denims, and other finished fabrics.' };
const subsector55102000: IcbLevel = { value: 55102000, rank: IcbRank.Subsector, name: 'General Mining', definition: 'Companies engaged in the exploration, extraction or refining of minerals not defined elsewhere within the Mining sector. Also includes companies engaged in diversified metals and mining and providers of contracted drilling services. Excludes companies that primarily provide services to Oil and Gas companies which are classified in Oil Equipment and Services Subsector.' };
const subsector55102010: IcbLevel = { value: 55102010, rank: IcbRank.Subsector, name: 'Iron and Steel', definition: 'Companies that mine for iron ore and companies that produce, process, and distribute steel products. This can include welding consumables, strip steel, rods, bars, wires, piping, tubing, rails, and structural products as well as sheets and coils.' };
const subsector55102015: IcbLevel = { value: 55102015, rank: IcbRank.Subsector, name: 'Metal Fabricating', definition: 'Companies that manufacture and supply fabricated metal components such as, rings, piping materials, hinges, springs, etc.' };
const subsector55102035: IcbLevel = { value: 55102035, rank: IcbRank.Subsector, name: 'Aluminum', definition: 'Companies that mine or process bauxite or manufacture and distribute aluminum bars, rods and other products for use by other industries. Excludes manufacturers of finished aluminum products, such as siding, which are categorized according to the type of end product.' };
const subsector55102040: IcbLevel = { value: 55102040, rank: IcbRank.Subsector, name: 'Copper', definition: 'Companies primarily involved in the mining, extraction and distribution of copper and related minerals.' };
const subsector55102050: IcbLevel = { value: 55102050, rank: IcbRank.Subsector, name: 'Nonferrous Metals', definition: 'Producers and traders of metals and primary metal products other than iron, aluminum and steel. Excludes companies that make finished products, which are categorized according to the type of end product.' };
const subsector55103020: IcbLevel = { value: 55103020, rank: IcbRank.Subsector, name: 'Diamonds and Gemstones', definition: 'Companies engaged in the exploration for and production of diamonds and other gemstones.' };
const subsector55103025: IcbLevel = { value: 55103025, rank: IcbRank.Subsector, name: 'Gold Mining', definition: 'Prospectors for and extractors or refiners of gold-bearing ores.' };
const subsector55103030: IcbLevel = { value: 55103030, rank: IcbRank.Subsector, name: 'Platinum and Precious Metals', definition: 'Companies engaged in the exploration for and production of platinum, silver and other precious metals not defined elsewhere.' };
const subsector55201000: IcbLevel = { value: 55201000, rank: IcbRank.Subsector, name: 'Chemicals: Diversified', definition: 'Companies that manufacture and market a diversified range of industrial chemicals.' };
const subsector55201010: IcbLevel = { value: 55201010, rank: IcbRank.Subsector, name: 'Chemicals and Synthetic Fibers', definition: 'Companies that manufacture and distribute chemical fibers for various applications.' };
const subsector55201015: IcbLevel = { value: 55201015, rank: IcbRank.Subsector, name: 'Fertilizers', definition: 'Companies that manufacture and market nitrogen fertilizers and other agricultural chemicals.' };
const subsector55201020: IcbLevel = { value: 55201020, rank: IcbRank.Subsector, name: 'Specialty Chemicals', definition: 'Companies that manufacture and market a specific type or group of chemicals elsewhere in the Chemicals Subsector.' };
const subsector60101000: IcbLevel = { value: 60101000, rank: IcbRank.Subsector, name: 'Integrated Oil and Gas', definition: 'Companies that engage in all three fields of petroleum production: Extraction (upstream), Transportation (midstream), and Refining and Marketing (downstream).' };
const subsector60101010: IcbLevel = { value: 60101010, rank: IcbRank.Subsector, name: 'Oil: Crude Producers', definition: 'Companies engaged in the exploration for and drilling, production, and supply of crude oil on land.' };
const subsector60101015: IcbLevel = { value: 60101015, rank: IcbRank.Subsector, name: 'Offshore Drilling and Other Services', definition: 'Companies that primarily explore and drill for oil and gas in offshore areas.' };
const subsector60101020: IcbLevel = { value: 60101020, rank: IcbRank.Subsector, name: 'Oil Refining and Marketing', definition: 'Companies primarily engaged in the refining and marketing of petroleum products (downstream).' };
const subsector60101030: IcbLevel = { value: 60101030, rank: IcbRank.Subsector, name: 'Oil Equipment and Services', definition: 'Suppliers of equipment and services to oil fields and offshore platforms, such as drilling, exploration, seismic-information services and platform construction.' };
const subsector60101035: IcbLevel = { value: 60101035, rank: IcbRank.Subsector, name: 'Pipelines', definition: 'Operators of pipelines carrying oil, gas or other forms of fuel. Excludes pipeline operators that derive the majority of their revenues from direct sales to end users, which are classified under Gas Distribution Subsector.' };
const subsector60101040: IcbLevel = { value: 60101040, rank: IcbRank.Subsector, name: 'Coal', definition: 'Companies that mine, process and market coal.' };
const subsector60102010: IcbLevel = { value: 60102010, rank: IcbRank.Subsector, name: 'Alternative Fuels', definition: 'Companies that produce alternative fuels such as ethanol, methanol, hydrogen and bio-fuels that are mainly used to power vehicles, and companies that are involved in the production of vehicle fuel cells and/or the development of alternative fueling infrastructure.' };
const subsector60102020: IcbLevel = { value: 60102020, rank: IcbRank.Subsector, name: 'Renewable Energy Equipment', definition: 'Companies that develop or manufacture renewable energy equipment utilizing sources such as solar, wind, tidal, geothermal, hydro and waves.' };
const subsector65101010: IcbLevel = { value: 65101010, rank: IcbRank.Subsector, name: 'Alternative Electricity', definition: 'Companies generating and distributing electricity from a renewable source. Includes companies that produce solar, water, wind and geothermal electricity.' };
const subsector65101015: IcbLevel = { value: 65101015, rank: IcbRank.Subsector, name: 'Conventional Electricity', definition: 'Companies generating and distributing electricity through the burning of fossil fuels such as coal, petroleum and natural gas, and through nuclear energy.' };
const subsector65102000: IcbLevel = { value: 65102000, rank: IcbRank.Subsector, name: 'MultiUtilities', definition: 'Companies that engage in multiple utilities that have no particular dominance over one another.' };
const subsector65102020: IcbLevel = { value: 65102020, rank: IcbRank.Subsector, name: 'Gas Distribution', definition: 'Distributors of gas to end users. Excludes providers of natural gas as a commodity, which are classified under the Oil and Gas industry.' };
const subsector65102030: IcbLevel = { value: 65102030, rank: IcbRank.Subsector, name: 'Water', definition: 'Companies providing water to end users, including water treatment plants.' };
const subsector65103035: IcbLevel = { value: 65103035, rank: IcbRank.Subsector, name: 'Waste and Disposal Services', definition: 'Providers of pollution control and environmental services for the management, recovery and disposal of solid and hazardous waste materials, such as landfills and recycling centers. Excludes manufacturers of industrial air and water filtration equipment, which are classified under Electronic Equipment: Pollution Control Subsector.' };

const icbMap: Map<number, IcbLevel[]> = new Map([
  [industry10.value, [industry10]],
  [industry15.value, [industry15]],
  [industry20.value, [industry20]],
  [industry30.value, [industry30]],
  [industry35.value, [industry35]],
  [industry40.value, [industry40]],
  [industry45.value, [industry45]],
  [industry50.value, [industry50]],
  [industry55.value, [industry55]],
  [industry60.value, [industry60]],
  [industry65.value, [industry65]],

  [supersector1010.value, [industry10, supersector1010]],
  [supersector1510.value, [industry15, supersector1510]],
  [supersector2010.value, [industry20, supersector2010]],
  [supersector3010.value, [industry30, supersector3010]],
  [supersector3020.value, [industry30, supersector3020]],
  [supersector3030.value, [industry30, supersector3030]],
  [supersector3510.value, [industry35, supersector3510]],
  [supersector4010.value, [industry40, supersector4010]],
  [supersector4020.value, [industry40, supersector4020]],
  [supersector4030.value, [industry40, supersector4030]],
  [supersector4040.value, [industry40, supersector4040]],
  [supersector4050.value, [industry40, supersector4050]],
  [supersector4510.value, [industry45, supersector4510]],
  [supersector4520.value, [industry45, supersector4520]],
  [supersector5010.value, [industry50, supersector5010]],
  [supersector5020.value, [industry50, supersector5020]],
  [supersector5510.value, [industry55, supersector5510]],
  [supersector5520.value, [industry55, supersector5520]],
  [supersector6010.value, [industry60, supersector6010]],
  [supersector6510.value, [industry65, supersector6510]],

  [sector101010.value, [industry10, supersector1010, sector101010]],
  [sector101020.value, [industry10, supersector1010, sector101020]],
  [sector151010.value, [industry15, supersector1510, sector151010]],
  [sector151020.value, [industry15, supersector1510, sector151020]],
  [sector201010.value, [industry20, supersector2010, sector201010]],
  [sector201020.value, [industry20, supersector2010, sector201020]],
  [sector201030.value, [industry20, supersector2010, sector201030]],
  [sector301010.value, [industry30, supersector3010, sector301010]],
  [sector302010.value, [industry30, supersector3020, sector302010]],
  [sector302020.value, [industry30, supersector3020, sector302020]],
  [sector302030.value, [industry30, supersector3020, sector302030]],
  [sector302040.value, [industry30, supersector3020, sector302040]],
  [sector302050.value, [industry30, supersector3020, sector302050]],
  [sector303010.value, [industry30, supersector3030, sector303010]],
  [sector303020.value, [industry30, supersector3030, sector303020]],
  [sector351010.value, [industry35, supersector3510, sector351010]],
  [sector351020.value, [industry35, supersector3510, sector351020]],
  [sector401010.value, [industry40, supersector4010, sector401010]],
  [sector402010.value, [industry40, supersector4020, sector402010]],
  [sector402020.value, [industry40, supersector4020, sector402020]],
  [sector402030.value, [industry40, supersector4020, sector402030]],
  [sector402040.value, [industry40, supersector4020, sector402040]],
  [sector403010.value, [industry40, supersector4030, sector403010]],
  [sector404010.value, [industry40, supersector4040, sector404010]],
  [sector405010.value, [industry40, supersector4050, sector405010]],
  [sector451010.value, [industry45, supersector4510, sector451010]],
  [sector451020.value, [industry45, supersector4510, sector451020]],
  [sector451030.value, [industry45, supersector4510, sector451030]],
  [sector452010.value, [industry45, supersector4520, sector452010]],
  [sector501010.value, [industry50, supersector5010, sector501010]],
  [sector502010.value, [industry50, supersector5020, sector502010]],
  [sector502020.value, [industry50, supersector5020, sector502020]],
  [sector502030.value, [industry50, supersector5020, sector502030]],
  [sector502040.value, [industry50, supersector5020, sector502040]],
  [sector502050.value, [industry50, supersector5020, sector502050]],
  [sector502060.value, [industry50, supersector5020, sector502060]],
  [sector551010.value, [industry55, supersector5510, sector551010]],
  [sector551020.value, [industry55, supersector5510, sector551020]],
  [sector551030.value, [industry55, supersector5510, sector551030]],
  [sector552010.value, [industry55, supersector5520, sector552010]],
  [sector601010.value, [industry60, supersector6010, sector601010]],
  [sector601020.value, [industry60, supersector6010, sector601020]],
  [sector651010.value, [industry65, supersector6510, sector651010]],
  [sector651020.value, [industry65, supersector6510, sector651020]],
  [sector651030.value, [industry65, supersector6510, sector651030]],

  [subsector10101010.value, [industry10, supersector1010, sector101010, subsector10101010]],
  [subsector10101015.value, [industry10, supersector1010, sector101010, subsector10101015]],
  [subsector10101020.value, [industry10, supersector1010, sector101010, subsector10101020]],
  [subsector10102010.value, [industry10, supersector1010, sector101020, subsector10102010]],
  [subsector10102015.value, [industry10, supersector1010, sector101020, subsector10102015]],
  [subsector10102020.value, [industry10, supersector1010, sector101020, subsector10102020]],
  [subsector10102030.value, [industry10, supersector1010, sector101020, subsector10102030]],
  [subsector10102035.value, [industry10, supersector1010, sector101020, subsector10102035]],
  [subsector15101010.value, [industry15, supersector1510, sector151010, subsector15101010]],
  [subsector15102010.value, [industry15, supersector1510, sector151020, subsector15102010]],
  [subsector15102015.value, [industry15, supersector1510, sector151020, subsector15102015]],
  [subsector20101010.value, [industry20, supersector2010, sector201010, subsector20101010]],
  [subsector20101020.value, [industry20, supersector2010, sector201010, subsector20101020]],
  [subsector20101025.value, [industry20, supersector2010, sector201010, subsector20101025]],
  [subsector20101030.value, [industry20, supersector2010, sector201010, subsector20101030]],
  [subsector20102010.value, [industry20, supersector2010, sector201020, subsector20102010]],
  [subsector20102015.value, [industry20, supersector2010, sector201020, subsector20102015]],
  [subsector20102020.value, [industry20, supersector2010, sector201020, subsector20102020]],
  [subsector20103010.value, [industry20, supersector2010, sector201030, subsector20103010]],
  [subsector20103015.value, [industry20, supersector2010, sector201030, subsector20103015]],
  [subsector20103020.value, [industry20, supersector2010, sector201030, subsector20103020]],
  [subsector30101010.value, [industry30, supersector3010, sector301010, subsector30101010]],
  [subsector30201020.value, [industry30, supersector3020, sector302010, subsector30201020]],
  [subsector30201025.value, [industry30, supersector3020, sector302010, subsector30201025]],
  [subsector30201030.value, [industry30, supersector3020, sector302010, subsector30201030]],
  [subsector30202000.value, [industry30, supersector3020, sector302020, subsector30202000]],
  [subsector30202010.value, [industry30, supersector3020, sector302020, subsector30202010]],
  [subsector30202015.value, [industry30, supersector3020, sector302020, subsector30202015]],
  [subsector30203000.value, [industry30, supersector3020, sector302030, subsector30203000]],
  [subsector30203010.value, [industry30, supersector3020, sector302030, subsector30203010]],
  [subsector30203020.value, [industry30, supersector3020, sector302030, subsector30203020]],
  [subsector30204000.value, [industry30, supersector3020, sector302040, subsector30204000]],
  [subsector30205000.value, [industry30, supersector3020, sector302050, subsector30205000]],
  [subsector30301010.value, [industry30, supersector3030, sector303010, subsector30301010]],
  [subsector30302010.value, [industry30, supersector3030, sector303020, subsector30302010]],
  [subsector30302015.value, [industry30, supersector3030, sector303020, subsector30302015]],
  [subsector30302020.value, [industry30, supersector3030, sector303020, subsector30302020]],
  [subsector30302025.value, [industry30, supersector3030, sector303020, subsector30302025]],
  [subsector35101010.value, [industry35, supersector3510, sector351010, subsector35101010]],
  [subsector35101015.value, [industry35, supersector3510, sector351010, subsector35101015]],
  [subsector35102000.value, [industry35, supersector3510, sector351020, subsector35102000]],
  [subsector35102010.value, [industry35, supersector3510, sector351020, subsector35102010]],
  [subsector35102015.value, [industry35, supersector3510, sector351020, subsector35102015]],
  [subsector35102020.value, [industry35, supersector3510, sector351020, subsector35102020]],
  [subsector35102025.value, [industry35, supersector3510, sector351020, subsector35102025]],
  [subsector35102030.value, [industry35, supersector3510, sector351020, subsector35102030]],
  [subsector35102040.value, [industry35, supersector3510, sector351020, subsector35102040]],
  [subsector35102045.value, [industry35, supersector3510, sector351020, subsector35102045]],
  [subsector35102050.value, [industry35, supersector3510, sector351020, subsector35102050]],
  [subsector35102060.value, [industry35, supersector3510, sector351020, subsector35102060]],
  [subsector35102070.value, [industry35, supersector3510, sector351020, subsector35102070]],
  [subsector40101010.value, [industry40, supersector4010, sector401010, subsector40101010]],
  [subsector40101015.value, [industry40, supersector4010, sector401010, subsector40101015]],
  [subsector40101020.value, [industry40, supersector4010, sector401010, subsector40101020]],
  [subsector40101025.value, [industry40, supersector4010, sector401010, subsector40101025]],
  [subsector40201010.value, [industry40, supersector4020, sector402010, subsector40201010]],
  [subsector40201020.value, [industry40, supersector4020, sector402010, subsector40201020]],
  [subsector40201030.value, [industry40, supersector4020, sector402010, subsector40201030]],
  [subsector40201040.value, [industry40, supersector4020, sector402010, subsector40201040]],
  [subsector40201050.value, [industry40, supersector4020, sector402010, subsector40201050]],
  [subsector40201060.value, [industry40, supersector4020, sector402010, subsector40201060]],
  [subsector40201070.value, [industry40, supersector4020, sector402010, subsector40201070]],
  [subsector40202010.value, [industry40, supersector4020, sector402020, subsector40202010]],
  [subsector40202015.value, [industry40, supersector4020, sector402020, subsector40202015]],
  [subsector40202020.value, [industry40, supersector4020, sector402020, subsector40202020]],
  [subsector40202025.value, [industry40, supersector4020, sector402020, subsector40202025]],
  [subsector40203010.value, [industry40, supersector4020, sector402030, subsector40203010]],
  [subsector40203040.value, [industry40, supersector4020, sector402030, subsector40203040]],
  [subsector40203045.value, [industry40, supersector4020, sector402030, subsector40203045]],
  [subsector40203050.value, [industry40, supersector4020, sector402030, subsector40203050]],
  [subsector40203055.value, [industry40, supersector4020, sector402030, subsector40203055]],
  [subsector40203060.value, [industry40, supersector4020, sector402030, subsector40203060]],
  [subsector40204020.value, [industry40, supersector4020, sector402040, subsector40204020]],
  [subsector40204025.value, [industry40, supersector4020, sector402040, subsector40204025]],
  [subsector40204030.value, [industry40, supersector4020, sector402040, subsector40204030]],
  [subsector40204035.value, [industry40, supersector4020, sector402040, subsector40204035]],
  [subsector40301010.value, [industry40, supersector4030, sector403010, subsector40301010]],
  [subsector40301020.value, [industry40, supersector4030, sector403010, subsector40301020]],
  [subsector40301030.value, [industry40, supersector4030, sector403010, subsector40301030]],
  [subsector40301035.value, [industry40, supersector4030, sector403010, subsector40301035]],
  [subsector40401010.value, [industry40, supersector4040, sector404010, subsector40401010]],
  [subsector40401020.value, [industry40, supersector4040, sector404010, subsector40401020]],
  [subsector40401025.value, [industry40, supersector4040, sector404010, subsector40401025]],
  [subsector40401030.value, [industry40, supersector4040, sector404010, subsector40401030]],
  [subsector40501010.value, [industry40, supersector4050, sector405010, subsector40501010]],
  [subsector40501015.value, [industry40, supersector4050, sector405010, subsector40501015]],
  [subsector40501020.value, [industry40, supersector4050, sector405010, subsector40501020]],
  [subsector40501025.value, [industry40, supersector4050, sector405010, subsector40501025]],
  [subsector40501030.value, [industry40, supersector4050, sector405010, subsector40501030]],
  [subsector40501040.value, [industry40, supersector4050, sector405010, subsector40501040]],
  [subsector45101010.value, [industry45, supersector4510, sector451010, subsector45101010]],
  [subsector45101015.value, [industry45, supersector4510, sector451010, subsector45101015]],
  [subsector45101020.value, [industry45, supersector4510, sector451010, subsector45101020]],
  [subsector45102010.value, [industry45, supersector4510, sector451020, subsector45102010]],
  [subsector45102020.value, [industry45, supersector4510, sector451020, subsector45102020]],
  [subsector45102030.value, [industry45, supersector4510, sector451020, subsector45102030]],
  [subsector45102035.value, [industry45, supersector4510, sector451020, subsector45102035]],
  [subsector45103010.value, [industry45, supersector4510, sector451030, subsector45103010]],
  [subsector45201010.value, [industry45, supersector4520, sector452010, subsector45201010]],
  [subsector45201015.value, [industry45, supersector4520, sector452010, subsector45201015]],
  [subsector45201020.value, [industry45, supersector4520, sector452010, subsector45201020]],
  [subsector45201030.value, [industry45, supersector4520, sector452010, subsector45201030]],
  [subsector45201040.value, [industry45, supersector4520, sector452010, subsector45201040]],
  [subsector50101010.value, [industry50, supersector5010, sector501010, subsector50101010]],
  [subsector50101015.value, [industry50, supersector5010, sector501010, subsector50101015]],
  [subsector50101020.value, [industry50, supersector5010, sector501010, subsector50101020]],
  [subsector50101025.value, [industry50, supersector5010, sector501010, subsector50101025]],
  [subsector50101030.value, [industry50, supersector5010, sector501010, subsector50101030]],
  [subsector50101035.value, [industry50, supersector5010, sector501010, subsector50101035]],
  [subsector50201010.value, [industry50, supersector5020, sector502010, subsector50201010]],
  [subsector50201020.value, [industry50, supersector5020, sector502010, subsector50201020]],
  [subsector50202010.value, [industry50, supersector5020, sector502020, subsector50202010]],
  [subsector50202020.value, [industry50, supersector5020, sector502020, subsector50202020]],
  [subsector50202025.value, [industry50, supersector5020, sector502020, subsector50202025]],
  [subsector50202030.value, [industry50, supersector5020, sector502020, subsector50202030]],
  [subsector50202040.value, [industry50, supersector5020, sector502020, subsector50202040]],
  [subsector50203000.value, [industry50, supersector5020, sector502030, subsector50203000]],
  [subsector50203010.value, [industry50, supersector5020, sector502030, subsector50203010]],
  [subsector50203015.value, [industry50, supersector5020, sector502030, subsector50203015]],
  [subsector50203020.value, [industry50, supersector5020, sector502030, subsector50203020]],
  [subsector50203030.value, [industry50, supersector5020, sector502030, subsector50203030]],
  [subsector50204000.value, [industry50, supersector5020, sector502040, subsector50204000]],
  [subsector50204010.value, [industry50, supersector5020, sector502040, subsector50204010]],
  [subsector50204020.value, [industry50, supersector5020, sector502040, subsector50204020]],
  [subsector50204030.value, [industry50, supersector5020, sector502040, subsector50204030]],
  [subsector50204040.value, [industry50, supersector5020, sector502040, subsector50204040]],
  [subsector50204050.value, [industry50, supersector5020, sector502040, subsector50204050]],
  [subsector50205010.value, [industry50, supersector5020, sector502050, subsector50205010]],
  [subsector50205015.value, [industry50, supersector5020, sector502050, subsector50205015]],
  [subsector50205020.value, [industry50, supersector5020, sector502050, subsector50205020]],
  [subsector50205025.value, [industry50, supersector5020, sector502050, subsector50205025]],
  [subsector50205030.value, [industry50, supersector5020, sector502050, subsector50205030]],
  [subsector50205040.value, [industry50, supersector5020, sector502050, subsector50205040]],
  [subsector50206010.value, [industry50, supersector5020, sector502060, subsector50206010]],
  [subsector50206015.value, [industry50, supersector5020, sector502060, subsector50206015]],
  [subsector50206020.value, [industry50, supersector5020, sector502060, subsector50206020]],
  [subsector50206025.value, [industry50, supersector5020, sector502060, subsector50206025]],
  [subsector50206030.value, [industry50, supersector5020, sector502060, subsector50206030]],
  [subsector50206040.value, [industry50, supersector5020, sector502060, subsector50206040]],
  [subsector50206050.value, [industry50, supersector5020, sector502060, subsector50206050]],
  [subsector50206060.value, [industry50, supersector5020, sector502060, subsector50206060]],
  [subsector55101000.value, [industry55, supersector5510, sector551010, subsector55101000]],
  [subsector55101010.value, [industry55, supersector5510, sector551010, subsector55101010]],
  [subsector55101015.value, [industry55, supersector5510, sector551010, subsector55101015]],
  [subsector55101020.value, [industry55, supersector5510, sector551010, subsector55101020]],
  [subsector55102000.value, [industry55, supersector5510, sector551020, subsector55102000]],
  [subsector55102010.value, [industry55, supersector5510, sector551020, subsector55102010]],
  [subsector55102015.value, [industry55, supersector5510, sector551020, subsector55102015]],
  [subsector55102035.value, [industry55, supersector5510, sector551020, subsector55102035]],
  [subsector55102040.value, [industry55, supersector5510, sector551020, subsector55102040]],
  [subsector55102050.value, [industry55, supersector5510, sector551020, subsector55102050]],
  [subsector55103020.value, [industry55, supersector5510, sector551030, subsector55103020]],
  [subsector55103025.value, [industry55, supersector5510, sector551030, subsector55103025]],
  [subsector55103030.value, [industry55, supersector5510, sector551030, subsector55103030]],
  [subsector55201000.value, [industry55, supersector5520, sector552010, subsector55201000]],
  [subsector55201010.value, [industry55, supersector5520, sector552010, subsector55201010]],
  [subsector55201015.value, [industry55, supersector5520, sector552010, subsector55201015]],
  [subsector55201020.value, [industry55, supersector5520, sector552010, subsector55201020]],
  [subsector60101000.value, [industry60, supersector6010, sector601010, subsector60101000]],
  [subsector60101010.value, [industry60, supersector6010, sector601010, subsector60101010]],
  [subsector60101015.value, [industry60, supersector6010, sector601010, subsector60101015]],
  [subsector60101020.value, [industry60, supersector6010, sector601010, subsector60101020]],
  [subsector60101030.value, [industry60, supersector6010, sector601010, subsector60101030]],
  [subsector60101035.value, [industry60, supersector6010, sector601010, subsector60101035]],
  [subsector60101040.value, [industry60, supersector6010, sector601010, subsector60101040]],
  [subsector60102010.value, [industry60, supersector6010, sector601020, subsector60102010]],
  [subsector60102020.value, [industry60, supersector6010, sector601020, subsector60102020]],
  [subsector65101010.value, [industry65, supersector6510, sector651010, subsector65101010]],
  [subsector65101015.value, [industry65, supersector6510, sector651010, subsector65101015]],
  [subsector65102000.value, [industry65, supersector6510, sector651020, subsector65102000]],
  [subsector65102020.value, [industry65, supersector6510, sector651020, subsector65102020]],
  [subsector65102030.value, [industry65, supersector6510, sector651020, subsector65102030]],
  [subsector65103035.value, [industry65, supersector6510, sector651030, subsector65103035]]
]);

/**
 * Returns an array of ICB levels leading to a given ICB numeric value
 */
export function icbGet(value: number): IcbLevel[] {
  const array = icbMap.get(value);
  return array ? (array as IcbLevel[]) : [];
}

/**
 * Returns an industry level leading to a given ICB numeric value
 */
export function icbGetIndustry(value: number): IcbLevel | undefined {
  const array = icbMap.get(value);
  return array && array.length > 0 ? array[0] : undefined;
}

/**
 * Industry Classification Benchmark taxonomy
 *
 * https://www.icbenchmark.com
 */
export const icbTaxonomy: IcbTaxonomy = {
  children: [
    {
      value: industry10.value, rank: industry10.rank, name: industry10.name, definition: industry10.definition, children: [
        {
          value: supersector1010.value, rank: supersector1010.rank, name: supersector1010.name, children: [
            {
              value: sector101010.value, rank: sector101010.rank, name: sector101010.name, children: [
                { value: subsector10101010.value, rank: IcbRank.Subsector, name: subsector10101010.name, definition: subsector10101010.definition },
                { value: subsector10101015.value, rank: IcbRank.Subsector, name: subsector10101015.name, definition: subsector10101015.definition },
                { value: subsector10101020.value, rank: IcbRank.Subsector, name: subsector10101020.name, definition: subsector10101020.definition }
              ]
            },
            {
              value: sector101020.value, rank: sector101020.rank, name: sector101020.name, children: [
                { value: subsector10102010.value, rank: IcbRank.Subsector, name: subsector10102010.name, definition: subsector10102010.definition },
                { value: subsector10102015.value, rank: IcbRank.Subsector, name: subsector10102015.name, definition: subsector10102015.definition },
                { value: subsector10102020.value, rank: IcbRank.Subsector, name: subsector10102020.name, definition: subsector10102020.definition },
                { value: subsector10102030.value, rank: IcbRank.Subsector, name: subsector10102030.name, definition: subsector10102030.definition },
                { value: subsector10102035.value, rank: IcbRank.Subsector, name: subsector10102035.name, definition: subsector10102035.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry15.value, rank: industry15.rank, name: industry15.name, definition: industry15.definition, children: [
        {
          value: supersector1510.value, rank: supersector1510.rank, name: supersector1510.name, children: [
            {
              value: sector151010.value, rank: sector151010.rank, name: sector151010.name, children: [
                { value: subsector15101010.value, rank: IcbRank.Subsector, name: subsector15101010.name, definition: subsector15101010.definition }
              ]
            },
            {
              value: sector151020.value, rank: sector151020.rank, name: sector151020.name, children: [
                { value: subsector15102010.value, rank: IcbRank.Subsector, name: subsector15102010.name, definition: subsector15102010.definition },
                { value: subsector15102015.value, rank: IcbRank.Subsector, name: subsector15102015.name, definition: subsector15102015.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry20.value, rank: industry20.rank, name: industry20.name, definition: industry20.definition, children: [
        {
          value: supersector2010.value, rank: supersector2010.rank, name: supersector2010.name, children: [
            {
              value: sector201010.value, rank: sector201010.rank, name: sector201010.name, children: [
                { value: subsector20101010.value, rank: IcbRank.Subsector, name: subsector20101010.name, definition: subsector20101010.definition },
                { value: subsector20101020.value, rank: IcbRank.Subsector, name: subsector20101020.name, definition: subsector20101020.definition },
                { value: subsector20101025.value, rank: IcbRank.Subsector, name: subsector20101025.name, definition: subsector20101025.definition },
                { value: subsector20101030.value, rank: IcbRank.Subsector, name: subsector20101030.name, definition: subsector20101030.definition }
              ]
            },
            {
              value: sector201020.value, rank: sector201020.rank, name: sector201020.name, children: [
                { value: subsector20102010.value, rank: IcbRank.Subsector, name: subsector20102010.name, definition: subsector20102010.definition },
                { value: subsector20102015.value, rank: IcbRank.Subsector, name: subsector20102015.name, definition: subsector20102015.definition },
                { value: subsector20102020.value, rank: IcbRank.Subsector, name: subsector20102020.name, definition: subsector20102020.definition }
              ]
            },
            {
              value: sector201030.value, rank: sector201030.rank, name: sector201030.name, children: [
                { value: subsector20103010.value, rank: IcbRank.Subsector, name: subsector20103010.name, definition: subsector20103010.definition },
                { value: subsector20103015.value, rank: IcbRank.Subsector, name: subsector20103015.name, definition: subsector20103015.definition },
                { value: subsector20103020.value, rank: IcbRank.Subsector, name: subsector20103020.name, definition: subsector20103020.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry30.value, rank: industry30.rank, name: industry30.name, definition: industry30.definition, children: [
        {
          value: supersector3010.value, rank: supersector3010.rank, name: supersector3010.name, children: [
            {
              value: sector301010.value, rank: sector301010.rank, name: sector301010.name, children: [
                { value: subsector30101010.value, rank: IcbRank.Subsector, name: subsector30101010.name, definition: subsector30101010.definition }
              ]
            }
          ]
        },
        {
          value: supersector3020.value, rank: supersector3020.rank, name: supersector3020.name, children: [
            {
              value: sector302010.value, rank: sector302010.rank, name: sector302010.name, children: [
                { value: subsector30201020.value, rank: IcbRank.Subsector, name: subsector30201020.name, definition: subsector30201020.definition },
                { value: subsector30201025.value, rank: IcbRank.Subsector, name: subsector30201025.name, definition: subsector30201025.definition },
                { value: subsector30201030.value, rank: IcbRank.Subsector, name: subsector30201030.name, definition: subsector30201030.definition }
              ]
            },
            {
              value: sector302020.value, rank: sector302020.rank, name: sector302020.name, children: [
                { value: subsector30202000.value, rank: IcbRank.Subsector, name: subsector30202000.name, definition: subsector30202000.definition },
                { value: subsector30202010.value, rank: IcbRank.Subsector, name: subsector30202010.name, definition: subsector30202010.definition },
                { value: subsector30202015.value, rank: IcbRank.Subsector, name: subsector30202015.name, definition: subsector30202015.definition }
              ]
            },
            {
              value: sector302030.value, rank: sector302030.rank, name: sector302030.name, children: [
                { value: subsector30203000.value, rank: IcbRank.Subsector, name: subsector30203000.name, definition: subsector30203000.definition },
                { value: subsector30203010.value, rank: IcbRank.Subsector, name: subsector30203010.name, definition: subsector30203010.definition },
                { value: subsector30203020.value, rank: IcbRank.Subsector, name: subsector30203020.name, definition: subsector30203020.definition }
              ]
            },
            {
              value: sector302040.value, rank: sector302040.rank, name: sector302040.name, children: [
                { value: subsector30204000.value, rank: IcbRank.Subsector, name: subsector30204000.name, definition: subsector30204000.definition }
              ]
            },
            {
              value: sector302050.value, rank: sector302050.rank, name: sector302050.name, children: [
                { value: subsector30205000.value, rank: IcbRank.Subsector, name: subsector30205000.name, definition: subsector30205000.definition }
              ]
            }
          ]
        },
        {
          value: supersector3030.value, rank: supersector3030.rank, name: supersector3030.name, children: [
            {
              value: sector303010.value, rank: sector303010.rank, name: sector303010.name, children: [
                { value: subsector30301010.value, rank: IcbRank.Subsector, name: subsector30301010.name, definition: subsector30301010.definition }
              ]
            },
            {
              value: sector303020.value, rank: sector303020.rank, name: sector303020.name, children: [
                { value: subsector30302010.value, rank: IcbRank.Subsector, name: subsector30302010.name, definition: subsector30302010.definition },
                { value: subsector30302015.value, rank: IcbRank.Subsector, name: subsector30302015.name, definition: subsector30302015.definition },
                { value: subsector30302020.value, rank: IcbRank.Subsector, name: subsector30302020.name, definition: subsector30302020.definition },
                { value: subsector30302025.value, rank: IcbRank.Subsector, name: subsector30302025.name, definition: subsector30302025.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry35.value, rank: industry35.rank, name: industry35.name, definition: industry35.definition, children: [
        {
          value: supersector3510.value, rank: supersector3510.rank, name: supersector3510.name, children: [
            {
              value: sector351010.value, rank: sector351010.rank, name: sector351010.name, children: [
                { value: subsector35101010.value, rank: IcbRank.Subsector, name: subsector35101010.name, definition: subsector35101010.definition },
                { value: subsector35101015.value, rank: IcbRank.Subsector, name: subsector35101015.name, definition: subsector35101015.definition }
              ]
            },
            {
              value: sector351020.value, rank: sector351020.rank, name: sector351020.name, children: [
                { value: subsector35102000.value, rank: IcbRank.Subsector, name: subsector35102000.name, definition: subsector35102000.definition },
                { value: subsector35102010.value, rank: IcbRank.Subsector, name: subsector35102010.name, definition: subsector35102010.definition },
                { value: subsector35102015.value, rank: IcbRank.Subsector, name: subsector35102015.name, definition: subsector35102015.definition },
                { value: subsector35102020.value, rank: IcbRank.Subsector, name: subsector35102020.name, definition: subsector35102020.definition },
                { value: subsector35102025.value, rank: IcbRank.Subsector, name: subsector35102025.name, definition: subsector35102025.definition },
                { value: subsector35102030.value, rank: IcbRank.Subsector, name: subsector35102030.name, definition: subsector35102030.definition },
                { value: subsector35102040.value, rank: IcbRank.Subsector, name: subsector35102040.name, definition: subsector35102040.definition },
                { value: subsector35102045.value, rank: IcbRank.Subsector, name: subsector35102045.name, definition: subsector35102045.definition },
                { value: subsector35102050.value, rank: IcbRank.Subsector, name: subsector35102050.name, definition: subsector35102050.definition },
                { value: subsector35102060.value, rank: IcbRank.Subsector, name: subsector35102060.name, definition: subsector35102060.definition },
                { value: subsector35102070.value, rank: IcbRank.Subsector, name: subsector35102070.name, definition: subsector35102070.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry40.value, rank: industry40.rank, name: industry40.name, definition: industry40.definition, children: [
        {
          value: supersector4010.value, rank: supersector4010.rank, name: supersector4010.name, children: [
            {
              value: sector401010.value, rank: sector401010.rank, name: sector401010.name, children: [
                { value: subsector40101010.value, rank: IcbRank.Subsector, name: subsector40101010.name, definition: subsector40101010.definition },
                { value: subsector40101015.value, rank: IcbRank.Subsector, name: subsector40101015.name, definition: subsector40101015.definition },
                { value: subsector40101020.value, rank: IcbRank.Subsector, name: subsector40101020.name, definition: subsector40101020.definition },
                { value: subsector40101025.value, rank: IcbRank.Subsector, name: subsector40101025.name, definition: subsector40101025.definition }
              ]
            }
          ]
        },
        {
          value: supersector4020.value, rank: supersector4020.rank, name: supersector4020.name, children: [
            {
              value: sector402010.value, rank: sector402010.rank, name: sector402010.name, children: [
                { value: subsector40201010.value, rank: IcbRank.Subsector, name: subsector40201010.name, definition: subsector40201010.definition },
                { value: subsector40201020.value, rank: IcbRank.Subsector, name: subsector40201020.name, definition: subsector40201020.definition },
                { value: subsector40201030.value, rank: IcbRank.Subsector, name: subsector40201030.name, definition: subsector40201030.definition },
                { value: subsector40201040.value, rank: IcbRank.Subsector, name: subsector40201040.name, definition: subsector40201040.definition },
                { value: subsector40201050.value, rank: IcbRank.Subsector, name: subsector40201050.name, definition: subsector40201050.definition },
                { value: subsector40201060.value, rank: IcbRank.Subsector, name: subsector40201060.name, definition: subsector40201060.definition },
                { value: subsector40201070.value, rank: IcbRank.Subsector, name: subsector40201070.name, definition: subsector40201070.definition }
              ]
            },
            {
              value: sector402020.value, rank: sector402020.rank, name: sector402020.name, children: [
                { value: subsector40202010.value, rank: IcbRank.Subsector, name: subsector40202010.name, definition: subsector40202010.definition },
                { value: subsector40202015.value, rank: IcbRank.Subsector, name: subsector40202015.name, definition: subsector40202015.definition },
                { value: subsector40202020.value, rank: IcbRank.Subsector, name: subsector40202020.name, definition: subsector40202020.definition },
                { value: subsector40202025.value, rank: IcbRank.Subsector, name: subsector40202025.name, definition: subsector40202025.definition }
              ]
            },
            {
              value: sector402030.value, rank: sector402030.rank, name: sector402030.name, children: [
                { value: subsector40203010.value, rank: IcbRank.Subsector, name: subsector40203010.name, definition: subsector40203010.definition },
                { value: subsector40203040.value, rank: IcbRank.Subsector, name: subsector40203040.name, definition: subsector40203040.definition },
                { value: subsector40203045.value, rank: IcbRank.Subsector, name: subsector40203045.name, definition: subsector40203045.definition },
                { value: subsector40203050.value, rank: IcbRank.Subsector, name: subsector40203050.name, definition: subsector40203050.definition },
                { value: subsector40203055.value, rank: IcbRank.Subsector, name: subsector40203055.name, definition: subsector40203055.definition },
                { value: subsector40203060.value, rank: IcbRank.Subsector, name: subsector40203060.name, definition: subsector40203060.definition }
              ]
            },
            {
              value: sector402040.value, rank: sector402040.rank, name: sector402040.name, children: [
                { value: subsector40204020.value, rank: IcbRank.Subsector, name: subsector40204020.name, definition: subsector40204020.definition },
                { value: subsector40204025.value, rank: IcbRank.Subsector, name: subsector40204025.name, definition: subsector40204025.definition },
                { value: subsector40204030.value, rank: IcbRank.Subsector, name: subsector40204030.name, definition: subsector40204030.definition },
                { value: subsector40204035.value, rank: IcbRank.Subsector, name: subsector40204035.name, definition: subsector40204035.definition }
              ]
            }
          ]
        },
        {
          value: supersector4030.value, rank: supersector4030.rank, name: supersector4030.name, children: [
            {
              value: sector403010.value, rank: sector403010.rank, name: sector403010.name, children: [
                { value: subsector40301010.value, rank: IcbRank.Subsector, name: subsector40301010.name, definition: subsector40301010.definition },
                { value: subsector40301020.value, rank: IcbRank.Subsector, name: subsector40301020.name, definition: subsector40301020.definition },
                { value: subsector40301030.value, rank: IcbRank.Subsector, name: subsector40301030.name, definition: subsector40301030.definition },
                { value: subsector40301035.value, rank: IcbRank.Subsector, name: subsector40301035.name, definition: subsector40301035.definition }
              ]
            }
          ]
        },
        {
          value: supersector4040.value, rank: supersector4040.rank, name: supersector4040.name, children: [
            {
              value: sector404010.value, rank: sector404010.rank, name: sector404010.name, children: [
                { value: subsector40401010.value, rank: IcbRank.Subsector, name: subsector40401010.name, definition: subsector40401010.definition },
                { value: subsector40401020.value, rank: IcbRank.Subsector, name: subsector40401020.name, definition: subsector40401020.definition },
                { value: subsector40401025.value, rank: IcbRank.Subsector, name: subsector40401025.name, definition: subsector40401025.definition },
                { value: subsector40401030.value, rank: IcbRank.Subsector, name: subsector40401030.name, definition: subsector40401030.definition }
              ]
            }
          ]
        },
        {
          value: supersector4050.value, rank: supersector4050.rank, name: supersector4050.name, children: [
            {
              value: sector405010.value, rank: sector405010.rank, name: sector405010.name, children: [
                { value: subsector40501010.value, rank: IcbRank.Subsector, name: subsector40501010.name, definition: subsector40501010.definition },
                { value: subsector40501015.value, rank: IcbRank.Subsector, name: subsector40501015.name, definition: subsector40501015.definition },
                { value: subsector40501020.value, rank: IcbRank.Subsector, name: subsector40501020.name, definition: subsector40501020.definition },
                { value: subsector40501025.value, rank: IcbRank.Subsector, name: subsector40501025.name, definition: subsector40501025.definition },
                { value: subsector40501030.value, rank: IcbRank.Subsector, name: subsector40501030.name, definition: subsector40501030.definition },
                { value: subsector40501040.value, rank: IcbRank.Subsector, name: subsector40501040.name, definition: subsector40501040.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry45.value, rank: industry45.rank, name: industry45.name, definition: industry45.definition, children: [
        {
          value: supersector4510.value, rank: supersector4510.rank, name: supersector4510.name, children: [
            {
              value: sector451010.value, rank: sector451010.rank, name: sector451010.name, children: [
                { value: subsector45101010.value, rank: IcbRank.Subsector, name: subsector45101010.name, definition: subsector45101010.definition },
                { value: subsector45101015.value, rank: IcbRank.Subsector, name: subsector45101015.name, definition: subsector45101015.definition },
                { value: subsector45101020.value, rank: IcbRank.Subsector, name: subsector45101020.name, definition: subsector45101020.definition }
              ]
            },
            {
              value: sector451020.value, rank: sector451020.rank, name: sector451020.name, children: [
                { value: subsector45102010.value, rank: IcbRank.Subsector, name: subsector45102010.name, definition: subsector45102010.definition },
                { value: subsector45102020.value, rank: IcbRank.Subsector, name: subsector45102020.name, definition: subsector45102020.definition },
                { value: subsector45102030.value, rank: IcbRank.Subsector, name: subsector45102030.name, definition: subsector45102030.definition },
                { value: subsector45102035.value, rank: IcbRank.Subsector, name: subsector45102035.name, definition: subsector45102035.definition }
              ]
            },
            {
              value: sector451030.value, rank: sector451030.rank, name: sector451030.name, children: [
                { value: subsector45103010.value, rank: IcbRank.Subsector, name: subsector45103010.name, definition: subsector45103010.definition }
              ]
            }
          ]
        },
        {
          value: supersector4520.value, rank: supersector4520.rank, name: supersector4520.name, children: [
            {
              value: sector452010.value, rank: sector452010.rank, name: sector452010.name, children: [
                { value: subsector45201010.value, rank: IcbRank.Subsector, name: subsector45201010.name, definition: subsector45201010.definition },
                { value: subsector45201015.value, rank: IcbRank.Subsector, name: subsector45201015.name, definition: subsector45201015.definition },
                { value: subsector45201020.value, rank: IcbRank.Subsector, name: subsector45201020.name, definition: subsector45201020.definition },
                { value: subsector45201030.value, rank: IcbRank.Subsector, name: subsector45201030.name, definition: subsector45201030.definition },
                { value: subsector45201040.value, rank: IcbRank.Subsector, name: subsector45201040.name, definition: subsector45201040.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry50.value, rank: industry50.rank, name: industry50.name, definition: industry50.definition, children: [
        {
          value: supersector5010.value, rank: supersector5010.rank, name: supersector5010.name, children: [
            {
              value: sector501010.value, rank: sector501010.rank, name: sector501010.name, children: [
                { value: subsector50101010.value, rank: IcbRank.Subsector, name: subsector50101010.name, definition: subsector50101010.definition },
                { value: subsector50101015.value, rank: IcbRank.Subsector, name: subsector50101015.name, definition: subsector50101015.definition },
                { value: subsector50101020.value, rank: IcbRank.Subsector, name: subsector50101020.name, definition: subsector50101020.definition },
                { value: subsector50101025.value, rank: IcbRank.Subsector, name: subsector50101025.name, definition: subsector50101025.definition },
                { value: subsector50101030.value, rank: IcbRank.Subsector, name: subsector50101030.name, definition: subsector50101030.definition },
                { value: subsector50101035.value, rank: IcbRank.Subsector, name: subsector50101035.name, definition: subsector50101035.definition }
              ]
            }
          ]
        },
        {
          value: supersector5020.value, rank: supersector5020.rank, name: supersector5020.name, children: [
            {
              value: sector502010.value, rank: sector502010.rank, name: sector502010.name, children: [
                { value: subsector50201010.value, rank: IcbRank.Subsector, name: subsector50201010.name, definition: subsector50201010.definition },
                { value: subsector50201020.value, rank: IcbRank.Subsector, name: subsector50201020.name, definition: subsector50201020.definition }
              ]
            },
            {
              value: sector502020.value, rank: sector502020.rank, name: sector502020.name, children: [
                { value: subsector50202010.value, rank: IcbRank.Subsector, name: subsector50202010.name, definition: subsector50202010.definition },
                { value: subsector50202020.value, rank: IcbRank.Subsector, name: subsector50202020.name, definition: subsector50202020.definition },
                { value: subsector50202025.value, rank: IcbRank.Subsector, name: subsector50202025.name, definition: subsector50202025.definition },
                { value: subsector50202030.value, rank: IcbRank.Subsector, name: subsector50202030.name, definition: subsector50202030.definition },
                { value: subsector50202040.value, rank: IcbRank.Subsector, name: subsector50202040.name, definition: subsector50202040.definition }
              ]
            },
            {
              value: sector502030.value, rank: sector502030.rank, name: sector502030.name, children: [
                { value: subsector50203000.value, rank: IcbRank.Subsector, name: subsector50203000.name, definition: subsector50203000.definition },
                { value: subsector50203010.value, rank: IcbRank.Subsector, name: subsector50203010.name, definition: subsector50203010.definition },
                { value: subsector50203015.value, rank: IcbRank.Subsector, name: subsector50203015.name, definition: subsector50203015.definition },
                { value: subsector50203020.value, rank: IcbRank.Subsector, name: subsector50203020.name, definition: subsector50203020.definition },
                { value: subsector50203030.value, rank: IcbRank.Subsector, name: subsector50203030.name, definition: subsector50203030.definition }
              ]
            },
            {
              value: sector502040.value, rank: sector502040.rank, name: sector502040.name, children: [
                { value: subsector50204000.value, rank: IcbRank.Subsector, name: subsector50204000.name, definition: subsector50204000.definition },
                { value: subsector50204010.value, rank: IcbRank.Subsector, name: subsector50204010.name, definition: subsector50204010.definition },
                { value: subsector50204020.value, rank: IcbRank.Subsector, name: subsector50204020.name, definition: subsector50204020.definition },
                { value: subsector50204030.value, rank: IcbRank.Subsector, name: subsector50204030.name, definition: subsector50204030.definition },
                { value: subsector50204040.value, rank: IcbRank.Subsector, name: subsector50204040.name, definition: subsector50204040.definition },
                { value: subsector50204050.value, rank: IcbRank.Subsector, name: subsector50204050.name, definition: subsector50204050.definition }
              ]
            },
            {
              value: sector502050.value, rank: sector502050.rank, name: sector502050.name, children: [
                { value: subsector50205010.value, rank: IcbRank.Subsector, name: subsector50205010.name, definition: subsector50205010.definition },
                { value: subsector50205015.value, rank: IcbRank.Subsector, name: subsector50205015.name, definition: subsector50205015.definition },
                { value: subsector50205020.value, rank: IcbRank.Subsector, name: subsector50205020.name, definition: subsector50205020.definition },
                { value: subsector50205025.value, rank: IcbRank.Subsector, name: subsector50205025.name, definition: subsector50205025.definition },
                { value: subsector50205030.value, rank: IcbRank.Subsector, name: subsector50205030.name, definition: subsector50205030.definition },
                { value: subsector50205040.value, rank: IcbRank.Subsector, name: subsector50205040.name, definition: subsector50205040.definition }
              ]
            },
            {
              value: sector502060.value, rank: sector502060.rank, name: sector502060.name, children: [
                { value: subsector50206010.value, rank: IcbRank.Subsector, name: subsector50206010.name, definition: subsector50206010.definition },
                { value: subsector50206015.value, rank: IcbRank.Subsector, name: subsector50206015.name, definition: subsector50206015.definition },
                { value: subsector50206020.value, rank: IcbRank.Subsector, name: subsector50206020.name, definition: subsector50206020.definition },
                { value: subsector50206025.value, rank: IcbRank.Subsector, name: subsector50206025.name, definition: subsector50206025.definition },
                { value: subsector50206030.value, rank: IcbRank.Subsector, name: subsector50206030.name, definition: subsector50206030.definition },
                { value: subsector50206040.value, rank: IcbRank.Subsector, name: subsector50206040.name, definition: subsector50206040.definition },
                { value: subsector50206050.value, rank: IcbRank.Subsector, name: subsector50206050.name, definition: subsector50206050.definition },
                { value: subsector50206060.value, rank: IcbRank.Subsector, name: subsector50206060.name, definition: subsector50206060.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry55.value, rank: industry55.rank, name: industry55.name, definition: industry55.definition, children: [
        {
          value: supersector5510.value, rank: supersector5510.rank, name: supersector5510.name, children: [
            {
              value: sector551010.value, rank: sector551010.rank, name: sector551010.name, children: [
                { value: subsector55101000.value, rank: IcbRank.Subsector, name: subsector55101000.name, definition: subsector55101000.definition },
                { value: subsector55101010.value, rank: IcbRank.Subsector, name: subsector55101010.name, definition: subsector55101010.definition },
                { value: subsector55101015.value, rank: IcbRank.Subsector, name: subsector55101015.name, definition: subsector55101015.definition },
                { value: subsector55101020.value, rank: IcbRank.Subsector, name: subsector55101020.name, definition: subsector55101020.definition }
              ]
            },
            {
              value: sector551020.value, rank: sector551020.rank, name: sector551020.name, children: [
                { value: subsector55102000.value, rank: IcbRank.Subsector, name: subsector55102000.name, definition: subsector55102000.definition },
                { value: subsector55102010.value, rank: IcbRank.Subsector, name: subsector55102010.name, definition: subsector55102010.definition },
                { value: subsector55102015.value, rank: IcbRank.Subsector, name: subsector55102015.name, definition: subsector55102015.definition },
                { value: subsector55102035.value, rank: IcbRank.Subsector, name: subsector55102035.name, definition: subsector55102035.definition },
                { value: subsector55102040.value, rank: IcbRank.Subsector, name: subsector55102040.name, definition: subsector55102040.definition },
                { value: subsector55102050.value, rank: IcbRank.Subsector, name: subsector55102050.name, definition: subsector55102050.definition }
              ]
            },
            {
              value: sector551030.value, rank: sector551030.rank, name: sector551030.name, children: [
                { value: subsector55103020.value, rank: IcbRank.Subsector, name: subsector55103020.name, definition: subsector55103020.definition },
                { value: subsector55103025.value, rank: IcbRank.Subsector, name: subsector55103025.name, definition: subsector55103025.definition },
                { value: subsector55103030.value, rank: IcbRank.Subsector, name: subsector55103030.name, definition: subsector55103030.definition }
              ]
            }
          ]
        },
        {
          value: supersector5520.value, rank: supersector5520.rank, name: supersector5520.name, children: [
            {
              value: sector552010.value, rank: sector552010.rank, name: sector552010.name, children: [
                { value: subsector55201000.value, rank: IcbRank.Subsector, name: subsector55201000.name, definition: subsector55201000.definition },
                { value: subsector55201010.value, rank: IcbRank.Subsector, name: subsector55201010.name, definition: subsector55201010.definition },
                { value: subsector55201015.value, rank: IcbRank.Subsector, name: subsector55201015.name, definition: subsector55201015.definition },
                { value: subsector55201020.value, rank: IcbRank.Subsector, name: subsector55201020.name, definition: subsector55201020.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry60.value, rank: industry60.rank, name: industry60.name, definition: industry60.definition, children: [
        {
          value: supersector6010.value, rank: supersector6010.rank, name: supersector6010.name, children: [
            {
              value: sector601010.value, rank: sector601010.rank, name: sector601010.name, children: [
                { value: subsector60101000.value, rank: IcbRank.Subsector, name: subsector60101000.name, definition: subsector60101000.definition },
                { value: subsector60101010.value, rank: IcbRank.Subsector, name: subsector60101010.name, definition: subsector60101010.definition },
                { value: subsector60101015.value, rank: IcbRank.Subsector, name: subsector60101015.name, definition: subsector60101015.definition },
                { value: subsector60101020.value, rank: IcbRank.Subsector, name: subsector60101020.name, definition: subsector60101020.definition },
                { value: subsector60101030.value, rank: IcbRank.Subsector, name: subsector60101030.name, definition: subsector60101030.definition },
                { value: subsector60101035.value, rank: IcbRank.Subsector, name: subsector60101035.name, definition: subsector60101035.definition },
                { value: subsector60101040.value, rank: IcbRank.Subsector, name: subsector60101040.name, definition: subsector60101040.definition }
              ]
            },
            {
              value: sector601020.value, rank: sector601020.rank, name: sector601020.name, children: [
                { value: subsector60102010.value, rank: IcbRank.Subsector, name: subsector60102010.name, definition: subsector60102010.definition },
                { value: subsector60102020.value, rank: IcbRank.Subsector, name: subsector60102020.name, definition: subsector60102020.definition }
              ]
            }
          ]
        }
      ]
    },
    {
      value: industry65.value, rank: industry65.rank, name: industry65.name, definition: industry65.definition, children: [
        {
          value: supersector6510.value, rank: supersector6510.rank, name: supersector6510.name, children: [
            {
              value: sector651010.value, rank: sector651010.rank, name: sector651010.name, children: [
                { value: subsector65101010.value, rank: IcbRank.Subsector, name: subsector65101010.name, definition: subsector65101010.definition },
                { value: subsector65101015.value, rank: IcbRank.Subsector, name: subsector65101015.name, definition: subsector65101015.definition }
              ]
            },
            {
              value: sector651020.value, rank: sector651020.rank, name: sector651020.name, children: [
                { value: subsector65102000.value, rank: IcbRank.Subsector, name: subsector65102000.name, definition: subsector65102000.definition },
                { value: subsector65102020.value, rank: IcbRank.Subsector, name: subsector65102020.name, definition: subsector65102020.definition },
                { value: subsector65102030.value, rank: IcbRank.Subsector, name: subsector65102030.name, definition: subsector65102030.definition }
              ]
            },
            {
              value: sector651030.value, rank: sector651030.rank, name: sector651030.name, children: [
                { value: subsector65103035.value, rank: IcbRank.Subsector, name: subsector65103035.name, definition: subsector65103035.definition }
              ]
            }
          ]
        }
      ]
    }
  ]
};
