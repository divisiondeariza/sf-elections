import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Output, EventEmitter, DebugElement } from '@angular/core';
import { StartComponent } from './start.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CmpCandidatesComponent } from '../cmp-candidates/cmp-candidates.component';
import { CmpCategoryChooseComponent } from '../cmp-category-choose/cmp-category-choose.component';
import { CmpCreditsComponent } from '../cmp-credits/cmp-credits.component';

import { Component } from '@angular/core';

import { Candidate } from '../candidate';


@Component({selector: 'app-cmp-candidates', template: ''})
class CmpCandidatesStubComponent {
  @Input() selected: String[];
  @Input() limit: Number;
  @Input() isPrincipal: Boolean;
  @Output() selectedChange = new EventEmitter<String[]>();
}

@Component({selector: 'app-cmp-category-choose', template: ''})
class CmpCategoryChooseStubComponent {
  @Output() chosenCategoryIdChange = new EventEmitter<String>();
}

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartComponent, 
                      CmpCandidatesStubComponent, 
                      CmpCategoryChooseStubComponent, 
                      CmpCreditsComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide start-btn after clicked', ()=>{
      const button = fixture.nativeElement.querySelectorAll(".start-btn")[0];
      button.click();
      fixture.detectChanges();   
      expect(fixture.nativeElement.querySelectorAll(".start-btn").length).toEqual(0);
  })

  describe('set candidates component correctly', () => {
    let candidatesEl: DebugElement;

    beforeEach(() =>{
      candidatesEl = fixture.debugElement.query(By.css('app-cmp-candidates'));
    });

    it("should set select input correctly", () =>{
      expect(candidatesEl.componentInstance.selected).toBe(component.candidates)
    });

    it("should set limit input correctly", () =>{
      expect(candidatesEl.componentInstance.limit).toBe(4);
    });

    it("should update candidates array when candidates component updates", ()=>{
      const updatedCandidates:any =  [{ id: 'one', name: 'Candidate One' }] //WTF the any, should be candidate[]!
      candidatesEl.componentInstance.selectedChange.emit(updatedCandidates);
      expect(component.candidates).toEqual(updatedCandidates);
    });

    it("should set isPrincipal attribute as false when start-btn clicked", () =>{
      expect(candidatesEl.componentInstance.isPrincipal).toBeTruthy();
    });

    it("should set isPrincipal attribute as false when start-btn clicked", () =>{
      const button = fixture.nativeElement.querySelectorAll(".start-btn")[0];
      button.click();
      fixture.detectChanges();
      expect(candidatesEl.componentInstance.isPrincipal).toBeFalsy();
    });

  });

  describe('Choose Component', () =>{

    it('Should not show at startup', ()=>{
      expect(fixture.nativeElement.querySelectorAll("app-cmp-category-choose").length).toBe(0);
    });

    describe('after it appears', ()=>{
        let chooseVizEl: DebugElement;
        let candidatesEl: DebugElement;
        let router: Router;

        beforeEach(()=>{
          const button = fixture.nativeElement.querySelectorAll(".start-btn")[0];
          button.click();
          fixture.detectChanges(); 
          chooseVizEl = fixture.debugElement.query(By.css('app-cmp-category-choose'));
          candidatesEl = fixture.debugElement.query(By.css('app-cmp-candidates'));
          router = fixture.debugElement.injector.get(Router);

        });

        it("Should show when start-btn clicked", () =>{
          expect(fixture.nativeElement.querySelectorAll("app-cmp-category-choose").length).toBe(1); 
        });

        it('Should redirect to viz when category id is emited', () =>{
          const spy = router.navigate as jasmine.Spy; 
          const updatedCandidates:any =  [{ id: 'one', name: 'Candidate One' }] //WTF the any, should be candidate[]!
          candidatesEl.componentInstance.selectedChange.emit(updatedCandidates);
          chooseVizEl.componentInstance.chosenCategoryIdChange.emit('some-category');
          const navArgs = spy.calls.first().args[0];
          expect(navArgs).toEqual(['/viz', 'some-category'], { queryParams: { candidates: component.candidates } })
        })
    })
  })
});

