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

  getTimeSeries (category): Observable<TimeSerie[]>{
  	return this.http.get<TimeSerie[]>("assets/data/time-series.json")
  				.pipe(
  					map(rawData => Object.keys(rawData[category]).map( candidateId => this.remapIntoTimeserie(rawData, category, candidateId)) )
  					)
  }

  private remapIntoTimeserie(rawData, category, candidateId){
  	return {
  		dates: rawData[category][candidateId].dates,
  		values: rawData[category][candidateId].values,
  		candidateId: candidateId
  	}
  }

}
