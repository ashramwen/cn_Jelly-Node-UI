import { Events } from './event.service';

export class AppEventListener {
  constructor(
    private events: Events,
    private eventName: string
  ) { }

  destroy() {
    this.events.destroy(this, this.eventName);
  }
}
