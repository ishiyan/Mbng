import { TimeGranularity } from 'mb';

import { Series } from '../../series.interface';

/*
 * https://live.euronext.com/en/product/equities/FR0000060873-XPAR
 *
 * CFI:ESVUFN, ICB:45101015
 */
export const barSeriesMbwsXpar1dSmall: Series = {
  mnemonic: 'mbws:xpar 1d',
  description: 'Marie Brizard Wine & Spirits stock (€, MBWS:XPAR, FR0000060873)',
  url: 'https://live.euronext.com/en/product/equities/FR0000060873-XPAR',
  urlName: 'EuroNext',
  timeStart: new Date(2021, 3, 1),
  timeEnd: new Date(2022, 7, 1),
  timeGranularity: TimeGranularity.Day1,
  data: [
    { time: new Date(2021, 3, 1), open: 1.355, high: 1.39, low: 1.33, close: 1.39, volume: 29812 },
    { time: new Date(2021, 3, 6), open: 1.43, high: 1.44, low: 1.38, close: 1.41, volume: 23359 },
    { time: new Date(2021, 3, 7), open: 1.41, high: 1.41, low: 1.385, close: 1.405, volume: 9251 },
    { time: new Date(2021, 3, 8), open: 1.395, high: 1.42, low: 1.38, close: 1.42, volume: 14142 },
    { time: new Date(2021, 3, 9), open: 1.43, high: 1.44, low: 1.375, close: 1.44, volume: 37501 },
    { time: new Date(2021, 3, 12), open: 1.445, high: 1.445, low: 1.4, close: 1.43, volume: 12843 },
    { time: new Date(2021, 3, 13), open: 1.44, high: 1.445, low: 1.42, close: 1.445, volume: 11958 },
    { time: new Date(2021, 3, 14), open: 1.425, high: 1.425, low: 1.385, close: 1.385, volume: 13696 },
    { time: new Date(2021, 3, 15), open: 1.41, high: 1.41, low: 1.4, close: 1.4, volume: 1431 },
    { time: new Date(2021, 3, 16), open: 1.4, high: 1.405, low: 1.35, close: 1.4, volume: 37385 },
    { time: new Date(2021, 3, 19), open: 1.4, high: 1.4, low: 1.39, close: 1.39, volume: 341 },
    { time: new Date(2021, 3, 20), open: 1.41, high: 1.41, low: 1.35, close: 1.35, volume: 27858 },
    { time: new Date(2021, 3, 21), open: 1.385, high: 1.385, low: 1.335, close: 1.35, volume: 38665 },
    { time: new Date(2021, 3, 22), open: 1.355, high: 1.38, low: 1.35, close: 1.38, volume: 4250 },
    { time: new Date(2021, 3, 23), open: 1.365, high: 1.38, low: 1.36, close: 1.37, volume: 16325 },
    { time: new Date(2021, 3, 26), open: 1.385, high: 1.4, low: 1.35, close: 1.395, volume: 6162 },
    { time: new Date(2021, 3, 27), open: 1.395, high: 1.425, low: 1.375, close: 1.41, volume: 7196 },
    { time: new Date(2021, 3, 28), open: 1.43, high: 1.45, low: 1.4, close: 1.44, volume: 28172 },
    { time: new Date(2021, 3, 29), open: 1.45, high: 1.46, low: 1.41, close: 1.45, volume: 52231 },
    { time: new Date(2021, 3, 30), open: 1.44, high: 1.44, low: 1.4, close: 1.4, volume: 9285 },
    { time: new Date(2021, 4, 3), open: 1.4, high: 1.415, low: 1.39, close: 1.4, volume: 8164 },
    { time: new Date(2021, 4, 4), open: 1.41, high: 1.42, low: 1.39, close: 1.41, volume: 23013 },
    { time: new Date(2021, 4, 5), open: 1.405, high: 1.405, low: 1.365, close: 1.4, volume: 8230 },
    { time: new Date(2021, 4, 6), open: 1.4, high: 1.42, low: 1.375, close: 1.42, volume: 21211 },
    { time: new Date(2021, 4, 7), open: 1.45, high: 1.48, low: 1.44, close: 1.48, volume: 67876 },
    { time: new Date(2021, 4, 10), open: 1.495, high: 1.56, low: 1.495, close: 1.53, volume: 88523 },
    { time: new Date(2021, 4, 11), open: 1.53, high: 1.53, low: 1.47, close: 1.51, volume: 37620 },
    { time: new Date(2021, 4, 12), open: 1.53, high: 1.54, low: 1.51, close: 1.53, volume: 29417 },
    { time: new Date(2021, 4, 13), open: 1.51, high: 1.535, low: 1.495, close: 1.5, volume: 19603 },
    { time: new Date(2021, 4, 14), open: 1.52, high: 1.54, low: 1.5, close: 1.54, volume: 25185 },
    { time: new Date(2021, 4, 17), open: 1.51, high: 1.54, low: 1.51, close: 1.54, volume: 81954 },
    { time: new Date(2021, 4, 18), open: 1.52, high: 1.59, low: 1.52, close: 1.59, volume: 61031 },
    { time: new Date(2021, 4, 19), open: 1.59, high: 1.59, low: 1.56, close: 1.57, volume: 25162 },
    { time: new Date(2021, 4, 20), open: 1.57, high: 1.62, low: 1.555, close: 1.585, volume: 56808 },
    { time: new Date(2021, 4, 21), open: 1.58, high: 1.59, low: 1.555, close: 1.59, volume: 3812 },
    { time: new Date(2021, 4, 24), open: 1.56, high: 1.585, low: 1.53, close: 1.56, volume: 15171 },
    { time: new Date(2021, 4, 25), open: 1.565, high: 1.565, low: 1.51, close: 1.535, volume: 4682 },
    { time: new Date(2021, 4, 26), open: 1.52, high: 1.59, low: 1.515, close: 1.52, volume: 20671 },
    { time: new Date(2021, 4, 27), open: 1.53, high: 1.55, low: 1.515, close: 1.52, volume: 28301 },
    { time: new Date(2021, 4, 28), open: 1.51, high: 1.54, low: 1.51, close: 1.53, volume: 11253 },
    { time: new Date(2021, 4, 31), open: 1.55, high: 1.555, low: 1.51, close: 1.55, volume: 21194 },
    { time: new Date(2021, 5, 1), open: 1.54, high: 1.565, low: 1.525, close: 1.54, volume: 10285 },
    { time: new Date(2021, 5, 2), open: 1.54, high: 1.54, low: 1.51, close: 1.51, volume: 22044 },
    { time: new Date(2021, 5, 3), open: 1.51, high: 1.51, low: 1.48, close: 1.51, volume: 19138 },
    { time: new Date(2021, 5, 4), open: 1.52, high: 1.525, low: 1.495, close: 1.515, volume: 2578 },
    { time: new Date(2021, 5, 7), open: 1.515, high: 1.52, low: 1.49, close: 1.49, volume: 10294 },
    { time: new Date(2021, 5, 8), open: 1.495, high: 1.515, low: 1.49, close: 1.515, volume: 6328 },
    { time: new Date(2021, 5, 9), open: 1.5, high: 1.515, low: 1.5, close: 1.515, volume: 3044 },
    { time: new Date(2021, 5, 10), open: 1.515, high: 1.52, low: 1.48, close: 1.52, volume: 18369 },
    { time: new Date(2021, 5, 11), open: 1.52, high: 1.52, low: 1.45, close: 1.52, volume: 33113 },
    { time: new Date(2021, 5, 14), open: 1.52, high: 1.52, low: 1.46, close: 1.49, volume: 18337 },
    { time: new Date(2021, 5, 15), open: 1.49, high: 1.495, low: 1.45, close: 1.465, volume: 25169 },
    { time: new Date(2021, 5, 16), open: 1.465, high: 1.47, low: 1.46, close: 1.46, volume: 4255 },
    { time: new Date(2021, 5, 17), open: 1.445, high: 1.45, low: 1.405, close: 1.43, volume: 48392 },
    { time: new Date(2021, 5, 18), open: 1.425, high: 1.43, low: 1.42, close: 1.425, volume: 2449 },
    { time: new Date(2021, 5, 21), open: 1.42, high: 1.42, low: 1.3, close: 1.37, volume: 41125 },
    { time: new Date(2021, 5, 22), open: 1.375, high: 1.5, low: 1.37, close: 1.49, volume: 35756 },
    { time: new Date(2021, 5, 23), open: 1.49, high: 1.49, low: 1.39, close: 1.43, volume: 17167 },
    { time: new Date(2021, 5, 24), open: 1.44, high: 1.44, low: 1.36, close: 1.36, volume: 13137 },
    { time: new Date(2021, 5, 25), open: 1.38, high: 1.4, low: 1.37, close: 1.38, volume: 6641 },
    { time: new Date(2021, 5, 28), open: 1.385, high: 1.405, low: 1.37, close: 1.405, volume: 7429 },
    { time: new Date(2021, 5, 29), open: 1.395, high: 1.4, low: 1.395, close: 1.4, volume: 506 },
    { time: new Date(2021, 5, 30), open: 1.4, high: 1.405, low: 1.375, close: 1.405, volume: 6702 },
    { time: new Date(2021, 6, 1), open: 1.405, high: 1.405, low: 1.375, close: 1.375, volume: 2891 },
    { time: new Date(2021, 6, 2), open: 1.37, high: 1.41, low: 1.37, close: 1.4, volume: 13282 },
    { time: new Date(2021, 6, 5), open: 1.41, high: 1.41, low: 1.395, close: 1.395, volume: 1907 },
    { time: new Date(2021, 6, 6), open: 1.385, high: 1.4, low: 1.385, close: 1.39, volume: 4512 },
    { time: new Date(2021, 6, 7), open: 1.39, high: 1.43, low: 1.39, close: 1.43, volume: 6152 },
    { time: new Date(2021, 6, 8), open: 1.43, high: 1.43, low: 1.375, close: 1.375, volume: 15869 },
    { time: new Date(2021, 6, 9), open: 1.37, high: 1.385, low: 1.37, close: 1.385, volume: 5095 },
    { time: new Date(2021, 6, 12), open: 1.36, high: 1.41, low: 1.26, close: 1.4, volume: 58886 },
    { time: new Date(2021, 6, 13), open: 1.4, high: 1.4, low: 1.385, close: 1.385, volume: 1951 },
    { time: new Date(2021, 6, 14), open: 1.385, high: 1.385, low: 1.345, close: 1.36, volume: 11230 },
    { time: new Date(2021, 6, 15), open: 1.36, high: 1.36, low: 1.33, close: 1.34, volume: 4902 },
    { time: new Date(2021, 6, 16), open: 1.35, high: 1.385, low: 1.345, close: 1.345, volume: 3293 },
    { time: new Date(2021, 6, 19), open: 1.33, high: 1.39, low: 1.19, close: 1.365, volume: 330222 },
    { time: new Date(2021, 6, 20), open: 1.33, high: 1.335, low: 1.25, close: 1.29, volume: 43330 },
    { time: new Date(2021, 6, 21), open: 1.295, high: 1.32, low: 1.295, close: 1.315, volume: 3543 },
    { time: new Date(2021, 6, 22), open: 1.315, high: 1.325, low: 1.295, close: 1.325, volume: 8841 },
    { time: new Date(2021, 6, 23), open: 1.325, high: 1.35, low: 1.295, close: 1.35, volume: 19768 },
    { time: new Date(2021, 6, 26), open: 1.35, high: 1.35, low: 1.305, close: 1.305, volume: 2998 },
    { time: new Date(2021, 6, 27), open: 1.31, high: 1.35, low: 1.3, close: 1.345, volume: 13704 },
    { time: new Date(2021, 6, 28), open: 1.34, high: 1.34, low: 1.32, close: 1.32, volume: 6916 },
    { time: new Date(2021, 6, 29), open: 1.29, high: 1.32, low: 1.26, close: 1.32, volume: 39685 },
    { time: new Date(2021, 6, 30), open: 1.3, high: 1.305, low: 1.265, close: 1.3, volume: 12576 },
    { time: new Date(2021, 7, 2), open: 1.32, high: 1.32, low: 1.275, close: 1.28, volume: 10290 },
    { time: new Date(2021, 7, 3), open: 1.295, high: 1.295, low: 1.26, close: 1.28, volume: 14671 },
    { time: new Date(2021, 7, 4), open: 1.28, high: 1.295, low: 1.26, close: 1.295, volume: 9452 },
    { time: new Date(2021, 7, 5), open: 1.3, high: 1.3, low: 1.28, close: 1.295, volume: 2265 },
    { time: new Date(2021, 7, 6), open: 1.295, high: 1.295, low: 1.27, close: 1.27, volume: 10431 },
    { time: new Date(2021, 7, 9), open: 1.295, high: 1.3, low: 1.26, close: 1.29, volume: 15731 },
    { time: new Date(2021, 7, 10), open: 1.295, high: 1.295, low: 1.26, close: 1.26, volume: 22765 },
    { time: new Date(2021, 7, 11), open: 1.26, high: 1.285, low: 1.255, close: 1.265, volume: 9004 },
    { time: new Date(2021, 7, 12), open: 1.265, high: 1.285, low: 1.25, close: 1.265, volume: 10784 },
    { time: new Date(2021, 7, 13), open: 1.22, high: 1.295, low: 1.22, close: 1.285, volume: 21500 },
    { time: new Date(2021, 7, 16), open: 1.27, high: 1.3, low: 1.24, close: 1.25, volume: 17802 },
    { time: new Date(2021, 7, 17), open: 1.25, high: 1.27, low: 1.22, close: 1.23, volume: 19433 },
    { time: new Date(2021, 7, 18), open: 1.26, high: 1.27, low: 1.235, close: 1.24, volume: 4410 },
    { time: new Date(2021, 7, 19), open: 1.24, high: 1.24, low: 1.195, close: 1.195, volume: 68128 },
    { time: new Date(2021, 7, 20), open: 1.2, high: 1.2, low: 1.195, close: 1.2, volume: 14951 },
    { time: new Date(2021, 7, 23), open: 1.2, high: 1.21, low: 1.19, close: 1.2, volume: 9109 },
    { time: new Date(2021, 7, 24), open: 1.19, high: 1.22, low: 1.185, close: 1.22, volume: 28223 },
    { time: new Date(2021, 7, 25), open: 1.22, high: 1.235, low: 1.2, close: 1.21, volume: 32459 },
    { time: new Date(2021, 7, 26), open: 1.21, high: 1.235, low: 1.2, close: 1.235, volume: 6366 },
    { time: new Date(2021, 7, 27), open: 1.235, high: 1.245, low: 1.21, close: 1.21, volume: 5429 },
    { time: new Date(2021, 7, 30), open: 1.22, high: 1.235, low: 1.22, close: 1.23, volume: 2548 },
    { time: new Date(2021, 7, 31), open: 1.205, high: 1.24, low: 1.2, close: 1.24, volume: 31777 },
    { time: new Date(2021, 8, 1), open: 1.24, high: 1.28, low: 1.22, close: 1.265, volume: 18687 },
    { time: new Date(2021, 8, 2), open: 1.27, high: 1.3, low: 1.26, close: 1.3, volume: 27934 },
    { time: new Date(2021, 8, 3), open: 1.305, high: 1.305, low: 1.265, close: 1.27, volume: 10021 },
    { time: new Date(2021, 8, 6), open: 1.255, high: 1.27, low: 1.25, close: 1.265, volume: 6945 },
    { time: new Date(2021, 8, 7), open: 1.26, high: 1.275, low: 1.26, close: 1.275, volume: 1753 },
    { time: new Date(2021, 8, 8), open: 1.275, high: 1.28, low: 1.26, close: 1.28, volume: 1751 },
    { time: new Date(2021, 8, 9), open: 1.28, high: 1.285, low: 1.27, close: 1.28, volume: 3865 },
    { time: new Date(2021, 8, 10), open: 1.265, high: 1.28, low: 1.265, close: 1.265, volume: 7909 },
    { time: new Date(2021, 8, 13), open: 1.265, high: 1.275, low: 1.265, close: 1.275, volume: 1034 },
    { time: new Date(2021, 8, 14), open: 1.28, high: 1.285, low: 1.26, close: 1.26, volume: 10768 },
    { time: new Date(2021, 8, 15), open: 1.255, high: 1.28, low: 1.255, close: 1.255, volume: 5259 },
    { time: new Date(2021, 8, 16), open: 1.255, high: 1.255, low: 1.205, close: 1.23, volume: 32108 },
    { time: new Date(2021, 8, 17), open: 1.23, high: 1.24, low: 1.215, close: 1.22, volume: 6479 },
    { time: new Date(2021, 8, 20), open: 1.21, high: 1.215, low: 1.19, close: 1.205, volume: 27181 },
    { time: new Date(2021, 8, 21), open: 1.19, high: 1.22, low: 1.19, close: 1.22, volume: 9270 },
    { time: new Date(2021, 8, 22), open: 1.215, high: 1.225, low: 1.215, close: 1.225, volume: 1162 },
    { time: new Date(2021, 8, 23), open: 1.225, high: 1.225, low: 1.205, close: 1.21, volume: 6063 },
    { time: new Date(2021, 8, 24), open: 1.21, high: 1.235, low: 1.205, close: 1.22, volume: 15153 },
    { time: new Date(2021, 8, 27), open: 1.22, high: 1.225, low: 1.215, close: 1.225, volume: 3379 },
    { time: new Date(2021, 8, 28), open: 1.225, high: 1.235, low: 1.2, close: 1.23, volume: 20581 },
    { time: new Date(2021, 8, 29), open: 1.22, high: 1.29, low: 1.205, close: 1.27, volume: 21388 },
    { time: new Date(2021, 8, 30), open: 1.285, high: 1.29, low: 1.245, close: 1.29, volume: 46924 },
    { time: new Date(2021, 9, 1), open: 1.28, high: 1.285, low: 1.26, close: 1.28, volume: 11660 },
    { time: new Date(2021, 9, 4), open: 1.26, high: 1.34, low: 1.26, close: 1.32, volume: 66245 },
    { time: new Date(2021, 9, 5), open: 1.315, high: 1.32, low: 1.305, close: 1.305, volume: 4344 },
    { time: new Date(2021, 9, 6), open: 1.32, high: 1.32, low: 1.29, close: 1.29, volume: 25206 },
    { time: new Date(2021, 9, 7), open: 1.295, high: 1.315, low: 1.295, close: 1.295, volume: 5734 },
    { time: new Date(2021, 9, 8), open: 1.3, high: 1.32, low: 1.265, close: 1.315, volume: 12880 },
    { time: new Date(2021, 9, 11), open: 1.32, high: 1.35, low: 1.29, close: 1.33, volume: 20430 },
    { time: new Date(2021, 9, 12), open: 1.34, high: 1.34, low: 1.325, close: 1.325, volume: 5649 },
    { time: new Date(2021, 9, 13), open: 1.31, high: 1.335, low: 1.31, close: 1.335, volume: 2729 },
    { time: new Date(2021, 9, 14), open: 1.33, high: 1.33, low: 1.305, close: 1.31, volume: 19650 },
    { time: new Date(2021, 9, 15), open: 1.315, high: 1.315, low: 1.3, close: 1.315, volume: 6379 },
    { time: new Date(2021, 9, 18), open: 1.31, high: 1.315, low: 1.285, close: 1.295, volume: 19234 },
    { time: new Date(2021, 9, 19), open: 1.305, high: 1.33, low: 1.29, close: 1.305, volume: 9002 },
    { time: new Date(2021, 9, 20), open: 1.31, high: 1.33, low: 1.295, close: 1.33, volume: 6974 },
    { time: new Date(2021, 9, 21), open: 1.33, high: 1.33, low: 1.3, close: 1.3, volume: 2889 },
    { time: new Date(2021, 9, 22), open: 1.3, high: 1.31, low: 1.3, close: 1.3, volume: 3619 },
    { time: new Date(2021, 9, 25), open: 1.31, high: 1.325, low: 1.31, close: 1.32, volume: 3320 },
    { time: new Date(2021, 9, 26), open: 1.31, high: 1.31, low: 1.305, close: 1.31, volume: 3672 },
    { time: new Date(2021, 9, 27), open: 1.3, high: 1.32, low: 1.3, close: 1.31, volume: 2667 },
    { time: new Date(2021, 9, 28), open: 1.31, high: 1.44, low: 1.31, close: 1.42, volume: 89300 },
    { time: new Date(2021, 9, 29), open: 1.44, high: 1.475, low: 1.39, close: 1.45, volume: 68829 },
    { time: new Date(2021, 10, 1), open: 1.48, high: 1.485, low: 1.41, close: 1.445, volume: 16635 },
    { time: new Date(2021, 10, 2), open: 1.445, high: 1.445, low: 1.395, close: 1.42, volume: 7467 },
    { time: new Date(2021, 10, 3), open: 1.41, high: 1.415, low: 1.37, close: 1.395, volume: 12500 },
    { time: new Date(2021, 10, 4), open: 1.405, high: 1.41, low: 1.39, close: 1.39, volume: 15646 },
    { time: new Date(2021, 10, 5), open: 1.39, high: 1.39, low: 1.37, close: 1.375, volume: 15182 },
    { time: new Date(2021, 10, 8), open: 1.425, high: 1.45, low: 1.4, close: 1.42, volume: 25493 },
    { time: new Date(2021, 10, 9), open: 1.42, high: 1.42, low: 1.39, close: 1.39, volume: 20193 },
    { time: new Date(2021, 10, 10), open: 1.39, high: 1.41, low: 1.38, close: 1.41, volume: 9337 },
    { time: new Date(2021, 10, 11), open: 1.41, high: 1.41, low: 1.39, close: 1.41, volume: 6154 },
    { time: new Date(2021, 10, 12), open: 1.41, high: 1.42, low: 1.39, close: 1.39, volume: 17205 },
    { time: new Date(2021, 10, 15), open: 1.395, high: 1.42, low: 1.385, close: 1.385, volume: 16194 },
    { time: new Date(2021, 10, 16), open: 1.39, high: 1.42, low: 1.385, close: 1.41, volume: 17377 },
    { time: new Date(2021, 10, 17), open: 1.415, high: 1.43, low: 1.395, close: 1.395, volume: 23161 },
    { time: new Date(2021, 10, 18), open: 1.39, high: 1.46, low: 1.38, close: 1.46, volume: 60382 },
    { time: new Date(2021, 10, 19), open: 1.45, high: 1.47, low: 1.395, close: 1.395, volume: 29069 },
    { time: new Date(2021, 10, 22), open: 1.38, high: 1.405, low: 1.38, close: 1.405, volume: 14704 },
    { time: new Date(2021, 10, 23), open: 1.405, high: 1.415, low: 1.395, close: 1.4, volume: 5886 },
    { time: new Date(2021, 10, 24), open: 1.39, high: 1.41, low: 1.38, close: 1.41, volume: 34057 },
    { time: new Date(2021, 10, 25), open: 1.4, high: 1.46, low: 1.4, close: 1.42, volume: 26585 },
    { time: new Date(2021, 10, 26), open: 1.43, high: 1.455, low: 1.385, close: 1.42, volume: 26311 },
    { time: new Date(2021, 10, 29), open: 1.39, high: 1.405, low: 1.38, close: 1.385, volume: 10361 },
    { time: new Date(2021, 10, 30), open: 1.4, high: 1.4, low: 1.375, close: 1.375, volume: 6381 },
    { time: new Date(2021, 11, 1), open: 1.385, high: 1.385, low: 1.29, close: 1.32, volume: 54258 },
    { time: new Date(2021, 11, 2), open: 1.29, high: 1.35, low: 1.29, close: 1.32, volume: 42106 },
    { time: new Date(2021, 11, 3), open: 1.32, high: 1.34, low: 1.32, close: 1.34, volume: 10024 },
    { time: new Date(2021, 11, 6), open: 1.33, high: 1.34, low: 1.33, close: 1.34, volume: 2952 },
    { time: new Date(2021, 11, 7), open: 1.34, high: 1.345, low: 1.315, close: 1.34, volume: 29860 },
    { time: new Date(2021, 11, 8), open: 1.34, high: 1.4, low: 1.295, close: 1.365, volume: 113556 },
    { time: new Date(2021, 11, 9), open: 1.365, high: 1.38, low: 1.355, close: 1.355, volume: 3902 },
    { time: new Date(2021, 11, 10), open: 1.35, high: 1.36, low: 1.35, close: 1.36, volume: 4649 },
    { time: new Date(2021, 11, 13), open: 1.38, high: 1.38, low: 1.35, close: 1.365, volume: 241115 },
    { time: new Date(2021, 11, 14), open: 1.365, high: 1.37, low: 1.29, close: 1.365, volume: 44702 },
    { time: new Date(2021, 11, 15), open: 1.36, high: 1.38, low: 1.345, close: 1.38, volume: 13668 },
    { time: new Date(2021, 11, 16), open: 1.39, high: 1.39, low: 1.35, close: 1.375, volume: 15175 },
    { time: new Date(2021, 11, 17), open: 1.38, high: 1.38, low: 1.345, close: 1.35, volume: 5454 },
    { time: new Date(2021, 11, 20), open: 1.35, high: 1.35, low: 1.35, close: 1.35, volume: 1614 },
    { time: new Date(2021, 11, 21), open: 1.35, high: 1.355, low: 1.315, close: 1.315, volume: 20152 },
    { time: new Date(2021, 11, 22), open: 1.335, high: 1.335, low: 1.315, close: 1.33, volume: 9488 },
    { time: new Date(2021, 11, 23), open: 1.33, high: 1.35, low: 1.32, close: 1.345, volume: 37358 },
    { time: new Date(2021, 11, 24), open: 1.33, high: 1.345, low: 1.33, close: 1.34, volume: 4787 },
    { time: new Date(2021, 11, 27), open: 1.325, high: 1.34, low: 1.32, close: 1.32, volume: 8929 },
    { time: new Date(2021, 11, 28), open: 1.32, high: 1.32, low: 1.315, close: 1.32, volume: 9295 },
    { time: new Date(2021, 11, 29), open: 1.32, high: 1.325, low: 1.315, close: 1.315, volume: 10287 },
    { time: new Date(2021, 11, 30), open: 1.315, high: 1.315, low: 1.3, close: 1.31, volume: 20820 },
    { time: new Date(2021, 11, 31), open: 1.305, high: 1.31, low: 1.305, close: 1.31, volume: 4441 },
    { time: new Date(2022, 0, 3), open: 1.31, high: 1.34, low: 1.3, close: 1.34, volume: 19351 },
    { time: new Date(2022, 0, 4), open: 1.345, high: 1.36, low: 1.32, close: 1.35, volume: 21386 },
    { time: new Date(2022, 0, 5), open: 1.36, high: 1.38, low: 1.35, close: 1.37, volume: 11512 },
    { time: new Date(2022, 0, 6), open: 1.38, high: 1.425, low: 1.36, close: 1.425, volume: 41526 },
    { time: new Date(2022, 0, 7), open: 1.42, high: 1.43, low: 1.41, close: 1.41, volume: 8745 },
    { time: new Date(2022, 0, 10), open: 1.4, high: 1.4, low: 1.37, close: 1.395, volume: 17488 },
    { time: new Date(2022, 0, 11), open: 1.395, high: 1.43, low: 1.37, close: 1.42, volume: 13427 },
    { time: new Date(2022, 0, 12), open: 1.41, high: 1.48, low: 1.41, close: 1.48, volume: 13377 },
    { time: new Date(2022, 0, 13), open: 1.46, high: 1.495, low: 1.46, close: 1.49, volume: 40798 },
    { time: new Date(2022, 0, 14), open: 1.485, high: 1.49, low: 1.415, close: 1.43, volume: 14233 },
    { time: new Date(2022, 0, 17), open: 1.45, high: 1.52, low: 1.435, close: 1.52, volume: 49199 },
    { time: new Date(2022, 0, 18), open: 1.49, high: 1.5, low: 1.49, close: 1.49, volume: 4830 },
    { time: new Date(2022, 0, 19), open: 1.49, high: 1.59, low: 1.49, close: 1.56, volume: 173007 },
    { time: new Date(2022, 0, 20), open: 1.56, high: 1.57, low: 1.505, close: 1.57, volume: 40909 },
    { time: new Date(2022, 0, 21), open: 1.57, high: 1.57, low: 1.505, close: 1.51, volume: 21019 },
    { time: new Date(2022, 0, 24), open: 1.52, high: 1.59, low: 1.385, close: 1.4, volume: 53170 },
    { time: new Date(2022, 0, 25), open: 1.44, high: 1.465, low: 1.39, close: 1.4, volume: 26584 },
    { time: new Date(2022, 0, 26), open: 1.4, high: 1.44, low: 1.4, close: 1.43, volume: 7773 },
    { time: new Date(2022, 0, 27), open: 1.41, high: 1.43, low: 1.395, close: 1.395, volume: 18512 },
    { time: new Date(2022, 0, 28), open: 1.405, high: 1.41, low: 1.39, close: 1.41, volume: 8742 },
    { time: new Date(2022, 0, 31), open: 1.4, high: 1.425, low: 1.39, close: 1.395, volume: 10256 },
    { time: new Date(2022, 1, 1), open: 1.405, high: 1.43, low: 1.385, close: 1.43, volume: 57742 },
    { time: new Date(2022, 1, 2), open: 1.4, high: 1.405, low: 1.38, close: 1.38, volume: 20729 },
    { time: new Date(2022, 1, 3), open: 1.39, high: 1.4, low: 1.355, close: 1.38, volume: 21616 },
    { time: new Date(2022, 1, 4), open: 1.38, high: 1.38, low: 1.355, close: 1.375, volume: 18868 },
    { time: new Date(2022, 1, 7), open: 1.4, high: 1.42, low: 1.385, close: 1.4, volume: 51318 },
    { time: new Date(2022, 1, 8), open: 1.42, high: 1.42, low: 1.39, close: 1.42, volume: 16804 },
    { time: new Date(2022, 1, 9), open: 1.42, high: 1.435, low: 1.41, close: 1.42, volume: 7617 },
    { time: new Date(2022, 1, 10), open: 1.42, high: 1.44, low: 1.33, close: 1.44, volume: 43002 },
    { time: new Date(2022, 1, 11), open: 1.43, high: 1.44, low: 1.355, close: 1.37, volume: 17824 },
    { time: new Date(2022, 1, 14), open: 1.35, high: 1.355, low: 1.3, close: 1.31, volume: 30088 },
    { time: new Date(2022, 1, 15), open: 1.315, high: 1.35, low: 1.31, close: 1.35, volume: 16827 },
    { time: new Date(2022, 1, 16), open: 1.35, high: 1.37, low: 1.35, close: 1.37, volume: 3658 },
    { time: new Date(2022, 1, 17), open: 1.38, high: 1.38, low: 1.355, close: 1.375, volume: 3582 },
    { time: new Date(2022, 1, 18), open: 1.375, high: 1.43, low: 1.35, close: 1.43, volume: 21612 },
    { time: new Date(2022, 1, 21), open: 1.43, high: 1.43, low: 1.29, close: 1.3, volume: 70493 },
    { time: new Date(2022, 1, 22), open: 1.3, high: 1.355, low: 1.28, close: 1.31, volume: 17538 },
    { time: new Date(2022, 1, 23), open: 1.31, high: 1.34, low: 1.31, close: 1.335, volume: 943 },
    { time: new Date(2022, 1, 24), open: 1.275, high: 1.32, low: 1.24, close: 1.255, volume: 36710 },
    { time: new Date(2022, 1, 25), open: 1.29, high: 1.31, low: 1.26, close: 1.26, volume: 8953 },
    { time: new Date(2022, 1, 28), open: 1.24, high: 1.285, low: 1.24, close: 1.285, volume: 10338 },
    { time: new Date(2022, 2, 1), open: 1.285, high: 1.285, low: 1.25, close: 1.27, volume: 4381 },
    { time: new Date(2022, 2, 2), open: 1.26, high: 1.27, low: 1.22, close: 1.26, volume: 21856 },
    { time: new Date(2022, 2, 3), open: 1.24, high: 1.27, low: 1.24, close: 1.24, volume: 9160 },
    { time: new Date(2022, 2, 4), open: 1.24, high: 1.24, low: 1.21, close: 1.21, volume: 12217 },
    { time: new Date(2022, 2, 7), open: 1.2, high: 1.2, low: 1.11, close: 1.13, volume: 37049 },
    { time: new Date(2022, 2, 8), open: 1.13, high: 1.225, low: 1.13, close: 1.175, volume: 19013 },
    { time: new Date(2022, 2, 9), open: 1.19, high: 1.22, low: 1.17, close: 1.21, volume: 20627 },
    { time: new Date(2022, 2, 10), open: 1.21, high: 1.215, low: 1.14, close: 1.185, volume: 41650 },
    { time: new Date(2022, 2, 11), open: 1.195, high: 1.22, low: 1.18, close: 1.21, volume: 9491 },
    { time: new Date(2022, 2, 14), open: 1.21, high: 1.23, low: 1.21, close: 1.23, volume: 1754 },
    { time: new Date(2022, 2, 15), open: 1.23, high: 1.245, low: 1.225, close: 1.245, volume: 7668 },
    { time: new Date(2022, 2, 16), open: 1.225, high: 1.245, low: 1.225, close: 1.245, volume: 4503 },
    { time: new Date(2022, 2, 17), open: 1.25, high: 1.26, low: 1.24, close: 1.26, volume: 4952 },
    { time: new Date(2022, 2, 18), open: 1.24, high: 1.26, low: 1.24, close: 1.26, volume: 3263 },
    { time: new Date(2022, 2, 21), open: 1.26, high: 1.29, low: 1.24, close: 1.29, volume: 3506 },
    { time: new Date(2022, 2, 22), open: 1.29, high: 1.29, low: 1.27, close: 1.27, volume: 2300 },
    { time: new Date(2022, 2, 23), open: 1.285, high: 1.31, low: 1.27, close: 1.3, volume: 13747 },
    { time: new Date(2022, 2, 24), open: 1.31, high: 1.31, low: 1.29, close: 1.29, volume: 213 },
    { time: new Date(2022, 2, 25), open: 1.305, high: 1.305, low: 1.3, close: 1.305, volume: 2107 },
    { time: new Date(2022, 2, 28), open: 1.305, high: 1.305, low: 1.27, close: 1.295, volume: 2458 },
    { time: new Date(2022, 2, 29), open: 1.29, high: 1.295, low: 1.275, close: 1.295, volume: 4575 },
    { time: new Date(2022, 2, 30), open: 1.305, high: 1.31, low: 1.29, close: 1.29, volume: 5069 },
    { time: new Date(2022, 2, 31), open: 1.29, high: 1.3, low: 1.285, close: 1.285, volume: 2223 },
    { time: new Date(2022, 3, 1), open: 1.295, high: 1.295, low: 1.28, close: 1.295, volume: 1639 },
    { time: new Date(2022, 3, 4), open: 1.29, high: 1.315, low: 1.29, close: 1.31, volume: 9131 },
    { time: new Date(2022, 3, 5), open: 1.31, high: 1.38, low: 1.305, close: 1.31, volume: 19982 },
    { time: new Date(2022, 3, 6), open: 1.335, high: 1.345, low: 1.28, close: 1.34, volume: 9949 },
    { time: new Date(2022, 3, 7), open: 1.3, high: 1.32, low: 1.3, close: 1.32, volume: 3178 },
    { time: new Date(2022, 3, 8), open: 1.32, high: 1.33, low: 1.3, close: 1.3, volume: 1420 },
    { time: new Date(2022, 3, 11), open: 1.3, high: 1.315, low: 1.275, close: 1.3, volume: 4799 },
    { time: new Date(2022, 3, 12), open: 1.3, high: 1.3, low: 1.27, close: 1.3, volume: 2101 },
    { time: new Date(2022, 3, 13), open: 1.29, high: 1.3, low: 1.26, close: 1.3, volume: 6913 },
    { time: new Date(2022, 3, 14), open: 1.3, high: 1.3, low: 1.265, close: 1.3, volume: 3054 },
    { time: new Date(2022, 3, 19), open: 1.34, high: 1.34, low: 1.3, close: 1.3, volume: 20861 },
    { time: new Date(2022, 3, 20), open: 1.31, high: 1.34, low: 1.3, close: 1.32, volume: 14372 },
    { time: new Date(2022, 3, 21), open: 1.32, high: 1.335, low: 1.315, close: 1.315, volume: 8231 },
    { time: new Date(2022, 3, 22), open: 1.33, high: 1.33, low: 1.3, close: 1.33, volume: 3026 },
    { time: new Date(2022, 3, 25), open: 1.31, high: 1.335, low: 1.31, close: 1.33, volume: 2521 },
    { time: new Date(2022, 3, 26), open: 1.31, high: 1.31, low: 1.31, close: 1.31, volume: 12 },
    { time: new Date(2022, 3, 27), open: 1.315, high: 1.33, low: 1.31, close: 1.33, volume: 453 },
    { time: new Date(2022, 3, 28), open: 1.32, high: 1.33, low: 1.32, close: 1.33, volume: 1910 },
    { time: new Date(2022, 3, 29), open: 1.33, high: 1.33, low: 1.325, close: 1.33, volume: 572 },
    { time: new Date(2022, 4, 2), open: 1.31, high: 1.33, low: 1.31, close: 1.325, volume: 966 },
    { time: new Date(2022, 4, 3), open: 1.33, high: 1.39, low: 1.33, close: 1.385, volume: 38992 },
    { time: new Date(2022, 4, 4), open: 1.39, high: 1.39, low: 1.37, close: 1.38, volume: 9591 },
    { time: new Date(2022, 4, 5), open: 1.38, high: 1.385, low: 1.345, close: 1.36, volume: 7414 },
    { time: new Date(2022, 4, 6), open: 1.345, high: 1.36, low: 1.34, close: 1.34, volume: 6255 },
    { time: new Date(2022, 4, 9), open: 1.34, high: 1.35, low: 1.34, close: 1.34, volume: 94 },
    { time: new Date(2022, 4, 10), open: 1.34, high: 1.365, low: 1.34, close: 1.35, volume: 2243 },
    { time: new Date(2022, 4, 11), open: 1.34, high: 1.37, low: 1.34, close: 1.37, volume: 3083 },
    { time: new Date(2022, 4, 12), open: 1.365, high: 1.38, low: 1.365, close: 1.38, volume: 3885 },
    { time: new Date(2022, 4, 13), open: 1.375, high: 1.375, low: 1.36, close: 1.365, volume: 2625 },
    { time: new Date(2022, 4, 16), open: 1.38, high: 1.38, low: 1.36, close: 1.38, volume: 705 },
    { time: new Date(2022, 4, 17), open: 1.38, high: 1.38, low: 1.36, close: 1.36, volume: 1430 },
    { time: new Date(2022, 4, 18), open: 1.36, high: 1.37, low: 1.36, close: 1.37, volume: 79 },
    { time: new Date(2022, 4, 19), open: 1.36, high: 1.37, low: 1.325, close: 1.37, volume: 8445 },
    { time: new Date(2022, 4, 20), open: 1.36, high: 1.38, low: 1.36, close: 1.365, volume: 5649 },
    { time: new Date(2022, 4, 23), open: 1.36, high: 1.37, low: 1.33, close: 1.37, volume: 1651 },
    { time: new Date(2022, 4, 24), open: 1.37, high: 1.37, low: 1.345, close: 1.37, volume: 2165 },
    { time: new Date(2022, 4, 25), open: 1.365, high: 1.375, low: 1.335, close: 1.34, volume: 10079 },
    { time: new Date(2022, 4, 26), open: 1.34, high: 1.35, low: 1.34, close: 1.35, volume: 2925 },
    { time: new Date(2022, 4, 27), open: 1.37, high: 1.375, low: 1.34, close: 1.35, volume: 5727 },
    { time: new Date(2022, 4, 30), open: 1.35, high: 1.38, low: 1.34, close: 1.34, volume: 21702 },
    { time: new Date(2022, 4, 31), open: 1.38, high: 1.38, low: 1.35, close: 1.35, volume: 5682 },
    { time: new Date(2022, 5, 1), open: 1.36, high: 1.37, low: 1.35, close: 1.37, volume: 4613 },
    { time: new Date(2022, 5, 2), open: 1.37, high: 1.37, low: 1.35, close: 1.36, volume: 3492 },
    { time: new Date(2022, 5, 3), open: 1.355, high: 1.4, low: 1.355, close: 1.38, volume: 44653 },
    { time: new Date(2022, 5, 6), open: 1.385, high: 1.39, low: 1.38, close: 1.39, volume: 1180 },
    { time: new Date(2022, 5, 7), open: 1.385, high: 1.44, low: 1.37, close: 1.44, volume: 24394 },
    { time: new Date(2022, 5, 8), open: 1.43, high: 1.43, low: 1.39, close: 1.41, volume: 5314 },
    { time: new Date(2022, 5, 9), open: 1.41, high: 1.41, low: 1.38, close: 1.385, volume: 13538 },
    { time: new Date(2022, 5, 10), open: 1.385, high: 1.46, low: 1.385, close: 1.42, volume: 98756 },
    { time: new Date(2022, 5, 13), open: 1.43, high: 1.43, low: 1.375, close: 1.42, volume: 29593 },
    { time: new Date(2022, 5, 14), open: 1.42, high: 1.43, low: 1.41, close: 1.43, volume: 28167 },
    { time: new Date(2022, 5, 15), open: 1.415, high: 1.43, low: 1.415, close: 1.43, volume: 14807 },
    { time: new Date(2022, 5, 16), open: 1.42, high: 1.43, low: 1.42, close: 1.43, volume: 47470 },
    { time: new Date(2022, 5, 17), open: 1.425, high: 1.455, low: 1.425, close: 1.425, volume: 7920 },
    { time: new Date(2022, 5, 20), open: 1.425, high: 1.435, low: 1.425, close: 1.43, volume: 4337 },
    { time: new Date(2022, 5, 21), open: 1.425, high: 1.43, low: 1.425, close: 1.425, volume: 1078 },
    { time: new Date(2022, 5, 22), open: 1.44, high: 1.46, low: 1.41, close: 1.425, volume: 53589 },
    { time: new Date(2022, 5, 23), open: 1.43, high: 1.455, low: 1.43, close: 1.45, volume: 5485 },
    { time: new Date(2022, 5, 24), open: 1.46, high: 1.46, low: 1.425, close: 1.425, volume: 6688 },
    { time: new Date(2022, 5, 27), open: 1.43, high: 1.45, low: 1.41, close: 1.42, volume: 7390 },
    { time: new Date(2022, 5, 28), open: 1.43, high: 1.45, low: 1.43, close: 1.45, volume: 25578 },
    { time: new Date(2022, 5, 29), open: 1.45, high: 1.47, low: 1.425, close: 1.455, volume: 49490 },
    { time: new Date(2022, 5, 30), open: 1.455, high: 1.46, low: 1.445, close: 1.445, volume: 26171 },
    { time: new Date(2022, 6, 1), open: 1.445, high: 1.47, low: 1.445, close: 1.47, volume: 11008 },
    { time: new Date(2022, 6, 4), open: 1.46, high: 1.48, low: 1.46, close: 1.48, volume: 7970 },
    { time: new Date(2022, 6, 5), open: 1.48, high: 1.485, low: 1.44, close: 1.475, volume: 16537 },
    { time: new Date(2022, 6, 6), open: 1.475, high: 1.48, low: 1.47, close: 1.47, volume: 2355 },
    { time: new Date(2022, 6, 7), open: 1.465, high: 1.51, low: 1.44, close: 1.44, volume: 58775 },
    { time: new Date(2022, 6, 8), open: 1.44, high: 1.505, low: 1.44, close: 1.49, volume: 23612 },
    { time: new Date(2022, 6, 11), open: 1.495, high: 1.5, low: 1.485, close: 1.495, volume: 5927 },
    { time: new Date(2022, 6, 12), open: 1.5, high: 1.51, low: 1.45, close: 1.5, volume: 15386 },
    { time: new Date(2022, 6, 13), open: 1.5, high: 1.5, low: 1.475, close: 1.475, volume: 15737 },
    { time: new Date(2022, 6, 14), open: 1.475, high: 1.475, low: 1.46, close: 1.46, volume: 2812 },
    { time: new Date(2022, 6, 15), open: 1.46, high: 1.475, low: 1.45, close: 1.45, volume: 1674 },
    { time: new Date(2022, 6, 18), open: 1.45, high: 1.5, low: 1.45, close: 1.485, volume: 18014 },
    { time: new Date(2022, 6, 19), open: 1.51, high: 1.51, low: 1.48, close: 1.495, volume: 6247 },
    { time: new Date(2022, 6, 20), open: 1.5, high: 1.5, low: 1.485, close: 1.485, volume: 1215 },
    { time: new Date(2022, 6, 21), open: 1.49, high: 1.49, low: 1.44, close: 1.45, volume: 4820 },
    { time: new Date(2022, 6, 22), open: 1.45, high: 1.475, low: 1.44, close: 1.475, volume: 7051 },
    { time: new Date(2022, 6, 25), open: 1.47, high: 1.47, low: 1.405, close: 1.41, volume: 12333 },
    { time: new Date(2022, 6, 26), open: 1.415, high: 1.43, low: 1.415, close: 1.43, volume: 3186 },
    { time: new Date(2022, 6, 27), open: 1.43, high: 1.43, low: 1.42, close: 1.425, volume: 6764 },
    { time: new Date(2022, 6, 28), open: 1.435, high: 1.435, low: 1.405, close: 1.405, volume: 7826 },
    { time: new Date(2022, 6, 29), open: 1.405, high: 1.425, low: 1.375, close: 1.425, volume: 13627 },
    { time: new Date(2022, 7, 1), open: 1.4, high: 1.42, low: 1.39, close: 1.415, volume: 13774 },
  ],
};
