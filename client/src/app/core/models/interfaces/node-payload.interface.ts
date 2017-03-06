import { JNBaseNode } from '../jn-base-node.type';
import { JNException } from '../exceptions/exception.type';
import { NodeError } from './node-error.type';

export interface IJNNodePayload {
  type: Object;
  data: Object;
  valid: boolean;
  error: NodeError[];
  influenceMap: JNBaseNode[]
}
