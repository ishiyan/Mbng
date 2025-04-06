import { } from 'jasmine';

import { HilbertTransformerHomodyneDiscriminator } from './hilbert-transformer-homodyne-discriminator';

// ng test mb  --code-coverage --include='**/indicators/**/*.spec.ts'
// ng test mb  --code-coverage --include='**/indicators/john-ehlers/hilbert-transformer/*.spec.ts'

/* eslint-disable max-len */
// Input sata taken from TA-Lib (http://ta-lib.org/) tests,
//    test_ht_hd.xsl (price, D5 … D256, 252 entries).
const input = [
  92.0000, 93.1725, 95.3125, 94.8450, 94.4075, 94.1100, 93.5000, 91.7350, 90.9550, 91.6875,
  94.5000, 97.9700, 97.5775, 90.7825, 89.0325, 92.0950, 91.1550, 89.7175, 90.6100, 91.0000,
  88.9225, 87.5150, 86.4375, 83.8900, 83.0025, 82.8125, 82.8450, 86.7350, 86.8600, 87.5475,
  85.7800, 86.1725, 86.4375, 87.2500, 88.9375, 88.2050, 85.8125, 84.5950, 83.6575, 84.4550,
  83.5000, 86.7825, 88.1725, 89.2650, 90.8600, 90.7825, 91.8600, 90.3600, 89.8600, 90.9225,
  89.5000, 87.6725, 86.5000, 84.2825, 82.9075, 84.2500, 85.6875, 86.6100, 88.2825, 89.5325,
  89.5000, 88.0950, 90.6250, 92.2350, 91.6725, 92.5925, 93.0150, 91.1725, 90.9850, 90.3775,
  88.2500, 86.9075, 84.0925, 83.1875, 84.2525, 97.8600, 99.8750, 103.2650, 105.9375, 103.5000,
  103.1100, 103.6100, 104.6400, 106.8150, 104.9525, 105.5000, 107.1400, 109.7350, 109.8450, 110.9850,
  120.0000, 119.8750, 117.9075, 119.4075, 117.9525, 117.2200, 115.6425, 113.1100, 111.7500, 114.5175,
  114.7450, 115.4700, 112.5300, 112.0300, 113.4350, 114.2200, 119.5950, 117.9650, 118.7150, 115.0300,
  114.5300, 115.0000, 116.5300, 120.1850, 120.5000, 120.5950, 124.1850, 125.3750, 122.9700, 123.0000,
  124.4350, 123.4400, 124.0300, 128.1850, 129.6550, 130.8750, 132.3450, 132.0650, 133.8150, 135.6600,
  137.0350, 137.4700, 137.3450, 136.3150, 136.4400, 136.2850, 129.0950, 128.3100, 126.0000, 124.0300,
  123.9350, 125.0300, 127.2500, 125.6200, 125.5300, 123.9050, 120.6550, 119.9650, 120.7800, 124.0000,
  122.7800, 120.7200, 121.7800, 122.4050, 123.2500, 126.1850, 127.5600, 126.5650, 123.0600, 122.7150,
  123.5900, 122.3100, 122.4650, 123.9650, 123.9700, 124.1550, 124.4350, 127.0000, 125.5000, 128.8750,
  130.5350, 132.3150, 134.0650, 136.0350, 133.7800, 132.7500, 133.4700, 130.9700, 127.5950, 128.4400,
  127.9400, 125.8100, 124.6250, 122.7200, 124.0900, 123.2200, 121.4050, 120.9350, 118.2800, 118.3750,
  121.1550, 120.9050, 117.1250, 113.0600, 114.9050, 112.4350, 107.9350, 105.9700, 106.3700, 106.8450,
  106.9700, 110.0300, 91.0000, 93.5600, 93.6200, 95.3100, 94.1850, 94.7800, 97.6250, 97.5900,
  95.2500, 94.7200, 92.2200, 91.5650, 92.2200, 93.8100, 95.5900, 96.1850, 94.6250, 95.1200,
  94.0000, 93.7450, 95.9050, 101.7450, 106.4400, 107.9350, 103.4050, 105.0600, 104.1550, 103.3100,
  103.3450, 104.8400, 110.4050, 114.5000, 117.3150, 118.2500, 117.1850, 109.7500, 109.6550, 108.5300,
  106.2200, 107.7200, 109.8400, 109.0950, 109.0900, 109.1550, 109.3150, 109.0600, 109.9050, 109.6250,
  109.5300, 108.0600
];

