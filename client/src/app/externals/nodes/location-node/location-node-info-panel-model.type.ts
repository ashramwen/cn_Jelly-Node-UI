import { JNInfoPanelModel } from '../../../views/info-panel/interfaces';

import { Component, OnInit } from '@angular/core';

@Component({
  template: `   
  `
})
export class JNLocationNodeInfoPanelModel extends JNInfoPanelModel {
 generateComplexDataComponent() {

    return this.constructor;
  }
}
