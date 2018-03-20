import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Output, Component } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { VizComponent } from './viz.component';
import { By } from '@angular/platform-browser';


@Component({selector: 'app-cmp-graph', template: ''})
class CmpGraphComponent{
  @Input() candidatesIds:String[];
  @Input() category:String;
}

@Component({selector: 'app-cmp-candidates', template: ''})
class CmpCandidatesStubComponent {
  @Input() selected: String[];
  @Input() limit: Number;
  @Input() isPrincipal: Boolean;
  @Output() selectedChange = new EventEmitter<String[]>();
}

class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subjectParam = new ReplaySubject<ParamMap>();
  private subjectQuery = new ReplaySubject<Any>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subjectParam.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subjectParam.next(convertToParamMap(params));
  };

  /** The mock paramMap observable */
  readonly queryParams = this.subjectQuery.asObservable();

  /** Set the paramMap observables's next value */
  setQueryParams(queryParams?: any) {
    this.subjectQuery.next(queryParams);
  };

}


describe('VizComponent', () => {
  let component: VizComponent;
  let fixture: ComponentFixture<VizComponent>;
  let activatedRoute: ActivatedRouteStub;
  let cmpGraphComponent: DebugElement;


  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ category: 'some-category' });
    activatedRoute.setQueryParams({ 'candidates': ['c1', 'c2', 'c3', 'c4'] })
    TestBed.configureTestingModule({
      declarations: [ VizComponent, CmpGraphComponent, CmpCandidatesStubComponent ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get candidates and category from route and set them to graph component', ()=>{
    cmpGraphComponent = fixture.debugElement.query(By.css('app-cmp-graph'));
    expect(cmpGraphComponent.componentInstance.candidatesIds).toEqual(['c1', 'c2', 'c3', 'c4']);
    expect(cmpGraphComponent.componentInstance.category).toEqual('some-category');
  });

});
