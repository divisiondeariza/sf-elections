import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Output, Component } from '@angular/core';
import { CmpGraphComponent } from './cmp-graph.component';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';
import { LineChartSerie } from '../line-chart-serie';
import { SvLineChartSeriesService } from '../sv-line-chart-series/sv-line-chart-series.service';

@Component({selector: 'nvd3', template: ''})
class Nvd3StubComponent{
  @Input() data:LineChartSerie;
  @Input() options:any
}



describe('CmpGraphComponent', () => {
  let component: CmpGraphComponent;
  let fixture: ComponentFixture<CmpGraphComponent>;
  let lineChartSeries: LineChartSerie[];
  let getLineChartSeriesSpy: jasmine.Spy;

  beforeEach(async(() => {
    lineChartSeries = [
      {'values': [ 
        {'y': 0, 'x': new Date('2018-01-01')},],
       'key': 'Candidate One'},
    ]
    const lineChartSeriesService = jasmine.createSpyObj('SvLineChartSeriesService', ['getLineChartSeries']);
    getLineChartSeriesSpy = lineChartSeriesService.getLineChartSeries.and.returnValue(of(lineChartSeries));

    TestBed.configureTestingModule({
      declarations: [ CmpGraphComponent,
                      Nvd3StubComponent ],
      providers: [{provide: SvLineChartSeriesService, useValue: lineChartSeriesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpGraphComponent);
    component = fixture.componentInstance;
    component.candidatesIds = ['candidate-one']
    component.category = "some-category"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get LineChartSeries and pass the data to the nvd3 component', () =>{
    expect(getLineChartSeriesSpy).toHaveBeenCalledWith(component.candidatesIds, component.category);
    expect(getLineChartSeriesSpy).toHaveBeenCalledTimes(1);
    const nvd3El = fixture.debugElement.query(By.css('nvd3'));
    expect(nvd3El.componentInstance.data).toEqual(lineChartSeries)

  })
});
