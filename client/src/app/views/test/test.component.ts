import { Component, OnInit } from '@angular/core';
import { JNFlow } from '../../core/models/jn-flow.type';
import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { Events } from '../../core/services/event.service';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { RuleApplication } from '../../externals/rule-application-core';
import { JNDevicePropertyNode } from '../../externals/nodes/device-property-node/device-property-node.type';
import { JNDevicePropertyPaletteModel } from '../../externals/nodes/device-property-node/device-property-node-palette-model.type';
import { JNDeviceTypePaletteModel } from '../../externals/nodes/device-type-node/device-type-node-palette-model.type';
import { JNDeviceTypeNode } from '../../externals/nodes/device-type-node/device-type-node.type';
import { JNLocationPaletteModel } from '../../externals/nodes/location-node/location-node-palette-model.type';
import { JNRulePaletteModel } from '../../externals/nodes/rule-node/rule-node-palette-model.type';

@Component({
  selector: 'test',
  template: `
    <div *ngFor="let node of flow.nodes">
      <div class="node" [title]="node.body.$errors | json" [class.error]="hasError(node)" (click)="selectNode(node)">{{node.name | translate}}</div>
    </div>

    <div class="editor-modal" [hidden]="!editorShown">
      <div class="editor-modal-content" (click)="$event.stopPropagation()">
        <jn-node-editor [targetNode]="selectedNode" (submitted)="hideEditor()"></jn-node-editor>
      </div>
      <div class="editor-model-backdrop" (click)="hideEditor()"></div>
    </div>
  `,
  styles: [require('./test.component.scss')]
})
export class TestComponent implements OnInit {
  private flow: JNFlow = new JNFlow();
  private selectedNode: JNBaseNode = null;
  private editorShown: boolean = false;

  constructor(private application: JNApplication, private events: Events) { }

  ngOnInit() {
    this.events.on(APP_READY, () => {
      let data = require('../../../assets/example.json');
      this.flow.loadData(data);
      console.log(this.flow.nodes);
      let deviceTypeNode = new JNDeviceTypePaletteModel();


      console.log(deviceTypeNode);
    });

  }

  private selectNode(node: JNBaseNode) {
    this.selectedNode = node;
    this.editorShown = true;
    console.log(node.body);
  }

  private hideEditor() {
    this.editorShown = false;
  }

  private hasError(node: JNBaseNode) {
    return node.body.$errors && node.body.$errors.length;
  }
}
