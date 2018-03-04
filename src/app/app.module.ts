import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { CmpCandidatesComponent } from './cmp-candidates/cmp-candidates.component';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CmpCandidatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
