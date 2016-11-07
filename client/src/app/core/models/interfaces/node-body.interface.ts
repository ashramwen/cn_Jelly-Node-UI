import { INodePosition } from './node-position.interface';

export interface INodeBody {
  position: INodePosition;
  nodeName: String;
  nodeID: number;
  $valid: boolean;
}
