import { JNInfoPanelModel } from '../../../views/info-panel/interfaces/info-panel-model.type';
import { Component, Input } from '@angular/core';

@Component({
  
  template: `
    <h3>位置</h3>
    <ul>
      <li *ngFor="let location of inputs.locations">{{location}}</li>
    </ul>
    <h3>设备</h3>
    <ul>
      <li *ngFor="let thing of inputs.things">{{thing}}</li>
    </ul>
  `

})
export class JNDeviceTypeNodeInfoPanelModel extends JNInfoPanelModel {
  generateComplexDataComponent() {
    return this.constructor;
  }


  // protected createComplexDataHTML(complexData) {
  //   let errorHTML = '<table>'
  //   complexData.errors.forEach((error) => {
  //     errorHTML = errorHTML + '<tr><td>'
  //       + error.message +
  //       '</td>' +
  //       '</tr>';
  //   })
  //   errorHTML = errorHTML + '</table>';
  //   let complexDataHTML = errorHTML;
  //   return complexDataHTML;
  // }

  // protected createComplexDataCss() {
  //   let tr = ' \
  //   tr, td { border: 1px solid #999;\
  //   padding: 0.5rem;\
  //   text-align: left;\
  //   font-size: 13px; } ';

  //   let td = 'table{  border-collapse: collapse;\
  //   margin: 10px auto;\
  //   width: 100%;}';

  //   return tr + td;
  // }
}