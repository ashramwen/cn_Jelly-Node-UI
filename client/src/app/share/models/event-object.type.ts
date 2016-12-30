import { SyncEvent } from 'ts-events';

export abstract class EventObject {

  private events: { [key: string]: SyncEvent<any> };
  
  constructor() {
    this.events = {};
  }

  emit(eventName, data) {
    if (!this.events[eventName]) return;
    this.events[eventName].post(data);
  }

  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || new SyncEvent();
    this.events[eventName].attach(callback);
    return {
      destroy: () => {
        this.events[eventName].detach(callback);
      }
    }
  }

}