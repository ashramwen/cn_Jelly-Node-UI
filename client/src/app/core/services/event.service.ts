import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AppEventListener } from './event-listener.type';

export const NODE_EVENTS = {
  NODE_CHANGED: 'NODE_CHANGED',
  NODE_CLICK: 'NODE_CLICK',
  NODE_DBLCLICK: 'NODE_DBLCLICK',
  CANVAS_KEYPRESS: 'CANVAS_KEYPRESS',
  NODE_DELETE: 'NODE_DELETE',
  LINK_DELETE: 'LINK_DELETE',
  SELECTION_CHANGED: 'SELECTION_CHANGED'
};

@Injectable()
export class Events {

  private subscriber: Subscriber<any>;
  private cbPool: Map<String, { cbs: Array<{ listenerObj: Object, cb: Function }> }>;
  private valuePool: Map<String, any> = new Map<String, any>();

  constructor() {
    this.cbPool = new Map<String, { cbs: Array<{ listenerObj: Object, cb: Function }> }>();
  }

  on(eventName: string, cb: (value: any, initial?: boolean) => void) {
    let listener = new AppEventListener(this, eventName);
    let map = this._getOrCreateMap(eventName);

    map.cbs.push({ listenerObj: listener, cb: cb });
    if (this.valuePool.has(eventName)) {
      cb(this.valuePool.get(eventName), true);
    }
    return listener;
  }

  emit(eventName: String, value) {
    this.valuePool.set(eventName, value);
    if (this.cbPool.has(eventName)) {
      this.cbPool.get(eventName).cbs
        .forEach((cbObj) => {
          cbObj.cb(value);
        });
    }
  }

  destroy(listener, eventName) {
    let cbs = this.cbPool.get(eventName).cbs;
    cbs.splice(cbs.findIndex(cbObj => cbObj.listenerObj === listener), 1);
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
