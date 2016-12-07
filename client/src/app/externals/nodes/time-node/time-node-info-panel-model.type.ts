import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  template: 'feature.component.html'
})
export class JNTimeNodeInfoPanelModel extends JNInfoPanelModel {
   generateComplexDataComponent() {
    return this.constructor;
  }
}