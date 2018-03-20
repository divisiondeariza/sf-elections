import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { CmpCandidatesComponent } from './cmp-candidates/cmp-candidates.component';

import { SvCandidatesService } from './sv-candidates/sv-candidates.service';
import { SvVizCategoriesService } from './sv-viz-categories/sv-viz-categories.service';
import { SvTimeSeriesService } from './sv-time-series/sv-time-series.service';
import { SvLineChartSeriesService } from './sv-line-chart-series/sv-line-chart-series.service';

import { HttpClientModule }    from '@angular/common/http';
import { NvD3Module } from 'ng2-nvd3';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CmpCreditsComponent } from './cmp-credits/cmp-credits.component';
import { CmpCategoryChooseComponent } from './cmp-category-choose/cmp-category-choose.component';
import { VizComponent } from './viz/viz.component';


// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
import 'moment'

import { CmpGraphComponent } from './cmp-graph/cmp-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CmpCandidatesComponent,
    CmpCreditsComponent,
    CmpCategoryChooseComponent,
    VizComponent,
    CmpGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NvD3Module,
    AlertModule.forRoot()
  ],
  providers: [SvCandidatesService,
              SvVizCategoriesService,
              SvTimeSeriesService,
              SvLineChartSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
