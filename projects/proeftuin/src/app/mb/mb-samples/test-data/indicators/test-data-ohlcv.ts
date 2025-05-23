import { Ohlcv } from 'projects/mb/src/lib/data/entities/ohlcv';

/** Source data used to generate óutput for indicators. */
export const testDataOhlcv: Ohlcv[] = [
  { time: new Date(2011, 0, 3), open: 92.5, high: 93.25, low: 90.75, close: 91.5, volume: 4077500 },
  { time: new Date(2011, 0, 4), open: 91.5, high: 94.94, low: 91.405, close: 94.815, volume: 4955900 },
  { time: new Date(2011, 0, 5), open: 95.155, high: 96.375, low: 94.25, close: 94.375, volume: 4775300 },
  { time: new Date(2011, 0, 6), open: 93.97, high: 96.19, low: 93.5, close: 95.095, volume: 4155300 },
  { time: new Date(2011, 0, 7), open: 95.5, high: 96, low: 92.815, close: 93.78, volume: 4593100 },
  { time: new Date(2011, 0, 10), open: 94.5, high: 94.72, low: 93.5, close: 94.625, volume: 3631300 },
  { time: new Date(2011, 0, 11), open: 95, high: 95, low: 92, close: 92.53, volume: 3382800 },
  { time: new Date(2011, 0, 12), open: 91.5, high: 93.72, low: 89.75, close: 92.75, volume: 4954200 },
  { time: new Date(2011, 0, 13), open: 91.815, high: 92.47, low: 89.44, close: 90.315, volume: 4500000 },
  { time: new Date(2011, 0, 14), open: 91.125, high: 92.75, low: 90.625, close: 92.47, volume: 3397500 },
  { time: new Date(2011, 0, 17), open: 93.875, high: 96.25, low: 92.75, close: 96.125, volume: 4204500 },
  { time: new Date(2011, 0, 18), open: 97.5, high: 99.625, low: 96.315, close: 97.25, volume: 6321400 },
  { time: new Date(2011, 0, 19), open: 98.815, high: 99.125, low: 96.03, close: 98.5, volume: 10203600 },
  { time: new Date(2011, 0, 20), open: 92, high: 92.75, low: 88.815, close: 89.875, volume: 19043900 },
  { time: new Date(2011, 0, 21), open: 91.125, high: 91.315, low: 86.75, close: 91, volume: 11692000 },
  { time: new Date(2011, 0, 24), open: 91.875, high: 93.25, low: 90.94, close: 92.815, volume: 9553300 },
  { time: new Date(2011, 0, 25), open: 93.405, high: 93.405, low: 88.905, close: 89.155, volume: 8920300 },
  { time: new Date(2011, 0, 26), open: 89.75, high: 90.655, low: 88.78, close: 89.345, volume: 5970900 },
  { time: new Date(2011, 0, 27), open: 89.345, high: 91.97, low: 89.25, close: 91.625, volume: 5062300 },
  { time: new Date(2011, 0, 28), open: 92.25, high: 92.25, low: 89.75, close: 89.875, volume: 3705600 },
  { time: new Date(2011, 0, 31), open: 89.78, high: 90.345, low: 87.5, close: 88.375, volume: 5865600 },
  { time: new Date(2011, 1, 1), open: 87.94, high: 88.5, low: 86.53, close: 87.625, volume: 5603000 },
  { time: new Date(2011, 1, 2), open: 87.595, high: 88.25, low: 84.625, close: 84.78, volume: 5811900 },
  { time: new Date(2011, 1, 3), open: 85.22, high: 85.5, low: 82.28, close: 83, volume: 8483800 },
  { time: new Date(2011, 1, 4), open: 83.5, high: 84.44, low: 81.565, close: 83.5, volume: 5995200 },
  { time: new Date(2011, 1, 7), open: 83.5, high: 84.75, low: 80.875, close: 81.375, volume: 5408800 },
  { time: new Date(2011, 1, 8), open: 81.25, high: 84.44, low: 81.25, close: 84.44, volume: 5430500 },
  { time: new Date(2011, 1, 9), open: 85.125, high: 89.405, low: 84.065, close: 89.25, volume: 6283800 },
  { time: new Date(2011, 1, 10), open: 88.125, high: 88.125, low: 85.595, close: 86.375, volume: 5834800 },
  { time: new Date(2011, 1, 11), open: 87.5, high: 89.125, low: 85.97, close: 86.25, volume: 4515500 },
  { time: new Date(2011, 1, 14), open: 85.25, high: 87.155, low: 84.405, close: 85.25, volume: 4493300 },
  { time: new Date(2011, 1, 15), open: 86, high: 87.25, low: 85.095, close: 87.125, volume: 4346100 },
  { time: new Date(2011, 1, 16), open: 87.19, high: 87.375, low: 85.5, close: 85.815, volume: 3700300 },
  { time: new Date(2011, 1, 17), open: 86.125, high: 88.97, low: 85.53, close: 88.97, volume: 4600200 },
  { time: new Date(2011, 1, 18), open: 89, high: 90, low: 87.875, close: 88.47, volume: 4557200 },
  { time: new Date(2011, 1, 21), open: 88.625, high: 89.845, low: 86.565, close: 86.875, volume: 4323600 },
  { time: new Date(2011, 1, 22), open: 86, high: 86.97, low: 84.655, close: 86.815, volume: 5237500 },
  { time: new Date(2011, 1, 23), open: 85.5, high: 85.94, low: 83.25, close: 84.875, volume: 7404100 },
  { time: new Date(2011, 1, 24), open: 84.75, high: 84.75, low: 82.565, close: 84.19, volume: 4798400 },
  { time: new Date(2011, 1, 25), open: 85.25, high: 85.47, low: 83.44, close: 83.875, volume: 4372800 },
  { time: new Date(2011, 1, 28), open: 84.25, high: 84.47, low: 82.53, close: 83.375, volume: 3872300 },
  { time: new Date(2011, 2, 1), open: 86.75, high: 88.5, low: 85.065, close: 85.5, volume: 10750800 },
  { time: new Date(2011, 2, 2), open: 86.94, high: 89.47, low: 86.875, close: 89.19, volume: 5804800 },
  { time: new Date(2011, 2, 3), open: 89.315, high: 90, low: 88.53, close: 89.44, volume: 3785500 },
  { time: new Date(2011, 2, 4), open: 89.94, high: 92.44, low: 89.28, close: 91.095, volume: 5014800 },
  { time: new Date(2011, 2, 7), open: 90.815, high: 91.44, low: 90.125, close: 90.75, volume: 3507700 },
  { time: new Date(2011, 2, 8), open: 91.19, high: 92.97, low: 90.75, close: 91.44, volume: 4298800 },
  { time: new Date(2011, 2, 9), open: 91.345, high: 91.72, low: 89, close: 89, volume: 4842500 },
  { time: new Date(2011, 2, 10), open: 89.595, high: 91.155, low: 88.565, close: 91, volume: 3952200 },
  { time: new Date(2011, 2, 11), open: 91, high: 91.75, low: 90.095, close: 90.5, volume: 3304700 },
  { time: new Date(2011, 2, 14), open: 89.75, high: 90, low: 89, close: 89.03, volume: 3462000 },
  { time: new Date(2011, 2, 15), open: 88.75, high: 88.875, low: 86.47, close: 88.815, volume: 7253900 },
  { time: new Date(2011, 2, 16), open: 88.315, high: 89, low: 84, close: 84.28, volume: 9753100 },
  { time: new Date(2011, 2, 17), open: 84.345, high: 85.25, low: 83.315, close: 83.5, volume: 5953000 },
  { time: new Date(2011, 2, 18), open: 83.5, high: 83.815, low: 82, close: 82.69, volume: 5011700 },
  { time: new Date(2011, 2, 21), open: 84, high: 85.25, low: 83.25, close: 84.75, volume: 5910800 },
  { time: new Date(2011, 2, 22), open: 86, high: 86.625, low: 84.75, close: 85.655, volume: 4916900 },
  { time: new Date(2011, 2, 23), open: 85.53, high: 87.94, low: 85.28, close: 86.19, volume: 4135000 },
  { time: new Date(2011, 2, 24), open: 87.5, high: 89.375, low: 87.19, close: 88.94, volume: 4054200 },
  { time: new Date(2011, 2, 25), open: 88.5, high: 90.625, low: 88.44, close: 89.28, volume: 3735300 },
  { time: new Date(2011, 2, 28), open: 90, high: 90.75, low: 88.25, close: 88.625, volume: 2921900 },
  { time: new Date(2011, 2, 29), open: 88.655, high: 88.845, low: 87.345, close: 88.5, volume: 2658400 },
  { time: new Date(2011, 2, 30), open: 89.5, high: 91.97, low: 89.28, close: 91.97, volume: 4624400 },
  { time: new Date(2011, 2, 31), open: 91.565, high: 93.375, low: 91.095, close: 91.5, volume: 4372200 },
  { time: new Date(2011, 3, 1), open: 92, high: 93.815, low: 89.53, close: 93.25, volume: 5831600 },
  { time: new Date(2011, 3, 4), open: 93, high: 94.03, low: 91.155, close: 93.5, volume: 4268600 },
  { time: new Date(2011, 3, 5), open: 92.815, high: 94.03, low: 92, close: 93.155, volume: 3059200 },
  { time: new Date(2011, 3, 6), open: 91.75, high: 91.815, low: 90.53, close: 91.72, volume: 4495500 },
  { time: new Date(2011, 3, 7), open: 92, high: 92, low: 89.97, close: 90, volume: 3425000 },
  { time: new Date(2011, 3, 8), open: 91.375, high: 91.94, low: 88.815, close: 89.69, volume: 3630800 },
  { time: new Date(2011, 3, 11), open: 89.75, high: 89.75, low: 86.75, close: 88.875, volume: 4168100 },
  { time: new Date(2011, 3, 12), open: 88.75, high: 88.75, low: 85.065, close: 85.19, volume: 5966900 },
  { time: new Date(2011, 3, 13), open: 85.44, high: 86.155, low: 82.03, close: 83.375, volume: 7692800 },
  { time: new Date(2011, 3, 14), open: 83.5, high: 84.875, low: 81.5, close: 84.875, volume: 7362500 },
  { time: new Date(2011, 3, 15), open: 84.875, high: 85.94, low: 82.565, close: 85.94, volume: 6581300 },
  { time: new Date(2011, 3, 18), open: 98.625, high: 99.375, low: 96.345, close: 97.25, volume: 19587700 },
  { time: new Date(2011, 3, 19), open: 96.69, high: 103.28, low: 96.47, close: 99.875, volume: 10378600 },
  { time: new Date(2011, 3, 20), open: 102.375, high: 105.375, low: 101.155, close: 104.94, volume: 9334700 },
  { time: new Date(2011, 3, 21), open: 106, high: 107.625, low: 104.25, close: 106, volume: 10467200 },
  { time: new Date(2011, 3, 22), open: 104.625, high: 105.25, low: 101.75, close: 102.5, volume: 5671400 },
  { time: new Date(2011, 3, 25), open: 102.5, high: 104.5, low: 101.72, close: 102.405, volume: 5645000 },
  { time: new Date(2011, 3, 26), open: 104.25, high: 105.5, low: 101.72, close: 104.595, volume: 4518600 },
  { time: new Date(2011, 3, 27), open: 104, high: 106.125, low: 103.155, close: 106.125, volume: 4519500 },
  { time: new Date(2011, 3, 28), open: 106.125, high: 107.94, low: 105.69, close: 106, volume: 5569700 },
  { time: new Date(2011, 3, 29), open: 106.065, high: 106.25, low: 103.655, close: 106.065, volume: 4239700 },
  { time: new Date(2011, 4, 2), open: 105.94, high: 107, low: 104, close: 104.625, volume: 4175300 },
  { time: new Date(2011, 4, 3), open: 105.625, high: 108.75, low: 105.53, close: 108.625, volume: 4995300 },
  { time: new Date(2011, 4, 4), open: 108.625, high: 110.94, low: 108.53, close: 109.315, volume: 4776600 },
  { time: new Date(2011, 4, 5), open: 110.25, high: 110.94, low: 108.75, close: 110.5, volume: 4190000 },
  { time: new Date(2011, 4, 6), open: 110.565, high: 114.22, low: 107.75, close: 112.75, volume: 6035300 },
  { time: new Date(2011, 4, 9), open: 117, high: 123, low: 117, close: 123, volume: 12168900 },
  { time: new Date(2011, 4, 10), open: 120.75, high: 121.75, low: 118, close: 119.625, volume: 9040800 },
  { time: new Date(2011, 4, 11), open: 118, high: 119.815, low: 116, close: 118.75, volume: 5780300 },
  { time: new Date(2011, 4, 12), open: 119.125, high: 120.315, low: 118.5, close: 119.25, volume: 4320800 },
  { time: new Date(2011, 4, 13), open: 119.125, high: 119.375, low: 116.53, close: 117.94, volume: 3899100 },
  { time: new Date(2011, 4, 16), open: 117.815, high: 118.19, low: 116.25, close: 116.44, volume: 3221400 },
  { time: new Date(2011, 4, 17), open: 116.375, high: 116.69, low: 114.595, close: 115.19, volume: 3455500 },
  { time: new Date(2011, 4, 18), open: 115.155, high: 115.345, low: 110.875, close: 111.875, volume: 4304200 },
  { time: new Date(2011, 4, 19), open: 111.25, high: 113, low: 110.5, close: 110.595, volume: 4703900 },
  { time: new Date(2011, 4, 20), open: 111.5, high: 118.315, low: 110.72, close: 118.125, volume: 8316300 },
  { time: new Date(2011, 4, 23), open: 116.69, high: 116.87, low: 112.62, close: 116, volume: 10553900 },
  { time: new Date(2011, 4, 24), open: 116, high: 116.75, low: 114.19, close: 116, volume: 6384800 },
  { time: new Date(2011, 4, 25), open: 113.62, high: 113.87, low: 111.19, close: 112, volume: 7163300 },
  { time: new Date(2011, 4, 26), open: 111.75, high: 114.62, low: 109.44, close: 113.75, volume: 7007800 },
  { time: new Date(2011, 4, 27), open: 114.56, high: 115.31, low: 111.56, close: 112.94, volume: 5114100 },
  { time: new Date(2011, 4, 30), open: 113.62, high: 116, low: 112.44, close: 116, volume: 5263800 },
  { time: new Date(2011, 4, 31), open: 118.12, high: 121.69, low: 117.5, close: 120.5, volume: 6666100 },
  { time: new Date(2011, 5, 1), open: 119.87, high: 119.87, low: 116.06, close: 116.62, volume: 7398400 },
  { time: new Date(2011, 5, 2), open: 116.62, high: 120.87, low: 116.56, close: 117, volume: 5575000 },
  { time: new Date(2011, 5, 3), open: 115.87, high: 116.75, low: 113.31, close: 115.25, volume: 4852300 },
  { time: new Date(2011, 5, 6), open: 115.06, high: 116.5, low: 112.56, close: 114.31, volume: 4298100 },
  { time: new Date(2011, 5, 7), open: 115.87, high: 116, low: 114, close: 115.5, volume: 4900500 },
  { time: new Date(2011, 5, 8), open: 117.5, high: 118.31, low: 114.75, close: 115.87, volume: 4887700 },
  { time: new Date(2011, 5, 9), open: 119.87, high: 121.5, low: 118.87, close: 120.69, volume: 6964800 },
  { time: new Date(2011, 5, 10), open: 119.25, high: 122, low: 119, close: 120.19, volume: 4679200 },
  { time: new Date(2011, 5, 13), open: 120.19, high: 121.44, low: 119.75, close: 120.75, volume: 9165000 },
  { time: new Date(2011, 5, 14), open: 122.87, high: 125.75, low: 122.62, close: 124.75, volume: 6469800 },
  { time: new Date(2011, 5, 15), open: 123.87, high: 127.75, low: 123, close: 123.37, volume: 6792000 },
  { time: new Date(2011, 5, 16), open: 122.25, high: 124.19, low: 121.75, close: 122.94, volume: 4423800 },
  { time: new Date(2011, 5, 17), open: 123.12, high: 124.44, low: 121.56, close: 122.56, volume: 5231900 },
  { time: new Date(2011, 5, 20), open: 123.31, high: 125.75, low: 123.12, close: 123.12, volume: 4565600 },
  { time: new Date(2011, 5, 21), open: 124, high: 124.69, low: 122.19, close: 122.56, volume: 6235200 },
  { time: new Date(2011, 5, 22), open: 123, high: 125.31, low: 122.75, close: 124.62, volume: 5225900 },
  { time: new Date(2011, 5, 23), open: 124.81, high: 132, low: 124.37, close: 129.25, volume: 8261400 },
  { time: new Date(2011, 5, 24), open: 130, high: 131.31, low: 128, close: 131, volume: 5912500 },
  { time: new Date(2011, 5, 27), open: 130.88, high: 132.25, low: 129.5, close: 132.25, volume: 3545600 },
  { time: new Date(2011, 5, 28), open: 132.5, high: 133.88, low: 130.81, close: 131, volume: 5714500 },
  { time: new Date(2011, 5, 29), open: 131, high: 133.5, low: 130.63, close: 132.81, volume: 6653900 },
  { time: new Date(2011, 5, 30), open: 132.5, high: 135.5, low: 132.13, close: 134, volume: 6094500 },
  { time: new Date(2011, 6, 1), open: 134, high: 137.44, low: 133.88, close: 137.38, volume: 4799200 },
  { time: new Date(2011, 6, 4), open: 137.44, high: 138.69, low: 135.38, close: 137.81, volume: 5050800 },
  { time: new Date(2011, 6, 5), open: 135.75, high: 139.19, low: 135.75, close: 137.88, volume: 5648900 },
  { time: new Date(2011, 6, 6), open: 138.31, high: 138.5, low: 136.19, close: 137.25, volume: 4726300 },
  { time: new Date(2011, 6, 7), open: 138, high: 138.13, low: 134.5, close: 136.31, volume: 5585600 },
  { time: new Date(2011, 6, 8), open: 136.38, high: 137.5, low: 135.38, close: 136.25, volume: 5124800 },
  { time: new Date(2011, 6, 11), open: 136.5, high: 138.88, low: 133.69, close: 134.63, volume: 7630200 },
  { time: new Date(2011, 6, 12), open: 132, high: 132.13, low: 126.06, close: 128.25, volume: 14311600 },
  { time: new Date(2011, 6, 13), open: 127.5, high: 129.75, low: 126.87, close: 129, volume: 8793600 },
  { time: new Date(2011, 6, 14), open: 127.62, high: 128.5, low: 123.5, close: 123.87, volume: 8874200 },
  { time: new Date(2011, 6, 15), open: 124, high: 125.44, low: 122.62, close: 124.81, volume: 6966600 },
  { time: new Date(2011, 6, 18), open: 123.62, high: 125.12, low: 122.75, close: 123, volume: 5525500 },
  { time: new Date(2011, 6, 19), open: 125, high: 126.5, low: 123.56, close: 126.25, volume: 6515500 },
  { time: new Date(2011, 6, 20), open: 126.37, high: 128.69, low: 125.81, close: 128.38, volume: 5291900 },
  { time: new Date(2011, 6, 21), open: 126.25, high: 126.62, low: 124.62, close: 125.37, volume: 5711700 },
  { time: new Date(2011, 6, 22), open: 125.94, high: 126.69, low: 124.37, close: 125.69, volume: 4327700 },
  { time: new Date(2011, 6, 25), open: 124, high: 126, low: 121.81, close: 122.25, volume: 4568000 },
  { time: new Date(2011, 6, 26), open: 122.75, high: 123.12, low: 118.19, close: 119.37, volume: 6859200 },
  { time: new Date(2011, 6, 27), open: 120, high: 121.87, low: 118.06, close: 118.5, volume: 5757500 },
  { time: new Date(2011, 6, 28), open: 120, high: 124, low: 117.56, close: 123.19, volume: 7367000 },
  { time: new Date(2011, 6, 29), open: 122, high: 127, low: 121, close: 123.5, volume: 6144100 },
  { time: new Date(2011, 7, 1), open: 123.62, high: 124.44, low: 121.12, close: 122.19, volume: 4052700 },
  { time: new Date(2011, 7, 2), open: 121.5, high: 122.5, low: 118.94, close: 119.31, volume: 5849700 },
  { time: new Date(2011, 7, 3), open: 120.12, high: 123.75, low: 119.81, close: 123.31, volume: 5544700 },
  { time: new Date(2011, 7, 4), open: 123.75, high: 123.81, low: 121, close: 121.12, volume: 5032200 },
  { time: new Date(2011, 7, 5), open: 122.75, high: 124.5, low: 122, close: 123.37, volume: 4400600 },
  { time: new Date(2011, 7, 8), open: 125, high: 127.87, low: 124.5, close: 127.37, volume: 4894100 },
  { time: new Date(2011, 7, 9), open: 128.5, high: 128.56, low: 126.56, close: 128.5, volume: 5140000 },
  { time: new Date(2011, 7, 10), open: 128.38, high: 129.63, low: 123.5, close: 123.87, volume: 6610900 },
  { time: new Date(2011, 7, 11), open: 123.87, high: 124.87, low: 121.25, close: 122.94, volume: 7585200 },
  { time: new Date(2011, 7, 12), open: 124.37, high: 124.37, low: 121.06, close: 121.75, volume: 5963100 },
  { time: new Date(2011, 7, 15), open: 122.75, high: 124.87, low: 122.31, close: 124.44, volume: 6045500 },
  { time: new Date(2011, 7, 16), open: 123.37, high: 123.62, low: 121, close: 122, volume: 8443300 },
  { time: new Date(2011, 7, 17), open: 122, high: 124.06, low: 120.87, close: 122.37, volume: 6464700 },
  { time: new Date(2011, 7, 18), open: 122.62, high: 125.87, low: 122.06, close: 122.94, volume: 6248300 },
  { time: new Date(2011, 7, 19), open: 125, high: 125.19, low: 122.75, close: 124, volume: 4357200 },
  { time: new Date(2011, 7, 22), open: 124.25, high: 125.62, low: 122.69, close: 123.19, volume: 4774700 },
  { time: new Date(2011, 7, 23), open: 124.37, high: 126, low: 122.87, close: 124.56, volume: 6216900 },
  { time: new Date(2011, 7, 24), open: 125.62, high: 128.5, low: 125.5, close: 127.25, volume: 6266900 },
  { time: new Date(2011, 7, 25), open: 126.5, high: 126.75, low: 124.25, close: 125.87, volume: 5584800 },
  { time: new Date(2011, 7, 26), open: 128.38, high: 129.75, low: 128, close: 128.86, volume: 5284500 },
  { time: new Date(2011, 7, 29), open: 128.88, high: 132.69, low: 128.38, close: 132, volume: 7554500 },
  { time: new Date(2011, 7, 30), open: 131.5, high: 133.94, low: 130.69, close: 130.75, volume: 7209500 },
  { time: new Date(2011, 7, 31), open: 132.5, high: 136.5, low: 131.63, close: 134.75, volume: 8424800 },
  { time: new Date(2011, 8, 1), open: 137.5, high: 137.69, low: 134.38, close: 135, volume: 5094500 },
  { time: new Date(2011, 8, 2), open: 134.63, high: 135.56, low: 132, close: 132.38, volume: 4443600 },
  { time: new Date(2011, 8, 5), open: 132, high: 133.56, low: 131.94, close: 133.31, volume: 4591100 },
  { time: new Date(2011, 8, 6), open: 134, high: 135, low: 131.94, close: 131.94, volume: 5658400 },
  { time: new Date(2011, 8, 7), open: 132, high: 132.38, low: 129.56, close: 130, volume: 6094100 },
  { time: new Date(2011, 8, 8), open: 131.38, high: 131.44, low: 123.75, close: 125.37, volume: 14862200 },
  { time: new Date(2011, 8, 9), open: 126.5, high: 130.88, low: 126, close: 130.13, volume: 7544700 },
  { time: new Date(2011, 8, 12), open: 128.75, high: 129.63, low: 126.25, close: 127.12, volume: 6985600 },
  { time: new Date(2011, 8, 13), open: 127.19, high: 127.25, low: 124.37, close: 125.19, volume: 8093000 },
  { time: new Date(2011, 8, 14), open: 127.5, high: 127.81, low: 121.44, close: 122, volume: 7590000 },
  { time: new Date(2011, 8, 15), open: 120.5, high: 125, low: 120.44, close: 125, volume: 7451300 },
  { time: new Date(2011, 8, 16), open: 126.62, high: 126.81, low: 121.37, close: 123, volume: 7078000 },
  { time: new Date(2011, 8, 19), open: 123, high: 124.75, low: 121.69, close: 123.5, volume: 7105300 },
  { time: new Date(2011, 8, 20), open: 122.06, high: 122.81, low: 120, close: 120.06, volume: 8778800 },
  { time: new Date(2011, 8, 21), open: 121, high: 122.25, low: 119.62, close: 121, volume: 6643900 },
  { time: new Date(2011, 8, 22), open: 121, high: 121.06, low: 115.5, close: 117.75, volume: 10563900 },
  { time: new Date(2011, 8, 23), open: 118, high: 120, low: 116.75, close: 119.87, volume: 7043100 },
  { time: new Date(2011, 8, 26), open: 122, high: 123.25, low: 119.06, close: 122, volume: 6438900 },
  { time: new Date(2011, 8, 27), open: 122.25, high: 122.75, low: 119.06, close: 119.19, volume: 8057700 },
  { time: new Date(2011, 8, 28), open: 119.12, high: 119.19, low: 115.06, close: 116.37, volume: 14240000 },
  { time: new Date(2011, 8, 29), open: 115, high: 115.06, low: 111.06, close: 113.5, volume: 17872300 },
  { time: new Date(2011, 8, 30), open: 113.5, high: 116.69, low: 113.12, close: 114.25, volume: 7831100 },
  { time: new Date(2011, 9, 3), open: 114, high: 114.87, low: 110, close: 110, volume: 8277700 },
  { time: new Date(2011, 9, 4), open: 110.81, high: 110.87, low: 105, close: 105.06, volume: 15017800 },
  { time: new Date(2011, 9, 5), open: 106.5, high: 107.25, low: 104.69, close: 107, volume: 14183300 },
  { time: new Date(2011, 9, 6), open: 106.44, high: 108.87, low: 103.87, close: 107.87, volume: 13921100 },
  { time: new Date(2011, 9, 7), open: 108, high: 109, low: 104.69, close: 107, volume: 9683000 },
  { time: new Date(2011, 9, 10), open: 107, high: 108.5, low: 105.44, close: 107.12, volume: 9187300 },
  { time: new Date(2011, 9, 11), open: 108.62, high: 113.06, low: 107, close: 107, volume: 11380500 },
  { time: new Date(2011, 9, 12), open: 93, high: 93, low: 89, close: 91, volume: 69447300 },
  { time: new Date(2011, 9, 13), open: 93.75, high: 94.62, low: 92.5, close: 93.94, volume: 26673600 },
  { time: new Date(2011, 9, 14), open: 94.25, high: 95.12, low: 92.12, close: 93.87, volume: 13768400 },
  { time: new Date(2011, 9, 17), open: 94.87, high: 96, low: 94.62, close: 95.5, volume: 11371600 },
  { time: new Date(2011, 9, 18), open: 95.5, high: 95.56, low: 92.81, close: 93, volume: 9872200 },
  { time: new Date(2011, 9, 19), open: 94.5, high: 95.31, low: 94.25, close: 94.94, volume: 9450500 },
  { time: new Date(2011, 9, 20), open: 97, high: 99, low: 96.25, close: 98.25, volume: 11083300 },
  { time: new Date(2011, 9, 21), open: 98.5, high: 98.81, low: 96.37, close: 96.75, volume: 9552800 },
  { time: new Date(2011, 9, 24), open: 96.75, high: 96.81, low: 93.69, close: 94.81, volume: 11108400 },
  { time: new Date(2011, 9, 25), open: 95.87, high: 95.94, low: 93.5, close: 94.37, volume: 10374200 },
  { time: new Date(2011, 9, 26), open: 94.44, high: 94.44, low: 90, close: 91.56, volume: 16701900 },
  { time: new Date(2011, 9, 27), open: 92.75, high: 92.94, low: 90.19, close: 90.25, volume: 13741900 },
  { time: new Date(2011, 9, 28), open: 90.5, high: 93.94, low: 90.5, close: 93.94, volume: 8523600 },
  { time: new Date(2011, 9, 31), open: 95.06, high: 95.5, low: 92.12, close: 93.62, volume: 9551900 },
  { time: new Date(2011, 10, 1), open: 94.62, high: 97.06, low: 94.12, close: 97, volume: 8680500 },
  { time: new Date(2011, 10, 2), open: 97.5, high: 97.5, low: 94.87, close: 95, volume: 7151700 },
  { time: new Date(2011, 10, 3), open: 96, high: 96.25, low: 93, close: 95.87, volume: 9673100 },
  { time: new Date(2011, 10, 4), open: 96, high: 96.37, low: 93.87, close: 94.06, volume: 6264700 },
  { time: new Date(2011, 10, 7), open: 94.62, high: 95, low: 93, close: 94.62, volume: 8541600 },
  { time: new Date(2011, 10, 8), open: 94.87, high: 94.87, low: 92.62, close: 93.75, volume: 8358000 },
  { time: new Date(2011, 10, 9), open: 94, high: 98.25, low: 93.56, close: 98, volume: 18720800 },
  { time: new Date(2011, 10, 10), open: 99, high: 105.12, low: 98.37, close: 103.94, volume: 19683100 },
  { time: new Date(2011, 10, 11), open: 105.5, high: 108.44, low: 104.44, close: 107.87, volume: 13682500 },
  { time: new Date(2011, 10, 14), open: 108.81, high: 109.87, low: 106, close: 106.06, volume: 10668100 },
  { time: new Date(2011, 10, 15), open: 105, high: 105, low: 101.81, close: 104.5, volume: 9710600 },
  { time: new Date(2011, 10, 16), open: 105.94, high: 106, low: 104.12, close: 105, volume: 3113100 },
  { time: new Date(2011, 10, 17), open: 104.94, high: 104.94, low: 103.37, close: 104.19, volume: 5682000 },
  { time: new Date(2011, 10, 18), open: 103.69, high: 104.5, low: 102.12, close: 103.06, volume: 5763600 },
  { time: new Date(2011, 10, 21), open: 102.56, high: 104.44, low: 102.25, close: 103.42, volume: 5340000 },
  { time: new Date(2011, 10, 22), open: 103.44, high: 106.31, low: 103.37, close: 105.27, volume: 6220800 },
  { time: new Date(2011, 10, 23), open: 109.81, high: 112.87, low: 107.94, close: 111.87, volume: 14680500 },
  { time: new Date(2011, 10, 24), open: 113, high: 116.5, low: 112.5, close: 116, volume: 9933000 },
  { time: new Date(2011, 10, 25), open: 117, high: 119.19, low: 115.44, close: 116.62, volume: 11329500 },
  { time: new Date(2011, 10, 28), open: 116.25, high: 121, low: 115.5, close: 118.28, volume: 8145300 },
  { time: new Date(2011, 10, 29), open: 120.5, high: 122.12, low: 112.25, close: 113.37, volume: 16644700 },
  { time: new Date(2011, 10, 30), open: 111.62, high: 111.94, low: 107.56, close: 109, volume: 12593800 },
  { time: new Date(2011, 11, 1), open: 108.12, high: 112.75, low: 106.56, close: 109.7, volume: 7138100 },
  { time: new Date(2011, 11, 2), open: 110.19, high: 110.19, low: 106.87, close: 109.25, volume: 7442300 },
  { time: new Date(2011, 11, 5), open: 107.75, high: 107.94, low: 104.5, close: 107, volume: 9442300 },
  { time: new Date(2011, 11, 6), open: 108, high: 109.69, low: 105.75, close: 109.19, volume: 7123600 },
  { time: new Date(2011, 11, 7), open: 110.69, high: 111.06, low: 108.62, close: 110, volume: 7680600 },
  { time: new Date(2011, 11, 8), open: 109.06, high: 110.44, low: 107.75, close: 109.2, volume: 4839800 },
  { time: new Date(2011, 11, 9), open: 108.5, high: 110.12, low: 108.06, close: 110.12, volume: 4775500 },
  { time: new Date(2011, 11, 12), open: 109.87, high: 110.31, low: 108, close: 108, volume: 4008800 },
  { time: new Date(2011, 11, 13), open: 109.12, high: 110.44, low: 108.19, close: 108.62, volume: 4533600 },
  { time: new Date(2011, 11, 14), open: 109.69, high: 110, low: 108.12, close: 109.75, volume: 3741100 },
  { time: new Date(2011, 11, 15), open: 109.56, high: 110.75, low: 109.06, close: 109.81, volume: 4084800 },
  { time: new Date(2011, 11, 16), open: 110.44, high: 110.5, low: 108.75, close: 109, volume: 2685200 },
  { time: new Date(2011, 11, 19), open: 109.69, high: 110.5, low: 108.56, close: 108.75, volume: 3438000 },
  { time: new Date(2011, 11, 20), open: 109.19, high: 109.5, low: 106.62, close: 107.87, volume: 2870500 }
];
