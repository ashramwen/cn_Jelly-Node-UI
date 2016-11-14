import { INodePosition } from './node-position.interface';

export interface INodeBody {
  position: INodePosition;
  nodeName: String;
  nodeID: number;
  type: string;
  $valid: boolean;
  accepts: Array<number>;
}
