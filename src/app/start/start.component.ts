import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  areCandidatesChoosen: Boolean = false;
  candidates: String[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  chooseCandidates(){
  	this.areCandidatesChoosen = true;
  }

  openViz(category:String){
    let url = `/viz`;
    this.router.navigate(['/viz', category], { queryParams: { candidates: this.candidates } });
  }
}
