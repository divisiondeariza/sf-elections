import { TestBed, inject } from '@angular/core/testing';
import { SvLineChartSeriesService } from './sv-line-chart-series.service';
import { of } from 'rxjs/observable/of';
import { SvTimeSeriesService } from '../sv-time-series/sv-time-series.service';
import { SvCandidatesService } from '../sv-candidates/sv-candidates.service';
import { Candidate } from '../candidate';
import { TimeSerie } from '../time-serie';
import { LineChartSerie } from '../line-chart-serie';


describe('SvLineChartSeriesService', () => {
  let timeSeries:TimeSerie[]
  let candidates: Candidate[];
  let getCandidatesSpy: jasmine.Spy;
  let getTimeSeriesSpy: jasmine.Spy;



  beforeEach(() => {
  	candidates = [{ id: 'candidate1', name: 'Candidate One', color:"#fff"}, { id: 'candidate2', name: 'Candidate Two', color:"#888" }];
  	timeSeries = [
	  	{
	  		'dates': ['2018-01-01', '2018-01-02', '2018-01-03'],
	  		'values': ['0', '1', '2'],
	  		'candidateId': 'candidate1',
	  	},
	  	{
	  		'dates': ['2018-01-01', '2018-01-02', '2018-01-03'],
	  		'values': ['3', '4', '5'],
	  		'candidateId': 'candidate2',
        'color': "#888" 	  		
	  	}

	  ]

	const candidatesService = jasmine.createSpyObj('SvCandidatesService', ['getCandidates']);
	const timeSeriesService = jasmine.createSpyObj('SvTimeSeriesService', ['getTimeSeries']);
	getCandidatesSpy = candidatesService.getCandidates.and.returnValue(of(candidates));
	getTimeSeriesSpy = timeSeriesService.getTimeSeries.and.returnValue(of(timeSeries));

    TestBed.configureTestingModule({
      providers: [
      		SvLineChartSeriesService,
      		{provide:  SvCandidatesService, useValue: candidatesService},
      		{provide:  SvTimeSeriesService, useValue: timeSeriesService},
      ]
    });
  });

  it('should be created', inject([SvLineChartSeriesService], (service: SvLineChartSeriesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get line chart series given a category and some candidates ids', 
  	inject([SvLineChartSeriesService], (service: SvLineChartSeriesService) => {
    const expectedSeries:LineChartSerie[] = [
    	{'values': [ 
    		{'y': 0, 'x': new Date('2018-01-01')},
    		{'y': 1, 'x': new Date('2018-01-02')},
    		{'y': 2, 'x': new Date('2018-01-03')},
    		],
    	 'key': 'Candidate One',
        'color': "#fff"},
    	{'values': [ 
    		{'y': 3, 'x': new Date('2018-01-01')},
    		{'y': 4, 'x': new Date('2018-01-02')},
    		{'y': 5, 'x': new Date('2018-01-03')},
    		],
    	 'key': 'Candidate Two',
        'color': "#888"},
    ]

  	service.getLineChartSeries(['candidate1', 'candidate2'], 'category')
  		.subscribe(series => expect(series).toEqual(expectedSeries))

  }));
});
