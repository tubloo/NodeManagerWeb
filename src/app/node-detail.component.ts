import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Node }        from './node';
import { NodeService } from './node.service';
@Component({
  selector: 'node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: [ './node-detail.component.css' ]
})
export class NodeDetailComponent implements OnInit {
  node: Node;
  constructor(
    private nodeService: NodeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.nodeService.getNode(params['chipID']))
      .subscribe(node => this.node = node);
  }
  save(): void {
    this.nodeService.update(this.node)
      .then(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
