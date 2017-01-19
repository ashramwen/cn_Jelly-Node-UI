import { Component, OnInit } from '@angular/core';
import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

@Component({
  template: ''
})
export class ChartContainerNodeInfoPanelModel extends JNInfoPanelModel {
   generateComplexDataComponent() {
    return this.constructor;
  }
}