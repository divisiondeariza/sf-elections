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


  constructor(private route: ActivatedRoute,
              private lineChartSeries: SvLineChartSeriesService){}

  ngOnInit(){


    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (ms)',
          tickFormat: function(d){
            return d3.time.format('%Y-%m')(new Date(d));
          },
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };


    this.route.queryParams
        .subscribe((queryParams: Params) =>{
          console.log(queryParams['candidates'])
          this.route.paramMap.subscribe(pmap => {
            console.log(pmap.get('category'))
            this.lineChartSeries.getLineChartSeries(queryParams['candidates'], pmap.get('category'))
                .subscribe(data => this.data = data)

          });
        })

    
  }

 //  options;
 //  data;
 //  chartType;
 // ngOnInit(){
    

  
 //    this.data = this.sinAndCos();
 //  }
  
  
 //  sinAndCos() {
 //    var sin = [],sin2 = [],
 //      cos = [];
  
 //    //Data is represented as an array of {x,y} pairs.
 //    for (var i = 0; i < 100; i++) {
 //      sin.push({x: i, y: Math.sin(i/10)});
 //      sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
 //      cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
 //    }
  
 //    //Line chart data should be sent as an array of series objects.
 //    return [
 //      {
 //        values: sin,      //values - represents the array of {x,y} data points
 //        key: 'Sine Wave', //key  - the name of the series.
 //        color: '#ff7f0e'  //color - optional: choose your own line color.
 //      },
 //      {
 //        values: cos,
 //        key: 'Cosine Wave',
 //        color: '#2ca02c'
 //      },
 //      {
 //        values: sin2,
 //        key: 'Another sine wave',
 //        color: '#7777ff',
 //        area: true      //area - set to true if you want this line to turn into a filled area chart.
 //      }
 //    ];
 //  }

}
