import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';

export abstract class JNInfoPanelModel {
  node: JNBaseNode;
  complexData: Object;

  get info(): Object {
    return this.getInfo();
  }

  get data(): Object {
    return this.getData();
  }

  get complexDataHTML(): String {
    return this.createComplexDataHTML(this.complexData);
  }

  get complexDataScss(): string {
    return this.createComplexDataCss();
  }

  get complexDataComponent() {
    return this.generateComplexDataComponent(this.complexData);
  }

  get intro() {
    return this.generateIntro();
  }

  constructor(node) {
    this.node = node;
  }

  protected getInfo() {
    if(!this.node){
      return ;
    }
    let info = {
      'nodeID': this.node.body.nodeID,
      'nodeName': this.node.body.nodeName,
      'type': this.node.body.type
    }
    return info;
  }

  protected getData() {
    if(!this.node){
      return ;
    }
    this.complexData = {};
    let data: Object = JNUtils.clone(this.node.body);

    Object.keys(data).forEach((key) => {
      if (data[key] && data[key].constructor !== String) {
        this.complexData[key] = data[key];
        delete data[key];
      }
    })

    delete data['type'];
    delete data['$errors']; 
    delete data['$valid'];
    delete data['accepts'];
    delete data['position'];
    delete data['nodeID'];
    delete data['nodeName'];

    return data;
  }

  protected createComplexDataHTML(complexData) {
    return '';
  }

  protected createComplexDataCss() {
    return '';
  }

  protected generateComplexDataComponent(complexData) {
    return ;
  }

  protected generateIntro() {
    return '';
  }
}
