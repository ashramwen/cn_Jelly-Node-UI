import { JNBaseNode } from '../../../core/models/jn-base-node.type';

export abstract class JNInfoPanelModel {
  node: JNBaseNode;

  get info():Object {
    return this.getInfo();
  }

  get data():Object {
    return this.getData();
  }

  constructor(node) {
    this.node = node;
  }

  protected getInfo() {
    let info = {
      'nodeID': this.node.body.nodeID,
      'nodeName': this.node.body.nodeName,
    }
    return info;
  }

  protected getData() {
    let data = this.node.body;
    delete data['accepts'];
    delete data['position'];
    delete data['nodeID'];
    delete data['nodeName'];
    return data;
  }
}
