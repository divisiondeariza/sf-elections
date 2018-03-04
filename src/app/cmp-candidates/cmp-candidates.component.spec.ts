import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpCandidatesComponent } from './cmp-candidates.component';
import { SvCandidatesService } from '../sv-candidates/sv-candidates.service';
import { Candidate } from '../candidate';

import { of } from 'rxjs/observable/of';


describe('CmpCandidatesComponent', () => {
  let component: CmpCandidatesComponent;
  let fixture: ComponentFixture<CmpCandidatesComponent>;
  let candidates: Candidate[];
  let getCandidatesSpy: jasmine.Spy;

  beforeEach(async(() => {
    candidates = [{ id: 'one', name: 'Candidate One' }, { id: 'two', name: 'Candidate Two' }];
    const candidatesService = jasmine.createSpyObj('SvCandidatesService', ['getCandidates']);
    getCandidatesSpy = candidatesService.getCandidates.and.returnValue(of(candidates));
    
    TestBed.configureTestingModule({
      declarations: [ CmpCandidatesComponent ],
      providers: [{provide:  SvCandidatesService, useValue: candidatesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get candidates and display them', () =>{
      expect(getCandidatesSpy.calls.any()).toBe(true, 'getCandidates called');
  });
});
