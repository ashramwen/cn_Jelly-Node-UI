import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})
export class JNTimeNodeInfoPanelModel extends JNInfoPanelModel {
   generateComplexDataComponent() {
    return this.constructor;
  }
}