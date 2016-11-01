import { ApplicationContextService } from './../../core/services/application-context.service';
import { ConfigContextService } from './../../core/services/config-context.service';
import { CacheContextService } from './../../core/services/cache-context.service';
import { JNDeviceNode } from './../../externals/nodes/device-node/device-node.type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jn-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {
  constructor(private applicationContext: ApplicationContextService,
    private configContext: ConfigContextService,
    private cacheContext: CacheContextService) { }

  nodes: JNDeviceNode[]
  heroes: number[]

  ngOnInit() {
    let node = new JNDeviceNode(this.applicationContext, this.configContext, this.cacheContext);
    // node.position = { x: 10, y: 20 };
    this.nodes = [];
    this.nodes.push(node);
    this.nodes.push(Object.assign({}, node));

    this.heroes = [1, 2, 3];
  }
}