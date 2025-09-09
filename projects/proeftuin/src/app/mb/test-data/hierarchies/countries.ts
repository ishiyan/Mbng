import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
/* eslint-disable max-len */

export interface CountryHierarchyTreeNode extends HierarchyTreeNode {
  /**
   * The area in suare kilometers.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_density.
   */
  area?: number;
  /**
   * The population.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_density.
   */
  population?: number;
  /**
   * The density in population / square kilometer.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_density.
   */
  density?: number;
  /**
   * The Human Development Index (HDI) combines measurements of life expectancy, education, and per-capita income.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index.
   */
  hdi?: number;
  /**
   * The inequality-adjusted Human Development Index.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_inequality-adjusted_HDI.
   */
  ihdi?: number;
  /**
   * The gross domestic product (at purchasing power parity) per capita, i.e., the purchasing power parity (PPP)
   * value of all final goods and services produced within a country in a given year, divided by the average
   * (or mid-year) population for the same year.
   *
   * Measured in the international dollar (Int$), also known as Geary–Khamis dollar (GK$), which is a hypothetical
   * unit of currency that has the same purchasing power parity that the U.S. dollar had in the United States at a
   * given point in time.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(PPP)_per_capita.
   */
  gdpPerCapita?: number;
  /**
   * The share of income of the richest one percent.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_share_of_income_of_the_richest_one_percent.
   */
  sirop?: number;
  /**
   * Income inequality metrics based on Gini coefficients.
   *
   * The Gini coefficient is a number between 0 and 1, where 0 corresponds with perfect equality
   * (where everyone has the same income) and 1 corresponds with perfect inequality (where one person
   * has all the income—and everyone else has no income).
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_income_equality, World Bank Gini.
   */
  igini?: number;
  /**
   * Wealth inequality metrics based on Gini coefficients.
   *
   * Wealth distribution can vary greatly from income distribution in a country.
   *
   * Higher Gini coefficients signify greater inequality in wealth distribution, with 0 being complete equality,
   * whereas a value near 1 can arise in a situation where everybody has zero wealth except a very small minority.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_wealth_equality, Wealth Gini (2018).
   */
  wgini?: number;
  /**
   * Mean wealth per adult in USD.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_wealth_per_adult.
   */
  wpaMean?: number;
  /**
   * Median wealth per adult in USD.
   *
   * Taken from https://en.wikipedia.org/wiki/List_of_countries_by_wealth_per_adult.
   */
  wpaMedian?: number;
  children?: CountryHierarchyTreeNode[];
}

/**
 * Various properties of countries taken from Wikipedia.
 */
