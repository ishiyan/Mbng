import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { MbsError } from '../../errors/mbs-error';
import { SyntheticDataParameters } from './synthetic-data-parameters';
import { HistoricalData } from '../historical-data';
import { SyntheticDataKind } from './synthetic-data-kind.enum';
import { TemporalEntityKind } from '../entities/temporal-entity-kind.enum';

// const apiUrlPrefix = '/api/v1/data/generators/';
const apiUrlPrefix = 'http://localhost:5000/api/v1/data/generators/';
// const apiUrlPrefix = 'https://mbrane1.westeurope.cloudapp.azure.com/api/v1/data/generators/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' // , 'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class SyntheticDataService {
  constructor(private httpClient: HttpClient) { }

  private static toSegment(parameters: SyntheticDataParameters): string {
    switch (parameters.temporalEntityKind) {
      case TemporalEntityKind.Bar:
        return '/ohlcvs';
      case TemporalEntityKind.Quote:
        return '/quotes';
      case TemporalEntityKind.Scalar:
        return '/scalars';
      case TemporalEntityKind.Trade:
        return '/trades';
    }
    throw new Error('Unknown temporal entity kind: ' + TemporalEntityKind[parameters.temporalEntityKind]);
  }

  private static composeUrl(parameters: SyntheticDataParameters): string {
    switch (parameters.syntheticDataKind) {
      case SyntheticDataKind.Chirp:
        return apiUrlPrefix + 'ChirpWaveforms' + SyntheticDataService.toSegment(parameters);
      case SyntheticDataKind.FractionalBrownianMotion:
        return apiUrlPrefix + 'FbmWaveforms' + SyntheticDataService.toSegment(parameters);
      case SyntheticDataKind.GeometricBrownianMotion:
        return apiUrlPrefix + 'GbmWaveforms' + SyntheticDataService.toSegment(parameters);
      case SyntheticDataKind.MultiSinusoid:
        return apiUrlPrefix + 'MultiSinusoidalWaveforms' + SyntheticDataService.toSegment(parameters);
      case SyntheticDataKind.Sawtooth:
        return apiUrlPrefix + 'SawtoothWaveforms' + SyntheticDataService.toSegment(parameters);
      case SyntheticDataKind.Sinusoid:
        return apiUrlPrefix + 'SinusoidalWaveforms' + SyntheticDataService.toSegment(parameters);
      case SyntheticDataKind.Square:
        return apiUrlPrefix + 'SquareWaveforms' + SyntheticDataService.toSegment(parameters);
    }
    throw new Error('Unknown synthetic data kind: ' + SyntheticDataKind[parameters.syntheticDataKind]);
  }

  public getSyntheticData = (parameters: SyntheticDataParameters): Observable<HistoricalData> => {
    const url: string = SyntheticDataService.composeUrl(parameters);
    const body: any = parameters.toJSON();
    return this.httpClient.post<HistoricalData>(url, body, httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        map(hd => {
          if (hd.data) {
            const t = 'time';
            hd.data.forEach(v => v[t] = new Date(Date.parse(v[t] as any)));
          }
          hd.temporalEntityKind = parameters.temporalEntityKind;
          hd.timeGranularity = parameters.timeParameters.timeGranularity;
          return hd;
        }),
        catchError(this.handleError) // then handle the error
      );
  };

  private handleError(error: any) {
    let text: string;
    if (error.error.message) {
      const internalError: MbsError = error.error as MbsError;
      text = MbsError.toMessage(internalError);
    } else {
      const errorResponse: HttpErrorResponse = error as HttpErrorResponse;
      text = errorResponse.message;
    }
    // console.error(text);
    return throwError(text);
  }
}
