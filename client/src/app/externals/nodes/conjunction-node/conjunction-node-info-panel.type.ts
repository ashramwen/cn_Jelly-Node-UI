import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'selector',
  template: '<div>conjunction</div>'
})

export class JNConjunctionNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor;
  }
}