import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { SvLineChartSeriesService } from '../sv-line-chart-series/sv-line-chart-series.service';
declare let d3: any;

@Component({
  selector: 'app-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.scss']
})
export class VizComponent implements OnInit {

  options;
  data;
  chartType;

  private candidatesIds: Strings[];
  private category: String;

  constructor(private route: ActivatedRoute){}

  ngOnInit(){

    this.route.queryParams.subscribe((queryParams: Params) =>{
      this.candidatesIds = queryParams['candidates'];
    })
    this.route.paramMap.subscribe(pmap => {
      this.category = pmap.get('category')
    });

    
  }

}
