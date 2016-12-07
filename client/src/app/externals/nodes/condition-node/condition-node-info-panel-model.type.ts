import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'selector',
  template: '<div>condition</div>'
})

export class JNConditionNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor;
  }
}