// Expected smoothed data is taken from TA-Lib (http://ta-lib.org/) tests,
// test_ht_hd.xsl model (smooth, E5 … E256, 252 entries).
const expectedSmoothed = [
  Number.NaN, Number.NaN, Number.NaN, 94.366250, 94.596250,
  94.466500, 93.999000, 93.006750, 92.013500, 91.658500,
  92.670750, 94.971000, 96.490750, 94.630250, 92.160250,
  91.462000, 90.975250, 90.555750, 90.599750, 90.642000,
  89.962750, 88.943750, 87.714000, 85.882500, 84.407000,
  83.447500, 82.971250, 84.410250, 85.614750, 86.708500,
  86.621750, 86.398500, 86.337500, 86.643750, 87.654750,
  88.057000, 87.299000, 86.116500, 84.824500, 84.379500,
  83.927500, 85.019750, 86.449250, 87.864250, 89.436250,
  90.241250, 91.077250, 90.944500, 90.502250, 90.585000,
  90.084750, 89.089500, 87.894000, 86.147500, 84.515000,
  84.078750, 84.559750, 85.491000, 86.858500, 88.188500,
  88.977250, 88.822750, 89.531750, 90.650500, 91.274000,
  92.048250, 92.541750, 92.059250, 91.608000, 90.982500,
  89.727500, 88.412000, 86.397000, 84.709250, 84.166500,
  89.466500, 94.477250, 99.265750, 103.115500, 103.821750,
  103.808000, 103.670750, 103.911000, 105.151000, 105.314500,
  105.512750, 106.178000, 107.631250, 108.836500, 110.008500,
  114.238000, 117.131500, 118.224000, 119.110250, 118.572250,
  117.946000, 116.954250, 115.176000, 113.483500, 113.518250,
  113.914250, 114.690000, 114.053750, 113.139500, 113.036000,
  113.377500, 115.994000, 117.252000, 118.216500, 117.179000,
  115.860500, 115.236500, 115.521000, 117.486000, 119.061500,
  120.078000, 121.971000, 123.574500, 123.697000, 123.584500,
  123.805500, 123.603500, 123.831000, 125.614500, 127.467500,
  129.286500, 130.950000, 131.670000, 132.702000, 134.056000,
  135.481500, 136.612000, 137.152000, 136.927000, 136.686500,
  136.443500, 133.443000, 130.953500, 128.340500, 125.983500,
  124.814000, 124.598500, 125.599000, 125.822500, 125.851000,
  125.070000, 123.101500, 121.516500, 120.823000, 121.892500,
  122.464500, 122.000000, 121.884000, 121.918000, 122.449500,
  124.108000, 125.770000, 126.456000, 125.324000, 124.073000,
  123.519000, 122.850000, 122.668500, 123.146500, 123.501500,
  123.892500, 124.211000, 125.358500, 125.602500, 127.043500,
  128.676500, 130.411500, 132.315000, 134.150000, 134.367000,
  133.847500, 133.572500, 132.357000, 130.298000, 129.195500,
  128.324000, 127.153500, 126.025000, 124.431500, 123.958000,
  123.521500, 122.618000, 121.848500, 120.195500, 119.161500,
  119.724000, 120.211500, 119.190000, 116.658000, 115.395500,
  113.770000, 111.191500, 108.746000, 107.169500, 106.636500,
  106.712500, 108.109000, 101.487500, 97.427000, 94.719000,
  94.022000, 94.347000, 94.591500, 95.852000, 96.698000,
  96.380000, 95.743500, 94.113000, 92.761000, 92.273500,
  92.725000, 93.979500, 95.135000, 95.204500, 95.231500,
  94.679500, 94.184500, 94.797500, 97.618500, 101.655000,
  105.045500, 105.205000, 105.276500, 104.654500, 103.923000,
  103.668000, 104.017000, 106.614000, 110.224000, 113.841000,
  116.435000, 117.262000, 114.437000, 112.049000, 109.977000,
  107.953000, 107.625500, 108.349000, 108.756000, 109.104500,
  109.192000, 109.200000, 109.158500, 109.458500, 109.565000,
  109.586500, 108.998500
];

