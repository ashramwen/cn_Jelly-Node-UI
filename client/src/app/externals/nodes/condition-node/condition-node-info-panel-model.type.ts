import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="info-panel-wrapper">
      <table *ngFor="let condition of inputs.conditions; let i=index">
        <thead>
          <tr>
            <th colspan="2"><caption>Condition{{i+1}}</caption></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let field of condition | keys">
            <td>{{field.key}}</td>
            <td>{{field.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: [ '../info-panel-wrapper.component.scss']
})

export class JNConditionNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor;
  }
}