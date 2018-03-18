import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SvCandidatesService } from '../sv-candidates/sv-candidates.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Candidate } from '../candidate';

import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';


@Component({
  selector: 'app-cmp-candidates',
  templateUrl: './cmp-candidates.component.html',
  styleUrls: ['./cmp-candidates.component.scss']
})
export class CmpCandidatesComponent implements OnInit {
  @Input() selected: String[];
  @Input() limit: Number;
  @Input() isPrincipal:Boolean = true;
  @Output() selectedChange = new EventEmitter<String[]>();
  candidates: Candidate[];
  alerts:any[] = []

  constructor(private candidatesService: SvCandidatesService ) { }

  ngOnInit(): void {
  	this.getCandidates();
  }

  getCandidates(){
  	this.candidatesService.getCandidates().subscribe(
  		candidates => this.candidates = candidates
      )
  }

  clickCandidate(id:String){
    const index = this.selected.indexOf(id);
    if(index == -1){
      this.setCandidateIfNoLimitReached(id);
    }
    else
      this.selected.splice(index, 1)
    this.selectedChange.emit(this.selected);   

  }

  setCandidateIfNoLimitReached(id:String){
    if(this.limit == undefined || this.selected.length < this.limit){
        this.selected.push(id)
    }else if(this.alerts.length == 0){
      this.alerts.push({
      type: 'warning',
      msg: `Alerta, solo puede seleccionar hasta ${this.limit} candidatos.`,
      timeout: 5000
    })
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }



}
