import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SvVizCategoriesService } from './sv-viz-categories.service';
import { VizCategory } from '../viz-category';


describe('SvVizCategoriesService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvVizCategoriesService],
      imports: [
        HttpClientTestingModule
        ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });


  it('should be created', inject([SvVizCategoriesService], (service: SvVizCategoriesService) => {
    expect(service).toBeTruthy();
  }));


  it('should return expected Viz categories (http called once)', inject([SvVizCategoriesService], 
  	(service: SvVizCategoriesService)  =>{
	  const expectedVizCategories: VizCategory[] =
	    [{ id: 'one', name: 'VizCategory One', children: [] }, { id: 'two', name: 'VizCategory Two', children: []}];
	  service.getVizCategories()
	  		.subscribe(candidates => expect(candidates).toEqual(expectedVizCategories))

	  const req = httpTestingController.expectOne("assets/data/viz-categories.json");
	  expect(req.request.method).toEqual('GET');

	  req.flush(expectedVizCategories)


  }))
});
