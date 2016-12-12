import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <h3>位置</h3>
    <ul>
      <li *ngFor="let location of inputs.locations">{{location}}</li>
    </ul>
    <h3>设备</h3>
    <ul>
      <li *ngFor="let thing of inputs.things">{{thing}}</li>
    </ul>
  `
})
export class JNDeviceTypeNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor;
  }
}