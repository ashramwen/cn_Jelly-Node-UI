import { JNLocationNode } from './../../externals/nodes/location-node/location-node.type';
import { D3HelperService } from './../../externals/services/d3-helper/d3-helper.service';
import { JNFlow } from './../../core/models/jn-flow.type';
import { Directive, OnInit, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'jn-canvas',
  template: '<svg></svg>',
  styleUrls: ['./node-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NodeCanvasComponent implements OnInit {

  nodeFlow = new JNFlow();

  constructor(private d3Helper: D3HelperService) {
  }

  ngOnInit() {
    // this.start();
    // setTimeout(this.start.bind(this), 0);

  }
}
