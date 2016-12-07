import { JNInfoPanelModel } from '../../../views/info-panel/interfaces';

import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  template: 'feature.component.html'
})
export class JNLocationNodeInfoPanelModel extends JNInfoPanelModel {
 generateComplexDataComponent() {
    return this.constructor;
  }
}
