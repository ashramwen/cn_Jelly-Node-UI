import { JNException } from '../exceptions';

export interface IJNNodeModel { // node data model
  $valid: boolean; // model valid or not
  $error: JNException; // error type & msg
}
