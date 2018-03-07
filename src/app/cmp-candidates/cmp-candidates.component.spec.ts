import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CmpCandidatesComponent } from './cmp-candidates.component';
import { SvCandidatesService } from '../sv-candidates/sv-candidates.service';
import { Candidate } from '../candidate';

import { of } from 'rxjs/observable/of';


describe('CmpCandidatesComponent', () => {
  let component: CmpCandidatesComponent;
  let fixture: ComponentFixture<CmpCandidatesComponent>;
  let candidates: Candidate[];
  let selectedCandidates: String[];
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
    selectedCandidates = ['one'];
    component.selected = selectedCandidates;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get candidates and display them', () =>{
      const candidatesInDom = fixture.nativeElement.querySelectorAll(".candidate");
      expect(candidatesInDom.length).toEqual(2);
      expect(getCandidatesSpy.calls.any()).toBe(true, 'getCandidates called');
  });

  it('should append class selected to the selected candidates', () =>{
    const selectedInDom = fixture.nativeElement.querySelectorAll(".selected .candidate-name");
    expect(selectedInDom.length).toEqual(1);
  });

  it('should append to selected candidate when is clicked', () =>{
    const lastCandidate = fixture.debugElement.query(By.css('.candidate:last-of-type')).nativeElement;
    lastCandidate.click();
    expect(selectedCandidates).toContain('two')

  });

  it('should remove id from selected when already selected element clicked', () =>{
    const firstCandidate = fixture.debugElement.query(By.css('.candidate:first-of-type')).nativeElement;
    firstCandidate.click()
    expect(selectedCandidates).not.toContain('one')
  });

  it('should not select more candidates than allowed by limit', () =>{
    component.limit = 1;
    const lastCandidate = fixture.debugElement.query(By.css('.candidate:last-of-type')).nativeElement;
    lastCandidate.click();
    expect(selectedCandidates.length).toEqual(1)

  });

  it('should emit selectedChange event', () =>{
    let outputSelected: String[];
    component.selectedChange.subscribe((value) => outputSelected = value);
    const lastCandidate = fixture.debugElement.query(By.css('.candidate:last-of-type')).nativeElement;
    lastCandidate.click();
    expect(outputSelected).toContain('two')
  });

});
