import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  template: '<div>api</div>'
})

export class JNApiNodeInfoPanelModel extends JNInfoPanelModel {
   generateComplexDataComponent() {
    return this.constructor;
  }
}