import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Node }                from './node';
import { NodeService }         from './node.service';
@Component({
  selector: 'my-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: [ './nodes.component.css' ]
})
export class NodesComponent implements OnInit {
  nodes: Node[];
  selectedNode: Node;
  constructor(
    private nodeService: NodeService,
    private router: Router) { }
  getNodes(): void {
    this.nodeService
        .getNodes()
        .then(nodes => this.nodes = nodes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.nodeService.create(name)
      .then(node => {
        this.nodes.push(node);
        this.selectedNode = null;
      });
  }
  delete(node: Node): void {
    this.nodeService
        .delete(node.chipID)
        .then(() => {
          this.nodes = this.nodes.filter(h => h !== node);
          if (this.selectedNode === node) { this.selectedNode = null; }
        });
  }
  ngOnInit(): void {
    this.getNodes();
  }
  onSelect(node: Node): void {
    this.selectedNode = node;
  }
  gotoDetail(): void {
    console.log(this.selectedNode.chipID);
    this.router.navigate(['/detail', this.selectedNode.chipID]);
  }
}
