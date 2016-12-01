import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';

export abstract class JNInfoPanelModel {
  node: JNBaseNode;
  complexData: Array<Object>;

  get info(): Object {
    return this.getInfo();
  }

  get data(): Object {
    return this.getData();
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
    }
    return info;
  }

  protected getData() {
    let data: Object = JNUtils.clone(this.node.body);

    Object.keys(data).forEach((key) => {
      if (data[key].constructor !== String) {
        this.complexData.push({
          key: data[key]
        });
        delete data[key];
      }
    })

    delete data['$errors'];
    delete data['$valid'];
    delete data['accepts'];
    delete data['position'];
    delete data['nodeID'];
    delete data['nodeName'];

    return data;
  }


}
