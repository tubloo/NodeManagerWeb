import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Node }           from './node';
@Injectable()
export class NodeSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Node[]> {
    return this.http
               .get(`app/nodes/?name=${term}`)
               .map(response => response.json().data as Node[]);
  }
}
