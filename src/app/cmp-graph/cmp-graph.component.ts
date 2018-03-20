import { Component, OnInit, Input } from '@angular/core';
import { SvLineChartSeriesService } from '../sv-line-chart-series/sv-line-chart-series.service';
import { LineChartSerie } from '../line-chart-serie';


@Component({
  selector: 'app-cmp-graph',
  templateUrl: './cmp-graph.component.html',
  styleUrls: ['./cmp-graph.component.scss']
})
export class CmpGraphComponent implements OnInit {

  @Input() candidatesIds: String[];
  @Input() category: String;
  private data: LineChartSerie[];
  constructor(private lineChartSeriesService: SvLineChartSeriesService) { }

  ngOnInit() {
  	this.lineChartSeriesService.getLineChartSeries(this.candidatesIds, this.category)
  		.subscribe(data => this.data =  data);
  }

}
