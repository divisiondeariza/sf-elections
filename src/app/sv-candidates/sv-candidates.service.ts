import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Candidate } from '../candidate';


@Injectable()
export class SvCandidatesService {

  constructor(
    private http: HttpClient,
  ) { }

  getCandidates ():Observable<Candidate[]>{
  	return this.http.get<Candidate[]>("assets/data/candidates.json")
  }

}
