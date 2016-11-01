import { JNBaseNode } from '../jn-base-node.type';
import { Response } from '@angular/http';
import { JNException } from './exception.type';

export class CredentialException extends JNException {
  message: string = 'credential not valid!';
  code: number = 401;
}
