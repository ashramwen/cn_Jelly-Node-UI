import { JNInfoPanelModel } from '../../../views/info-panel/interfaces';

import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})

export class JNRuleNodeInfoPanelModel extends JNInfoPanelModel {
 generateComplexDataComponent() {
    return this.constructor;
  }
}
