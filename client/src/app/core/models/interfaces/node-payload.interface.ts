import { JNBaseNode } from '../jn-base-node.type';
import { JNException } from '../exceptions';

export interface IJNNodePayload {
  type: Object;
  data: Object;
  valid: boolean;
  error: JNException;
}
