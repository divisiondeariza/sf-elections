import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';

import { CmpCandidatesComponent } from '../cmp-candidates/cmp-candidates.component';

import { Component } from '@angular/core';

@Component({selector: 'app-cmp-candidates', template: ''})
class CmpCandidatesStubComponent {}

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartComponent, CmpCandidatesStubComponent ]
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
});
