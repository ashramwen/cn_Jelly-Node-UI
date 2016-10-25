import { JNNodeError } from './exceptions';
import { INodePosition, IJNNodeModel } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';
import { JsonProperty, MapUtils, Serializable } from '../../../bin/JsonMapper';

@Serializable()
export abstract class JNNodeModel implements IJNNodeModel {

  static deserialize: (obj: any) => IJNNodeModel;

  public $error: JNNodeError;
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

  constructor() {
    this.nodeID = null;
    this.nodeName = null;
    this.position = null;
    this.accepted = [];
  }
}
