import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'selector',
  template: '<div>rubbish</div>'
})

export class JNDevicePropertyNodeInfoPanelModel extends JNInfoPanelModel {

  generateComplexDataComponent(){
    return this;
  }
}