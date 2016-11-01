import { JNBaseNode } from '../jn-base-node.type';
import { Response } from '@angular/http';
import { JNException } from './exception.type';

export class JNHttpException extends JNException {

  message: string = '';
  code: number = 200;

  constructor(response: Response) {
    super();
    let a = new Error;
    this.code = response.status;
    this.message = response.statusText;
  }

}
