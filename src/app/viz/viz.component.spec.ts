import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Output, Component } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { LineChartSerie } from '../line-chart-serie';
import { VizComponent } from './viz.component';

@Component({selector: 'nvd3', template: ''})
class Nvd3StubComponent{
  @Input() data:LineChartSerie;
  @Input() options:any
}


class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  };
}

describe('VizComponent', () => {
  let component: VizComponent;
  let fixture: ComponentFixture<VizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizComponent,
                      Nvd3StubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
