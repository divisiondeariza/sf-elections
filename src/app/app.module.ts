import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { CmpCandidatesComponent } from './cmp-candidates/cmp-candidates.component';

import { SvCandidatesService } from './sv-candidates/sv-candidates.service';

import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CmpCandidatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SvCandidatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }