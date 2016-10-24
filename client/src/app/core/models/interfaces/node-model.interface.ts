import { JNNodeError } from '../exceptions';

export interface IJNNodeModel { // node data model
  value: Object; // model value
  $valid: boolean; // model valid or not
  $error: JNNodeError; // error type & msg
}