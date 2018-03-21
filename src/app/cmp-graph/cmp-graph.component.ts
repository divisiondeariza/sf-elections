import { Component, OnInit, OnChanges, Input, DoCheck } from '@angular/core';
import { SvLineChartSeriesService } from '../sv-line-chart-series/sv-line-chart-series.service';
import { LineChartSerie } from '../line-chart-serie';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import * as moment from 'moment';
declare let d3: any;



@Component({
  selector: 'app-cmp-graph',
  templateUrl: './cmp-graph.component.html',
  styleUrls: ['./cmp-graph.component.scss']
})
export class CmpGraphComponent implements OnInit {

  @Input() candidatesIds: String[];
  @Input() category: String;
  public data: LineChartSerie[];
  public options: any;
  constructor(private lineChartSeriesService: SvLineChartSeriesService) { }

  ngOnInit() {
    moment.locale("es");

  	this.lineChartSeriesService.getLineChartSeries(this.candidatesIds, this.category)
  		.subscribe(data => this.data =  data);

    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'fecha',
          tickFormat: d => moment(d).format("D [de] MMMM [de] YYYY"),
        },
        yAxis: {
          tickFormat: d => d3.format('.02f')(d),
        }
      }
    }
  }

  ngDoCheck(){
    this.lineChartSeriesService.getLineChartSeries(this.candidatesIds, this.category)
      .subscribe(data => this.data =  data);
  }

}
