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

declare let d3: any;


describe('CmpGraphComponent', () => {
  let component: CmpGraphComponent;
  let fixture: ComponentFixture<CmpGraphComponent>;
  let lineChartSeries: LineChartSerie[];
  let getLineChartSeriesSpy: jasmine.Spy;
  let filterSpy: jasmine.Spy;
  let lineChartSeriesService: any;

  beforeEach(async(() => {
    lineChartSeries = [
      {'values': [ ],
       'key': 'Candidate One',
       'color': '#444',
       'candidateId': 'candidate1'},
      {'values': [ ],
       'key': 'Candidate Two',
       'color': '#888',
       'candidateId': 'candidate2'},
      {'values': [ ],
       'key': 'Candidate Three',
       'color': '#fff',
       'candidateId': 'candidate3'},

    ]
    lineChartSeriesService = jasmine.createSpyObj('SvLineChartSeriesService', ['getLineChartSeries', 'filter']);
    getLineChartSeriesSpy = lineChartSeriesService.getLineChartSeries.and.returnValue(of(lineChartSeries));
    filterSpy = lineChartSeriesService.filter.and.returnValue(lineChartSeries.slice(0,2));

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
    component.candidatesIds = ['candidate1', 'candidate2']
    component.category = "some-category"
    fixture.detectChanges();
  });

  it('should get LineChartSeries and pass the data to the nvd3 component', () =>{
    expect(getLineChartSeriesSpy).toHaveBeenCalledWith(component.category);
    expect(getLineChartSeriesSpy).toHaveBeenCalledTimes(1);    
    expect(filterSpy).toHaveBeenCalledWith(lineChartSeries, component.candidatesIds);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    const nvd3El = fixture.debugElement.query(By.css('nvd3'));
    expect(nvd3El.componentInstance.data).toEqual(lineChartSeries.slice(0,2))

  });

  it('should refresh nvd3 when component.candidatesIds changes', () =>{
    filterSpy = lineChartSeriesService.filter.and.returnValue(lineChartSeries.slice(1,3));
    component.candidatesIds = ['candidate2', 'candidate3'];
    fixture.detectChanges();
    const nvd3El = fixture.debugElement.query(By.css('nvd3'));
    expect(nvd3El.componentInstance.data).toEqual(lineChartSeries.slice(1,3))

  });

  describe('test options set corectly', ()=>{

    let chart:any;
    beforeEach(()=>{
      chart = fixture.debugElement.query(By.css('nvd3')).componentInstance.options.chart
    });

    it('Should basic data', () =>{
      expect(chart.height).toEqual(450);
      expect(chart.type).toEqual('lineChart');
      expect(chart.useInteractiveGuideline).toBeTruthy();
      expect(chart.xAxis.axisLabel).toEqual("fecha");
    });

    it('Should set tickFormats correctly', ()=>{
      expect(d3.format('.02f')(Math.PI)).toEqual(chart.yAxis.tickFormat(Math.PI));
      expect("22 de noviembre de 1989").toEqual(chart.xAxis.tickFormat('1989-11-22'));

    })
  });
});
