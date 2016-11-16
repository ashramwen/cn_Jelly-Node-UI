import { INodePosition } from './node-position.interface';
import { INodeError } from './node-error.interface';

export interface INodeBody {
  position?: INodePosition;
  nodeName?: String;
  nodeID?: number;
  type?: string;
  $valid?: boolean;
  $errors: INodeError[];
  accepts?: Array<number>;
}
