import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';

import { SvTimeSeriesService } from '../sv-time-series/sv-time-series.service';
import { SvCandidatesService } from '../sv-candidates/sv-candidates.service';
import { Candidate } from '../candidate';
import { TimeSerie } from '../time-serie';
import { LineChartSerie } from '../line-chart-serie';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class SvLineChartSeriesService {


  constructor(private candidatesService: SvCandidatesService,
  			  private timeSeriesService: SvTimeSeriesService ) { }
  
  getLineChartSeries(candidates, category):Observable<LineChartSerie[]>{
  	return Observable.forkJoin(
  		   this.candidatesService.getCandidates(),
  		   this.timeSeriesService.getTimeSeries(candidates, category)	
  		).map( res => this.join(res[0], res[1]) )

  }

  private join(candidates, timeSeries):LineChartSerie[]{
  	return timeSeries.map(timeSerie => this.remapTimeSerie(timeSerie, candidates));
  }

  private remapTimeSerie(timeSerie, candidates):LineChartSerie{
  	return{
  		values: timeSerie.values.map((value, index) => this.mapSingleValue(value, index, timeSerie)),
  		key: candidates.filter(candidate => candidate.id == timeSerie.candidateId)[0].name
  	}

  }

  private mapSingleValue(value, index, timeSerie){
  	return {
  		'x':parseInt(value), 
  		'y':new Date(timeSerie.dates[index])
  	}
  }

}


