import { JNNodeException } from '../exceptions';

export interface IJNNodeModel { // node data model
  $valid: boolean; // model valid or not
  $error: JNNodeException; // error type & msg
}