// Expected detrended data is taken from TA-Lib (http://ta-lib.org/) tests,
// test_ht_hd.xsl model (detrender, F5 … F256, 252 entries).
const expectedDetrended = [
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, -1.0915891717499900,
  -1.3173613695000000, -0.7219797997500020, 0.6126851362500060, 2.0464903305000000, 2.1956965965000100,
  -0.2133271552499980, -2.6347588245000000, -2.2299853702500000, -1.2378372930000000, -0.8974204222499940,
  -0.4237451955000000, -0.1905730447500270, -0.6744053744999980, -1.4149942042499900, -2.3000514063749900,
  -3.1525722770625000, -3.5009449465500000, -2.6479594711350100, -1.5744701212667000, 1.0329960518803700,
  3.0169901262758100, 2.9866982004932500, 1.7977109018758000, 0.0722640389187781, 0.0663175053946354,
  0.5866336204738800, 1.7951497126587800, 1.6520660975016900, -0.7067931052753440, -2.6440308672041700,
  -3.5353609110922400, -2.5527152782709500, -1.1704091227270600, 1.0598874130977600, 3.9200772782999500,
  4.6560200656612500, 4.9157151193899700, 3.7659118589630900, 2.4900186350541700, 1.2326348427417000,
  -0.4903354635213500, -0.5611465101964700, -0.9358371428320370, -2.2207364380055900, -3.0695561834966500,
  -3.9070266093399000, -4.1974174698144900, -2.6029126573731500, -0.1254371759624140, 1.7477933000757800,
  3.0783561617081300, 3.5443206375888600, 2.9865758393000800, 1.5119137734348700, 1.3081586978698800,
  2.5014179179760700, 2.3457627860334100, 1.9234549500273200, 1.5971384693304800, 0.0662588013522247,
  -1.2132241804953700, -1.7678975836022900, -3.1374982393879700, -4.1580482786503600, -5.0918573154078000,
  -4.5182209507725100, -1.6590757163341100, 7.6223675601821200, 15.3266683022322000, 14.9160896115667000,
  13.0257003493705000, 7.2137253435161800, 2.3886700970789300, 0.9319557235179380, 0.5189327277135990,
  1.8586734034293700, 1.8410022534315400, 1.0442638460061400, 1.7483730250325700, 3.1012888923576500,
  4.4654282775167600, 4.7124660343241400, 8.2249690401875000, 10.2071398863488000, 6.4514132494625100,
  3.8858588956854200, 0.9696291626798060, -1.8289427479249000, -2.9851608447343300, -4.6174363823458600,
  -5.2561437527419800, -2.7212856131974200, -0.0660827224112769, 1.0402660563686300, 0.0801661089914569,
  -1.9165464173232800, -0.8013009483598200, 0.7796594344281290, 4.2524538477611500, 5.2837400275741200,
  3.1051862783830200, 0.2711750889133770, -2.7934303510261800, -2.2168457469059700, -0.2348931351499780,
  3.1909130004820900, 5.2103590397188100, 4.5940903657287700, 5.0767034941261700, 5.5222273297045300,
  3.1838267815369900, 0.7759395538311530, 0.5220477459815930, 0.4256991889015550, 0.7376888685208350,
  3.2457605730768300, 5.3160183015264600, 5.6380698494261500, 5.7640292508268800, 4.6386673760300300,
  4.0163855249238800, 5.0483619619644600, 5.4864399280582200, 4.7945029548795600, 3.2334427139157800,
  1.0144823264016500, -1.1883116131131000, -2.1778335253062600, -7.3450440684820300, -11.5041776711512000,
  -11.3721718901381000, -11.3355915978459000, -7.7462097429977600, -3.5974351058919600, 0.6309985007044190,
  1.7830060444414100, -0.0528487419543197, -1.8884527125783600, -5.0160214626666900, -5.8334769510071300,
  -3.9292619924817600, -0.1868398957753610, 1.9560915568598900, 0.2347251347632710, -0.4130979847999250,
  0.3826696371211000, 1.4986372386359300, 4.0215800526575400, 5.3312319490861400, 3.6185258800457200,
  -0.3528972689206090, -3.4609323490446800, -3.1892302086163200, -2.4932584896594500, -1.5994725712096500,
  0.3612177427162450, 1.2870161592435700, 1.5555985576664900, 1.5330377606706500, 2.5725626476464200,
  2.6287065930924400, 3.1339772455195100, 4.8586311952515400, 5.1470948349263700, 5.3068172321424800,
  5.0438380417364300, 2.9991725648751900, 0.0236319339272428, -1.2870859031801400, -2.7173888295800100,
  -5.0279849727059200, -5.0367674467088800, -3.8860401051124500, -4.0825275401450600, -4.0411031927791400,
  -4.4003950292076200, -3.6221878122344500, -2.1301798267640300, -2.7285312625949900, -3.0489370051092800,
  -3.8105332026770300, -4.0690221019589600, -1.3727890301732300, 0.2544564936308790, -1.9476756321356400,
  -6.7871808524512100, -8.1519430805458900, -8.1001909303017900, -11.3315282620241000, -11.5509201811125000,
  -8.9267303792332100, -4.7170883942657700, -3.1812191209744500, -0.6027069258613980, -10.0542585944912000,
  -16.7522832862822000, -11.3660804443572000, -7.6912860369125800, -1.9202029083447100, 0.7073346321107810,
  3.0397886644235600, 4.4168089613972800, 0.8590143613381490, -2.1694429485656800, -4.9418860459439000,
  -6.2070040624430200, -3.7013222600524000, -0.2166762653770910, 2.8182552909032600, 4.0301547472194000,
  2.2593927317438600, 0.4638646059150660, -0.5271224412832020, -0.8645861873050190, 1.6398613418887100,
  6.8504347573052500, 11.2765581383109000, 11.9177266025034000, 6.8284531011774800, 1.8145564582313100,
  -0.3277032932841100, -2.5114261376228200, -1.2807406075202000, 1.4816605883429900, 6.8349691240749400,
  12.2933509549014000, 14.0337638058356000, 11.7623096904418000, 6.3689895877927500, -2.9916104221273200,
  -9.1496651812066300, -8.5317201235389300, -7.6173802746576600, -4.2721954699530400, -0.1206682928092770,
  1.2870127914995200, 1.2183925118060300, 0.8386484198680230, 0.3258183441834180, 0.1139699616624150,
  0.3727810797362040, 0.4055959972041480
];

