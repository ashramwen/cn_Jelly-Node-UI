import { Component, OnInit } from '@angular/core';
import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

@Component({
  template: ''
})
export class YAxisNodeInfoPanelModel extends JNInfoPanelModel {
   generateComplexDataComponent() {
    return this.constructor;
  }
}