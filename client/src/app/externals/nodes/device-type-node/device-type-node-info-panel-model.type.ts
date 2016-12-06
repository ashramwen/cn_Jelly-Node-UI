import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';

export class JNDeviceTypeNodeInfoPanelModel extends JNInfoPanelModel {

  protected createComplexDataHTML(complexData) {
    let errorHTML = '<table>'
    complexData.errors.forEach((error) => {
      errorHTML = errorHTML + '<tr><td>'
        + error.message +
        '</td>' +
        '</tr>';
    })
    errorHTML = errorHTML + '</table>';
    let complexDataHTML = errorHTML;
    return complexDataHTML;
  }

  protected createComplexDataCss() {
    let tr = ' \
    tr, td { border: 1px solid #999;\
    padding: 0.5rem;\
    text-align: left;\
    font-size: 13px; } ';

    let td = 'table{  border-collapse: collapse;\
    margin: 10px auto;\
    width: 100%;}';

    return tr+td;
  }
}