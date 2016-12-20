import { Injectable } from '@angular/core';

enum EVENT_TYPES {
  KEY_DOWN, KEY_UP
};

export enum CANVAS_COMMANDS {
  REMOVE, UNDO, ENABLE_DRAG_MOVE, DISABLED_DRAG_MOVE
};

@Injectable()
export class JNKeyboardService {
  private keyMap: { [key: string]: boolean } = {};

  private commands: { keyCombo: string[]; commandName: CANVAS_COMMANDS; type: EVENT_TYPES }[] = [{
    keyCombo: ['Backspace'],
    commandName: CANVAS_COMMANDS.REMOVE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['z', 'Meta'],
    commandName: CANVAS_COMMANDS.UNDO,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['h'],
    commandName: CANVAS_COMMANDS.ENABLE_DRAG_MOVE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['h'],
    commandName: CANVAS_COMMANDS.DISABLED_DRAG_MOVE,
    type: EVENT_TYPES.KEY_UP
  }];

  keydown(e: KeyboardEvent) {
    this.keyMap[e.key] = true;
    return this.matchEvent(e.key, EVENT_TYPES.KEY_DOWN);
  }

  keyup(e: KeyboardEvent) {
    this.keyMap[e.key] = false;
    return this.matchEvent(e.key, EVENT_TYPES.KEY_UP);
  }

  matchEvent(key, type: EVENT_TYPES) {
    let commands = this.commands.filter(m => m.type === type);
    if (type === EVENT_TYPES.KEY_DOWN) {
      for (let c of this.commands) {
        let flag = true;
        c.keyCombo.forEach(k => {
          flag = flag && this.keyMap[k];
        });
        if (flag) {
          return c;
        }
      }
    } else {
      return commands.find(c => c.keyCombo.indexOf(key) > -1);
    }

    return null;
  }
}