// Expected quadrature data is taken from TA-Lib (http://ta-lib.org/) tests,
// test_ht_hd.xsl model (Q1, G5 … G256, 252 entries).
const expectedQuadrature = [
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  1.6648030318872400, 0.7786406194847540, -1.4342712549771600, -2.9350628901680700, -1.4321481952615700,
  0.5483547938206320, 0.7632362072919870, 0.6516533756083720, 0.4813205782264420, -0.2998508887907050,
  -1.1841504298844400, -1.6740420132135100, -1.7819343600212600, -1.1911037404918700, 0.8568405077313820,
  2.8170057931966600, 5.0357740139859300, 6.2757821900682000, 2.7859043494035700, -1.1213698512774800,
  -3.7296462245164800, -2.4289641092740600, 0.3528685558118090, 1.5241327603456000, 0.6986063534732730,
  -3.5427870776807100, -5.4839343884751800, -3.7444629224666300, -0.0084547974989631, 3.7362977190453300,
  5.8839241939620800, 7.6451203678983200, 5.2038116920874400, 1.7260648833526600, -0.9176509160193420,
  -3.3200985443724000, -3.4624195870869100, -3.9040550994864400, -2.7012372476722800, -1.3211098293529700,
  -2.4417061378785100, -2.6860421931692400, -1.9767159943812300, -0.9734329680956530, 1.9604950887538800,
  5.1566509229234600, 5.6826155164007100, 4.4595775058005100, 2.5114251227276500, 0.1492572249152790,
  -1.9299154958074200, -1.8076076573239300, 0.7140251872954890, 0.7975054096002940, -0.8177557661619140,
  -1.1902547129391900, -2.6985446089415400, -4.0225996755498200, -3.1198118074479100, -3.3857607390336300,
  -3.6033707771083400, -2.3398423024880600, 1.3994165568480400, 7.6193795834450400, 17.5980032115596000,
  21.8746126774072000, 9.6362760327750100, -1.7143116737389600, -9.8966102728844000, -14.4803247014528000,
  -8.9220899392734600, -3.8226480601627600, -0.1042659431166720, 1.2611224166231900, -0.4793737409417960,
  0.6089511832852090, 2.7663995094540300, 4.1973931660392100, 3.5455169386355600, 5.2257812322965000,
  6.6194928965014400, -2.8518985837288100, -9.0961189927242400, -9.1111897814412600, -10.2099694785147000,
  -7.3098230309593900, -4.8105175370064500, -3.0516197189936700, 2.9684509427792300, 7.0446841466161200,
  5.1286647449524700, 1.0618514774261200, -2.7812458031776700, -0.1878554550451900, 3.9543756403830600,
  6.4077368987407400, 5.5711084564222800, -1.6973251687789800, -6.4197114902003400, -7.8618431867007600,
  -3.3124454879439200, 3.3249576692932300, 7.0699845188049200, 8.0288909287338800, 3.2957503218302500,
  0.5520326998498500, 0.6819051900572300, -3.3351658032068900, -6.4491676407127300, -3.8171050184627800,
  -0.7998151190605340, 0.6289446949149740, 4.0802162391266000, 6.3340447537748600, 3.7866927527037200,
  1.2936561911823600, -0.9779096069123480, -2.4732979091350700, 0.3757624917381020, 1.4513832747135400,
  -1.2208721704948000, -4.6045148975926600, -7.6075451851309100, -10.2261155138089000, -9.2950047086483100,
  -13.7967936907642000, -18.5832592931499000, -8.2047258569042600, -0.1093983795001260, 8.4549848795149000,
  16.5608264652377000, 16.1619937173412000, 10.3721707335475000, -0.3233463581822680, -5.6054590354091600,
  -7.9099212683014100, -5.8739400171159600, 1.9333539786423900, 8.0739440827452900, 8.8862534194940100,
  1.9411963492726600, -1.9648092361714700, 1.1650615521007600, 3.3877659760005500, 5.6177671278807300,
  5.0663844910392800, -1.3935530793867300, -8.8800287629159100, -11.4709929659505000, -5.5311262488522100,
  0.5755961731535770, 2.5284789740989600, 4.9314694006452000, 4.6984547978467900, 2.4792887198744000,
  1.1089729044712500, 1.6724678730290600, 1.8568277729052200, 1.2354579135999200, 2.9751573319593600,
  2.5101880496838900, 0.5332075317421140, -0.6705307908098150, -3.7928983583701800, -7.4267998289292800,
  -7.0562684670604500, -5.2066106664051100, -5.8773566485659800, -3.6461782452550600, 0.8220193030672870,
  0.8080554244040670, 0.0952297874860745, 0.1980063475048250, 0.7221525318513890, 2.9184382044023700,
  1.1352975413480700, -1.0847945360697200, -0.9303097640721380, -0.8586024658427000, 3.7481132217988700,
  5.6402149672212700, -2.0293928912536200, -13.0176687137417000, -14.3548625675149000, -5.6616553461972300,
  -7.0882318882767200, -4.7974865907278100, 4.9571994046266100, 11.7410678768701000, 8.2053101652107000,
  4.2544474722633500, -9.3701382961920200, -22.6230014511658000, -1.6125062641195000, 14.6531315108999000,
  19.8379504746977000, 22.0117246033245000, 12.2947215617603000, 7.9739226260347500, -4.6328562286876900,
  -13.1789725680834000, -11.4437748413626000, -7.5817479995356100, 2.3394868510106900, 10.0314303499423000,
  10.7264528614495000, 7.3142826825500400, -0.0400896141267706, -5.0196496467161000, -4.0981562904942700,
  -1.1594018295526200, 4.8059506572678800, 12.3652696857015000, 14.2825851090881000, 7.8028379337785600,
  -7.2858073817211500, -19.2091117866355000, -15.7635557352717000, -9.7801712230748800, -1.4530435472633400,
  8.5090971942229900, 15.5366271330060000, 19.5213759172826000, 12.4727640008044000, -1.8733971476358600,
  -15.2576036378734000, -26.2276338641862000, -26.1028619932365000, -10.6375607167069000, 0.5716986339794170,
  6.4028836988426500, 11.6669539404801000, 8.6355686833119400, 3.0938152057236700, 0.3181197473965780,
  -0.8913629633892510, -0.9447072733524570
];

