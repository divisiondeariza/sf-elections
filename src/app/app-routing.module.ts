import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { VizComponent } from './viz/viz.component';



const routes: Routes = [
	{ path: '', redirectTo: '/start', pathMatch: 'full' },
	{ path: 'start', component: StartComponent },
	{ path: 'viz/:category', component: VizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
