import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

export class JNDeviceTypeNodeInfoPanelModel extends JNInfoPanelModel {

  protected createComplexDataHTML(complexData) {
    let errorHTML = '<table>'
    complexData.errors.forEach((error) => {
      errorHTML = errorHTML + '<tr><td>' + error.message + '</td></tr>';
    })
    errorHTML = errorHTML + '</table>';
    let complexDataHTML = errorHTML;
    return complexDataHTML;
  }

  protected createComplexDataScss() {
    // let complexDataScss = ' th, td { border: 1px solid #999; }';
    return '';
  }
}