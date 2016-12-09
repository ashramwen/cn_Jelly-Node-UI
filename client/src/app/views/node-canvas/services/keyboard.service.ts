import { Injectable } from '@angular/core';

export const CANVAS_COMMANDS = {
  REMOVE: 'REMOVE',
  UNDO: 'UNDO'
};

@Injectable()
export class JNKeyboardService {
  private keyMap: { [key: string]: boolean } = {};

  private commands = [{
    keyCombo: ['Backspace'],
    commandName: CANVAS_COMMANDS.REMOVE
  }, {
    keyCombo: ['z', 'Meta'],
    commandName: CANVAS_COMMANDS.UNDO
  }];

  keydown(e: KeyboardEvent) {
    this.keyMap[e.key] = true;
    return this.matchEvent();
  }

  keyup(e: KeyboardEvent) {
    this.keyMap[e.key] = false;
  }

  matchEvent() {
    for (let c of this.commands) {
      if (c.keyCombo.find(k => this.keyMap[k])) {
        return c;
      }
    }
    return null;
  }
}