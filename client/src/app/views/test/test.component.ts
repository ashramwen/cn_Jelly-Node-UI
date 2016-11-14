import { Component, OnInit } from '@angular/core';
import { JNFlow } from '../../core/models/jn-flow.type';
import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { Events } from '../../core/services/event.service';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { RuleApplication } from '../../externals/rule-application-core';

@Component({
  selector: 'test',
  template: `
    <div *ngFor="let node of flow.nodes">
      <div class="node" (click)="selectNode(node)">{{node.name | translate}}</div>
    </div>

    <div class="editor-modal" [hidden]="!editorShown">
      <div class="editor-modal-content" (click)="$event.stopPropagation()">
        <jn-node-editor [targetNode]="selectedNode"></jn-node-editor>
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
      
      let schemas = RuleApplication.instance.resources.$schema.schemas;
      console.log('schemas', schemas);
    });

  }

  private selectNode(node: JNBaseNode) {
    this.selectedNode = node;
    this.editorShown = true;
  }

  private hideEditor() {
    this.editorShown = false;
  }
}