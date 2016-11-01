import { JNBaseNode } from '../jn-base-node.type';
import { JNNodeException } from '../exceptions/node-exception.type';

export interface IJNNodePayload {
  type: Object;
  data: Object;
  valid: boolean;
  error: JNNodeException;
}
