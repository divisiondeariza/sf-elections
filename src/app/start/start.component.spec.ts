import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Output, EventEmitter, DebugElement } from '@angular/core';
import { StartComponent } from './start.component';
import { By } from '@angular/platform-browser';

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

}

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartComponent, 
                      CmpCandidatesStubComponent, 
                      CmpCategoryChooseStubComponent, 
                      CmpCreditsComponent ],
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
      const updatedCandidates:any =  [{ id: 'one', name: 'Candidate One' }]
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

});
