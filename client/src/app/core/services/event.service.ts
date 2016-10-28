import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class Events {
  private subscriber: Subscriber<any>;
  private cbPool: Map<String, {cbs: Array<Function> }> = new Map<String, {cbs: Array<Function> }>();

  private observable: Observable<any> = new Observable((subscriber) => {
    this.subscriber = subscriber;
  });

  on(eventName: String, cb: (value: any) => void) {
    let map = this._getOrCreateMap(eventName);
    map.cbs.push(cb);
  }

  emit (eventName: String, value) {
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
