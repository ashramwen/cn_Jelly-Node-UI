import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="info-panel-wrapper">
      <table>
      <thead>
        <tr>
          <th colspan="2"><caption>Device</caption></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let location of inputs.locations">
          <td class="info">{{location}}</td>
        </tr>
      </tbody>
    </table>
        <table>
      <thead>
        <tr>
          <th colspan="2"><caption>Thing</caption></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let thing of inputs.things">
          <td class="info">{{thing}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styleUrls: ['../info-panel-wrapper.component.scss']
})
export class JNDeviceTypeNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor;
  }

  generateIntro() {

    return `
# Title
Some __test__
`;
  }
}