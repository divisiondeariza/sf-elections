import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SvCandidatesService } from '../sv-candidates/sv-candidates.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Candidate } from '../candidate';


@Component({
  selector: 'app-cmp-candidates',
  templateUrl: './cmp-candidates.component.html',
  styleUrls: ['./cmp-candidates.component.scss']
})
export class CmpCandidatesComponent implements OnInit {
  candidates: Observable<Candidate[]>

  constructor(private candidatesService: SvCandidatesService ) { }

  ngOnInit(): void {
  	this.getCandidates();
  }

  getCandidates(){
  	this.candidates = this.candidatesService.getCandidates().pipe(
  		// catchError( (err: any) => {console.log(err.msg); return of("")}),
  	)
  }

}
