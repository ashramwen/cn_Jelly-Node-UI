import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

export const NODE_EVENTS = {
  NODE_CHANGED: 'NODE_CHANGED',
  NODE_CLICK: 'NODE_CLICK',
  NODE_DBLCLICK: 'NODE_DBLCLICK',
  CANVAS_KEYPRESS: 'CANVAS_KEYPRESS'
};

@Injectable()
export class Events {
  private subscriber: Subscriber<any>;
  private cbPool: Map<String, { cbs: Array<Function> }> = new Map<String, { cbs: Array<Function> }>();
  private valuePool: Map<String, any> = new Map<String, any>();

  private observable: Observable<any> = new Observable((subscriber) => {
    this.subscriber = subscriber;
  });

  on(eventName: String, cb: (value: any, initial?: boolean) => void) {
    let map = this._getOrCreateMap(eventName);
    map.cbs.push(cb);
    if (this.valuePool.has(eventName)) {
      cb(this.valuePool.get(eventName), true);
    }
  }

  emit(eventName: String, value) {
    this.valuePool.set(eventName, value);
    if (this.cbPool.has(eventName)) {
      this.cbPool.get(eventName).cbs
        .forEach((cb) => {
          cb(value);
        });
    }
  }

  private _getOrCreateMap(eventName: String) {
    if (this.cbPool.has(eventName)) {
      return this.cbPool.get(eventName);
    } else {
      this.cbPool.set(eventName, { cbs: [] });
      return this.cbPool.get(eventName);
    }
  }

}
