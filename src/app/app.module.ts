import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { CmpCandidatesComponent } from './cmp-candidates/cmp-candidates.component';

import { SvCandidatesService } from './sv-candidates/sv-candidates.service';
import { SvVizCategoriesService } from './sv-viz-categories/sv-viz-categories.service';


import { HttpClientModule }    from '@angular/common/http';

import { AlertModule } from 'ngx-bootstrap/alert';
import { CmpCreditsComponent } from './cmp-credits/cmp-credits.component';
import { CmpCategoryChooseComponent } from './cmp-category-choose/cmp-category-choose.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CmpCandidatesComponent,
    CmpCreditsComponent,
    CmpCategoryChooseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    AlertModule.forRoot()
  ],
  providers: [SvCandidatesService,
              SvVizCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