// Expected in-phase data is taken from TA-Lib (http://ta-lib.org/) tests,
// test_ht_hd.xsl model (I1, H5 … H256, 252 entries).
const expectedInPhase = [
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  0.6126851362500060, 2.0464903305000000, 2.1956965965000100, -0.2133271552499980, -2.6347588245000000,
  -2.2299853702500000, -1.2378372930000000, -0.8974204222499940, -0.4237451955000000, -0.1905730447500270,
  -0.6744053744999980, -1.4149942042499900, -2.3000514063749900, -3.1525722770625000, -3.5009449465500000,
  -2.6479594711350100, -1.5744701212667000, 1.0329960518803700, 3.0169901262758100, 2.9866982004932500,
  1.7977109018758000, 0.0722640389187781, 0.0663175053946354, 0.5866336204738800, 1.7951497126587800,
  1.6520660975016900, -0.7067931052753440, -2.6440308672041700, -3.5353609110922400, -2.5527152782709500,
  -1.1704091227270600, 1.0598874130977600, 3.9200772782999500, 4.6560200656612500, 4.9157151193899700,
  3.7659118589630900, 2.4900186350541700, 1.2326348427417000, -0.4903354635213500, -0.5611465101964700,
  -0.9358371428320370, -2.2207364380055900, -3.0695561834966500, -3.9070266093399000, -4.1974174698144900,
  -2.6029126573731500, -0.1254371759624140, 1.7477933000757800, 3.0783561617081300, 3.5443206375888600,
  2.9865758393000800, 1.5119137734348700, 1.3081586978698800, 2.5014179179760700, 2.3457627860334100,
  1.9234549500273200, 1.5971384693304800, 0.0662588013522247, -1.2132241804953700, -1.7678975836022900,
  -3.1374982393879700, -4.1580482786503600, -5.0918573154078000, -4.5182209507725100, -1.6590757163341100,
  7.6223675601821200, 15.3266683022322000, 14.9160896115667000, 13.0257003493705000, 7.2137253435161800,
  2.3886700970789300, 0.9319557235179380, 0.5189327277135990, 1.8586734034293700, 1.8410022534315400,
  1.0442638460061400, 1.7483730250325700, 3.1012888923576500, 4.4654282775167600, 4.7124660343241400,
  8.2249690401875000, 10.2071398863488000, 6.4514132494625100, 3.8858588956854200, 0.9696291626798060,
  -1.8289427479249000, -2.9851608447343300, -4.6174363823458600, -5.2561437527419800, -2.7212856131974200,
  -0.0660827224112769, 1.0402660563686300, 0.0801661089914569, -1.9165464173232800, -0.8013009483598200,
  0.7796594344281290, 4.2524538477611500, 5.2837400275741200, 3.1051862783830200, 0.2711750889133770,
  -2.7934303510261800, -2.2168457469059700, -0.2348931351499780, 3.1909130004820900, 5.2103590397188100,
  4.5940903657287700, 5.0767034941261700, 5.5222273297045300, 3.1838267815369900, 0.7759395538311530,
  0.5220477459815930, 0.4256991889015550, 0.7376888685208350, 3.2457605730768300, 5.3160183015264600,
  5.6380698494261500, 5.7640292508268800, 4.6386673760300300, 4.0163855249238800, 5.0483619619644600,
  5.4864399280582200, 4.7945029548795600, 3.2334427139157800, 1.0144823264016500, -1.1883116131131000,
  -2.1778335253062600, -7.3450440684820300, -11.5041776711512000, -11.3721718901381000, -11.3355915978459000,
  -7.7462097429977600, -3.5974351058919600, 0.6309985007044190, 1.7830060444414100, -0.0528487419543197,
  -1.8884527125783600, -5.0160214626666900, -5.8334769510071300, -3.9292619924817600, -0.1868398957753610,
  1.9560915568598900, 0.2347251347632710, -0.4130979847999250, 0.3826696371211000, 1.4986372386359300,
  4.0215800526575400, 5.3312319490861400, 3.6185258800457200, -0.3528972689206090, -3.4609323490446800,
  -3.1892302086163200, -2.4932584896594500, -1.5994725712096500, 0.3612177427162450, 1.2870161592435700,
  1.5555985576664900, 1.5330377606706500, 2.5725626476464200, 2.6287065930924400, 3.1339772455195100,
  4.8586311952515400, 5.1470948349263700, 5.3068172321424800, 5.0438380417364300, 2.9991725648751900,
  0.0236319339272428, -1.2870859031801400, -2.7173888295800100, -5.0279849727059200, -5.0367674467088800,
  -3.8860401051124500, -4.0825275401450600, -4.0411031927791400, -4.4003950292076200, -3.6221878122344500,
  -2.1301798267640300, -2.7285312625949900, -3.0489370051092800, -3.8105332026770300, -4.0690221019589600,
  -1.3727890301732300, 0.2544564936308790, -1.9476756321356400, -6.7871808524512100, -8.1519430805458900,
  -8.1001909303017900, -11.3315282620241000, -11.5509201811125000, -8.9267303792332100, -4.7170883942657700,
  -3.1812191209744500, -0.6027069258613980, -10.0542585944912000, -16.7522832862822000, -11.3660804443572000,
  -7.6912860369125800, -1.9202029083447100, 0.7073346321107810, 3.0397886644235600, 4.4168089613972800,
  0.8590143613381490, -2.1694429485656800, -4.9418860459439000, -6.2070040624430200, -3.7013222600524000,
  -0.2166762653770910, 2.8182552909032600, 4.0301547472194000, 2.2593927317438600, 0.4638646059150660,
  -0.5271224412832020, -0.8645861873050190, 1.6398613418887100, 6.8504347573052500, 11.2765581383109000,
  11.9177266025034000, 6.8284531011774800, 1.8145564582313100, -0.3277032932841100, -2.5114261376228200,
  -1.2807406075202000, 1.4816605883429900, 6.8349691240749400, 12.2933509549014000, 14.0337638058356000,
  11.7623096904418000, 6.3689895877927500, -2.9916104221273200, -9.1496651812066300, -8.5317201235389300,
  -7.6173802746576600, -4.2721954699530400, -0.1206682928092770, 1.2870127914995200, 1.2183925118060300,
  0.8386484198680230, 0.3258183441834180
];

