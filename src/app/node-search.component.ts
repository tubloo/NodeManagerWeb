import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NodeSearchService } from './node-search.service';
import { Node } from './node';
@Component({
  selector: 'node-search',
  templateUrl: './node-search.component.html',
  styleUrls: [ './node-search.component.css' ],
  providers: [NodeSearchService]
})
export class NodeSearchComponent implements OnInit {
  nodes: Observable<Node[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private nodeSearchService: NodeSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.nodes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.nodeSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Node[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Node[]>([]);
      });
  }
  gotoDetail(node: Node): void {
    let link = ['/detail', node.chipID];
    this.router.navigate(link);
  }
}
