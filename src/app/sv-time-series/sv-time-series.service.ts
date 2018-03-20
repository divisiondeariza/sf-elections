import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TimeSerie } from '../time-serie';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class SvTimeSeriesService {

  constructor(
    private http: HttpClient,
  	) { }

  getTimeSeries (candidates, category): Observable<TimeSerie[]>{
  	return this.http.get<TimeSerie[]>("assets/data/time-series.json")
  				.pipe(
  					map(rawData => candidates.map( candidate => rawData[category][candidate]) )
  					)
  }

}
