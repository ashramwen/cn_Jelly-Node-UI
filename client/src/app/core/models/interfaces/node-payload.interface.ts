import { JNBaseNode } from '../jn-base-node.type';
import { JNNodeError } from '../exceptions/jn-node-error.type';

export interface IJNNodePayload {
  type: Object;
  data: Object;
  valid: boolean;
  error: JNNodeError;
}
