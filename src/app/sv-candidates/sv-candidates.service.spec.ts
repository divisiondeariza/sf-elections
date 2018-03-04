import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SvCandidatesService } from './sv-candidates.service';
import { Candidate } from '../candidate';

describe('SvCandidatesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvCandidatesService],
      imports: [
        HttpClientTestingModule
        ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should be created', inject([SvCandidatesService], 
  	(service: SvCandidatesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected candidates (http called once)', inject([SvCandidatesService], 
  	(service: SvCandidatesService)  =>{
	  const expectedCandidates: Candidate[] =
	    [{ id: 'one', name: 'Candidate One' }, { id: 'two', name: 'Candidate Two' }];
	  service.getCandidates()
	  		.subscribe(candidates => expect(candidates).toEqual(expectedCandidates))

	  const req = httpTestingController.expectOne("someurl");
	  expect(req.request.method).toEqual('GET');

	  req.flush(expectedCandidates)


  }))
});
