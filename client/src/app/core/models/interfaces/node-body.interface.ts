import { INodePosition } from './node-position.interface';
import { NodeError } from './node-error.type';

export interface INodeBody {
  position?: INodePosition;
  nodeName?: String;
  nodeID?: number;
  type?: string;
  valid?: boolean;
  errors: NodeError[];
  accepts?: Array<number>;
}