export const countries: CountryHierarchyTreeNode = {
  children: [
    {
      name: 'Asia',
      children: [
        {
          name: 'Southern',
          children: [
            {
              name: 'Afghanistan', area: 645807, population: 31575018, density: 48.89, hdi: 0.496, gdpPerCapita: 1900, wpaMean: 1463, wpaMedian: 640
            },
            {
              name: 'Bangladesh', area: 143998, population: 168760114, density: 1172, ihdi: 0.465, hdi: 0.614, gdpPerCapita: 4200, igini: 0.324, wgini: 0.671, wpaMean: 6643, wpaMedian: 2787
            },
            {
              name: 'Bhutan', area: 38394, population: 827172, density: 21.54, ihdi: 0.450, hdi: 0.617, gdpPerCapita: 8700, igini: 0.374
            },
            {
              name: 'India', area: 3287263, population: 1352642280, density: 411.48, ihdi: 0.538, hdi: 0.647, gdpPerCapita: 7200, igini: 0.378, wgini: 0.854, sirop: 0.213, wpaMean: 14569, wpaMedian: 3042
            },
            {
              name: 'Iran', area: 1648195, population: 83519309, density: 51, ihdi: 0.706, hdi: 0.797, gdpPerCapita: 20000, igini: 0.408, wgini: 0.705, sirop: 0.163, wpaMean: 13437, wpaMedian: 5254
            },
            {
              name: 'Maldives', area: 298, population: 374775, density: 1257.63, ihdi: 0.568, hdi: 0.719, gdpPerCapita: 19200, igini: 0.313, wpaMean: 23297, wpaMedian: 8555
            },
            {
              name: 'Nepal', area: 147516, population: 29609623, density: 200.72, ihdi: 0.430, hdi: 0.579, gdpPerCapita: 2700, igini: 0.328, wpaMean: 3870, wpaMedian: 1510
            },
            {
              name: 'Pakistan', area: 803940, population: 219907520, density: 274, ihdi: 0.386, hdi: 0.560, gdpPerCapita: 5400, igini: 0.335, wgini: 0.65, wpaMean: 4096, wpaMedian: 1766
            },
            {
              name: 'Sri Lanka', area: 65610, population: 21803000, density: 332.31, ihdi: 0.686, hdi: 0.780, gdpPerCapita: 13000, igini: 0.398, wgini: 0.687, wpaMean: 20628, wpaMedian: 8283
            }
          ]
        },
        {
          name: 'Western',
          children: [
            {
              name: 'Armenia', area: 29743, population: 2957500, density: 99.44, ihdi: 0.685, hdi: 0.760, gdpPerCapita: 9100, igini: 0.344, wgini: 0.645, wpaMean: 19517, wpaMedian: 8309
            },
            {
              name: 'Azerbaijan', area: 86600, population: 10067108, density: 116.25, ihdi: 0.683, hdi: 0.754, gdpPerCapita: 17400, igini: 0.266, wgini: 0.643, wpaMean: 11865, wpaMedian: 5150
            },
            {
              name: 'Bahrain', area: 778, population: 1543300, density: 1982.91, hdi: 0.838, gdpPerCapita: 51800, sirop: 0.180, wpaMean: 87108, wpaMedian: 30946
            },
            {
              name: 'Cyprus', area: 5896, population: 875900, density: 148.56, ihdi: 0.788, hdi: 0.873, gdpPerCapita: 36600, igini: 0.314, sirop: 0.086, wpaMean: 116207, wpaMedian: 28803
            },
            {
              name: 'Georgia', area: 69700, population: 3729600, density: 53.51, ihdi: 0.692, hdi: 0.786, gdpPerCapita: 10600, igini: 0.364, wgini: 0.678, wpaMean: 12609, wpaMedian: 5226
            },
            {
              name: 'Iraq', area: 438317, population: 39309783, density: 89.68, ihdi: 0.552, hdi: 0.689, gdpPerCapita: 17000, igini: 0.295, sirop: 0.220, wpaMean: 16540, wpaMedian: 7331
            },
            {
              name: 'Israel', area: 22072, population: 9206670, density: 417, ihdi: 0.809, hdi: 0.906, gdpPerCapita: 36200, igini: 0.390, wgini: 0.766, wpaMean: 196568, wpaMedian: 58066
            },
            {
              name: 'Jordan', area: 89342, population: 10699352, density: 120, ihdi: 0.617, hdi: 0.723, gdpPerCapita: 12500, igini: 0.337, wgini: 0.677, sirop: 0.161, wpaMean: 26475, wpaMedian: 10947
            },
            {
              name: 'Kuwait', area: 17818, population: 4420110, density: 248.07, hdi: 0.808, gdpPerCapita: 69700, sirop: 0.199, wpaMean: 131269, wpaMedian: 46218
            },
            {
              name: 'Lebanon', area: 10452, population: 6855713, density: 672.06, hdi: 0.730, gdpPerCapita: 19500, igini: 0.318, wgini: 0.889, sirop: 0.234, wpaMean: 55226, wpaMedian: 12198
            },
            {
              name: 'Oman', area: 309500, population: 4645249, density: 15.01, ihdi: 0.732, hdi: 0.834, gdpPerCapita: 45500, sirop: 0.195, wpaMean: 43291, wpaMedian: 14723
            },
            {
              name: 'Qatar', area: 11571, population: 2740479, density: 236.84, hdi: 0.848, gdpPerCapita: 124900, sirop: 0.290, wpaMean: 147745, wpaMedian: 69671
            },
            {
              name: 'Saudi Arabia', area: 2149690, population: 34218169, density: 15.92, hdi: 0.857, gdpPerCapita: 55300, wgini: 0.81, sirop: 0.197, wpaMean: 67032, wpaMedian: 16599
            },
            {
              name: 'Palestine', area: 6020, population: 4976684, density: 826.69, ihdi: 0.597, hdi: 0.690, gdpPerCapita: 4300, igini: 0.337, sirop: 0.158
            },
            {
              name: 'Syria', area: 185180, population: 17070135, density: 92.18, hdi: 0.549, gdpPerCapita: 2900, igini: 0.358, sirop: 0.147, wpaMean: 2179, wpaMedian: 884
            },
            {
              name: 'Turkey', area: 783562, population: 83154997, density: 106.12, ihdi: 0.676, hdi: 0.806, gdpPerCapita: 26500, igini: 0.419, wgini: 0.871, sirop: 0.234, wpaMean: 24398, wpaMedian: 6568
            },
            {
              name: 'United Arab Emirates', area: 83600, population: 9770529, density: 116.87, hdi: 0.866, gdpPerCapita: 68200, igini: 0.325, sirop: 0.228, wpaMean: 117060, wpaMedian: 35315
            },
            {
              name: 'Yemen', area: 455000, population: 28915284, density: 63.55, ihdi: 0.316, hdi: 0.463, gdpPerCapita: 2300, igini: 0.367, wgini: 0.801, sirop: 0.157, wpaMean: 4926, wpaMedian: 1467
            }
          ]
        },
        {
          name: 'South-Eastern',
          children: [
            {
              name: 'Brunei', area: 5765, population: 421300, density: 73.08, hdi: 0.845, gdpPerCapita: 76700, wpaMean: 44541, wpaMedian: 13634
            },
            {
              name: 'Cambodia', area: 181035, population: 16289270, density: 89.98, ihdi: 0.465, hdi: 0.581, gdpPerCapita: 4000, igini: 0.379, wgini: 0.704, wpaMean: 5395, wpaMedian: 2029
            },
            {
              name: 'Indonesia', area: 1904569, population: 268074600, density: 140.75, ihdi: 0.583, hdi: 0.707, gdpPerCapita: 12400, igini: 0.390, wgini: 0.84, wpaMean: 10545, wpaMedian: 1977
            },
            {
              name: 'Laos', area: 236800, population: 6492400, density: 27.42, ihdi: 0.454, hdi: 0.604, gdpPerCapita: 7400, igini: 0.364, wpaMean: 6720, wpaMedian: 2002
            },
            {
              name: 'Malaysia', area: 330803, population: 32806760, density: 99, hdi: 0.804, gdpPerCapita: 28900, igini: 0.410, wgini: 0.82, sirop: 0.145, wpaMean: 31270, wpaMedian: 8940
            },
            {
              name: 'Myanmar', area: 676577, population: 54339766, density: 80.32, ihdi: 0.448, hdi: 0.584, gdpPerCapita: 6300, igini: 0.307, wpaMean: 3323, wpaMedian: 1556
            },
            {
              name: 'Philippines', area: 300000, population: 108742057, density: 362, ihdi: 0.582, hdi: 0.712, gdpPerCapita: 8200, igini: 0.444, wgini: 0.826, wpaMean: 12063, wpaMedian: 2663
            },
            {
              name: 'Singapore', area: 722.5, population: 5703600, density: 7894.26, ihdi: 0.810, hdi: 0.935, gdpPerCapita: 90500, igini: 0.464, wgini: 0.758, sirop: 0.140, wpaMean: 297873, wpaMedian: 96967
            },
            {
              name: 'Thailand', area: 513120, population: 66515342, density: 130, ihdi: 0.635, hdi: 0.765, gdpPerCapita: 17800, igini: 0.364, wgini: 0.902, sirop: 0.202, wpaMean: 21853, wpaMedian: 3526
            },
            {
              name: 'Timor-Leste', area: 14919, population: 1167242, density: 78.24, ihdi: 0.450, hdi: 0.626, gdpPerCapita: 5000, igini: 0.287, wpaMean: 5143, wpaMedian: 2453
            },
            {
              name: 'Vietnam', area: 331212, population: 96208984, density: 290.48, ihdi: 0.580, hdi: 0.693, gdpPerCapita: 6900, igini: 0.357, wgini: 0.708, wpaMean: 11712, wpaMedian: 3679
            }
          ]
        },
        {
          name: 'Eastern',
          children: [
            {
              name: 'China', area: 9640821, population: 1403032040, density: 146, ihdi: 0.636, hdi: 0.758, gdpPerCapita: 16600, igini: 0.385, wgini: 0.714, sirop: 0.139, wpaMean: 58544, wpaMedian: 20942
            },
            // {
            //   name: 'China Hong Kong', area: 1106, population: 7500700, density: 6781.83, ihdi: 0.815, hdi: 0.939, gdpPerCapita: 61000, igini: 0.537, wgini: 0.740, wpaMean: 489258, wpaMedian: 146887
            // },
            // {
            //   name: 'China Macau', area: 32.9, population: 696100, density: 21158.05, gdpPerCapita: 114400, igini: 0.35, wgini: 0.58
            // },
            {
              name: 'North Korea', area: 120540, population: 25450000, density: 211.13, gdpPerCapita: 1700
            },
            {
              name: 'South Korea', area: 100210, population: 51780579, density: 516.72, ihdi: 0.777, hdi: 0.906, gdpPerCapita: 39400, igini: 0.316, wgini: 0.67, sirop: 0.122, wpaMean: 175015, wpaMedian: 72198
            },
            {
              name: 'Japan', area: 377975, population: 126010000, density: 333.38, ihdi: 0.882, hdi: 0.915, gdpPerCapita: 42700, igini: 0.329, wgini: 0.631, sirop: 0.104, wpaMean: 238104, wpaMedian: 110408
            },
            {
              name: 'Mongolia', area: 1564100, population: 3238479, density: 2.07, ihdi: 0.635, hdi: 0.735, gdpPerCapita: 12600, igini: 0.327, wpaMean: 6135, wpaMedian: 2654
            }
          ]
        },
        {
          name: 'Central',
          children: [
            {
              name: 'Kazakhstan', area: 2724900, population: 18592700, density: 6.69, ihdi: 0.759, hdi: 0.817, gdpPerCapita: 26100, igini: 0.275, wgini: 0.952, wpaMean: 26317, wpaMedian: 6642
            },
            {
              name: 'Kyrgyzstan', area: 199945, population: 6309300, density: 31.56, ihdi: 0.610, hdi: 0.674, gdpPerCapita: 3700, igini: 0.277, wgini: 0.673, wpaMean: 5758, wpaMedian: 2412
            },
            {
              name: 'Tajikistan', area: 143100, population: 9127000, density: 63.78, ihdi: 0.574, hdi: 0.656, gdpPerCapita: 3100, igini: 0.340, wpaMean: 3602, wpaMedian: 1589
            },
            {
              name: 'Turkmenistan', area: 491210, population: 5851466, density: 11.91, ihdi: 0.578, hdi: 0.710, gdpPerCapita: 18700, igini: 0.408, wpaMean: 15691, wpaMedian: 6974
            },
            {
              name: 'Uzbekistan', area: 447400, population: 32653900, density: 72.99, hdi: 0.710, gdpPerCapita: 7000, igini: 0.353
            }
          ]
        }
      ]
    },
    {
      name: 'Europe',
      children: [
        {
          name: 'Southern',
          children: [
            {
              name: 'Albania', area: 28703, population: 2862427, density: 99.73, ihdi: 0.705, hdi: 0.791, gdpPerCapita: 12500, igini: 0.332, wgini: 0.629, sirop: 0.091, wpaMean: 31366, wpaMedian: 14731
            },
            {
              name: 'Andorra', area: 464, population: 76177, density: 164.17, hdi: 0.857, gdpPerCapita: 49900
            },
            {
              name: 'Bosnia', area: 51209, population: 3511372, density: 68.57, ihdi: 0.658, hdi: 0.769, gdpPerCapita: 11400, igini: 0.330, sirop: 0.062, wpaMean: 27873, wpaMedian: 13037
            },
            {
              name: 'Croatia', area: 56542, population: 4087843, density: 72.3, ihdi: 0.768, hdi: 0.837, gdpPerCapita: 24100, igini: 0.304, wgini: 0.631, sirop: 0.076, wpaMean: 62804, wpaMedian: 29183
            },
            // {
            //   name: 'Gibraltar', area: 6.8, population: 33701, density: 4956.03, gdpPerCapita: 61700
            // },
            {
              name: 'Greece', area: 131957, population: 10724599, density: 81.27, ihdi: 0.766, hdi: 0.872, gdpPerCapita: 27800, igini: 0.344, wgini: 0.682, sirop: 0.108, wpaMean: 96110, wpaMedian: 40000
            },
            {
              name: 'Italy', area: 301308, population: 60252824, density: 199.97, ihdi: 0.776, hdi: 0.883, gdpPerCapita: 38100, igini: 0.359, wgini: 0.689, sirop: 0.075, wpaMean: 234139, wpaMedian: 91889
            },
            {
              name: 'Malta', area: 315, population: 493559, density: 1566.85, ihdi: 0.815, hdi: 0.885, gdpPerCapita: 42500, igini: 0.292, wgini: 0.631, sirop: 0.117, wpaMean: 143566, wpaMedian: 76016
            },
            {
              name: 'Montenegro', area: 13812, population: 622182, density: 45.05, ihdi: 0.746, hdi: 0.816, gdpPerCapita: 17400, igini: 0.390, sirop: 0.064, wpaMean: 53484, wpaMedian: 24242
            },
            {
              name: 'Portugal', area: 92090, population: 10276617, density: 111.59, ihdi: 0.742, hdi: 0.850, gdpPerCapita: 30300, igini: 0.338, wgini: 0.736, sirop: 0.074, wpaMean: 131088, wpaMedian: 44025
            },
            // {
            //   name: 'San Marino', area: 61, population: 34641, density: 567.89, gdpPerCapita: 59500
            // },
            {
              name: 'Serbia', area: 77474, population: 6901188, density: 89.08, ihdi: 0.710, hdi: 0.799, gdpPerCapita: 15200, igini: 0.362, sirop: 0.064, wpaMean: 25046, wpaMedian: 10737
            },
            {
              name: 'Slovenia', area: 20273, population: 2084301, density: 102.81, ihdi: 0.858, hdi: 0.902, gdpPerCapita: 34100, igini: 0.242, wgini: 0.646, sirop: 0.067, wpaMean: 122508, wpaMedian: 50380
            },
            {
              name: 'Spain', area: 505990, population: 46934632, density: 92.76, ihdi: 0.765, hdi: 0.893, gdpPerCapita: 38300, igini: 0.347, wgini: 0.697, sirop: 0.098, wpaMean: 207531, wpaMedian: 95360
            },
            {
              name: 'Macedonia', area: 25713, population: 2077132, density: 80.78, ihdi: 0.660, hdi: 0.759, gdpPerCapita: 15200, igini: 0.342, wgini: 0.655, sirop: 0.058
            }
          ]
        },
        {
          name: 'Western',
          children: [
            {
              name: 'Austria', area: 83879, population: 8902600, density: 106.14, ihdi: 0.843, hdi: 0.914, gdpPerCapita: 49200, igini: 0.297, wgini: 0.764, sirop: 0.082, wpaMean: 274919, wpaMedian: 94070
            },
            {
              name: 'Belgium', area: 30689, population: 11524454, density: 375.52, ihdi: 0.849, hdi: 0.919, gdpPerCapita: 46300, igini: 0.274, wgini: 0.659, sirop: 0.067, wpaMean: 246135, wpaMedian: 117093
            },
            {
              name: 'France', area: 543965, population: 67060000, density: 123.28, ihdi: 0.809, hdi: 0.891, gdpPerCapita: 43600, igini: 0.316, wgini: 0.687, sirop: 0.108, wpaMean: 276121, wpaMedian: 101942
            },
            {
              name: 'Germany', area: 357168, population: 83149300, density: 232.8, ihdi: 0.861, hdi: 0.939, gdpPerCapita: 50200, igini: 0.319, wgini: 0.816, sirop: 0.111, wpaMean: 216654, wpaMedian: 35313
            },
            {
              name: 'Liechtenstein', area: 160, population: 38380, density: 239.88, hdi: 0.917, gdpPerCapita: 139100
            },
            {
              name: 'Luxembourg', area: 2586, population: 613894, density: 237.39, ihdi: 0.822, hdi: 0.909, gdpPerCapita: 109100, igini: 0.349, wgini: 0.663, sirop: 0.092, wpaMean: 358003, wpaMedian: 139789
            },
            // {
            //   name: 'Monaco', area: 2.02, population: 38300, density: 18960.4 gdpPerCapita: 115700
            // },
            {
              name: 'Netherlands', area: 41526, population: 17475181, density: 421, ihdi: 0.870, hdi: 0.933, gdpPerCapita: 53600, igini: 0.285, wgini: 0.736, sirop: 0.062, wpaMean: 279077, wpaMedian: 31057
            },
            {
              name: 'Switzerland', area: 41285, population: 8586550, density: 207.98, ihdi: 0.881, hdi: 0.946, gdpPerCapita: 61400, igini: 0.327, wgini: 0.741, sirop: 0.119, wpaMean: 564653, wpaMedian: 227891
            }
          ]
        },
        {
          name: 'Eastern',
          children: [
            {
              name: 'Belarus', area: 207600, population: 9397800, density: 45.59, ihdi: 0.765, hdi: 0.817, gdpPerCapita: 18600, igini: 0.252, wgini: 0.614, wpaMean: 16590, wpaMedian: 7931
            },
            {
              name: 'Bulgaria', area: 111002, population: 7000039, density: 63.06, ihdi: 0.713, hdi: 0.816, gdpPerCapita: 21600, igini: 0.404, wgini: 0.647, sirop: 0.084, wpaMean: 42686, wpaMedian: 18948
            },
            {
              name: 'Czech Republic', area: 78867, population: 10681161, density: 135.43, ihdi: 0.850, hdi: 0.891, gdpPerCapita: 35200, igini: 0.249, wgini: 0.758, sirop: 0.095, wpaMean: 64663, wpaMedian: 20854
            },
            {
              name: 'Hungary', area: 93029, population: 9764000, density: 104.96, ihdi: 0.777, hdi: 0.845, gdpPerCapita: 28900, igini: 0.306, wgini: 0.662, sirop: 0.077, wpaMean: 44321, wpaMedian: 17666
            },
            {
              name: 'Poland', area: 312685, population: 38386000, density: 122.76, ihdi: 0.801, hdi: 0.872, gdpPerCapita: 29300, igini: 0.297, wgini: 0.722, sirop: 0.125, wpaMean: 57873, wpaMedian: 22600
            },
            {
              name: 'Moldova', area: 33843, population: 2681735, density: 79.24, ihdi: 0.638, hdi: 0.711, gdpPerCapita: 5700, igini: 0.257, sirop: 0.060, wpaMean: 12804, wpaMedian: 5855
            },
            {
              name: 'Romania', area: 238391, population: 19405156, density: 81.4, ihdi: 0.725, hdi: 0.816, gdpPerCapita: 24000, igini: 0.360, wgini: 0.728, sirop: 0.068, wpaMean: 43074, wpaMedian: 19582
            },
            {
              name: 'Russia', area: 17125242, population: 146877088, density: 8.58, ihdi: 0.743, hdi: 0.824, gdpPerCapita: 27900, igini: 0.375, wgini: 0.875, sirop: 0.202, wpaMean: 27381, wpaMedian: 3683
            },
            {
              name: 'Slovakia', area: 49036, population: 5450421, density: 111.15, ihdi: 0.804, hdi: 0.857, gdpPerCapita: 32900, igini: 0.252, wgini: 0.498, sirop: 0.052, wpaMean: 66171, wpaMedian: 40432
            },
            {
              name: 'Ukraine', area: 603000, population: 41902416, density: 69.49, ihdi: 0.701, hdi: 0.750, gdpPerCapita: 8700, igini: 0.261, wgini: 0.955, wpaMean: 8792, wpaMedian: 1223
            }
          ]
        },
        {
          name: 'Northern',
          children: [
            {
              name: 'Denmark', area: 43098, population: 5814461, density: 134.91, ihdi: 0.873, hdi: 0.930, gdpPerCapita: 49600, igini: 0.287, wgini: 0.835, sirop: 0.128, wpaMean: 284022, wpaMedian: 58784
            },
            {
              name: 'Estonia', area: 45339, population: 1324820, density: 29.22, ihdi: 0.818, hdi: 0.882, gdpPerCapita: 31500, igini: 0.304, wgini: 0.715, sirop: 0.070, wpaMean: 78458, wpaMedian: 24915
            },
            {
              name: 'Finland', area: 338424, population: 5527405, density: 16.33, ihdi: 0.876, hdi: 0.925, gdpPerCapita: 44000, igini: 0.274, wgini: 0.767, sirop: 0.073, wpaMean: 183124, wpaMedian: 55532
            },
            {
              name: 'Iceland', area: 102775, population: 366130, density: 3.56, ihdi: 0.885, hdi: 0.938, gdpPerCapita: 52100, igini: 0.268, wgini: 0.731, sirop: 0.068, wpaMean: 380868, wpaMedian: 165961
            },
            {
              name: 'Ireland', area: 70273, population: 4921500, density: 70.03, ihdi: 0.872, hdi: 0.942, gdpPerCapita: 72600, igini: 0.328, wgini: 0.83, sirop: 0.128, wpaMean: 272310, wpaMedian: 104842
            },
            {
              name: 'Latvia', area: 64562, population: 1910400, density: 29.59, ihdi: 0.776, hdi: 0.854, gdpPerCapita: 27300, igini: 0.356, wgini: 0.788, sirop: 0.076, wpaMean: 60347, wpaMedian: 13348
            },
            {
              name: 'Lithuania', area: 65300, population: 2793466, density: 42.78, ihdi: 0.774, hdi: 0.869, gdpPerCapita: 31900, igini: 0.373, wgini: 0.655, sirop: 0.070, wpaMean: 50254, wpaMedian: 22261
            },
            {
              name: 'Norway', area: 323808, population: 5367580, density: 16.58, ihdi: 0.889, hdi: 0.954, gdpPerCapita: 70600, igini: 0.270, wgini: 0.791, sirop: 0.084, wpaMean: 267348, wpaMedian: 70627
            },
            {
              name: 'Sweden', area: 450295, population: 10343403, density: 22.97, ihdi: 0.874, hdi: 0.937, gdpPerCapita: 51300, igini: 0.288, wgini: 0.865, sirop: 0.083, wpaMean: 265260, wpaMedian: 41582
            },
            {
              name: 'United Kingdom', area: 242495, population: 67886004, density: 279.95, ihdi: 0.845, hdi: 0.920, gdpPerCapita: 43600, igini: 0.348, wgini: 0.747, sirop: 0.117, wpaMean: 280049, wpaMedian: 97452
            }
          ]
        }
      ]
    },
    {
      name: 'Africa',
      children: [
        {
          name: 'Northern',
          children: [
            {
              name: 'Algeria', area: 2381741, population: 43000000, density: 18.05, ihdi: 0.604, hdi: 0.759, gdpPerCapita: 15100, igini: 0.276, wgini: 0.758, wpaMean: 9348, wpaMedian: 3267
            },
            {
              name: 'Egypt', area: 1002450, population: 100482339, density: 100, ihdi: 0.492, hdi: 0.700, gdpPerCapita: 13000, igini: 0.315, wgini: 0.909, sirop: 0.191, wpaMean: 15395, wpaMedian: 4900
            },
            {
              name: 'Libya', area: 1770060, population: 6470956, density: 3.66, hdi: 0.708, gdpPerCapita: 9800, wpaMean: 19473, wpaMedian: 8330
            },
            {
              name: 'Morocco', area: 446550, population: 35923239, density: 80, hdi: 0.676, gdpPerCapita: 8600, igini: 0.395, wgini: 0.802, wpaMean: 12929, wpaMedian: 4010
            },
            {
              name: 'Sudan', area: 1839542, population: 40782742, density: 22.17, ihdi: 0.332, hdi: 0.507, gdpPerCapita: 4600, igini: 0.354, wpaMean: 534, wpaMedian: 218
            },
            // {
            //   name: 'Sahara', area: 252120, population: 567421, density: 2.25 gdpPerCapita: 2500
            // },
            {
              name: 'Tunisia', area: 163610, population: 11722038, density: 71.65, ihdi: 0.585, hdi: 0.739, gdpPerCapita: 12000, igini: 0.328, wgini: 0.683, wpaMean: 13853, wpaMedian: 5395
            }
          ]
        },
        {
          name: 'Middle',
          children: [
            {
              name: 'Angola', area: 1246700, population: 29250009, density: 23.46, ihdi: 0.392, hdi: 0.574, gdpPerCapita: 6800, igini: 0.513, wpaMean: 3649, wpaMedian: 1370
            },
            {
              name: 'Cameroon', area: 466050, population: 24348251, density: 52.24, ihdi: 0.371, hdi: 0.563, gdpPerCapita: 3400, igini: 0.466, wgini: 0.725, wpaMean: 2840, wpaMedian: 1036
            },
            {
              name: 'Central African Republic', area: 622436, population: 4737423, density: 7.61, ihdi: 0.222, hdi: 0.381, gdpPerCapita: 700, igini: 0.562, wgini: 0.768, wpaMean: 749, wpaMedian: 244
            },
            {
              name: 'Chad', area: 1284000, population: 15353184, density: 11.96, ihdi: 0.250, hdi: 0.401, gdpPerCapita: 2400, igini: 0.433, wgini: 0.715, wpaMean: 1167, wpaMedian: 435
            },
            {
              name: 'Congo', area: 342000, population: 5399895, density: 15.79, ihdi: 0.456, hdi: 0.608, gdpPerCapita: 6700, igini: 0.489, wpaMean: 2701, wpaMedian: 913
            },
            {
              name: 'Guinea', area: 245857, population: 12218357, density: 49.7, ihdi: 0.310, hdi: 0.466, gdpPerCapita: 2000, igini: 0.337, wgini: 0.716, wpaMean: 2185, wpaMedian: 802
            },
            {
              name: 'Gabon', area: 267667, population: 2067561, density: 7.72, ihdi: 0.544, hdi: 0.702, gdpPerCapita: 19300, igini: 0.380, wgini: 0.7, wpaMean: 15113, wpaMedian: 6035
            }
          ]
        },
        {
          name: 'Western',
          children: [
            {
              name: 'Benin', area: 112622, population: 11733059, density: 104.18, ihdi: 0.327, hdi: 0.520, gdpPerCapita: 2200, igini: 0.478, wgini: 0.689, wpaMean: 2166, wpaMedian: 845
            },
            {
              name: 'Burkina Faso', area: 270764, population: 20244080, density: 74.77, ihdi: 0.303, hdi: 0.434, gdpPerCapita: 1900, igini: 0.353, wgini: 0.674, wpaMean: 1440, wpaMedian: 589
            },
            {
              name: 'Cape Verde', area: 4033, population: 550483, density: 136.49, hdi: 0.651, gdpPerCapita: 6900, igini: 0.472
            },
            {
              name: 'Côte d\'Ivoire', area: 322921, population: 25823071, density: 79.97, ihdi: 0.331, hdi: 0.516, gdpPerCapita: 3900, igini: 0.415, sirop: 0.171
            },
            {
              name: 'Gambia', area: 10690, population: 2228075, density: 208.43, ihdi: 0.293, hdi: 0.466, gdpPerCapita: 1700, igini: 0.359, wgini: 0.755, wpaMean: 2141, wpaMedian: 693
            },
            {
              name: 'Ghana', area: 238533, population: 30280811, density: 126.95, ihdi: 0.427, hdi: 0.596, gdpPerCapita: 4600, igini: 0.435, wgini: 0.682, wpaMean: 4292, wpaMedian: 1706
            },
            {
              name: 'Guinea-Bissau', area: 36125, population: 1604528, density: 44.42, ihdi: 0.288, hdi: 0.461, gdpPerCapita: 1800, igini: 0.507, wgini: 0.697, wpaMean: 1647, wpaMedian: 655
            },
            {
              name: 'Liberia', area: 97036, population: 4475353, density: 46.12, ihdi: 0.314, hdi: 0.465, gdpPerCapita: 900, igini: 0.353, wpaMean: 2169, wpaMedian: 820
            },
            {
              name: 'Mali', area: 1248574, population: 19107706, density: 15.3, ihdi: 0.294, hdi: 0.427, gdpPerCapita: 2200, igini: 0.330, wgini: 0.682, wpaMean: 1955, wpaMedian: 773
            },
            {
              name: 'Mauritania', area: 1030700, population: 3984233, density: 3.87, ihdi: 0.358, hdi: 0.527, gdpPerCapita: 4500, igini: 0.326, wgini: 0.667, wpaMean: 2397, wpaMedian: 976
            },
            {
              name: 'Niger', area: 1186408, population: 22314743, density: 18.81, ihdi: 0.272, hdi: 0.377, gdpPerCapita: 1200, igini: 0.343, wgini: 0.66, wpaMean: 1126, wpaMedian: 463
            },
            {
              name: 'Nigeria', area: 923768, population: 200962000, density: 217.55, ihdi: 0.349, hdi: 0.534, gdpPerCapita: 5900, igini: 0.430, wgini: 0.894, wpaMean: 4881, wpaMedian: 1249
            },
            // {
            //   name: 'Saint Helena', area: 394, population: 5633, density: 14.3 gdpPerCapita: 7800
            // },
            {
              name: 'Senegal', area: 196722, population: 16209125, density: 82.4, ihdi: 0.347, hdi: 0.514, gdpPerCapita: 2700, igini: 0.403, wgini: 0.705, wpaMean: 4265, wpaMedian: 1632
            },
            {
              name: 'Sierra Leone', area: 71740, population: 7901454, density: 110.14, ihdi: 0.282, hdi: 0.438, gdpPerCapita: 1800, igini: 0.357, wgini: 0.671, wpaMean: 693, wpaMedian: 278
            },
            {
              name: 'Togo', area: 56600, population: 7538000, density: 133.18, ihdi: 0.350, hdi: 0.513, gdpPerCapita: 1600, igini: 0.431, wgini: 0.719, wpaMean: 1241, wpaMedian: 469
            }
          ]
        },
        {
          name: 'Southern',
          children: [
            {
              name: 'Botswana', area: 581730, population: 2302878, density: 3.96, hdi: 0.728, gdpPerCapita: 18100, igini: 0.533, wgini: 0.783, wpaMean: 14684, wpaMedian: 4550
            },
            {
              name: 'Lesotho', area: 30355, population: 2263010, density: 74.55, ihdi: 0.350, hdi: 0.518, gdpPerCapita: 3900, igini: 0.449, wgini: 0.795, wpaMean: 1313, wpaMedian: 384
            },
            {
              name: 'Namibia', area: 825118, population: 2413643, density: 2.93, ihdi: 0.418, hdi: 0.645, gdpPerCapita: 11500, igini: 0.591, wgini: 0.776, wpaMean: 17220, wpaMedian: 5502
            },
            // {
            //   name: 'Swaziland', area: 17364, population: 1159250, density: 66.76, gdpPerCapita: 0
            // },
            {
              name: 'South Africa', area: 1220813, population: 58775022, density: 48.14, ihdi: 0.463, hdi: 0.705, gdpPerCapita: 13400, igini: 0.630, wgini: 0.806, sirop: 0.192, wpaMean: 21380, wpaMedian: 6476
            }
          ]
        },
        {
          name: 'Eastern',
          children: [
            {
              name: 'Burundi', area: 27816, population: 11215578, density: 403.21, ihdi: 0.296, hdi: 0.423, gdpPerCapita: 800, igini: 0.386, wgini: 0.654, wpaMean: 609, wpaMedian: 250
            },
            {
              name: 'Comoros', area: 1861, population: 873724, density: 469.49, ihdi: 0.294, hdi: 0.538, gdpPerCapita: 1600, igini: 0.453, wgini: 0.766, wpaMean: 5155, wpaMedian: 1679
            },
            {
              name: 'Djibouti', area: 23000, population: 1078373, density: 46.89, hdi: 0.495, gdpPerCapita: 3600, igini: 0.446, wpaMean: 2936, wpaMedian: 1120
            },
            {
              name: 'Eritrea', area: 121100, population: 3497117, density: 28.88, hdi: 0.434, gdpPerCapita: 1400, wpaMean: 4134, wpaMedian: 1910
            },
            {
              name: 'Ethiopia', area: 1063652, population: 107534882, density: 101.1, ihdi: 0.337, hdi: 0.470, gdpPerCapita: 2100, igini: 0.350, wgini: 0.612, wpaMean: 3085, wpaMedian: 1360
            },
            {
              name: 'Kenya', area: 581834, population: 47564296, density: 81.75, ihdi: 0.426, hdi: 0.579, gdpPerCapita: 3500, igini: 0.408, wgini: 0.732, wpaMean: 9791, wpaMedian: 3553
            },
            {
              name: 'Madagascar', area: 587041, population: 25680342, density: 43.75, ihdi: 0.386, hdi: 0.521, gdpPerCapita: 1600, igini: 0.426, wgini: 0.702, wpaMean: 1610, wpaMedian: 626
            },
            {
              name: 'Malawi', area: 118484, population: 17563749, density: 148.24, ihdi: 0.346, hdi: 0.485, gdpPerCapita: 1200, igini: 0.447, wgini: 0.733, wpaMean: 1313, wpaMedian: 468
            },
            {
              name: 'Mauritius', area: 2040, population: 1265577, density: 620.38, ihdi: 0.688, hdi: 0.796, gdpPerCapita: 21600, igini: 0.368, wgini: 0.64, sirop: 0.071, wpaMean: 50796, wpaMedian: 20875
            },
            // {
            //   name: 'Mayotte', area: 374, population: 256518, density: 685.88, gdpPerCapita: 0
            // },
            {
              name: 'Mozambique', area: 799380, population: 28571310, density: 35.74, ihdi: 0.309, hdi: 0.446, gdpPerCapita: 1300, igini: 0.540, wgini: 0.7, wpaMean: 880, wpaMedian: 352
            },
            {
              name: 'Rwanda', area: 26338, population: 12374397, density: 469.83, ihdi: 0.382, hdi: 0.536, gdpPerCapita: 2100, igini: 0.437, wgini: 0.728, wpaMean: 3435, wpaMedian: 1259
            },
            {
              name: 'Seychelles', area: 455, population: 96762, density: 212.66, hdi: 0.801, gdpPerCapita: 28900, igini: 0.468, wgini: 0.679, wpaMean: 57835, wpaMedian: 22572
            },
            {
              name: 'Somalia', area: 637657, population: 15181925, density: 23.81, hdi: 0.541
            },
            {
              name: 'South Sudan', area: 644329, population: 12778250, density: 19.83, ihdi: 0.264, hdi: 0.413, gdpPerCapita: 1500, igini: 0.354, wpaMean: 534, wpaMedian: 218
            },
            {
              name: 'Uganda', area: 241551, population: 40006700, density: 165.62, ihdi: 0.387, hdi: 0.528, gdpPerCapita: 2400, igini: 0.428, wgini: 0.714, wpaMean: 1603, wpaMedian: 612
            },
            {
              name: 'Tanzania', area: 945087, population: 55890747, density: 59.14, ihdi: 0.397, hdi: 0.528, gdpPerCapita: 3300, igini: 0.405, wgini: 0.65, wpaMean: 3069, wpaMedian: 1282
            },
            {
              name: 'Zambia', area: 752612, population: 16405229, density: 21.8, ihdi: 0.394, hdi: 0.591, gdpPerCapita: 4000, igini: 0.571, wgini: 0.787, wpaMean: 2565, wpaMedian: 784
            },
            {
              name: 'Zimbabwe', area: 390757, population: 15159624, density: 38.8, ihdi: 0.435, hdi: 0.563, gdpPerCapita: 2300, igini: 0.443, wgini: 0.707, wpaMean: 4734, wpaMedian: 1843
            }
          ]
        }
      ]
    },
    {
      name: 'Oceania',
      children: [
        {
          name: 'Polynesia',
          children: [
            // {
            //   name: 'American Samoa', area: 197, population: 57100, density: 289.85, gdpPerCapita: 13000
            // },
            // {
            //   name: 'Cook Islands', area: 237, population: 15250, density: 64.35, gdpPerCapita: 12300
            // },
            // {
            //   name: 'French Polynesia', area: 3521, population: 280600, density: 79.69, gdpPerCapita: 17000
            // },
            // {
            //   name: 'Niue', area: 261, population: 1613, density: 6.18, gdpPerCapita: 5800
            // },
            {
              name: 'Samoa', area: 2831, population: 199300, density: 70.4, hdi: 0.707, gdpPerCapita: 5700, wpaMean: 37066, wpaMedian: 13286
            },
            // {
            //   name: 'Tokelau', area: 10, population: 1400, density: 140, gdpPerCapita: 1000
            // },
            // {
            //   name: 'Tuvalu', area: 26, population: 10300, density: 396.15, gdpPerCapita: 3800
            // },
            {
              name: 'Tonga', area: 720, population: 100000, density: 138.89, hdi: 0.717, gdpPerCapita: 5600, wpaMean: 47889, wpaMedian: 19709
            }
          ]
        },
        {
          name: 'Australia',
          children: [
            {
              name: 'Australia', area: 7692024, population: 25736309, density: 3, ihdi: 0.862, hdi: 0.938, gdpPerCapita: 49900, igini: 0.344, wgini: 0.658, sirop: 0.064, wpaMean: 386058, wpaMedian: 181361
            },
            {
              name: 'New Zealand', area: 261, population: 1613, density: 6.18, ihdi: 0.836, hdi: 0.921, gdpPerCapita: 38900, igini: 0.362, wgini: 0.708, sirop: 0.082, wpaMean: 304124, wpaMedian: 116433
            }
          ]
        },
        {
          name: 'Melanesia',
          children: [
            // {
            //   name: 'Fiji', area: 18333, population: 884887, density: 48.27, gdpPerCapita: 9900, igini: 0.367, wgini: 0.694, wpaMean: 15598, wpaMedian: 6126
            // },
            // {
            //   name: 'New Caledonia', area: 18575, population: 258958, density: 13.94, gdpPerCapita: 31100
            // },
            {
              name: 'Papua New Guinea', area: 462840, population: 8935000, density: 19.3, hdi: 0.543, gdpPerCapita: 3800, igini: 0.419, wgini: 0.76, wpaMean: 6485, wpaMedian: 2120
            },
            {
              name: 'Solomon Islands', area: 28370, population: 682500, density: 24.06, hdi: 0.557, gdpPerCapita: 2100, wpaMean: 12933, wpaMedian: 5260
            },
            {
              name: 'Vanuatu', area: 12281, population: 304500, density: 24.79, hdi: 0.597, gdpPerCapita: 2800, wpaMean: 15090, wpaMedian: 6098
            }
          ]
        },
        {
          name: 'Micronesia',
          children: [
            // {
            //   name: 'Guam', area: 541, population: 175200, density: 323.84, gdpPerCapita: 30500
            // },
            {
              name: 'Kiribati', area: 811, population: 125000, density: 154.13, hdi: 0.623, gdpPerCapita: 1900
            },
            {
              name: 'Marshall Islands', area: 181, population: 55900, density: 308.84, hdi: 0.698, gdpPerCapita: 3400
            },
            {
              name: 'Micronesia', area: 701, population: 105600, density: 150.64, hdi: 0.614, gdpPerCapita: 3400, igini: 0.401
            },
            // {
            //   name: 'Nauru', area: 21, population: 11200, density: 533.33, gdpPerCapita: 12200
            // },
            // {
            //   name: 'Northern Mariana Islands', area: 457, population: 56600, density: 123.85, gdpPerCapita: 13300
            // },
            {
              name: 'Palau', area: 444, population: 17900, density: 40.32, hdi: 0.814, gdpPerCapita: 16700
            }
          ]
        }
      ]
    },
    {
      name: 'America',
      children: [
        {
          name: 'Caribbean',
          children: [
            // {
            //   name: 'Anguilla', area: 96, population: 13452, density: 140.13, gdpPerCapita: 12200
            // },
            {
              name: 'Antigua and Barbuda', area: 442, population: 104084, density: 235.48, hdi: 0.776, gdpPerCapita: 26300, wgini: 0.838, wpaMean: 24964, wpaMedian: 6961
            },
            // {
            //   name: 'Aruba', area: 180, population: 112309, density: 624, gdpPerCapita: 25300, wpaMean: 58033, wpaMedian: 21750
            // },
            {
              name: 'Bahamas', area: 13940, population: 386870, density: 27.75, hdi: 0.805, gdpPerCapita: 25100, wpaMean: 76507, wpaMedian: 20129
            },
            {
              name: 'Barbados', area: 430, population: 287025, density: 667.5, ihdi: 0.675, hdi: 0.813, gdpPerCapita: 17500, wgini: 0.788, wpaMean: 64658, wpaMedian: 20497
            },
            // {
            //   name: 'Virgin Islands', area: 151, population: 32206, density: 213.28, gdpPerCapita: 42300
            // },
            // {
            //   name: 'Bonaire', area: 288, population: 18905, density: 65.64
            // },
            // {
            //   name: 'Cayman Islands', area: 259, population: 65813, density: 254.1, gdpPerCapita: 43800
            // },
            {
              name: 'Cuba', area: 109884, population: 11193470, density: 101.87, hdi: 0.778, gdpPerCapita: 11900
            },
            // {
            //   name: 'Curaçao', area: 444, population: 158665, density: 357.35, gdpPerCapita: 15000
            // },
            {
              name: 'Dominica', area: 739, population: 71808, density: 97.17, hdi: 0.724, gdpPerCapita: 12000, wgini: 0.84, wpaMean: 33306, wpaMedian: 9447
            },
            {
              name: 'Dominican Republic', area: 47875, population: 10358320, density: 216.36, ihdi: 0.584, hdi: 0.745, gdpPerCapita: 17000, igini: 0.437, wgini: 0.723
            },
            {
              name: 'Grenada', area: 344, population: 108825, density: 316.35, hdi: 0.763, gdpPerCapita: 14700, wgini: 0.842, wpaMean: 45272, wpaMedian: 12218
            },
            // {
            //   name: 'Guadeloupe', area: 1628.4, population: 395725, density: 243.01
            // },
            {
              name: 'Haiti', area: 27065, population: 11263077, density: 416.15, ihdi: 0.299, hdi: 0.503, gdpPerCapita: 1800, igini: 0.411, wgini: 0.82, wpaMean: 723, wpaMedian: 214
            },
            {
              name: 'Jamaica', area: 10991, population: 2726667, density: 248.08, ihdi: 0.604, hdi: 0.726, gdpPerCapita: 9200, igini: 0.455, wgini: 0.788, wpaMean: 20878, wpaMedian: 6798
            },
            // {
            //   name: 'Martinique', area: 1128, population: 371246, density: 329.12
            // },
            // {
            //   name: 'Montserrat', area: 102, population: 4922, density: 48.25, gdpPerCapita: 8500
            // },
            // {
            //   name: 'Puerto Rico', area: 9104, population: 3195153, density: 350.96, gdpPerCapita: 37300, wgini: 0.753
            // },
            {
              name: 'Saint Kitts and Nevis', area: 270, population: 56345, density: 208.69, hdi: 0.777, gdpPerCapita: 26800
            },
            {
              name: 'Saint Lucia', area: 617, population: 180454, density: 292.47, ihdi: 0.617, hdi: 0.745, gdpPerCapita: 13500, igini: 0.512, wpaMean: 36586, wpaMedian: 13418
            },
            {
              name: 'Saint Vincent and the Grenadines', area: 389, population: 110520, density: 284.11, hdi: 0.728, gdpPerCapita: 11600, wpaMean: 20088, wpaMedian: 5508
            },
            // {
            //   name: 'Sint Maarten', area: 34, population: 33680, density: 1221, gdpPerCapita: 66800
            // },
            // {
            //   name: 'Turks and Caicos Islands', area: 497, population: 37910, density: 76.28, gdpPerCapita: 29100
            // },
            // {
            //   name: 'Virgin Islands', area: 352, population: 104909, density: 298.04, gdpPerCapita: 36100
            // },
            {
              name: 'Trinidad and Tobago', area: 5155, population: 1363985, density: 264.59, hdi: 0.799, gdpPerCapita: 31200, igini: 0.403, wgini: 0.748, wpaMean: 41094, wpaMedian: 14888
            }
          ]
        },
        {
          name: 'South',
          children: [
            {
              name: 'Argentina', area: 2780400, population: 44938712, density: 16.16, ihdi: 0.714, hdi: 0.830, gdpPerCapita: 20700, igini: 0.414, wgini: 0.792, wpaMean: 10256, wpaMedian: 3164
            },
            {
              name: 'Bolivia', area: 1098581, population: 11307314, density: 10.29, ihdi: 0.533, hdi: 0.703, gdpPerCapita: 7500, igini: 0.422, wgini: 0.779, wpaMean: 11672, wpaMedian: 3843
            },
            {
              name: 'Brazil', area: 8515767, population: 211641210, density: 25, ihdi: 0.574, hdi: 0.761, gdpPerCapita: 15500, igini: 0.466, wgini: 0.823, sirop: 0.284, wpaMean: 23550, wpaMedian: 5031
            },
            {
              name: 'Chile', area: 756096, population: 17373831, density: 22.98, ihdi: 0.673, hdi: 0.847, gdpPerCapita: 24600, igini: 0.444, wgini: 0.773, sirop: 0.237, wpaMean: 56972, wpaMedian: 19231
            },
            {
              name: 'Colombia', area: 1141748, population: 46320400, density: 41, ihdi: 0.585, hdi: 0.761, gdpPerCapita: 14500, igini: 0.504, wgini: 0.807, sirop: 0.204, wpaMean: 16411, wpaMedian: 5325
            },
            {
              name: 'Ecuador', area: 276841, population: 17503368, density: 63, ihdi: 0.607, hdi: 0.758, gdpPerCapita: 11200, igini: 0.454, wgini: 0.776, wpaMean: 19144, wpaMedian: 6399
            },
            // {
            //   name: 'Falkland Islands', area: 12173, population: 2563, density: 0.21, gdpPerCapita: 96200
            // },
            // {
            //   name: 'French Guiana', area: 86504, population: 244118, density: 2.82, gdpPerCapita: 0
            // },
            {
              name: 'Guyana', area: 214999, population: 782225, density: 3.64, ihdi: 0.546, hdi: 0.670, gdpPerCapita: 8300, igini: 0.446, wgini: 0.75, wpaMean: 11349, wpaMedian: 3829
            },
            {
              name: 'Paraguay', area: 406752, population: 7052983, density: 17.1, ihdi: 0.562, hdi: 0.724, gdpPerCapita: 9800, igini: 0.462, wgini: 0.785, wpaMean: 11865, wpaMedian: 3887
            },
            {
              name: 'Peru', area: 1285216, population: 32162184, density: 25.02, ihdi: 0.612, hdi: 0.759, gdpPerCapita: 13300, igini: 0.428, wgini: 0.795, wpaMean: 17843, wpaMedian: 4989
            },
            {
              name: 'Suriname', area: 163820, population: 568301, density: 3.47, ihdi: 0.559, hdi: 0.724, gdpPerCapita: 13900, igini: 0.576, wpaMean: 6089, wpaMedian: 1562
            },
            {
              name: 'Uruguay', area: 176215, population: 3518553, density: 19.97, ihdi: 0.703, hdi: 0.808, gdpPerCapita: 22400, igini: 0.397, wgini: 0.741, sirop: 0.140, wpaMean: 30320, wpaMedian: 11084
            },
            {
              name: 'Venezuela', area: 916445, population: 32219521, density: 35.16, ihdi: 0.600, hdi: 0.726, gdpPerCapita: 12400, igini: 0.469
            }
          ]
        },
        {
          name: 'Central',
          children: [
            {
              name: 'Belize', area: 22965, population: 398050, density: 17.33, ihdi: 0.558, hdi: 0.720, gdpPerCapita: 8300, igini: 0.533, wgini: 0.815, wpaMean: 10864, wpaMedian: 3166
            },
            {
              name: 'Costa Rica', area: 51100, population: 5058007, density: 98.98, ihdi: 0.639, hdi: 0.794, gdpPerCapita: 17200, igini: 0.480, wgini: 0.769, wpaMean: 33683, wpaMedian: 11793
            },
            {
              name: 'El Salvador', area: 21040, population: 6704864, density: 318.67, ihdi: 0.521, hdi: 0.667, gdpPerCapita: 8900, igini: 0.386, wgini: 0.759, wpaMean: 29870, wpaMedian: 10148
            },
            {
              name: 'Guatemala', area: 108889, population: 17679735, density: 162.36, ihdi: 0.472, hdi: 0.651, gdpPerCapita: 8200, igini: 0.483, wgini: 0.779
            },
            {
              name: 'Honduras', area: 112492, population: 9158345, density: 81.41, ihdi: 0.464, hdi: 0.623, gdpPerCapita: 5500, igini: 0.521, wgini: 0.804, wpaMean: 9999, wpaMedian: 9999
            },
            {
              name: 'Mexico', area: 1967138, population: 126577691, density: 64.35, ihdi: 0.595, hdi: 0.767, gdpPerCapita: 19500, igini: 0.454, wgini: 0.8, wpaMean: 31553, wpaMedian: 9944
            },
            {
              name: 'Nicaragua', area: 121428, population: 6393824, density: 52.66, ihdi: 0.501, hdi: 0.651, gdpPerCapita: 5800, igini: 0.462, wgini: 0.778, wpaMean: 9279, wpaMedian: 3005
            },
            {
              name: 'Panama', area: 74177, population: 4158783, density: 56.07, ihdi: 0.626, hdi: 0.795, gdpPerCapita: 24300, igini: 0.492, wgini: 0.795, wpaMean: 39980, wpaMedian: 13259
            }
          ]
        },
        {
          name: 'Northern',
          children: [
            // {
            //   name: 'Bermuda', area: 52, population: 64027, density: 1226.52, gdpPerCapita: 85700
            // },
            {
              name: 'Canada', area: 9984670, population: 38059803, density: 4, ihdi: 0.841, hdi: 0.922, gdpPerCapita: 48100, igini: 0.338, wgini: 0.726, sirop: 0.136, wpaMean: 294255, wpaMedian: 107004
            },
            // {
            //   name: 'Greenland', area: 2166000, population: 55877, density: 0.03, gdpPerCapita: 37600
            // },
            // {
            //   name: 'Saint Pierre and Miquelon', area: 242, population: 6081, density: 25.13, gdpPerCapita: 34900
            // },
            {
              name: 'United States', area: 9833517, population: 329838872, density: 34, ihdi: 0.797, hdi: 0.920, gdpPerCapita: 59500, igini: 0.414, wgini: 0.852, sirop: 0.202, wpaMean: 432365, wpaMedian: 65904
            }
          ]
        }
      ]
    }
  ]
};