// Expected period data is taken from TA-Lib (http://ta-lib.org/) tests,
// test_ht_hd.xsl model (period adjustment, X5 … X256, 252 entries).
const expectedPeriod = [
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN,
  Number.NaN, Number.NaN, Number.NaN, 9.000000000000000, 9.900000000000000,
  10.890000000000000, 11.979000000000000, 13.176900000000000, 14.494590000000000, 15.944049000000000,
  17.538453900000000, 19.292299290000000, 19.546850515549700, 20.206044173204600, 21.640268976823100,
  21.809954546283300, 20.747515836259100, 19.665367235713800, 19.161974723201300, 19.191653482673400,
  19.097835506446900, 18.842719277424000, 19.092085289056500, 20.331804457580600, 20.955690292256500,
  19.984860370450300, 18.665859586000600, 17.639487956783500, 17.424093200371400, 17.074171042130500,
  16.313818050209100, 15.607867618037900, 15.160105984535000, 15.045371686033900, 15.223816291538400,
  15.359027755926600, 15.341345224254100, 15.462903908009300, 15.848732959121200, 16.181761270229700,
  16.281335009366500, 16.215677024318100, 16.179553956184600, 16.222858233896200, 16.192982479111500,
  16.002247824221400, 15.745120697760600, 15.670985334659300, 15.876056887455000, 16.330781774647800,
  17.076362835582900, 17.760426181819000, 18.115461261430200, 18.543386568808200, 19.199700340498500,
  19.456652261791400, 19.625709233103400, 19.843354234976800, 19.346482020569600, 18.069614207212000,
  16.877019669536100, 17.167409032477500, 18.739042608827200, 18.335090523598100, 17.176913612166200,
  16.455518804183100, 16.411441901167400, 16.783508340542200, 17.275667815411600, 17.689558627012900,
  18.042611466739300, 18.453221618941800, 18.904189790609600, 19.381000446406300, 19.995779886734800,
  20.770891796287800, 21.163124576662200, 21.445758785952900, 21.623442588613000, 21.400483125273800,
  21.379307673926300, 21.661723639007100, 21.691989184136300, 21.358299276065800, 20.942387742980100,
  20.402415995994900, 19.887972548180600, 19.710942507524600, 19.650329761097500, 19.444631277172500,
  19.245379731429000, 19.315480058919200, 19.716923405669900, 20.136546274403800, 19.785257847962500,
  19.211541356024200, 19.462079333904100, 20.259952400696800, 21.077714306154500, 22.034184586888300,
  22.794774813645500, 21.619450907543100, 20.192567147645300, 18.859857715900700, 18.127650992597500,
  18.248908976158800, 18.772546071019400, 19.648983338125100, 21.078779204191000, 22.856990733321300,
  25.142689806653400, 26.049247559718100, 25.081653362853300, 24.805878395881200, 25.678945405309400,
  26.899069573039700, 28.070893133495900, 28.820460447627300, 29.148580413096000, 29.911506312780800,
  30.522290240306400, 29.831789727123700, 29.907750715195200, 32.229409516906500, 31.252944811992900,
  29.190250454401400, 27.263693924410900, 25.494100492078300, 24.833412356711000, 24.740390414606000,
  24.567550591159400, 24.228540150740200, 23.897335168007200, 23.670629018281500, 23.568898523214900,
  23.816798914726100, 24.489473553153500, 24.441361684036900, 23.690499065123900, 23.272451332583300,
  23.650795040080100, 24.541479273248500, 25.266757281060500, 24.822533102577800, 24.138007795401500,
  24.164163998488400, 23.679520927619000, 22.357035649271900, 20.901001306830300, 19.748834652200700,
  18.929471558820600, 18.174800624404000, 17.408925256196000, 16.849238703808400, 16.721858909709200,
  16.965526060445300, 17.718639000324900, 19.105344933382300, 19.909658398767500, 19.937272378243700,
  20.012912065130200, 20.584170097513000, 20.851915105033700, 20.628398560315800, 20.525652638447300,
  20.534399561069300, 20.233448296359500, 20.074868396969200, 20.414787359450400, 20.950306015017900,
  21.835113454474700, 23.216089641178400, 24.681115557593300, 26.533669239039000, 28.030495728393300,
  28.912006900515400, 31.803207590566900, 34.983528349623600, 32.674615478548400, 30.518090856964200,
  28.503896860404600, 28.230492130826000, 26.367279650191500, 24.627039193278900, 23.082669096980000,
  22.548440209497900, 24.211646082665300, 26.632810690931900, 29.296091760025100, 32.225700936027600,
  35.448271029630300, 33.402032588761700, 32.601993836320400, 32.684057920734500, 32.156945297142600,
  30.993330140969200, 29.228684195723600, 27.299591038805800, 25.807180831388900, 24.910989656933000,
  24.343385429284900, 24.151017045203300, 24.374268178318600, 24.552000206574100, 24.025116533765400,
  23.060586749486000, 22.492138249930100, 23.186781422010000, 25.505459564211000, 28.056005520632100,
  30.861606072695300, 32.186251376468800, 30.061958785621900, 28.077869505770800, 27.059020030640500,
  26.964119315717100, 27.001237216348400, 26.816630430365000, 26.706733483954300, 26.936033026036000,
  26.057711165210900, 24.337902228307000, 22.731600681238700, 22.155128689720000, 22.557429166320600,
  22.028068025029500, 20.824799140793500, 19.644851421509500, 18.776215051409800, 18.224498203336700,
  17.848949128260300, 17.538093533508500
];

