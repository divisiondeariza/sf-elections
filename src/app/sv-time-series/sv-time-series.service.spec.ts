import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SvTimeSeriesService } from './sv-time-series.service';
import { TimeSerie } from '../time-serie';


describe('SvTimeSeriesService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvTimeSeriesService],
      imports: [
        HttpClientTestingModule
        ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([SvTimeSeriesService], (service: SvTimeSeriesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get timeseries given a category and some candidates', inject([SvTimeSeriesService], (service: SvTimeSeriesService) => {
	  const data: any = {
	  	'category':{
	  		'candidate1':{
	  			'dates': ['2018-01-01', '2018-01-02', '2018-01-03'],
	  			'values': ['0', '1', '2']
	  		},
	  		'candidate2':{
	  			'dates': ['2018-01-01', '2018-01-02', '2018-01-03'],
	  			'values': ['3', '4', '5']
	  		}
	  	}
	  }

	  const expectedTimeSeries: TimeSerie[] =[
	  	{
	  		'dates': ['2018-01-01', '2018-01-02', '2018-01-03'],
	  		'values': ['0', '1', '2']
	  	},
	  	{
	  		'dates': ['2018-01-01', '2018-01-02', '2018-01-03'],
	  		'values': ['3', '4', '5']
	  	}

	  ]
	 
	  service.getTimeSeries(['candidate1', 'candidate2'], 'category')
	  		.subscribe(candidates => expect(candidates).toEqual(expectedTimeSeries))

	  const req = httpTestingController.expectOne("assets/data/time-series.json");
	  expect(req.request.method).toEqual('GET');

	  req.flush(data)
  }));



});
