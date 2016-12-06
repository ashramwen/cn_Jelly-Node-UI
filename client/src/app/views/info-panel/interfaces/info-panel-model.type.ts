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

  get complexDataComponent(): Component {
    return this.generateComplexDataComponent();
  }

  constructor(node) {
    this.node = node;
  }

  public init() {
  }

  protected getInfo() {
    let info = {
      'nodeID': this.node.body.nodeID,
      'nodeName': this.node.body.nodeName,
      'type': this.node.body.type
    }
    return info;
  }

  protected getData() {
    this.complexData = {};
    let data: Object = JNUtils.clone(this.node.body);

    Object.keys(data).forEach((key) => {
      console.log(key);
      if (data[key] && data[key].constructor !== String) {
        this.complexData[key] = data[key];
        delete data[key];
      }
    })
    console.log(this.complexData);

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

  protected generateComplexDataComponent() {
    return ;
  }
}
