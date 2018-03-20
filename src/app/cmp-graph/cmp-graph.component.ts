import { Component, OnInit, Input } from '@angular/core';
import { SvLineChartSeriesService } from '../sv-line-chart-series/sv-line-chart-series.service';
import { LineChartSerie } from '../line-chart-serie';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
declare let d3: any;


@Component({
  selector: 'app-cmp-graph',
  templateUrl: './cmp-graph.component.html',
  styleUrls: ['./cmp-graph.component.scss']
})
export class CmpGraphComponent implements OnInit {

  @Input() candidatesIds: String[];
  @Input() category: String;
  private data: LineChartSerie[];
  private options: any;
  constructor(private lineChartSeriesService: SvLineChartSeriesService) { }

  ngOnInit() {
  	this.lineChartSeriesService.getLineChartSeries(this.candidatesIds, this.category)
  		.subscribe(data => this.data =  data);

    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        useInteractiveGuideline: true,
        xAxis: {
          // axisLabel: 'Time (ms)',
          tickFormat: d => d3.time.format('%Y-%m')(new Date(d)),
        },
        yAxis: {
          // axisLabel: 'Voltage (v)',
          tickFormat: d => d3.format('.02f')(d),
        }
      }
    }
  }

}