describe('HilbertTransformerHomodyneDiscriminator', () => {
  const epsilon = 1e-8;

  it('should throw if the smoothing length is less than 2', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 1, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 }
      );
    }).toThrow();
  });

  it('should throw if the smoothing length is greater than 4', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 5, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 }
      );
    }).toThrow();
  });

  it('should throw if alpha quad is 0', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 0, alphaEmaPeriod: 0.2 }
      );
    }).toThrow();
  });

  it('should throw if alpha quad is negative', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: -0.001, alphaEmaPeriod: 0.2 }
      );
    }).toThrow();
  });

  it('should throw if alpha quad is 1', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 1, alphaEmaPeriod: 0.2 }
      );
    }).toThrow();
  });

  it('should throw if alpha quad is greater than 1', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 1.001, alphaEmaPeriod: 0.2 }
      );
    }).toThrow();
  });

  it('should throw if alpha period is 0', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0 }
      );
    }).toThrow();
  });

  it('should throw if alpha period is negative', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: -0.001 }
      );
    }).toThrow();
  });

  it('should throw if alpha period is 1', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 1 }
      );
    }).toThrow();
  });

  it('should throw if alpha period is greater than 1', () => {
    expect(() => {
      new HilbertTransformerHomodyneDiscriminator(
        { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 1.001 }
      );
    }).toThrow();
  });

  it('should calculate expected output and prime state', () => {
    const lenPrimed = 4 + 7 * 3;
    const hthd = new HilbertTransformerHomodyneDiscriminator(
      { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 }
    );

    for (let i = 0; i < input.length; i++) {
      hthd.update(input[i]);

      if (i < lenPrimed) {
        expect(hthd.primed).withContext(`primed ${i}: expected false, actual true`)
          .toBe(false);
      } else {
        expect(hthd.primed).withContext(`primed ${i}: expected true, actual false`)
          .toBe(true);
      }

      let exp = expectedSmoothed[i];
      if (Number.isNaN(exp)) {
        expect(hthd.primed).withContext(`smoothed ${i} primed: expected false, actual true`)
          .toBe(false);
      } else {
        const act = hthd.smoothedValue;
        expect(act).withContext(`smoothed ${i}: expected ${exp}, actual ${act}`)
          .toBeCloseTo(exp, epsilon);
      }

      exp = expectedDetrended[i];
      if (Number.isNaN(exp)) {
        expect(hthd.primed).withContext(`detrended ${i} primed: expected false, actual true`)
          .toBe(false);
      } else {
        const act = hthd.detrendedValue;
        expect(act).withContext(`detrended ${i}: expected ${exp}, actual ${act}`)
          .toBeCloseTo(exp, epsilon);
      }

      exp = expectedQuadrature[i];
      if (Number.isNaN(exp)) {
        expect(hthd.primed).withContext(`quadrature ${i} primed: expected false, actual true`)
          .toBe(false);
      } else {
        const act = hthd.quadratureValue;
        expect(act).withContext(`quadrature ${i}: expected ${exp}, actual ${act}`)
          .toBeCloseTo(exp, epsilon);
      }

      exp = expectedInPhase[i];
      if (Number.isNaN(exp)) {
        expect(hthd.primed).withContext(`in-phase ${i} primed: expected false, actual true`)
          .toBe(false);
      } else {
        const act = hthd.inPhaseValue;
        expect(act).withContext(`in-phase ${i}: expected ${exp}, actual ${act}`)
          .toBeCloseTo(exp, epsilon);
      }

      exp = expectedPeriod[i];
      if (Number.isNaN(exp)) {
        expect(hthd.primed).withContext(`period ${i} primed: expected false, actual true`)
          .toBe(false);
      } else {
        const act = hthd.periodValue;
        expect(act).withContext(`period ${i}: expected ${exp}, actual ${act}`)
          .toBeCloseTo(exp, epsilon);
      }
    }

    let prevVal = hthd.periodValue;
    hthd.update(Number.NaN);
    const newVal = hthd.periodValue;
    expect(prevVal === newVal).withContext('updating with NaN should not change period')
      .toBeTrue();
  });

  const update = function (omega: number): HilbertTransformerHomodyneDiscriminator {
    const updates = 512;
    const hthd = new HilbertTransformerHomodyneDiscriminator(
      { smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2, alphaEmaPeriod: 0.2 }
    );

    for (let i = 0; i < updates; ++i) {
      hthd.update(Math.sin(omega * i));
    }

    return hthd;
  }

  it('should calculate correct period of sinusoid', () => {
    let period = 30;
    let omega = 2 * Math.PI / period;
    let exp = period;
    let act = update(omega).periodValue;
    expect(act).withContext(
      `period ${period} (omega ${omega}) inside (min,max) -> period expected ${exp} actual ${act}`)
      .toBeCloseTo(exp, 1e-2);

    period = 3;
    omega = 2 * Math.PI / period;
    exp = 6;
    act = update(omega).periodValue;
    expect(act).withContext(
      `period ${period} (omega ${omega}) < min -> period expected ${exp} actual ${act}`)
      .toBeCloseTo(exp, 1e-14);

    period = 60;
    omega = 2 * Math.PI / period;
    exp = 50;
    act = update(omega).periodValue;
    expect(act).withContext(
      `period ${period} (omega ${omega}) < min -> period expected ${exp} actual ${act}`)
      .toBeCloseTo(exp, 1e-14);  
  });
});
