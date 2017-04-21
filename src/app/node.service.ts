import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Node } from './node';
@Injectable()
export class NodeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  //private nodesUrl = 'api/nodes';  // URL to web api
  private nodesUrl = 'http://peepli:30000/api/nodes';
  constructor(private http: Http) { }
  
  getNodes(): Promise<Node[]> {     
    return this.http.get(this.nodesUrl)
               .toPromise()
               .then(response => response.json() as Node[])
               .catch(this.handleError);
  }
  getNode(chipID: string): Promise<Node> {
    const url = `${this.nodesUrl}/${chipID}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Node)
      .catch(this.handleError);
  }
  delete(chipID: string): Promise<void> {
    const url = `${this.nodesUrl}/${chipID}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(name: string): Promise<Node> {
    return this.http
      .post(this.nodesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Node)
      .catch(this.handleError);
  }
  update(node: Node): Promise<Node> {
    const url = `${this.nodesUrl}/${node.chipID}`;
    return this.http
      .put(url, JSON.stringify(node), {headers: this.headers})
      .toPromise()
      .then(() => node)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
