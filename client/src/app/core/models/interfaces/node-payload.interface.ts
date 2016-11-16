import { JNBaseNode } from '../jn-base-node.type';
import { JNException } from '../exceptions/exception.type';
import { INodeError } from './node-error.interface';

export interface IJNNodePayload {
  type: Object;
  data: Object;
  valid: boolean;
  error: INodeError[];
}
