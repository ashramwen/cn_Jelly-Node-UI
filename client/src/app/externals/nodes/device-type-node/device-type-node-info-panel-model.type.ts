import {
  JNInfoPanelModel
} from '../../../views/info-panel/interfaces';

export class JNDeviceTypeInfoPanelModel extends JNInfoPanelModel {
  static instance: JNDeviceTypeInfoPanelModel = new JNDeviceTypeInfoPanelModel();

  constructor(){
    super();
  }
}
