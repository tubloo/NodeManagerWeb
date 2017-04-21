import { Component, OnInit } from '@angular/core';

import { Node } from './node';
import { NodeService } from './node.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  nodes: Node[] = [];

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.nodeService.getNodes()
      .then(nodes => this.nodes = nodes.slice(1, 5));
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/