import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  areCandidatesChoosen: Boolean = false;
  candidates: String[] = [];

  constructor() { }

  ngOnInit() {
  }

  chooseCandidates(){
  	this.areCandidatesChoosen = true;
  }
}
