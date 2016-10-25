import { Injectable } from '@angular/core';
import { JNBaseNode } from '../models/jn-base-node.type';

@Injectable()
export class JNApplcation {

  nodes: Array<JNBaseNode>;
  
  loader() {
    
  }

  status(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
