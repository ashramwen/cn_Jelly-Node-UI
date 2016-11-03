import { JNException } from '../exceptions/exception.type';

export interface IJNNodeModel { // node data model
  $valid: boolean; // model valid or not
  $error: JNException; // error type & msg
}
