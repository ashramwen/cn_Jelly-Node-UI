import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

import { Component, OnInit } from '@angular/core';

@Component({
  template: `
     <div class="info-panel-wrapper">
      <table *ngFor="let property of inputs.properties; let i=index">
        <thead>
          <tr>
            <th colspan="2"><caption>Property</caption></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let field of property | keys">
            <td>{{field.key}}</td>
            <td>{{field.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../info-panel-wrapper.component.scss']
})
export class JNActionNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor; 
  }
}