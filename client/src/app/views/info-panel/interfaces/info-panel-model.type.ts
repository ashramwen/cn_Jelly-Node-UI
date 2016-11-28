import { JNBaseNode } from '../../../core/models/jn-base-node.type';

export abstract class JNInfoPanelModel {
  info: Object;
  data: Object;
  description: String;

  protected getInfo(node) {
    this.info = {
      'nodeID': node.body.nodeID,
      'nodeName': node.body.nodeName,
    }
  }

  protected getData(node) {
    this.data = node.body;
    delete this.data['accepts'];
    delete this.data['position'];
    delete this.data['nodeID'];
    delete this.data['nodeName'];
  }
}
