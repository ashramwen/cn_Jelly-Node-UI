import { INodePosition, IJNNodeModel } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';
import { JsonProperty, MapUtils, Serializable } from '../../../bin/JsonMapper';
import { JNException } from './exceptions/exception.type';

@Serializable()
export abstract class JNNodeModel implements IJNNodeModel {

  static deserialize: (obj: any) => IJNNodeModel;

  public $error: JNException;
  public $valid: boolean;

  public position: INodePosition;
  public nodeName: String;
  public nodeID: number;

  @JsonProperty({
    serialize: (arr: Array<JNBaseNode>) => {
      return [];
    },
    deserialize: (arr: Array<number>) => {
      return [];
    }
  })
  public accepted: Array<JNBaseNode>;

  public serialize: () => any;

  public extends(obj) {
    if (!obj) return;
    for (let key in this) {
      if (obj.hasOwnProperty(key))
        this[key] = obj[key];
    }
    return this;
  }

  constructor() {
    this.nodeID = null;
    this.nodeName = null;
    this.position = null;
    this.accepted = [];
  }
}
