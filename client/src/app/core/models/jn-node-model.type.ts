import { INodePosition } from './interfaces';
import { JNBaseNode } from './jn-base-node.type';
import { JsonProperty, MapUtils, Serializable } from '../../../bin/JsonMapper';
import { JNException } from './exceptions/exception.type';
import { INodeBody } from './interfaces/node-body.interface';

@Serializable()
export abstract class JNNodeModel<T extends INodeBody> implements INodeBody {

  static deserialize: <V extends INodeBody>(obj: any) => JNNodeModel<V>;

  public $error: JNException;
  public $valid: boolean;

  public accepts: number[];
  public type: string;
  public position: INodePosition;
  public nodeName: String;
  public nodeID: number;

  /*  
  @JsonProperty({
    serialize: (arr: Array<JNBaseNode>) => {
      return [];
    },
    deserialize: (arr: Array<number>) => {
      return [];
    }
  })
  public accepted: Array<JNBaseNode>;
  */

  public serialize: () => T;

  public extends(obj) {
    if (!obj) return;
    for (let key in this) {
      if (obj.hasOwnProperty(key))
        this[key] = obj[key];
    }
    return this;
  }

  public clone() {
    return (<typeof JNNodeModel>this.constructor).deserialize(this.serialize());
  }

  constructor() {
    this.nodeID = null;
    this.nodeName = null;
    this.position = null;
    this.accepts = [];
    this.type = null;
  }
}
