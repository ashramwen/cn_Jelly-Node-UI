import { JNBaseNode } from '../jn-base-node.type';
import { JNException } from '../exceptions/exception.type';

export interface IJNNodePayload {
  type: Object;
  data: Object;
  valid: boolean;
  error: JNException;
}
